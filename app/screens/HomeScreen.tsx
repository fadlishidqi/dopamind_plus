import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import RedDayTrackerCard from '../components/home/RedDayTrackerCard';
import EduCareCard from '../components/home/EduCareCard';
import VirtualCommunityCard from '../components/home/VirtualCommunityCard';
import OtherFeaturesSection from '../components/home/OtherFeatures';
import MoodStats from '../components/home/MoodStats';
import BottomNavbar from '../components/BottomNavbar';
import CustomTextReg from '../components/CustomTextReg';
import CustomTextBold from '../components/CustomTextBold';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { useNotification } from '../context/NotificationContext';
import NotificationComponent from '../components/NotificationReminder';
import NowPlayingBar from '../../app/components/home/NowPlayingBar';
import AlertSos from '../context/AlertSos';
import { RootStackParamList } from '../types';

type HomeScreenRouteProp = RouteProp<RootStackParamList, 'HomeScreen'>;

const HomeScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<HomeScreenRouteProp>();
  const { notification, setNotification } = useNotification();
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    return () => setNotification(null);
  }, []);

  useEffect(() => {
    if (route.params?.fromSOS) {
      setShowAlert(true);
    }
  }, [route.params]);

  return (
    <View style={styles.container}>
      <AlertSos 
        visible={showAlert}
        onClose={() => setShowAlert(false)}
      />

      <View style={styles.header}>
        <View>
          <CustomTextBold style={styles.greeting}>Hi, Joy</CustomTextBold>
          <CustomTextReg style={styles.subGreeting}>Good Morning!</CustomTextReg>
        </View>
        <Image
          source={require('../../assets/images/logo.png')}
          style={styles.profilePic}
        />
      </View>
      
      <ScrollView style={styles.scrollView}>
        {notification && (
          <NotificationComponent 
            title={notification.title} 
            message={notification.message} 
          />
        )}

        <CustomTextBold style={styles.sectionTitle}>Explore</CustomTextBold>

        <View style={styles.exploreContainer}>
          <RedDayTrackerCard onPress={() => console.log('Red Day Tracker pressed')} />
          <View style={styles.rightColumn}>
            <EduCareCard onPress={() => navigation.navigate('DetailEducare' as never)} />
            <VirtualCommunityCard onPress={() => console.log('Virtual Community pressed')} />
          </View>
        </View>

        <OtherFeaturesSection />

        <MoodStats />

        <NowPlayingBar 
          songTitle="GUTS"
          artistName="Olivia Rodrigo"
          albumArt={require('../../assets/images/coversong.png')}
        />
      </ScrollView>
      <BottomNavbar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 30,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
    marginBottom: 80, 
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subGreeting: {
    fontSize: 16,
    color: '#666',
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  exploreContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rightColumn: {
    width: '48%',
  },
});

export default HomeScreen;