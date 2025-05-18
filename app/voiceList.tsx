import React, { useEffect, useState } from 'react';
import LanguageSelector from '@/components/LanguageSelector';
import VoiceSelector from '@/components/VoiceSelector';
import { Link } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';
import { CENTERED_MAX_WIDTH } from '@/constants/constants';
import * as Speech from 'expo-speech';
import { useSpeech } from '@/contexts/SpeechContext';

export default function voiceList() {
  const { voiceIdentifier } = useSpeech();
  const [allVoices, setAllVoices] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const voices = await Speech.getAvailableVoicesAsync();
      setAllVoices(voices);
    })();
  }, []);

  const selectedVoice =
    voiceIdentifier && allVoices.length > 0
      ? allVoices.find((v) => v.identifier === voiceIdentifier)
      : null;

  return (
    <ScrollView
      style={{
        width: '100%',
        maxWidth: CENTERED_MAX_WIDTH,
        alignSelf: 'center',
        backgroundColor: 'white',
        height: '100%',
        marginTop: 10,
      }}
    >
      <VoiceSelector />
      {/* Show selected voice info below the rest of the content */}
      <View style={{ marginTop: 32, padding: 16 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 8 }}>
          Selected Voice Object:
        </Text>
        <Text style={{ fontFamily: 'monospace', fontSize: 13 }}>
          {selectedVoice
            ? JSON.stringify(selectedVoice, null, 2)
            : 'No voice selected.'}
        </Text>
      </View>
    </ScrollView>
  );
}
