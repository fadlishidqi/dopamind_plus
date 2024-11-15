import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const SleepTimerScreen = () => {
  const [currentTime, setCurrentTime] = useState('');
  const [duration, setDuration] = useState(0);
  const navigation = useNavigation();

  useEffect(() => {
    const formatTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      return `${hours}:${minutes}`;
    };

    setCurrentTime(formatTime());

    const timeInterval = setInterval(() => {
      setCurrentTime(formatTime());
    }, 60000);

    return () => clearInterval(timeInterval);
  }, []);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setDuration((prevDuration) => prevDuration + 1);
    }, 1000);

    return () => clearInterval(timerInterval);
  }, []);

  const formatDuration = (durationInSeconds: number) => {
    const hours = Math.floor(durationInSeconds / 3600);
    const minutes = Math.floor((durationInSeconds % 3600) / 60);
    const seconds = durationInSeconds % 60;
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.backgroundFill} />

      <Image 
        source={require('../../../assets/images/bgsleeptimer.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      />

      <SafeAreaView style={styles.content}>
        <View style={styles.mainContent}>
          <View style={styles.alarmContainer}>
            <Text style={styles.alarmText}>Alarm at 10.00</Text>
          </View>

          <Text style={styles.greeting}>Good Night, Putri!</Text>
          <Text style={styles.timeDisplay}>{currentTime}</Text>

          <View style={styles.durationWrapper}>
            <Ionicons name="time-outline" size={16} color="white" />
            <Text style={styles.durationText}>Sleep Duration</Text>
            <Text style={styles.durationValue}>{formatDuration(duration)}</Text>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: -60,
    flex: 1,
  },
  backgroundFill: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#004D40',
  },
  backgroundImage: {
    position: 'absolute',
    bottom: 0,
    width: width,
    height: height,
    resizeMode: 'cover',
  }, 
  content: {
    flex: 1,
  },
  mainContent: {
    flex: 1,
    alignItems: 'center',
    paddingTop: height * 0.1,
  },
  alarmContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 24,
    marginBottom: 20,
  },
  alarmText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
  greeting: {
    color: 'white',
    fontSize: 24,
    fontFamily: 'Poppins-SemiBold',
  },
  timeDisplay: {
    color: 'white',
    fontSize: 84,
    fontFamily: 'Poppins-Bold',
    marginBottom: -6,
  },
  durationWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    gap: 8,
  },
  durationText: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
  },
  durationValue: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
});

export default SleepTimerScreen;
