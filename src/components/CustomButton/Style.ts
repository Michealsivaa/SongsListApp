import { StyleSheet } from 'react-native';
import { useThemeContext } from '../../theme/ThemeContext';

const UseStyles = () => {
    const { theme } = useThemeContext();

    return StyleSheet.create({
        button: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: theme.colors.primary,
            borderRadius: 10,
            paddingVertical: theme.spacing.spacer10,
            paddingHorizontal: theme.spacing.spacer16,
            marginVertical: theme.spacing.spacer8,
            elevation: 2,
        },
        title: {
            color: '#FFFFFF',
            fontSize: theme.typography.medium,
            fontWeight: '600',
            marginLeft: theme.spacing.spacer6,
        },
        disabledButton: {
            opacity: 0.5,
            backgroundColor: theme.colors.border,
        },
    });
};

export default UseStyles;
