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

// ...other imports

export const iconMap: Record<string, React.FC<any>> = {
  food: RiceIcon,
  'weather vocab': WeatherVocabIcon,

  apple: AppleIcon,
  bread: BreadIcon,
  'food vocab': AppleIcon,
  rice: RiceIcon,
  snowy: SnowIcon,
  rainy: RainIcon,
  stormy: StormIcon,
  windy: WindIcon,
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
  'days vocab': DayVocabIcon,

  // ...etc
};
