import { create } from 'zustand';
import { getSongs } from '../services/SongApi';

export interface Song {
    id: string;
    title: string;
    artist: string;
    album: string;
    thumbnail: string;
    previewUrl: string | null;
}

interface SongStore {
    songs: Song[];
    loading: boolean;
    fetchSongs: (
        query: string,
        offset?: number,
        limit?: number,
        append?: boolean
    ) => Promise<void>;
    clearSongs: () => void;
}

export const useSongStore = create<SongStore>((set, get) => ({
    songs: [],
    loading: false,

    fetchSongs: async (query = '', offset = 0, limit = 10, append = false) => {
        if (!query.trim()) {
            set({ songs: [], loading: false });
            return;
        }

        set({ loading: true });

        try {
            const newSongs = await getSongs(query, offset, limit);

            set((state) => {

                const updatedSongs = append
                    ? [...state.songs, ...newSongs]
                    : newSongs;

                const uniqueSongs = updatedSongs.filter(
                    (song: any, index: any, self: any) =>
                        index === self.findIndex((s: any) => s.id === song.id)
                );

                return { songs: uniqueSongs, loading: false };
            });
        } catch (error) {
            console.error('Error fetching songs:', error);
            set({ loading: false });
        }
    },

    clearSongs: () => {
        set({ songs: [] });
    },
}));
