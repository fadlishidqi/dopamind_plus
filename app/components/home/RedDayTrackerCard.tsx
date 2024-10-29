// app/components/home/RedDayTrackerCard.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomTextBold from '../CustomTextBold';
import { RootStackParamList, CycleData } from '../../types';

type RedDayTrackerNavigationProp = StackNavigationProp<
  RootStackParamList,
  'RedDayTracker'
>;

interface RedDayTrackerCardProps {
  onPress?: () => void;
}

const RedDayTrackerCard: React.FC<RedDayTrackerCardProps> = () => {
  const navigation = useNavigation<RedDayTrackerNavigationProp>();
  const [daysCount, setDaysCount] = useState<number>(0);
  const [isFirstTime, setIsFirstTime] = useState<boolean>(true);

  useFocusEffect(
    React.useCallback(() => {
      checkPeriodData();
    }, [])
  );

  const calculateDaysUntilNextPeriod = (lastPeriod: Date, cycleLength: number): number => {
    const today = new Date();
    const nextPeriod = new Date(lastPeriod);
    nextPeriod.setDate(lastPeriod.getDate() + cycleLength);
    
    const timeDiff = nextPeriod.getTime() - today.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  };

  const checkPeriodData = async () => {
    try {
      const storedData = await AsyncStorage.getItem('@period_data');
      
      if (!storedData) {
        setIsFirstTime(true);
        return;
      }

      const data: CycleData = JSON.parse(storedData);
      
      if (!data || data.isFirstTimeSetup === undefined) {
        setIsFirstTime(true);
        return;
      }

      setIsFirstTime(data.isFirstTimeSetup);
      
      if (data.lastPeriod) {
        const lastPeriod = new Date(data.lastPeriod);
        const daysUntil = calculateDaysUntilNextPeriod(
          lastPeriod, 
          data.cycleLength || 7
        );
        setDaysCount(daysUntil);
      }
      
    } catch (error) {
      console.error('Error reading period data:', error);
      setIsFirstTime(true);
    }
  };

  const handlePress = async () => {
    try {
      const storedData = await AsyncStorage.getItem('@period_data');
      
      if (!storedData) {
        navigation.navigate('RedDaySetup');
        return;
      }

      const data: CycleData = JSON.parse(storedData);
      
      // Cek apakah setup sudah selesai
      if (data && data.isFirstTimeSetup === false) {
        navigation.navigate('RedDayTracker', {
          isFirstCycle: false,
          currentCycleData: data,
        });
      } else {
        navigation.navigate('RedDaySetup');
      }
    } catch (error) {
      console.error('Error checking period data:', error);
      navigation.navigate('RedDaySetup');
    }
  };

  const getDaysText = (): string => {
    if (daysCount === 0) {
      return "0";
    } else if (daysCount === 1) {
      return "1";
    } else {
      return `${daysCount}`;
    }
  };

  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={handlePress}
      activeOpacity={0.8}
    >
      <View style={styles.circleOutline}>
        <View style={styles.circleInner}>
          <Text style={styles.number}>{getDaysText()}</Text>
        </View>
      </View>
      
      <Image 
        source={require('../../../assets/images/reday-woman.png')} 
        style={styles.image}
      />
      
      <View style={styles.textContainer}>
        <CustomTextBold style={styles.redText}>Red</CustomTextBold>
        <CustomTextBold style={styles.textDay}>Day</CustomTextBold>
        <CustomTextBold style={styles.textTracker}>Tracker</CustomTextBold>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFB5BA',
    borderRadius: 20,
    padding: 15,
    height: 220,
    width: '48%',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  circleOutline: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#B5E8D5',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 10,
    left: 10,
  },
  circleInner: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  number: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFB5BA',
    textAlign: 'center',
  },
  image: {
    position: 'absolute',
    bottom: 2,
    right: -13,
    width: 210,
    height: 210,
    resizeMode: 'contain',
  },
  textContainer: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    alignItems: 'flex-end',
  },
  redText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#8D4A67',
    marginBottom: -8,
  },
  textDay: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: -8,
    textAlign: 'right',
  },
  textTracker: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'right',
  },
});

export default RedDayTrackerCard;