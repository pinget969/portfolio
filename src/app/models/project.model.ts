export interface StarBlock {
  situation: string;
  task: string;
  action: string;
  result: string;
}

export interface Project {
  id: string;
  title: string;
  status: string;
  category: string;
  categoryIcon: string;
  categoryColor: string;
  gradientTo: string;
  badge: string;
  star: StarBlock;
  tags: string[];
  linkLabel: string;
  linkColor: string;
  url: string;
}
