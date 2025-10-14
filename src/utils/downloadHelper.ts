import { Alert } from 'react-native';
import RNFS from 'react-native-fs';

export const downloadFile = async (url: string, name: string) => {
    const path = `${RNFS.DownloadDirectoryPath}/${name}.jpg`;
    try {
        await RNFS.downloadFile({ fromUrl: url, toFile: path }).promise;
        Alert.alert('File downloaded successfully!');
    } catch (err) {
        Alert.alert('Download failed!');
    }
};
