import React, { useState } from 'react';
import {
  View, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import CustomTextBold from '../../components/CustomTextBold';
import CustomTextReg from '../../components/CustomTextReg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CycleData, RootStackParamList } from '../../types';
import { Ionicons } from '@expo/vector-icons';

type RedDaySetupScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'RedDaySetup'
>;

const RedDaySetupScreen: React.FC = () => {
  const navigation = useNavigation<RedDaySetupScreenNavigationProp>();
  const [isLoading, setIsLoading] = useState(false);

  const handlePeriodStatus = async (hasActivePeriod: boolean) => {
    setIsLoading(true);
    try {
      const currentDate = new Date();
      const cycleData: CycleData = {
        hasActivePeriod,
        startDate: hasActivePeriod ? currentDate.toISOString() : null,
        lastPeriod: hasActivePeriod ? currentDate.toISOString() : null,
        cycleLength: 28,
        periodLength: 5,
        isFirstTimeSetup: false,
        symptoms: [],
        notes: '',
      };

      await AsyncStorage.setItem('@period_data', JSON.stringify(cycleData));

      navigation.replace('RedDayTracker', {
        isFirstCycle: true,
        currentCycleData: cycleData,
      });
    } catch (error) {
      console.error('Error saving period data:', error);
      Alert.alert(
        'Error',
        'Failed to save your period data. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

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
      </View>

      <View style={styles.content}>
        <Image 
          source={require('../../../assets/images/logo.png')}
          style={styles.illustration}
        />

        <CustomTextBold style={styles.title}>
          Are you currently on your period?
        </CustomTextBold>
        
        <CustomTextReg style={styles.description}>
          This will help us track your cycle more accurately
        </CustomTextReg>

        <View style={styles.buttonContainer}>
          {isLoading ? (
            <ActivityIndicator size="large" color="#FFB5BA" />
          ) : (
            <>
              <TouchableOpacity 
                style={[styles.button, styles.yesButton]}
                onPress={() => handlePeriodStatus(true)}
              >
                <CustomTextBold style={[styles.buttonText, styles.yesButtonText]}>
                  Yes, I am
                </CustomTextBold>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.button, styles.noButton]}
                onPress={() => handlePeriodStatus(false)}
              >
                <CustomTextBold style={[styles.buttonText, styles.noButtonText]}>
                  No, I'm not
                </CustomTextBold>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingTop: StatusBar.currentHeight || 0,
    paddingHorizontal: 20,
    height: 60,
    justifyContent: 'center',
  },
  backButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  illustration: {
    width: 250,
    height: 250,
    marginBottom: 40,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 16,
    color: '#333',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginBottom: 40,
  },
  buttonContainer: {
    width: '100%',
    gap: 16,
  },
  button: {
    width: '100%',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  yesButton: {
    backgroundColor: '#FFB5BA',
  },
  noButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#FFB5BA',
  },
  buttonText: {
    fontSize: 16,
  },
  yesButtonText: {
    color: '#FFFFFF',
  },
  noButtonText: {
    color: '#FFB5BA',
  },
});

export default RedDaySetupScreen;