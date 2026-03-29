// Tipe Data
export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  icon?: any;
  color?: string;
  description: string;
  category: 'Leader' | 'Core' | 'Division';
  divisionName?: string;
}
