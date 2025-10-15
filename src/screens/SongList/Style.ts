import { StyleSheet } from 'react-native';
import { useThemeContext } from '../../theme/ThemeContext';

const UseStyles = () => {
    const { theme } = useThemeContext();

    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.colors.background,
            padding: theme.spacing.spacer16,
        },
        searchContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: theme.spacing.spacer10,
        },
        inputWrapper: {
            flex: 1,
            position: 'relative',
        },
        input: {
            height: 45,
            borderRadius: 8,
            paddingHorizontal: theme.spacing.spacer10,
            backgroundColor: theme.colors.card,
            color: theme.colors.text,
            borderWidth: 1,
            borderColor: theme.colors.border,
            paddingRight: 35, // space for clear icon
        },
        clearIcon: {
            position: 'absolute',
            right: 10,
            top: 12,
        },
        searchBtn: {
            backgroundColor: theme.colors.primary,
            marginLeft: theme.spacing.spacer8,
            padding: theme.spacing.spacer8,
            borderRadius: 8,
            alignItems: 'center',
            justifyContent: 'center',
        },
        emptyText: {
            color: theme.colors.subtext,
            textAlign: 'center',
            marginTop: theme.spacing.spacer16,
        },
        errorText: {
            color: 'red',
            textAlign: 'center',
            marginTop: 6,
        },
    });
};

export default UseStyles;
