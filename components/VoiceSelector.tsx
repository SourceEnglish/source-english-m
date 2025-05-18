import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import * as Speech from 'expo-speech';
import { useSpeech } from '@/contexts/SpeechContext';

interface VoiceOption {
  identifier: string;
  name: string;
  language: string;
}

const VoiceSelector: React.FC = () => {
  const [voices, setVoices] = useState<VoiceOption[]>([]);
  const [allVoices, setAllVoices] = useState<VoiceOption[]>([]); // Store all voices
  const [loading, setLoading] = useState(true);
  const { voiceIndex, setVoiceIndex } = useSpeech();

  useEffect(() => {
    (async () => {
      setLoading(true);
      const allVoices = await Speech.getAvailableVoicesAsync();
      setAllVoices(allVoices); // Store all voices for index mapping
      const enUSVoices = allVoices.filter(
        (v: any) => v.language && v.language.startsWith('en-US')
      );
      setVoices(enUSVoices);
      setLoading(false);
      // If no voice is selected, default to the first en-US voice (by global index)
      if (
        enUSVoices.length > 0 &&
        (voiceIndex === undefined ||
          !enUSVoices.some(
            (v) =>
              typeof voiceIndex === 'number' &&
              allVoices[voiceIndex]?.identifier === v.identifier
          ))
      ) {
        // Find the index in allVoices of the first en-US voice
        const firstEnUSVoice = enUSVoices[0];
        const globalIndex = allVoices.findIndex(
          (v) => v.identifier === firstEnUSVoice.identifier
        );
        setVoiceIndex(globalIndex);
      }
    })();
  }, []);

  const handleSelectVoice = (idx: number) => {
    // idx is the index in enUSVoices, but we need the index in allVoices
    const selectedVoice = voices[idx];
    const globalIndex = allVoices.findIndex(
      (v) => v.identifier === selectedVoice.identifier
    );
    setVoiceIndex(globalIndex);
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (voices.length === 0) {
    return (
      <Text style={styles.noVoices}>No en-US voices found on this device.</Text>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Select a Voice (en-US)</Text>
      {voices.map((voice, idx) => {
        const isSelected =
          typeof voiceIndex === 'number' &&
          allVoices[voiceIndex]?.identifier === voice.identifier;
        return (
          <View
            key={voice.identifier}
            style={{
              flexDirection: 'row',
              alignItems: 'stretch', // Make both children stretch to same height
              justifyContent: 'center',
              marginBottom: 10,
            }}
          >
            <TouchableOpacity
              style={[
                styles.voiceButton,
                isSelected ? styles.selected : null,
                {
                  flex: 1,
                  marginBottom: 0,
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0,
                },
              ]}
              onPress={() => handleSelectVoice(idx)}
            >
              <Text style={styles.voiceName}>
                {voice.name || voice.identifier}
              </Text>
              <Text style={styles.voiceDetails}>{voice.identifier}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.voiceButton,
                styles.playButton,
                {
                  marginTop: 0,
                  marginLeft: 0,
                  borderLeftWidth: 0,
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                  width: 54,
                  paddingHorizontal: 0,
                  justifyContent: 'center',
                  height: '100%',
                  alignItems: 'center',
                  marginBottom: 0,
                  backgroundColor: '#f9f9f9',
                },
              ]}
              onPress={() => {
                Speech.stop();
                const globalIndex = allVoices.findIndex(
                  (v) => v.identifier === voice.identifier
                );
                if (globalIndex !== -1) {
                  Speech.speak(
                    'This is a sample sentence spoken with the selected voice.',
                    {
                      language: allVoices[globalIndex].language,
                      voice: allVoices[globalIndex].identifier,
                      rate: 0.9,
                    }
                  );
                }
              }}
            >
              <Text
                style={[
                  styles.voiceName,
                  {
                    color: '#673ab7',
                    fontWeight: 'bold',
                    fontSize: 18,
                    marginTop: 0,
                    marginBottom: 0,
                  },
                ]}
              >
                ▶
              </Text>
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    width: '100%',
    alignSelf: 'center',
    maxWidth: 600,
    paddingHorizontal: 16,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'left',
  },
  voiceButton: {
    padding: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
  },
  selected: {
    borderColor: '#673ab7',
    backgroundColor: '#ede7f6',
  },
  voiceName: {
    fontSize: 16,
    fontWeight: '500',
  },
  voiceDetails: {
    fontSize: 12,
    color: '#666',
  },
  centered: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  noVoices: {
    color: 'red',
    marginTop: 20,
    textAlign: 'center',
  },
  playButton: {
    marginTop: 20,
    alignSelf: 'flex-start',
    backgroundColor: '#673ab7',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 6,
  },
  playButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default VoiceSelector;
