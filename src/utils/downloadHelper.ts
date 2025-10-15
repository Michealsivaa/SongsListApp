import RNFS from 'react-native-fs';
import Toast from 'react-native-toast-message';

export const downloadFile = async (url: string, name: string) => {
    const path = `${RNFS.DownloadDirectoryPath}/${name}.jpg`;
    try {
        await RNFS.downloadFile({ fromUrl: url, toFile: path }).promise;

        Toast.show({
            type: 'success',
            text1: 'Download Complete',
            text2: `${name}.jpg saved to Downloads`,
            position: 'bottom',
        });
    } catch (err) {
        Toast.show({
            type: 'error',
            text1: 'Download Failed',
            text2: 'Please check your connection and try again.',
            position: 'bottom',
        });
    }
};
