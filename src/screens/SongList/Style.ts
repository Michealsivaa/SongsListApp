import { StyleSheet } from 'react-native';
import { useThemeContext } from '../../theme/ThemeContext';

const UseStyles = () => {
    const { theme } = useThemeContext();

    return StyleSheet.create({
        // 🔹 Layout
        container: {
            flex: 1,
            backgroundColor: theme.colors.background,
            padding: theme.spacing.spacer10,
        },

        // 🔹 Search section
        searchContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: theme.spacing.spacer10,
        },
        input: {
            flex: 1,
            height: 45,
            borderRadius: 8,
            paddingHorizontal: theme.spacing.spacer10,
            backgroundColor: theme.colors.card,
            color: theme.colors.text,
            borderWidth: 1,
            borderColor: theme.colors.border,
            fontSize: 16,
        },
        searchBtn: {
            backgroundColor: theme.colors.primary,
            marginLeft: theme.spacing.spacer8,
            padding: theme.spacing.spacer8,
            borderRadius: 8,
            alignItems: 'center',
            justifyContent: 'center',
            width: 45,
            height: 45,
        },

        // 🔹 Error / Empty / Loader
        errorText: {
            color: theme.colors.error || 'red',
            textAlign: 'center',
            fontSize: 14,
            marginTop: theme.spacing.spacer8,
        },
        emptyText: {
            color: theme.colors.subtext,
            textAlign: 'center',
            fontSize: 16,
            marginTop: theme.spacing.spacer16,
        },
        loader: {
            marginVertical: theme.spacing.spacer16,
        },
        footerLoader: {
            marginVertical: theme.spacing.spacer12,
        },
    });
};

export default UseStyles;
