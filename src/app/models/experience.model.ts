export interface ExperienceHighlight {
  label?: string;
  description: string;
}

export interface Experience {
  id: string;
  role: string;
  title: string;
  company: string;
  period: string;
  location: string;
  badge: string;
  badgeStyle: 'active' | 'past';
  highlights: string[];
  projects?: ExperienceHighlight[];
  tags: string[];
}
