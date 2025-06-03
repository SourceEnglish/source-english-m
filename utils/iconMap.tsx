import AppleIcon from '@/assets/icons/licensed/apple.svg';
import RiceIcon from '@/assets/icons/licensed/rice.svg';
import BreadIcon from '@/assets/icons/licensed/bread.svg';
import FogIcon from '@/assets/icons/licensed/fog.svg';
import SunIcon from '@/assets/icons/licensed/sun.svg';
import CloudyIcon from '@/assets/icons/licensed/cloudy.svg';
import RainIcon from '@/assets/icons/licensed/rain.svg';
import SnowIcon from '@/assets/icons/licensed/snow.svg';
import StormIcon from '@/assets/icons/licensed/storm.svg';
import WindIcon from '@/assets/icons/licensed/wind.svg';
import PartlyCloudyIcon from '@/assets/icons/licensed/partly_cloudy.svg';
import WarmIcon from '@/assets/icons/licensed/warm.svg';
import ColdIcon from '@/assets/icons/licensed/cold.svg';
import HotIcon from '@/assets/icons/licensed/hot.svg';
import CoolIcon from '@/assets/icons/licensed/cool.svg';
import TemperatureIcon from '@/assets/icons/licensed/temperature.svg';
import AaIcon from '@/assets/icons/open_source/Aa.svg';
import WeatherIcon from '@/assets/icons/licensed/weather.svg';
import WeatherVocabIcon from '@/assets/icons/licensed/weather_vocab.svg';
import SundayIcon from '@/assets/icons/licensed/sunday.svg';
import MondayIcon from '@/assets/icons/licensed/monday.svg';
import TuesdayIcon from '@/assets/icons/licensed/tuesday.svg';
import WednesdayIcon from '@/assets/icons/licensed/wednesday.svg';
import ThursdayIcon from '@/assets/icons/licensed/thursday.svg';
import FridayIcon from '@/assets/icons/licensed/friday.svg';
import SaturdayIcon from '@/assets/icons/licensed/saturday.svg';
import WeekIcon from '@/assets/icons/licensed/week.svg';
import DayIcon from '@/assets/icons/licensed/day.svg';
import WeekDayIcon from '@/assets/icons/licensed/weekday.svg';
import WeekendIcon from '@/assets/icons/licensed/weekend.svg';
import YesterdayIcon from '@/assets/icons/licensed/yesterday.svg';
import TodayIcon from '@/assets/icons/licensed/today.svg';
import TomorrowIcon from '@/assets/icons/licensed/tomorrow.svg';
import DayVocabIcon from '@/assets/icons/licensed/day_vocab.svg';
import SpeakIcon from '@/assets/icons/licensed/speak.svg';
import MonthsIcon from '@/assets/icons/licensed/months.svg';
import SeasonsIcon from '@/assets/icons/licensed/seasons.svg';
import AutumnIcon from '@/assets/icons/licensed/autumn.svg';
import SpringIcon from '@/assets/icons/licensed/spring.svg';
import SummerIcon from '@/assets/icons/licensed/summer.svg';
import WinterIcon from '@/assets/icons/licensed/winter.svg';
import NumbersIcon from '@/assets/icons/open_source/numbers.svg';
import ToBeIcon from '@/assets/icons/open_source/to_be.svg';
import MyIcon from '@/assets/icons/open_source/my.svg'; // Example for a custom icon
import React from 'react';
import { View, Text } from 'react-native';
import ReadableText from '@/components/ReadableText'; // Add this import

