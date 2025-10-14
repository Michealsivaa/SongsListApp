import { create } from 'zustand';
import { getSongs } from '../services/SongApi';

export const useSongStore = create((set) => ({
    songs: [],
    loading: false,
    fetchSongs: async () => {
        try {
            set({ loading: true });
            const data = await getSongs();
            set({ songs: data, loading: false });
        } catch (error) {
            set({ loading: false });
        }
    },
}));
