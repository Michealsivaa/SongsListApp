import { Platform, PermissionsAndroid } from 'react-native';
import RNFS from 'react-native-fs';
import Toast from 'react-native-toast-message';

export const downloadFile = async (audioUrl: string, name: string, imageUrl?: string) => {
    try {
        const isAudioAvailable = !!audioUrl;
        const fileType = isAudioAvailable ? 'mp3' : 'jpg';
        const downloadUrl = isAudioAvailable ? audioUrl : imageUrl;

        if (!downloadUrl) {
            Toast.show({
                type: 'error',
                text1: 'No media available',
                text2: 'This song has neither audio nor image.',
                position: 'bottom',
            });
            return;
        }

        if (Platform.OS === 'android') {
            const sdkVersion = Platform.constants?.Release
                ? parseInt(Platform.constants.Release, 10)
                : 0;

            if (sdkVersion >= 13) {
                const granted = await PermissionsAndroid.requestMultiple([
                    PermissionsAndroid.PERMISSIONS.READ_MEDIA_AUDIO,
                    PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
                ]);
                const audioGranted =
                    granted[PermissionsAndroid.PERMISSIONS.READ_MEDIA_AUDIO] ===
                    PermissionsAndroid.RESULTS.GRANTED;
                const imageGranted =
                    granted[PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES] ===
                    PermissionsAndroid.RESULTS.GRANTED;

                if (!audioGranted && !imageGranted) {
                    Toast.show({
                        type: 'error',
                        text1: 'Permission Denied',
                        text2: 'App needs storage access to save files.',
                        position: 'bottom',
                    });
                    return;
                }
            } else {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    {
                        title: 'Storage Permission Required',
                        message: 'App needs access to your storage to save media.',
                        buttonPositive: 'OK',
                    },
                );

                if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
                    Toast.show({
                        type: 'error',
                        text1: 'Permission Denied',
                        text2: 'Please allow storage access to download.',
                        position: 'bottom',
                    });
                    return;
                }
            }
        }

        const path = `${RNFS.DownloadDirectoryPath}/${name}.${fileType}`;


        const result = await RNFS.downloadFile({
            fromUrl: downloadUrl,
            toFile: path,
        }).promise;

        if (result.statusCode === 200) {
            Toast.show({
                type: 'success',
                text1: 'Download Complete ✅',
                text2: isAudioAvailable
                    ? `${name}.mp3 saved to Downloads folder.`
                    : `${name}.jpg (cover image) saved to Downloads folder.`,
                position: 'bottom',
            });
        } else {
            throw new Error('Download failed');
        }
    } catch (err) {
        Toast.show({
            type: 'error',
            text1: 'Download Failed',
            text2: 'Please check your internet connection or permissions.',
            position: 'bottom',
        });
    }
};