export const TextIcon: React.FC<{
  text: string;
  size?: number;
  textsize?: number;
  textwidth?: number;
  fontSize?: number;
  pronunciation?: string;
}> = ({ text, size = 32, fontSize, textwidth, textsize, pronunciation }) => (
  <View
    style={{
      width: textwidth ? textwidth : size,
      height: size,
      borderRadius: 6,
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    }}
  >
    <ReadableText
      text={text}
      pronunciation={pronunciation}
      style={{
        fontSize: (textsize ? textsize : 25) * (text.length > 3 ? 0.85 : 1),
        color: '#333',
        fontWeight: '500',
        textAlign: 'center',
        fontFamily: 'Lexend_400Regular', // <-- Use the loaded font name
        marginBottom: 0,
        padding: 0,
      }}
      numberOfLines={1}
      ellipsizeMode="tail"
      displayText={text}
    />
  </View>
);

export const GenericTextIcon: React.FC<{ word: string; size?: number }> = ({
  word,
  size = 28,
}) => (
  <View
    style={{
      width: size,
      height: Math.max(42, size),

      borderRadius: size / 2,
      // backgroundColor: '#f0f0f0',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    }}
  >
    <Text
      style={{
        fontSize: size * 0.85,
        color: '#333',
        fontWeight: '600',
        textAlign: 'center',
        fontFamily: 'Lexend', // Use Lexend font
      }}
      selectable={false}
    >
      {word.charAt(0).toUpperCase()}
    </Text>
  </View>
);

export const iconMap: Record<string, React.FC<any>> = {
  letters: AaIcon,
  food: RiceIcon,
  'weather vocabulary': WeatherVocabIcon,
  'months vocabulary': MonthsIcon,

  apple: AppleIcon,
  bread: BreadIcon,
  'food vocabulary': AppleIcon,
  rice: RiceIcon,
  snowy: SnowIcon,
  rainy: RainIcon,
  stormy: StormIcon,
  windy: WindIcon,
  autumn: AutumnIcon,
  fall: AutumnIcon,
  summer: SummerIcon,
  winter: WinterIcon,
  spring: SpringIcon,
  foggy: FogIcon,
  'partly cloudy': PartlyCloudyIcon,
  sunny: SunIcon,
  cloudy: CloudyIcon,
  hot: HotIcon,
  warm: WarmIcon,
  cool: CoolIcon,
  cold: ColdIcon,
  temperature: TemperatureIcon,
  weather: WeatherIcon,
  sunday: SundayIcon,
  monday: MondayIcon,
  tuesday: TuesdayIcon,
  wednesday: WednesdayIcon,
  thursday: ThursdayIcon,
  friday: FridayIcon,
  saturday: SaturdayIcon,
  week: WeekIcon,
  day: DayIcon,
  weekend: WeekendIcon,
  weekday: WeekDayIcon,
  yesterday: YesterdayIcon,
  today: TodayIcon,
  tomorrow: TomorrowIcon,
  'day vocabulary': DayVocabIcon,
  'temperature vocabulary': TemperatureIcon,
  'numbers vocabulary': NumbersIcon,
  'to be': ToBeIcon,
  'seasons vocabulary': SeasonsIcon, // Assuming seasons vocabulary uses the same icon as weather
  'possessive adjectives vocabulary': MyIcon, // Example for a custom icon
  'possessive adjectives': MyIcon, // Example for a custom icon
  month: MonthsIcon,
  season: SeasonsIcon,
  speak: SpeakIcon,

  // ...etc
};

// Helper to get icon for a word, optionally using iconText
export function getIconForEntry(entry: any): React.FC<any> {
  if (entry && typeof entry === 'object' && entry.__icon_text) {
    const iconText = entry.__icon_text;
    const pronunciation = entry.__forced_pronunciation;
    return (props: any) => (
      <TextIcon
        text={iconText}
        textwidth={props.textwidth || 25}
        textsize={props.textsize || 25}
        fontSize={props.fontSize || 25}
        size={props.textwidth || 28}
        pronunciation={pronunciation}
      />
    );
  }
  const word = entry && entry.word ? entry.word : entry;
  const key = typeof word === 'string' ? word.toLowerCase() : '';
  if (iconMap[key]) return iconMap[key];
  return (props: any) => (
    <GenericTextIcon word={word} size={props.width || 28} />
  );
}
