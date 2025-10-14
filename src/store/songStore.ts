// src/store/songStore.ts
import { create } from 'zustand';
import { getSongs } from '../services/SongApi';

export const useSongStore = create((set) => ({
    songs: [],
    loading: false,

    fetchSongs: async (query: string) => {
        try {
            set({ loading: true });
            const data = await getSongs(query);
            set({ songs: data, loading: false });
        } catch (error) {
            console.error('❌ Error fetching songs:', error);
            set({ loading: false });
        }
    },
}));
