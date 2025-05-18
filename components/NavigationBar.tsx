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
import { CENTERED_MAX_WIDTH } from '@/constants/constants';

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
  const { readAloudMode, setReadAloudMode, setVoiceIdentifier } = useSpeech();
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

  // Set nav bar height and icon size for mobile/desktop
  const NAVBAR_HEIGHT = isMobile ? 72 : 80; // Increased desktop height to 80
  const ICON_SIZE = isMobile ? 36 : 32;
  const ICON_SIZE_MULTIPLIER = isMobile ? 1.0 : 0.9;
  const NAV_BUTTON_PADDING_VERTICAL = isMobile ? 10 : 4;
  const NAV_BUTTON_PADDING_HORIZONTAL = isMobile ? 16 : 8;

  // Set headerHeight larger for mobile, and taller for desktop
  const computedHeaderHeight = NAVBAR_HEIGHT; // NAVBAR_HEIGHT is now 80 on desktop

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
    // setVoiceIndex(voiceIndex);
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
    <View style={[styles.containerWrapper, { height: computedHeaderHeight }]}>
      <View style={styles.innerContainer}>
        {/* Left section: back button and title */}
        <View style={styles.leftRow} pointerEvents="box-none">
          {showBack && (
            <TouchableOpacity
              style={[styles.backButton, isMobile ? null : { padding: 12 }]}
              onPress={handleBack}
              accessibilityLabel="Back"
            >
              <ArrowLeft
                width={isMobile ? 32 : 32}
                height={isMobile ? 32 : 32}
                style={{ marginRight: isMobile ? 8 : 8 }}
              />
            </TouchableOpacity>
          )}
          <Text
            style={[
              styles.title,
              { fontSize: isMobile ? 24 : 26, maxWidth: isMobile ? 240 : 400 },
            ]}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {title}
          </Text>
        </View>
        {/* Right section: navigation icons */}
        <View style={styles.rightRow} pointerEvents="box-none">
          <View style={styles.navBarContainer}>
            {/* Home Button */}
            <TouchableOpacity
              style={styles.navButton}
              onPress={() => router.replace('/')}
            >
              <HomeIcon
                width={computedHeaderHeight * ICON_SIZE_MULTIPLIER}
                height={computedHeaderHeight * ICON_SIZE_MULTIPLIER}
              />
            </TouchableOpacity>
            {/* Read Aloud Toggle */}
            <TouchableOpacity
              onPress={handleReadAloudToggle}
              onPressIn={() => setIsPressed(true)}
              onPressOut={() => setIsPressed(false)}
              style={{
                ...styles.navButton,
                backgroundColor:
                  isPressed || readAloudMode ? '#ffff73' : 'white',
              }}
            >
              <SpeakIcon
                width={computedHeaderHeight * ICON_SIZE_MULTIPLIER}
                height={computedHeaderHeight * ICON_SIZE_MULTIPLIER}
              />
            </TouchableOpacity>
            {/* More Options */}
            {/* <TouchableOpacity style={styles.navButton}>
              <MoreOptionsIcon
                width={computedHeaderHeight * ICON_SIZE_MULTIPLIER}
                height={computedHeaderHeight * ICON_SIZE_MULTIPLIER}
              />
            </TouchableOpacity> */}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerWrapper: {
    width: '100%',
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: 'rgb(216, 216, 216)',
    paddingHorizontal: 0,
    paddingTop: Platform.OS === 'ios' ? 30 : 0,
    alignItems: 'center',
    // height is now set dynamically
  },
  innerContainer: {
    width: '100%',
    maxWidth: CENTERED_MAX_WIDTH,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 'auto',
    marginRight: 'auto',
    height: '100%',
    paddingHorizontal: 16,
  },
  leftRow: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
    flex: 1,
    minWidth: 0,
  },
  rightRow: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
    justifyContent: 'flex-end',
  },
  backButton: {
    padding: 8, // overridden dynamically
  },
  backText: {
    fontSize: 18,
    color: '#007AFF',
    fontWeight: '500',
  },
  title: {
    fontSize: 20, // overridden dynamically
    fontWeight: 'bold',
    color: '#222',
    textAlign: 'left',
    maxWidth: 200, // overridden dynamically
  },
  navBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    columnGap: 10, // reduce gap between buttons
    height: '100%',
  },
  navButton: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    paddingVertical: 4, // overridden dynamically
    paddingHorizontal: 8, // overridden dynamically
    backgroundColor: 'white',
    minWidth: 36, // overridden dynamically
    minHeight: 36, // overridden dynamically
    maxWidth: 48, // overridden dynamically
    maxHeight: 48, // overridden dynamically
  },
});

export default CustomNav;
