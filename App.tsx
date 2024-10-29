// App.tsx
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreenComponent from './app/SplashScreen'; 
import LoginScreen from './app/auth/LoginScreen';
import RegisterScreen from './app/auth/RegisterScreen';
import HomeScreen from './app/screens/HomeScreen';
import DetailEducare from './app/screens/educare/DetailEducare';
import ArticlesDetail from './app/screens/educare/ArticlesDetail';
import { RootStackParamList } from './app/types';
import CounselingDetail from './app/screens/educare/CounselingDetail';
import PaymentScreen from './app/screens/payment/PaymentScreen';
import ConfirmationScreen from './app/screens/payment/ConfirmationScreen';
import { NotificationProvider } from './app/context/NotificationContext';
import SosScreen from './app/screens/emergency/SosScreen';
import DetailSos from './app/screens/emergency/DetailSos';
import RedDaySetupScreen from './app/screens/redday/RedDaySetupScreen';
import RedDayTrackerScreen from './app/screens/redday/RedDayTrackerScreen';

const Stack = createStackNavigator<RootStackParamList>();

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const loadFonts = async () => {
    await Font.loadAsync({
      'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
      'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
      'Poppins-Medium': require('./assets/fonts/Poppins-Medium.ttf'),
    });
    setFontsLoaded(true);
  };

  const resetPeriodData = async () => {
    try {
      await AsyncStorage.removeItem('@period_data');
      console.log('Period data reset successfully');
    } catch (error) {
      console.error('Error resetting period data:', error);
    }
  };

  useEffect(() => {
    const prepareApp = async () => {
      try {
        await loadFonts();
        await resetPeriodData(); 
      } catch (e) {
        console.warn(e);
      } finally {
        await SplashScreen.hideAsync();
      }
    };

    prepareApp();
  }, []);

  if (!fontsLoaded) {
    return null; 
  }

  return (
    <NotificationProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SplashScreen">
          <Stack.Screen
            name="SplashScreen"
            component={SplashScreenComponent}
            options={{ headerShown: false }} 
          />
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="RegisterScreen"
            component={RegisterScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="DetailEducare"
            component={DetailEducare}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ArticlesDetail"
            component={ArticlesDetail}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CounselingDetail"
            component={CounselingDetail}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="PaymentScreen"
            component={PaymentScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ConfirmationScreen"
            component={ConfirmationScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SosScreen"
            component={SosScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="DetailSos"
            component={DetailSos}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="RedDaySetup"
            component={RedDaySetupScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="RedDayTracker"
            component={RedDayTrackerScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </NotificationProvider>
  );
}