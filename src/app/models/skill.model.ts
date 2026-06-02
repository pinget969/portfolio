export interface SkillItem {
  name: string;
  level: string;
  percent: number;
  gradientFrom: string;
  gradientTo: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  iconBg: string;
  iconColor: string;
  iconBorder: string;
  skills: SkillItem[];
}
