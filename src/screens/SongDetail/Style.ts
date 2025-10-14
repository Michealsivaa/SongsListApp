import { StyleSheet } from 'react-native';
import { useThemeContext } from '../../theme/ThemeContext';

const UseStyles = () => {
    const { theme } = useThemeContext();
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.colors.background,
            alignItems: 'center',
            padding: theme.spacing.spacer16,
        },
        image: {
            width: 200,
            height: 200,
            borderRadius: 10,
            marginBottom: theme.spacing.spacer16,
        },
        title: {
            fontSize: theme.typography.large,
            color: theme.colors.text,
            fontWeight: 'bold',
            marginBottom: theme.spacing.spacer8,
        },
        artist: {
            fontSize: theme.typography.medium,
            color: theme.colors.subtext,
            marginBottom: theme.spacing.spacer16,
        },
        downloadBtn: {
            backgroundColor: theme.colors.primary,
            paddingHorizontal: theme.spacing.spacer16,
            paddingVertical: theme.spacing.spacer10,
            borderRadius: 8,
        },
        downloadText: {
            color: '#FFF',
            fontSize: theme.typography.medium,
        },
    });
};

export default UseStyles;
