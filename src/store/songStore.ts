// store/songStore.ts
import { create } from 'zustand';
import { getSongs } from '../services/SongApi';

export const useSongStore = create((set, get) => ({
    songs: [],
    loading: false,

    fetchSongs: async (query = "", offset = 0, limit = 10, append = false) => {
        set({ loading: true });
        const newSongs = await getSongs(query, offset, limit);
        set((state: any) => ({
            songs: append ? [...state.songs, ...newSongs] : newSongs,
            loading: false,
        }));
    },
}));
