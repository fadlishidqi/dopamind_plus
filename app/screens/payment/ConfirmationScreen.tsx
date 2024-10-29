import React, { useEffect, useRef } from 'react';
import { View, TouchableOpacity, StyleSheet, Animated, Easing } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CustomTextBold from '../../components/CustomTextBold';
import CustomTextReg from '../../components/CustomTextReg';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { useNotification } from '../../context/NotificationContext';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types';

type ConfirmationScreenRouteProp = RouteProp<RootStackParamList, 'ConfirmationScreen'>;
type ConfirmationScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ConfirmationScreen'>;

const ConfirmationScreen: React.FC = () => {
  const navigation = useNavigation<ConfirmationScreenNavigationProp>();
  const route = useRoute<ConfirmationScreenRouteProp>();
  const { setNotification } = useNotification();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const { doctor, date, clock } = route.params;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1.3,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.5,
          duration: 1000,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.ease,
          useNativeDriver: true,
        })
      ])
    ).start();
  }, []);

  const handleBackToHome = () => {
    setNotification({
      title: 'Reminder',
      message: `Jadwal Konsul dokter dengan ${doctor}, ${date} / ${clock}, di RS Banyumanik 2, Semarang`
    });
    navigation.navigate('HomeScreen');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <CustomTextBold style={styles.headerTitle}>Payment</CustomTextBold>
      </View>
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        <Animated.View style={[styles.iconContainer, { transform: [{ scale: scaleAnim }] }]}>
          <Ionicons name="checkmark-circle" size={80} color="#55A498" />
        </Animated.View>
        <CustomTextBold style={styles.title}>Booking Confirmed</CustomTextBold>
        <CustomTextReg style={styles.subtitle}>Thank you for your order</CustomTextReg>
      </Animated.View>
      <TouchableOpacity 
        style={styles.button}
        onPress={handleBackToHome}>
        <CustomTextBold style={styles.buttonText}>Back To Home</CustomTextBold>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    marginTop: 26,
    padding: 16,
  },
  headerTitle: {
    fontSize: 20,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  button: {
    backgroundColor: '#55A498',
    padding: 16,
    borderRadius: 40,
    margin: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ConfirmationScreen;