import React, { useState, useEffect } from 'react';
import { 
  View, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
  Alert
} from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomTextBold from '../../components/CustomTextBold';
import CustomTextReg from '../../components/CustomTextReg';
import { RootStackParamList, CycleData } from '../../types';
import { Ionicons } from '@expo/vector-icons';

type RedDayTrackerNavigationProp = StackNavigationProp<
  RootStackParamList, 
  'RedDayTracker'
>;

const RedDayTrackerScreen: React.FC = () => {
  const navigation = useNavigation<RedDayTrackerNavigationProp>();
  const [isLoading, setIsLoading] = useState(true);
  const [cycleData, setCycleData] = useState<CycleData | null>(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [daysLeft, setDaysLeft] = useState(0);

  useEffect(() => {
    checkSetupStatus();
  }, []);

  const checkSetupStatus = async () => {
    try {
      const storedData = await AsyncStorage.getItem('@period_data');
      
      if (storedData) {
        const data: CycleData = JSON.parse(storedData);
        if (data.isFirstTimeSetup !== false) {
          navigation.replace('RedDaySetup');
          return;
        }
        
        setCycleData(data);
        calculateDaysLeft(data);
      } else {
        navigation.replace('RedDaySetup');
      }
    } catch (error) {
      console.error('Error checking setup status:', error);
      Alert.alert(
        'Error',
        'Failed to load your period data. Please try again.'
      );
      navigation.replace('RedDaySetup');
    } finally {
      setIsLoading(false);
    }
  };

  const calculateDaysLeft = (data: CycleData) => {
    if (data.lastPeriod && data.periodLength) {
      const lastPeriod = new Date(data.lastPeriod);
      const today = new Date();
      const diffTime = Math.abs(today.getTime() - lastPeriod.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      const daysRemaining = data.periodLength - diffDays;
      setDaysLeft(Math.max(0, daysRemaining));
    }
  };

  const DayCounter = () => (
    <View style={styles.counterContainer}>
      <CustomTextBold style={styles.counterTitle}>Day Counter</CustomTextBold>
      <CustomTextReg style={styles.counterSubtitle}>
        {cycleData?.hasActivePeriod ? "Menstruation's on going..." : "Next period in..."}
      </CustomTextReg>
      <View style={styles.circleCounter}>
        <CustomTextBold style={styles.dayNumber}>{daysLeft}</CustomTextBold>
        <CustomTextReg style={styles.dayText}>
          {daysLeft === 1 ? 'Day Left' : 'Days Left'}
        </CustomTextReg>
      </View>
    </View>
  );

  const SymptomsSection = () => (
    <View style={styles.symptomsContainer}>
      <CustomTextBold style={styles.sectionTitle}>Daily symptoms</CustomTextBold>
      <TouchableOpacity style={styles.addSymptomButton}>
        <CustomTextReg style={styles.symptomText}>
          Come on, write regularly what you feel during your menstruation today
        </CustomTextReg>
      </TouchableOpacity>
    </View>
  );

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FFB5BA" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
      
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <CustomTextBold style={styles.headerTitle}>Period Tracker</CustomTextBold>
      </View>

      <ScrollView style={styles.scrollContainer}>
        <DayCounter />
        <SymptomsSection />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: StatusBar.currentHeight || 0,
    paddingHorizontal: 20,
    height: 60,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    marginLeft: 16,
    color: '#333',
  },
  scrollContainer: {
    flex: 1,
  },
  counterContainer: {
    alignItems: 'center',
    padding: 20,
  },
  counterTitle: {
    fontSize: 24,
    marginBottom: 8,
    color: '#333',
  },
  counterSubtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  circleCounter: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  dayNumber: {
    fontSize: 48,
    color: '#FFB5BA',
  },
  dayText: {
    fontSize: 16,
    color: '#666',
  },
  symptomsContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 15,
    color: '#333',
  },
  addSymptomButton: {
    backgroundColor: '#F5F5F5',
    padding: 15,
    borderRadius: 10,
  },
  symptomText: {
    color: '#666',
    textAlign: 'center',
  },
});

export default RedDayTrackerScreen;