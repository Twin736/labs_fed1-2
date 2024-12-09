export interface Character {
  id: number;
  name: string;
  image: string;
  episode: string[];
  firstEpisode?: string;
  status: string;
  species: string;
  gender: string;
  origin: { name: string };
  location: { name: string };
}
