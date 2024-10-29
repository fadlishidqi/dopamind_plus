//app/components/CustomTextInput.tsx
import React from 'react';
import { TextInput, TextInputProps } from 'react-native';

interface CustomTextInputProps extends TextInputProps {}

const CustomTextInput: React.FC<CustomTextInputProps> = ({ style, ...props }) => {
  return <TextInput {...props} style={[{ fontFamily: 'Poppins-Regular' }, style]} />;
};

export default CustomTextInput;
