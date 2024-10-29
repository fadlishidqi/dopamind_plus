import React, { useEffect, useState, useRef, useCallback } from 'react';
import {
    View, 
    StyleSheet, 
    Image, 
    SafeAreaView, 
    Dimensions, 
    Animated, 
    PanResponder,
    ActivityIndicator
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomTextBold from '../../components/CustomTextBold';
import CustomTextReg from '../../components/CustomTextReg';
import Svg, { Path } from 'react-native-svg';
import { RootStackParamList } from '../../types';
import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'DetailSos'>;

const { width } = Dimensions.get('window');

const DetailSos = () => {
   const navigation = useNavigation<NavigationProp>();
   const [countdown, setCountdown] = useState(10);
   const [mapLoading, setMapLoading] = useState(true);
   const slideAnim = useRef(new Animated.Value(0)).current;
   const maxSlide = width - 100;
   
   const arrowOpacity = slideAnim.interpolate({
       inputRange: [0, maxSlide - 100, maxSlide],
       outputRange: [1, 0, 0]
   });

   const progressWidth = slideAnim.interpolate({
       inputRange: [0, maxSlide],
       outputRange: ['0%', '100%']
   });

   useEffect(() => {
     const timer = setInterval(() => {
       setCountdown((prev) => {
         const newValue = prev - 1;
         if (newValue === 0) {
           clearInterval(timer);
           setTimeout(() => {
             navigation.navigate('HomeScreen', { fromSOS: true });
           }, 100);
         }
         return newValue;
       });
     }, 1000);

     return () => clearInterval(timer);
   }, [navigation]);

   const panResponder = useRef(
       PanResponder.create({
           onStartShouldSetPanResponder: () => true,
           onMoveShouldSetPanResponder: () => true,
           onPanResponderMove: (_, gesture) => {
               if (gesture.dx >= 0 && gesture.dx <= maxSlide) {
                   slideAnim.setValue(gesture.dx);
               }
           },
           onPanResponderRelease: (_, gesture) => {
               if (gesture.dx >= maxSlide * 0.7) {
                   Animated.spring(slideAnim, {
                       toValue: maxSlide,
                       useNativeDriver: false,
                       tension: 40,
                       friction: 7
                   }).start(() => navigation.goBack());
               } else {
                   Animated.spring(slideAnim, {
                       toValue: 0,
                       useNativeDriver: false,
                       tension: 40,
                       friction: 7
                   }).start();
               }
           },
       })
   ).current;

    return (
        <SafeAreaView style={styles.container}>
            {mapLoading && (
                <View style={styles.mapLoadingContainer}>
                    <ActivityIndicator size="large" color="#FF6B6B" />
                </View>
            )}
            <Image
                source={require('../../../assets/images/map.png')}
                style={[
                    styles.mapImage,
                    mapLoading && styles.hiddenImage
                ]}
                resizeMode="cover"
                onLoadStart={() => setMapLoading(true)}
                onLoadEnd={() => {
                    console.log('Map loaded');
                    setMapLoading(false);
                }}
                onError={(error) => {
                    console.log('Map loading error:', error);
                    setMapLoading(false);
                }}
            />
            <View style={styles.content}>
                <View style={styles.routeCard}>
                    <View style={styles.routeInfo}>
                        <Svg width="20" height="20" viewBox="0 0 24 24" fill="#FF6B6B">
                            <Path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                        </Svg>
                        <View style={styles.routeTextContainer}>
                            <CustomTextReg style={styles.routeLabel}>From</CustomTextReg>
                            <CustomTextBold style={styles.routeText}>RSND Universitas Diponegoro</CustomTextBold>
                        </View>
                    </View>
                    <View style={styles.routeInfo}>
                        <Svg width="20" height="20" viewBox="0 0 24 24" fill="#4A4A4A">
                            <Path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                        </Svg>
                        <View style={styles.routeTextContainer}>
                            <CustomTextReg style={styles.routeLabel}>To</CustomTextReg>
                            <CustomTextBold style={styles.routeText}>Althon Apartment, Tembalang, Semarang</CustomTextBold>
                        </View>
                    </View>
                    <View style={styles.timeInfo}>
                        <Svg width="16" height="16" viewBox="0 0 24 24" fill="#FF6B6B">
                            <Path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm4.2 14.2L11 13V7h1.5v5.2l4.5 2.7-.8 1.3z" />
                        </Svg>
                        <CustomTextBold style={styles.timeText}>15 min</CustomTextBold>
                    </View>
                </View>

                <View style={styles.bottomContent}>
                    <CustomTextReg style={styles.confirmingText}>
                        Confirming in {countdown}..
                    </CustomTextReg>
                    <View style={styles.userInfoContainer}>
                        <View style={styles.infoRow}>
                            <View style={styles.infoCard}>
                                <CustomTextReg style={styles.infoLabel}>Age</CustomTextReg>
                                <View style={styles.infoValue}>
                                    <CustomTextBold style={styles.infoText}>19 Tahun</CustomTextBold>
                                    <Image source={require('../../../assets/images/age.png')} style={styles.infoIcon} />
                                </View>
                            </View>
                            <View style={styles.infoCard}>
                                <CustomTextReg style={styles.infoLabel}>Blood Type</CustomTextReg>
                                <View style={styles.infoValue}>
                                    <CustomTextBold style={styles.infoText}>B</CustomTextBold>
                                    <Image source={require('../../../assets/images/blood.png')} style={styles.infoIcon} />
                                </View>
                            </View>
                        </View>
                        <View style={styles.infoRow}>
                            <View style={styles.infoCard}>
                                <CustomTextReg style={styles.infoLabel}>Height</CustomTextReg>
                                <View style={styles.infoValue}>
                                    <CustomTextBold style={styles.infoText}>173 cm</CustomTextBold>
                                    <Image source={require('../../../assets/images/height.png')} style={styles.infoIcon} />
                                </View>
                            </View>
                            <View style={styles.infoCard}>
                                <CustomTextReg style={styles.infoLabel}>Alergic</CustomTextReg>
                                <View style={styles.infoValue}>
                                    <CustomTextBold style={styles.infoText}>2</CustomTextBold>
                                    <Image source={require('../../../assets/images/alergic.png')} style={styles.infoIcon} />
                                </View>
                            </View>
                            <View style={styles.infoCard}>
                                <CustomTextReg style={styles.infoLabel}>Weight</CustomTextReg>
                                <View style={styles.infoValue}>
                                    <CustomTextBold style={styles.infoText}>54 kg</CustomTextBold>
                                    <Image source={require('../../../assets/images/weight.png')} style={styles.infoIcon} />
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={styles.cancelButtonContainer}>
                        <View style={styles.cancelButton}>
                            <Animated.View 
                                style={[
                                    styles.progressBar,
                                    {
                                        width: progressWidth
                                    }
                                ]}
                            />
                            
                            <CustomTextBold style={styles.cancelButtonText}>
                                Slide to Cancel
                            </CustomTextBold>

                            <Animated.View 
                                style={[
                                    styles.cancelButtonArrows,
                                    {
                                        opacity: arrowOpacity
                                    }
                                ]}
                            >
                                <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <Path 
                                        d="M13 17l5-5-5-5M6 17l5-5-5-5" 
                                        stroke="white" 
                                        strokeWidth="2" 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round"
                                    />
                                </Svg>
                            </Animated.View>
                        </View>

                        <Animated.View 
                            style={[
                                styles.slideButton,
                                {
                                    transform: [{ translateX: slideAnim }]
                                }
                            ]}
                            {...panResponder.panHandlers}
                        >
                            <View style={styles.slideButtonInner}>
                                <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <Path 
                                        d="M9 18l6-6-6-6" 
                                        stroke="white" 
                                        strokeWidth="2" 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round"
                                    />
                                </Svg>
                            </View>
                        </Animated.View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    mapLoadingContainer: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    hiddenImage: {
        opacity: 0,
    },
    mapImage: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    content: {
        flex: 1,
        justifyContent: 'space-between',
        padding: 16,
    },
    routeCard: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginTop: -20,
    },
    routeInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    routeTextContainer: {
        marginLeft: 10,
    },
    routeLabel: {
        fontSize: 12,
        color: '#888',
    },
    routeText: {
        fontSize: 14,
    },
    timeInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginTop: 5,
    },
    timeText: {
        fontSize: 14,
        color: '#FF6B6B',
        marginLeft: 5,
    },
    bottomContent: {
        marginTop: 'auto',
    },
    confirmingText: {
        textAlign: 'center',
        fontSize: 16,
        marginBottom: 10,
        color: '#666',
    },
    userInfoContainer: {
        marginBottom: 10,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    infoCard: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 15,
        marginHorizontal: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    infoLabel: {
      fontSize: 12,
      color: '#888',
      marginBottom: 5,
  },
  infoValue: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: -5,
  },
  infoText: {
      fontSize: 14,
  },
  infoIcon: {
      width: 20,
      height: 20,
      tintColor: '#FF6B6B',
  },
  cancelButtonContainer: {
      position: 'relative',
      height: 60,
      marginBottom: -28,
  },
  cancelButton: {
      position: 'absolute',
      left: 0,
      right: 0,
      backgroundColor: '#FF6B6B',
      borderRadius: 30,
      height: '100%',
      overflow: 'hidden',
  },
  progressBar: {
      position: 'absolute',
      left: 0,
      top: 0,
      bottom: 0,
      backgroundColor: '#FF6B6B',
  },
  cancelButtonText: {
      color: 'white',
      fontSize: 18,
      textAlign: 'center',
      lineHeight: 60,
  },
  cancelButtonArrows: {
      position: 'absolute',
      right: 20,
      top: '50%',
      transform: [{ translateY: -12 }],
  },
  slideButton: {
      position: 'absolute',
      left: 0,
      top: 0,
      bottom: 0,
      width: 60,
      justifyContent: 'center',
      alignItems: 'center',
  },
  slideButtonInner: {
      width: 50,
      height: 50,
      backgroundColor: 'rgba(255, 255, 255, 0.3)',
      borderRadius: 25,
      justifyContent: 'center',
      alignItems: 'center',
  },
});

export default DetailSos;