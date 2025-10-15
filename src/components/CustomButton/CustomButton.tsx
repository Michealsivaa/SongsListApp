import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import UseStyles from './Style';
interface Props {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ReactNode;
}

const CustomButton: React.FC<Props> = ({
  title,
  onPress,
  loading = false,
  disabled = false,
  style,
  textStyle,
  icon,
}) => {
  const styles = UseStyles();

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={disabled || loading}
      style={[styles.button, disabled && styles.disabledButton, style]}>
      {loading ? (
        <ActivityIndicator color="#FFF" />
      ) : (
        <>
          {icon && icon}
          <Text style={[styles.title, textStyle]}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;
