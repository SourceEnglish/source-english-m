import AppleIcon from '@/assets/icons/licensed/apple.svg';
import RiceIcon from '@/assets/icons/licensed/rice.svg';
import BreadIcon from '@/assets/icons/licensed/bread.svg';

// ...other imports

export const iconMap: Record<string, React.FC<any>> = {
  food: RiceIcon,
  apple: AppleIcon,
  bread: BreadIcon,
  'food vocab': AppleIcon,
  rice: RiceIcon,
  // ...etc
};
