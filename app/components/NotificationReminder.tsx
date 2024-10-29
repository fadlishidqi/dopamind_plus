// app/components/NotificationReminder.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import CustomTextReg from './CustomTextReg';
import CustomTextBold from './CustomTextBold';

interface NotificationProps {
  title: string;
  message: string;
}

const NotificationComponent: React.FC<NotificationProps> = ({ title, message }) => {
  return (
    <View style={styles.container}>
      <CustomTextBold style={styles.title}>{title}</CustomTextBold>
      <CustomTextReg style={styles.message}>{message}</CustomTextReg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#D3E2FF',
    padding: 12,
    borderRadius: 20,
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    marginBottom: 2,
    marginRight: 10,
  },
  message: {
    fontSize: 13,
  },
});

export default NotificationComponent;