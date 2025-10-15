import { create } from 'zustand';
import { getSongs } from '../services/SongApi';

export const useSongStore = create((set, get) => ({
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

            set((state: any) => {
                const updatedSongs = append ? [...state.songs, ...newSongs] : newSongs;

                const uniqueSongs = updatedSongs.filter(
                    (song: any, index: number, self: any[]) =>
                        index === self.findIndex((s: any) => s.id === song.id)
                );

                return { songs: uniqueSongs, loading: false };
            });
        } catch (error) {
            set({ loading: false });
        }
    },

    clearSongs: () => {
        set({ songs: [] });
    },
}));
