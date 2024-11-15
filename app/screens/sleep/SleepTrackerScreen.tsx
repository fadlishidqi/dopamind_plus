  import React from 'react';
  import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Image } from 'react-native';
  import { SafeAreaView } from 'react-native-safe-area-context';
  import { Ionicons } from '@expo/vector-icons';
  import { useNavigation } from '@react-navigation/native';
  import { StackNavigationProp } from '@react-navigation/stack';
  import { RootStackParamList } from '../../types';

  type NavigationProp = StackNavigationProp<RootStackParamList>;

  const SleepTrackerScreen = () => {
    const navigation = useNavigation<NavigationProp>();

    return (
      <ImageBackground
        source={require('../../../assets/images/bgsleep.png')}
        style={styles.backgroundImage}
      >
        <SafeAreaView style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity 
              onPress={() => navigation.goBack()}
              style={styles.backButton}
            >
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Sleep Tracker</Text>
          </View>

          {/* Level Section */}
          <View style={styles.levelSection}>
            <View style={styles.levelContainer}>
              <Text style={styles.levelText}>Level 4</Text>
              <Text style={styles.statusText}>You are insomniac</Text>
              
              <View style={styles.progressDots}>
                {[1, 2, 3, 4, 5].map((dot) => (
                  <View
                    key={dot}
                    style={[
                      styles.dot,
                      { backgroundColor: dot <= 4 ? '#E0E0E0' : 'transparent',
                        borderColor: '#E0E0E0' }
                    ]}
                  />
                ))}
              </View>
            </View>

            {/* Play Button */}
            <View style={styles.playButtonContainer}>
              <TouchableOpacity style={styles.playButton}
              onPress={() => navigation.navigate('SleepTimer')}>
                <Ionicons name="play" size={32} color="#004D40" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Sleep Stats Section */}
          <View style={styles.statsContainer}>
            <View style={styles.titleContainer}>
              <Text style={styles.statsTitle}>Sleep Stats</Text>
              <TouchableOpacity>
                <Ionicons name="ellipsis-vertical" size={24} color="#000" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.statsGrid}>
              {/* Sleep Duration Card */}
              <View style={styles.statCard}>
                <View style={styles.statContent}>
                  <Text style={styles.statValue}>2h 30m</Text>
                  <Text style={styles.statLabel}>Sleep Duration</Text>
                </View>
                <Image 
                  source={require('../../../assets/images/nungging.png')}
                  style={styles.statImage}
                  resizeMode="contain"
                />
              </View>

              {/* Sleep Quality Card */}
              <View style={styles.statCard}>
                <View style={styles.statContent}>
                  <Text style={styles.statValue}>80.4%</Text>
                  <Text style={styles.statLabel}>Sleep Quality</Text>
                </View>
                <Image 
                  source={require('../../../assets/images/turu.png')}
                  style={styles.statImage}
                  resizeMode="contain"
                />
              </View>
            </View>

            {/* Awake Period Card */}
            <View style={styles.awakeCard}>
              <View style={styles.awakeContent}>
                <View style={styles.awakeTextWrapper}>
                  <Text style={styles.awakeTitle}>
                    <Text style={styles.awakeBold}>Awake</Text> Periode
                  </Text>
                  <Text style={styles.awakeTime}>1h 30m</Text>
                  <TouchableOpacity style={styles.activityButton}>
                    <Text style={styles.activityButtonText}>See All Activity</Text>
                  </TouchableOpacity>
                </View>
                <Image 
                  source={require('../../../assets/images/nguap.png')}
                  style={styles.awakeImage}
                  resizeMode="contain"
                />
              </View>
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>
    );
  };

  const styles = StyleSheet.create({
    backgroundImage: {
      flex: 1,
    },
    container: {
      flex: 1,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
    },
    backButton: {
      padding: 8,
    },
    headerTitle: {
      color: 'white',
      fontSize: 18,
      marginLeft: 12,
      fontFamily: 'Poppins-Bold',
    },
    levelSection: {
      height: '45%',
      justifyContent: 'space-between',
      paddingBottom: 30,
    },
    levelContainer: {
      alignItems: 'center',
      marginTop: 40,
    },
    levelText: {
      color: 'white',
      fontSize: 42,
      fontFamily: 'Poppins-Bold',
    },
    statusText: {
      color: 'white',
      fontSize: 20,
      marginTop: 8,
      fontFamily: 'Poppins-Regular',
    },
    progressDots: {
      flexDirection: 'row',
      marginTop: 24,
    },
    dot: {
      width: 32,
      height: 6,
      borderRadius: 3,
      marginHorizontal: 4,
      borderWidth: 1,
    },
    playButtonContainer: {
      alignItems: 'center',
    },
    playButton: {
      backgroundColor: '#FFB800',
      width: 50,
      height: 50,
      borderRadius: 25,
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 5,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    },
    statsContainer: {
      flex: 1,
      backgroundColor: '#fff',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      padding: 20,
      marginTop: -20,
    },
    titleContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
    },
    statsTitle: {
      fontSize: 24,
      fontFamily: 'Poppins-Bold',
    },
    statsGrid: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 16,
    },
    statCard: {
      backgroundColor: '#E0F2F1',
      paddingHorizontal: 16,
      borderRadius: 20,
      width: '48%',
      height: 140,
    },
    statContent: {
      flex: 1,
    },
    statValue: {
      fontSize: 24,
      marginTop: 12,
      fontFamily: 'Poppins-Bold',
      color: '#004D40',
    },
    statLabel: {
      fontSize: 14,
      color: '#004D40',
      opacity: 0.7,
      fontFamily: 'Poppins-Regular',
    },
    statImage: {
      width: '100%',
      height: 70,
    },
    awakeCard: {
      backgroundColor: '#E8F3F1',
      borderRadius: 24,
      height: 140,
      padding: 20,
      overflow: 'hidden',
    },
    awakeContent: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      height: '100%',
    },
    awakeTextWrapper: {
      flex: 1,
    },
    awakeTitle: {
      fontSize: 20,
      color: '#004D40',
      fontFamily: 'Poppins-Regular',
    },
    awakeBold: {
      fontFamily: 'Poppins-Bold',
      color: '#004D40',
    },
    awakeTime: {
      fontSize: 24,
      color: '#004D40',
      fontFamily: 'Poppins-Bold',
      marginTop: 5,
    },
    awakeImage: {
      width: 120,
      height: 120,
      marginRight: -10,
      marginTop: 2,
    },
    activityButton: {
      backgroundColor: '#00897B',
      paddingVertical: 8,
      paddingHorizontal: 12,
      borderRadius: 16,
      marginTop: 6,
      alignSelf: 'flex-start',
    },
    activityButtonText: {
      color: 'white',
      fontSize: 16,
      fontFamily: 'Poppins-Medium',
    },
  });

  export default SleepTrackerScreen;