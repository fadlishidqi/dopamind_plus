//app/components/CustomText.tsx
import React from 'react';
import { Text, TextProps } from 'react-native';

interface CustomTextProps extends TextProps {
  children: React.ReactNode;
}

const CustomTextReg: React.FC<CustomTextProps> = ({ children, style, ...props }) => {
  return (
    <Text {...props} style={[{ fontFamily: 'Poppins-Medium' }, style]}>
      {children}
    </Text>
  );
};

export default CustomTextReg;
