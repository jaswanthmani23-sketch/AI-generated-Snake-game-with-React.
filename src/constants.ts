export interface Track {
  id: string;
  title: string;
  artist: string;
  cover: string;
  color: string;
}

export const TRACKS: Track[] = [
  {
    id: '1',
    title: 'Cyber Drift',
    artist: 'Neon Nexus',
    cover: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=400&h=400&fit=crop',
    color: '#ff00ff',
  },
  {
    id: '2',
    title: 'Void Runner',
    artist: 'Synthwave Society',
    cover: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=400&fit=crop',
    color: '#00ffff',
  },
  {
    id: '3',
    title: 'Techno Pulse',
    artist: 'Digital Ghost',
    cover: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&h=400&fit=crop',
    color: '#39ff14',
  },
];
