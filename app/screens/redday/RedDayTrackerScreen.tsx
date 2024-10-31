import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, StatusBar, ActivityIndicator, Alert, Image, Dimensions, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomTextBold from '../../components/CustomTextBold';
import CustomTextReg from '../../components/CustomTextReg';
import { RootStackParamList, CycleData } from '../../types';
import { Ionicons } from '@expo/vector-icons';
import { Canvas, Path, Circle, Group, useFont } from '@shopify/react-native-skia';
import * as shape from 'd3-shape';

type RedDayTrackerNavigationProp = StackNavigationProp<
  RootStackParamList,
  'RedDayTracker'
>;

const { width } = Dimensions.get('window');

const RedDayGraph: React.FC = () => {
  const font = useFont(require('../../../assets/fonts/Poppins-Regular.ttf'), 10);

  const data = [
    { day: 'Sun', value: 30 },
    { day: 'Mon', value: 80 },
    { day: 'Tue', value: 20 },
    { day: 'Wed', value: 100 },
    { day: 'Thu', value: 40 },
    { day: 'Fri', value: 30 },
    { day: 'Sat', value: 25 },
  ];

  const width = Dimensions.get('window').width - 68;
  const height = 200;
  const padding = { top: 10, bottom: 50, left: 20, right: 20 };
  const graphWidth = width - padding.left - padding.right;
  const graphHeight = height - padding.top - padding.bottom;

  const xScale = (index: number) => padding.left + (index / (data.length - 1)) * graphWidth;
  const yScale = (value: number) => height - padding.bottom - (value / 100) * graphHeight;

  const lineGenerator = shape
    .line<{ day: string; value: number }>()
    .x((_, index) => xScale(index))
    .y(d => yScale(d.value))
    .curve(shape.curveCatmullRom.alpha(0.5));

  const linePath = lineGenerator(data) as string;

  if (!font) {
    return null;
  }

  return (
    <View style={styles.graphContainer}>
      <Canvas style={{ width, height: height - 20, marginBottom: -10 }}>
        <Group>
          {[0, 25, 50, 75, 100].map((value, index) => (
            <Path
              key={index}
              path={`M ${padding.left} ${yScale(value)} H ${width - padding.right}`}
              color="#F5F5F5"
              style="stroke"
              strokeWidth={1}
            />
          ))}

          <Path
            path={linePath}
            color="#FFB5BA"
            style="stroke"
            strokeWidth={3}
          />

          {data.map((item, index) => (
            <Group key={index}>
              <Circle
                cx={xScale(index)}
                cy={yScale(item.value)}
                r={8}
                color="white"
                style="fill"
              />
              <Circle
                cx={xScale(index)}
                cy={yScale(item.value)}
                r={6}
                color="#FFB5BA"
                style="fill"
              />
            </Group>
          ))}
        </Group>
      </Canvas>
      <View style={styles.labelsContainer}>
        {data.map((item, index) => (
          <Text key={index} style={styles.label}>
            {item.day}
          </Text>
        ))}
      </View>
    </View>
  );
};

