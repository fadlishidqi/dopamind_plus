// app/screens/calendar/CalendarScreen.tsx
import React, { useState, useEffect } from 'react';
import { 
  View, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView,
  ActivityIndicator
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomTextBold from '../../components/CustomTextBold';
import CustomText from '../../components/CustomTextReg';
import BottomNavbar from '../../components/BottomNavbar';
import AddActivityModal from './AddActivityModal';
import { Activity, MarkedDates } from '../../types';
import { formatDate, getMarkedDates } from './utils';

const CalendarScreen = () => {
  const [selectedDate, setSelectedDate] = useState(formatDate(new Date()));
  const [activities, setActivities] = useState<Activity[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [markedDates, setMarkedDates] = useState<MarkedDates>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      await loadActivities(selectedDate);
      await updateMarkedDates();
      setIsLoading(false);
    } catch (error) {
      console.error('Error loading initial data:', error);
      setIsLoading(false);
    }
  };

  const loadActivities = async (date: string) => {
    try {
      const activitiesData = await AsyncStorage.getItem('activities');
      if (activitiesData) {
        const allActivities = JSON.parse(activitiesData);
        setActivities(allActivities[date] || []);
      }
    } catch (error) {
      console.error('Error loading activities:', error);
    }
  };

  const updateMarkedDates = async () => {
    try {
      const activitiesData = await AsyncStorage.getItem('activities');
      if (activitiesData) {
        const allActivities = JSON.parse(activitiesData);
        const marked = getMarkedDates(allActivities, selectedDate);
        setMarkedDates(marked);
      }
    } catch (error) {
      console.error('Error updating marked dates:', error);
    }
  };

  const handleDayPress = (day: any) => {
    setSelectedDate(day.dateString);
    loadActivities(day.dateString);
  };

  const saveActivity = async (activity: Activity) => {
    try {
      const activitiesData = await AsyncStorage.getItem('activities');
      let allActivities = activitiesData ? JSON.parse(activitiesData) : {};
      
      if (!allActivities[activity.date]) {
        allActivities[activity.date] = [];
      }
      
      allActivities[activity.date].push(activity);
      await AsyncStorage.setItem('activities', JSON.stringify(allActivities));
      
      loadActivities(selectedDate);
      updateMarkedDates();
      setShowAddModal(false);
    } catch (error) {
      console.error('Error saving activity:', error);
    }
  };

  const deleteActivity = async (activityId: string) => {
    try {
      const activitiesData = await AsyncStorage.getItem('activities');
      if (activitiesData) {
        let allActivities = JSON.parse(activitiesData);
        allActivities[selectedDate] = allActivities[selectedDate].filter(
          (activity: Activity) => activity.id !== activityId
        );
        await AsyncStorage.setItem('activities', JSON.stringify(allActivities));
        loadActivities(selectedDate);
        updateMarkedDates();
      }
    } catch (error) {
      console.error('Error deleting activity:', error);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FCC3D2" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <CustomTextBold style={styles.title}>Calendar</CustomTextBold>
      </View>

      <Calendar
        style={styles.calendar}
        theme={{
          todayTextColor: '#FCC3D2',
          selectedDayBackgroundColor: '#FCC3D2',
          arrowColor: '#FCC3D2',
          monthTextColor: '#333',
          textDayFontFamily: 'Poppins-Regular',
          textMonthFontFamily: 'Poppins-Bold',
          textDayHeaderFontFamily: 'Poppins-Medium',
          'stylesheet.calendar.header': {
            monthText: {
              fontSize: 18,
              fontFamily: 'Poppins-Bold',
              color: '#333',
            },
          }
        }}
        markedDates={markedDates}
        onDayPress={handleDayPress}
        enableSwipeMonths={true}
      />

      <View style={styles.activitiesContainer}>
        <View style={styles.dateHeaderContainer}>
          <CustomTextBold style={styles.dateText}>
            {new Date(selectedDate).toLocaleDateString('en-US', {
              weekday: 'long',
              month: 'long',
              day: 'numeric',
              year: 'numeric'
            })}
          </CustomTextBold>
          <TouchableOpacity 
            style={styles.addButton}
            onPress={() => setShowAddModal(true)}
          >
            <CustomText style={styles.addButtonText}>Add Activities</CustomText>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.activitiesList}>
          {activities.length === 0 ? (
            <View style={styles.emptyState}>
              <CustomText style={styles.emptyStateText}>
                No activities for this day
              </CustomText>
            </View>
          ) : (
            activities.map((activity) => (
              <View key={activity.id} style={styles.activityCard}>
                <View style={styles.activityTimeContainer}>
                  <CustomText style={styles.activityTime}>{activity.time}</CustomText>
                </View>
                <View style={styles.activityContent}>
                  <CustomTextBold style={styles.activityTitle}>
                    {activity.title}
                  </CustomTextBold>
                  {activity.description && (
                    <CustomText style={styles.activityDescription}>
                      {activity.description}
                    </CustomText>
                  )}
                </View>
                <TouchableOpacity 
                  style={styles.deleteButton}
                  onPress={() => deleteActivity(activity.id)}
                >
                  <CustomText style={styles.deleteText}>Delete</CustomText>
                </TouchableOpacity>
              </View>
            ))
          )}
        </ScrollView>
      </View>

      <AddActivityModal
        visible={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSave={saveActivity}
        selectedDate={selectedDate}
      />

      <BottomNavbar />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    header: {
      padding: 20,
      paddingTop: 60,
      backgroundColor: '#fff',
    },
    title: {
      fontSize: 28,
      color: '#333',
      marginBottom: 10,
    },
    calendar: {
      marginHorizontal: 12,
      marginBottom: 15,
      borderRadius: 20,
      padding: 10,
      backgroundColor: '#fff',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 5,
    },
    activitiesContainer: {
      flex: 1,
      backgroundColor: '#fff',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      padding: 20,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: -2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 5,
    },
    dateHeaderContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
      paddingHorizontal: 5,
    },
    dateText: {
      fontSize: 16,
      color: '#333',
      maxWidth: '60%',
    },
    addButton: {
      backgroundColor: '#A4D4CC',
      paddingHorizontal: 18,
      paddingVertical: 10,
      borderRadius: 25,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 2,
    },
    addButtonText: {
      color: '#fff',
      fontSize: 14,
      fontWeight: '600',
    },
    activitiesList: {
      flex: 1,
      paddingHorizontal: 5,
    },
    emptyState: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 40,
    },
    emptyStateText: {
      color: '#999',
      fontSize: 16,
      textAlign: 'center',
    },
    activityCard: {
      flexDirection: 'row',
      backgroundColor: '#fff',
      borderRadius: 16,
      padding: 16,
      marginBottom: 12,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.08,
      shadowRadius: 8,
      elevation: 3,
      borderWidth: 1,
      borderColor: '#f5f5f5',
    },
    activityTimeContainer: {
      minWidth: 65,
      height: 65,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f8f9fa',
      borderRadius: 12,
      marginRight: 15,
      padding: 8,
    },
    activityTime: {
      fontSize: 14,
      color: '#555',
      fontWeight: '500',
    },
    activityContent: {
      flex: 1,
      justifyContent: 'center',
    },
    activityTitle: {
      fontSize: 16,
      color: '#333',
      marginBottom: 6,
      fontWeight: '600',
    },
    activityDescription: {
      fontSize: 14,
      color: '#666',
      lineHeight: 20,
    },
    deleteButton: {
      alignSelf: 'flex-start',
      paddingHorizontal: 12,
      paddingVertical: 6,
      marginLeft: 10,
    },
    deleteText: {
      color: '#FF6B6B',
      fontSize: 12,
      fontWeight: '500',
    }
  });

export default CalendarScreen;