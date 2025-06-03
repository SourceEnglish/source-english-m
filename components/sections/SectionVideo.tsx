import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import { WebView } from 'react-native-webview';
import ReadableText from '../ReadableText';

function extractYouTubeId(url?: string) {
  if (!url) return undefined;
  // Handles both embed and watch URLs
  const match = url.match(
    /(?:embed\/|watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  return match ? match[1] : undefined;
}

const windowWidth = Dimensions.get('window').width;

const SectionVideo = ({
  src,
  alt,
  caption,
}: {
  src?: string;
  alt?: string;
  caption?: string;
}) => {
  const videoId = extractYouTubeId(src);
  return (
    <View style={styles.container}>
      {videoId && (
        <View style={styles.videoWrapper}>
          <YoutubePlayer
            height={(windowWidth * 9) / 16}
            videoId={videoId}
            play={false}
            webViewProps={{
              accessibilityLabel: alt,
              allowsFullscreenVideo: true,
            }}
          />
        </View>
      )}
      {caption && <ReadableText text={caption} style={styles.caption} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 12,
    width: '100%',
  },
  videoWrapper: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: 8,
    backgroundColor: '#000',
    overflow: 'hidden',
  },
  caption: {
    marginTop: 6,
    fontSize: 14,
    color: '#555',
    fontStyle: 'italic',
    textAlign: 'center',
  },
});

export default SectionVideo;
