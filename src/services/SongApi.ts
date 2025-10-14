import axios from 'axios';

export const getSongs = async () => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/photos?_limit=10');
    return response.data.map((item: any) => ({
        id: item.id.toString(),
        title: item.title,
        artist: `Artist ${item.id}`,
        thumbnail: item.thumbnailUrl,
        url: item.url,
    }));
};
