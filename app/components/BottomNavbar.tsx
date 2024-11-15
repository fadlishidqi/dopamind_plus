// app/components/BottomNavbar.tsx
import React, { useRef } from 'react';
import { View, TouchableOpacity, StyleSheet, Animated, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import CustomTextBold from './CustomTextBold';

const BottomNavbar = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const scaleValues = {
    Calendar: useRef(new Animated.Value(1)).current,
    SosScreen: useRef(new Animated.Value(1)).current,
    HomeScreen: useRef(new Animated.Value(1)).current,
  };

  const animatePress = (routeName: keyof typeof scaleValues) => {
    Animated.sequence([
      Animated.timing(scaleValues[routeName], { toValue: 0.9, duration: 100, useNativeDriver: true }),
      Animated.timing(scaleValues[routeName], { toValue: 1, duration: 100, useNativeDriver: true })
    ]).start();
  };

  const renderIcon = (imagePath: any, routeName: keyof typeof scaleValues, label: string) => {
    const isFocused = route.name === routeName;
    return (
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => {
          animatePress(routeName);
          navigation.navigate(routeName as never);
        }}
      >
        <Animated.View style={{ transform: [{ scale: scaleValues[routeName] }], alignItems: 'center' }}>
          <Image 
            source={imagePath} 
            style={[styles.iconImage, isFocused && styles.focusedIcon]} 
          />
          <CustomTextBold style={[styles.iconLabel, isFocused && styles.focusedLabel]}>{label}</CustomTextBold>
        </Animated.View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {renderIcon(require('../../assets/images/calendar.png'), 'Calendar', 'Calendar')}
      <View style={styles.centerIconWrapper}>
        <TouchableOpacity
          style={[styles.iconContainer, styles.centerIcon]}
          onPress={() => {
            animatePress('SosScreen');
            navigation.navigate('SosScreen' as never);
          }}
        >
          <Animated.View style={{ transform: [{ scale: scaleValues.SosScreen }] }}>
            <Ionicons name="notifications" size={32} color="#FFF" />
          </Animated.View>
        </TouchableOpacity>
      </View>
      {renderIcon(require('../../assets/images/home.png'), 'HomeScreen', 'Home')}
    </View>
  );
};

// Gunakan style yang sudah ada sebelumnya
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: -1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 5,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingVertical: 6,
    paddingHorizontal: 30,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  iconContainer: {
    padding: 10,
  },
  centerIconWrapper: {
    position: 'absolute',
    top: -20,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  centerIcon: {
    backgroundColor: '#FCC3D2',
    borderRadius: 40,
    padding: 18,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  iconLabel: {
    fontSize: 12,
    marginTop: 4,
    color: '#A4D4CC',
  },
  focusedLabel: {
    color: '#FCC3D2',
  },
  iconImage: {
    width: 28,
    height: 28,
    tintColor: '#A4D4CC',
  },
  focusedIcon: {
    tintColor: '#FCC3D2',
  },
});

export default BottomNavbar;