const RedDayTrackerScreen: React.FC = () => {
  const navigation = useNavigation<RedDayTrackerNavigationProp>();
  const [isLoading, setIsLoading] = useState(true);
  const [cycleData, setCycleData] = useState<CycleData | null>(null);
  const [daysLeft, setDaysLeft] = useState(0);
  const [currentDate] = useState(new Date());
  const [weekDays, setWeekDays] = useState<string[]>([]);
  const [weekDates, setWeekDates] = useState<string[]>([]);

  useEffect(() => {
    checkSetupStatus();
    generateDynamicWeek();
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
    if (data.hasActivePeriod) {
      setDaysLeft(7);
    } else {
      setDaysLeft(0);
    }
  };

  const generateDynamicWeek = () => {
    const today = new Date();
    const weekdays: string[] = [];
    const dates: string[] = [];
    for (let i = -3; i <= 3; i++) {
      const day = new Date(today);
      day.setDate(today.getDate() + i);
      weekdays.push(day.toLocaleDateString('en-US', { weekday: 'short' }));
      dates.push(day.getDate().toString());
    }
    setWeekDays(weekdays);
    setWeekDates(dates);
  };

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

      <View style={styles.content}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <CustomTextBold style={styles.headerTitle}>Red Day Tracker</CustomTextBold>
          <View style={styles.headerRight} />
        </View>

        <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          <View style={styles.backgroundImageContainer}>
            <Image
              source={require('../../../assets/images/bgredday.png')}
              style={styles.backgroundImage}
            />
          </View>

          <View style={styles.contentContainer}>
            {/* Day Counter Section */}
            <View style={styles.counterContainer}>
              <CustomTextBold style={styles.counterTitle}>Day Counter</CustomTextBold>
              <CustomTextReg style={styles.counterSubtitle}>
                {cycleData?.hasActivePeriod ? "Menstruation's on going..." : "Next period in..."}
              </CustomTextReg>
              <View style={styles.circleCounter}>
                <View style={styles.circleInner}>
                  <CustomTextBold style={styles.dayNumber}>{daysLeft}</CustomTextBold>
                  <CustomTextReg style={styles.dayText}>Day Left</CustomTextReg>
                </View>
              </View>
            </View>

            {/* Calendar Section */}
            <View style={styles.calendarSection}>
              <CustomTextBold style={styles.monthYear}>
                {currentDate.toLocaleString('en-US', { month: 'long', year: 'numeric' })}
              </CustomTextBold>
              <View style={styles.datesContainer}>
                {weekDates.map((date, index) => (
                  <View key={index} style={styles.dateItem}>
                    <CustomTextBold
                      style={[
                        styles.dateNumber,
                        date === currentDate.getDate().toString() && styles.activeDateNumber
                      ]}
                    >
                      {date}
                    </CustomTextBold>
                    <CustomTextReg
                      style={[
                        styles.dayName,
                        date === currentDate.getDate().toString() && styles.activeDayName
                      ]}
                    >
                      {weekDays[index]}
                    </CustomTextReg>
                  </View>
                ))}
              </View>
            </View>

            {/* Symptoms Section */}
            <View style={styles.symptomsContainer}>
              <CustomTextBold style={styles.sectionTitle}>Daily symptoms</CustomTextBold>
              <View style={styles.symptomCard}>
                <View style={styles.symptomContent}>
                  <TouchableOpacity style={styles.addButton}>
                    <Ionicons name="add" size={24} color="#FFB5BA" />
                  </TouchableOpacity>
                  <CustomTextReg style={styles.symptomText}>
                    Come on, write regularly what you feel during your menstruation today
                  </CustomTextReg>
                </View>
                <Image
                  source={require('../../../assets/images/cewebaca.png')}
                  style={styles.girlImage}
                />
              </View>
            </View>

            {/* Graph Section */}
            <View style={styles.graphSection}>
              <View style={styles.graphHeader}>
                <CustomTextBold style={styles.sectionTitle}>Graph</CustomTextBold>
                <CustomTextReg style={styles.weekText}>Week 1</CustomTextReg>
              </View>
              <RedDayGraph />
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  backgroundImageContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  content: {
    flex: 1,
    zIndex: 1,
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
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 5,
    marginTop: -10,
  },
  headerTitle: {
    fontSize: 18,
    color: '#000',
  },
  headerRight: {
    width: 40,
  },
  backButton: {
    padding: 8,
  },
  scrollContainer: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
    minHeight: Dimensions.get('window').height,
  },
  counterContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  counterTitle: {
    fontSize: 24,
    color: '#000',
    marginBottom: 8,
  },
  counterSubtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 40,
  },
  circleCounter: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 8,
  },
  circleInner: {
    alignItems: 'center',
  },
  dayNumber: {
    fontSize: 48,
    color: '#FFB5BA',
  },
  dayText: {
    fontSize: 16,
    color: '#666',
  },
  calendarSection: {
    marginBottom: 30,
  },
  monthYear: {
    fontSize: 18,
    color: '#000',
    marginBottom: 16,
  },
  datesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  dateItem: {
    alignItems: 'center',
  },
  dateNumber: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  activeDateNumber: {
    color: '#FFB5BA',
    fontSize: 18,
  },
  dayName: {
    fontSize: 12,
    color: '#999',
  },
  activeDayName: {
    color: '#666',
  },
  symptomsContainer: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    color: '#000',
    marginBottom: 16,
  },
  symptomCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  symptomContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFB5BA',
  },
  symptomText: {
    flex: 1,
    color: '#666',
    fontSize: 14,
  },
  girlImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  graphSection: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  graphHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  weekText: {
    fontSize: 16,
    color: '#666',
  },
  graphContainer: {
    flex: 1,
  },
  labelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginTop: 10,
  },
  label: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
});

export default RedDayTrackerScreen;
