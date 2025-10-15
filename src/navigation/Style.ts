import { StyleSheet } from 'react-native';
import { useThemeContext } from '../theme/ThemeContext';

const useNavigationStyles = () => {
    const { isDark, theme } = useThemeContext();

    return StyleSheet.create({
        headerContainer: {
            backgroundColor: isDark ? theme.colors.card : theme.colors.primary,
            shadowColor: 'transparent',
        },
        headerTitleContainer: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        logo: {
            width: 30,
            height: 30,
            marginRight: 8,
            resizeMode: 'contain',
        },
        titleText: {
            fontSize: 20,
            fontWeight: '700',
        },
        toggleButton: {
            paddingHorizontal: 10,
        },
    });
};

export default useNavigationStyles;
