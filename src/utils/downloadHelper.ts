import { Platform, PermissionsAndroid } from 'react-native';
import RNFS from 'react-native-fs';
import Toast from 'react-native-toast-message';

export const downloadFile = async (
    audioUrl: string | null,
    name: string,
    imageUrl?: string,
) => {
    try {
        if (Platform.OS === 'android') {
            const sdkVersion = parseInt(Platform.constants?.Release ?? '0', 10);

            if (sdkVersion >= 13) {
                const granted = await PermissionsAndroid.requestMultiple([
                    PermissionsAndroid.PERMISSIONS.READ_MEDIA_AUDIO,
                ]);
                if (
                    granted[PermissionsAndroid.PERMISSIONS.READ_MEDIA_AUDIO] !==
                    PermissionsAndroid.RESULTS.GRANTED
                ) {
                    Toast.show({
                        type: 'error',
                        text1: 'Permission Denied',
                        text2: 'Storage permission required to save audio.',
                        position: 'bottom',
                    });
                    return;
                }
            } else {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                );
                if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
                    Toast.show({
                        type: 'error',
                        text1: 'Permission Denied',
                        text2: 'Please allow storage permission.',
                        position: 'bottom',
                    });
                    return;
                }
            }
        }

        const destPath = `${RNFS.DownloadDirectoryPath}/${name}.mp3`;
        if (audioUrl) {
            const result = await RNFS.downloadFile({
                fromUrl: audioUrl,
                toFile: destPath,
            }).promise;

            if (result.statusCode === 200) {
                Toast.show({
                    type: 'success',
                    text1: 'Download Complete ✅',
                    text2: `${name}.mp3 saved to Downloads folder.`,
                    position: 'bottom',
                });
                return;
            } else {
                throw new Error('Download failed');
            }
        }

        const localFileName = 'believer.mp3';
        const base64Data = await RNFS.readFileAssets(localFileName, 'base64');

        await RNFS.writeFile(destPath, base64Data, 'base64');

        Toast.show({
            type: 'success',
            text1: 'Static Audio Saved 🎵',
            text2: `${name}.mp3 copied from bundled assets.`,
            position: 'bottom',
        });
    } catch (error) {
        console.log('Download error:', error);
        Toast.show({
            type: 'error',
            text1: 'Download Failed',
            text2: 'Check file location or permissions.',
            position: 'bottom',
        });
    }
};
