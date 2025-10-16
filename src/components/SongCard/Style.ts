import { StyleSheet } from 'react-native';
import { useThemeContext } from '../../theme/ThemeContext';

const UseStyles = () => {
    const { theme } = useThemeContext();
    return StyleSheet.create({
        card: {
            flexDirection: 'row',
            alignItems: 'flex-start',
            backgroundColor: theme.colors.card,
            marginVertical: theme.spacing.spacer8,
            borderRadius: 10,
            padding: theme.spacing.spacer10,
        },
        thumbnail: {
            width: 80,
            height: 80,
            borderRadius: 8,
        },
        info: {
            flex: 1,
            marginLeft: theme.spacing.spacer10,
        },
        title: {
            fontSize: theme.typography.medium,
            color: theme.colors.text,
            fontWeight: 'bold',
        },
        artist: {
            fontSize: theme.typography.small,
            color: theme.colors.subtext,
        },
        downloadBtn: {
            backgroundColor: theme.colors.primary,
            padding: theme.spacing.spacer6,
            borderRadius: 50,

        },
        downloadIcon: {
            color: 'white',
            opacity: 0.7
        }
    });
};

export default UseStyles;
