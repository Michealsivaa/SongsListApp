import { StyleSheet } from 'react-native';
import { useThemeContext } from '../../theme/ThemeContext';

const UseStyles = () => {
    const { theme } = useThemeContext();

    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.colors.background,
            justifyContent: 'space-between',
        },

        bannerContainer: {
            width: '100%',
            height: 280,
            backgroundColor: theme.colors.card,
            justifyContent: 'center',
            alignItems: 'center',
            borderBottomLeftRadius: 24,
            borderBottomRightRadius: 24,
            overflow: 'hidden',
        },

        bannerImage: {
            width: '100%',
            height: '100%',
        },

        detailsContainer: {
            alignItems: 'center',
            marginVertical: 24,
        },

        songTitle: {
            fontSize: 22,
            fontWeight: 'bold',
            color: theme.colors.text,
            marginBottom: 6,
            textAlign: 'center',
        },

        songArtist: {
            fontSize: 16,
            color: theme.colors.subtext,
            marginBottom: 4,
        },

        albumText: {
            fontSize: 14,
            color: theme.colors.subtext,
        },

        downloadBtn: {
            flexDirection: 'row',
            alignSelf: 'center',
            backgroundColor: theme.colors.primary,
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderRadius: 30,
            alignItems: 'center',
            gap: 8,
            elevation: 3,
        },

        downloadText: {
            color: '#fff',
            fontSize: 16,
            fontWeight: '600',
        },

        controlsContainer: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 40,
            gap: 40,
        },

        controlBtn: {
            backgroundColor: theme.colors.primary,
            padding: 12,
            borderRadius: 50,
            opacity: 0.9,
        },

        playBtn: {
            padding: 16,
            backgroundColor: theme.colors.primary,
            elevation: 4,
        },
        disabledBtn: {
            opacity: 0.4,
        },
    });
};

export default UseStyles;
