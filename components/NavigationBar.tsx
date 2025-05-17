import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import { useRouter, useSegments } from 'expo-router';
import * as Speech from 'expo-speech';
import { useSpeech } from '@/contexts/SpeechContext';
import ArrowLeft from '@/assets/icons/open_source/arrow-left.svg';
import HomeIcon from '@/assets/icons/licensed/home.svg';
import MoreOptionsIcon from '@/assets/icons/licensed/more_options.svg';
import SpeakIcon from '@/assets/icons/licensed/speak.svg';

interface CustomNavProps {
  headerHeight: number;
  title?: string;
  /**
   * Optionally override back button visibility. If undefined, will auto-detect based on navigation stack.
   */
  canGoBack?: boolean;
}

const CustomNav: React.FC<CustomNavProps> = ({
  headerHeight,
  title,
  canGoBack,
}) => {
  const router = useRouter();
  const segments = useSegments();
  const { readAloudMode, setReadAloudMode, setVoiceIndex } = useSpeech();
  const [visible, setVisible] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  // Show back button on all screens except the home page (segments[0] === 'index')
  const isHome = String(segments[0]) === 'index';
  const showBack = typeof canGoBack === 'boolean' ? canGoBack : !isHome;

  // Custom back handler: if cannot go back, go home
  const handleBack = () => {
    if (Platform.OS === 'web') {
      const prevPath = window.location.pathname;
      router.back();
      setTimeout(() => {
        if (window.location.pathname === prevPath) {
          router.replace('/');
        }
      }, 100);
    } else {
      router.replace('/');
    }
  };

  // Responsive scaling
  const isMobile =
    Platform.OS !== 'web' ||
    (typeof window !== 'undefined' && window.innerWidth < 600);

  // Read Aloud Toggle logic (from NavigationBar)
  const handleReadAloudToggle = async () => {
    if (readAloudMode) {
      setReadAloudMode(false);
      return;
    }
    setReadAloudMode(true);
    const voices = await Speech.getAvailableVoicesAsync();
    let hasEnglishUS = false;
    let voiceIndex = voices.findIndex((voice) =>
      voice.identifier.includes('Google US English')
    );
    setVoiceIndex(voiceIndex);
    voices.forEach((voice) => {
      if (voice.language === 'en-US') {
        hasEnglishUS = true;
      }
    });
    if (!hasEnglishUS) {
      setVisible(true);
    }
  };

  return (
    <View
      style={[
        styles.container,
        {
          height: headerHeight + (isMobile ? 20 : 8),
          paddingTop: isMobile && Platform.OS === 'ios' ? 30 : 0,
        },
      ]}
    >
      {/* Left section: back button and title */}
      <View
        style={[styles.leftRow, { minWidth: isMobile ? 0 : 320 }]}
        pointerEvents="box-none"
      >
        {showBack && (
          <TouchableOpacity
            style={[styles.backButton, isMobile ? null : { padding: 12 }]}
            onPress={handleBack}
            accessibilityLabel="Back"
          >
            <ArrowLeft
              width={isMobile ? 24 : 32}
              height={isMobile ? 24 : 32}
              style={{ marginRight: isMobile ? 4 : 8 }}
            />
          </TouchableOpacity>
        )}
        <Text
          style={[
            styles.title,
            { fontSize: isMobile ? 20 : 26, maxWidth: isMobile ? 200 : 400 },
          ]}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {title}
        </Text>
      </View>
      {/* Right section: navigation icons */}
      <View style={styles.absoluteRight} pointerEvents="box-none">
        <View style={styles.navBarContainer}>
          {/* Home Button */}
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => router.replace('/')}
          >
            <HomeIcon height={headerHeight} />
          </TouchableOpacity>
          {/* Read Aloud Toggle */}
          <TouchableOpacity
            onPress={handleReadAloudToggle}
            onPressIn={() => setIsPressed(true)}
            onPressOut={() => setIsPressed(false)}
            style={{
              ...styles.navButton,
              backgroundColor: isPressed || readAloudMode ? '#ffff73' : 'white',
            }}
          >
            <SpeakIcon height={headerHeight} />
          </TouchableOpacity>
          {/* More Options */}
          <TouchableOpacity style={styles.navButton}>
            <MoreOptionsIcon height={headerHeight} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: 'rgb(216, 216, 216)',
    paddingHorizontal: 8,
    paddingTop: Platform.OS === 'ios' ? 30 : 0,
  },
  leftRow: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
    marginLeft: 8,
    zIndex: 2,
    flex: 1,
    minWidth: 0, // allow shrinking on mobile
  },
  backButton: {
    padding: 8,
  },
  backText: {
    fontSize: 18,
    color: '#007AFF',
    fontWeight: '500',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
    textAlign: 'left',
    maxWidth: 200,
  },
  absoluteRight: {
    position: 'absolute',
    right: 8,
    top: Platform.OS === 'ios' ? 30 : 0,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'flex-end',
    zIndex: 2,
  },
  navBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 10,
    height: '100%',
  },
  navButton: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    padding: 5,
    backgroundColor: 'white',
  },
});

export default CustomNav;
