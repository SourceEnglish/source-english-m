import { Text, View, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';

export default function AboutScreen() {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Text>{t('home.welcome')}</Text>
      <Text>{t('home.description')}</Text>
      <Text style={styles.text}>About screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
  },
});
