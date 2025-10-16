import { Song } from "../store/songStore";

export const getSongs = async (
    query: string = 'ed sheeran',
    offset = 0,
    limit = 10
): Promise<Song[]> => {
    const client_id = '2da6b3d1e2eb408fae5c2aa03671648a';
    const client_secret = 'ed7734b5acf44d248f9df941df6a542b';

    try {
        const tokenRes = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `grant_type=client_credentials&client_id=${client_id}&client_secret=${client_secret}`,
        });

        const tokenData = await tokenRes.json();
        if (!tokenData.access_token) throw new Error('Failed to get token');

        const response = await fetch(
            `https://api.spotify.com/v1/search?q=${encodeURIComponent(
                query
            )}&type=track&limit=${limit}&offset=${offset}`,
            {
                headers: { Authorization: `Bearer ${tokenData.access_token}` },
            }
        );

        const data = await response.json();
        if (!data.tracks?.items) return [];

        return data.tracks.items.map((item: any) => ({
            id: item.id,
            title: item.name,
            artist: item.artists[0]?.name,
            album: item.album.name,
            thumbnail: item.album.images?.[0]?.url,
            previewUrl: item.preview_url ?? null,
        }));
    } catch (error) {
        console.error('Error fetching songs:', error);
        return [];
    }
};
