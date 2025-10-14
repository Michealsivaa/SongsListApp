import { StyleSheet } from 'react-native';
import { useThemeContext } from '../../theme/ThemeContext';

const UseStyles = () => {
    const { theme } = useThemeContext();
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.colors.background,
            padding: theme.spacing.spacer10,
        },
        loader: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
    });
};

export default UseStyles;
