export interface Game {
  id: string;
  slug: string;
  title: string;
  description?: string;
  thumbnail: string;
  url: string; // The play URL (iframe source)
  width?: number;
  height?: number;
  category: string;
  tags: string[];
  rating?: number;
  plays?: number;
  isHot?: boolean;
  isNew?: boolean;
}

export interface GameCategory {
  id: string;
  title: string;
  slug: string;
  description?: string;
  games: Game[];
}
