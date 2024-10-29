// app/screens/emergency/SosScreen.tsx
import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, SafeAreaView, Animated, ScrollView, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomTextBold from '../../components/CustomTextBold';
import CustomTextReg from '../../components/CustomTextReg';
import { Ionicons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types';

type SOSScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SosScreen'>;

interface HelpOptionProps {
  title: string;
  content: string;
  isOpen: boolean;
  onToggle: () => void;
}

const HelpOption: React.FC<HelpOptionProps> = ({ title, content, isOpen, onToggle }) => {
  const [animation] = useState(new Animated.Value(0));

  React.useEffect(() => {
    Animated.timing(animation, {
      toValue: isOpen ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [isOpen]);

  const bodyHeight = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 100],
  });

  return (
    <View style={styles.helpOption}>
      <TouchableOpacity onPress={onToggle} style={styles.helpOptionHeader}>
        <CustomTextReg style={styles.helpOptionText}>{title}</CustomTextReg>
        <Ionicons 
          name={isOpen ? "chevron-down" : "chevron-forward"} 
          size={24} 
          color="#CCCCCC" 
        />
      </TouchableOpacity>
      <Animated.View style={[styles.helpOptionBody, { height: bodyHeight }]}>
        <CustomTextReg style={styles.helpOptionContent}>{content}</CustomTextReg>
      </Animated.View>
    </View>
  );
};

const SOSScreen: React.FC = () => {
  const navigation = useNavigation<SOSScreenNavigationProp>();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [imageLoading, setImageLoading] = useState(true);
  
  // Animated values for scaling and opacity
  const scaleAnim = React.useRef(new Animated.Value(1)).current;
  const opacityAnim = React.useRef(new Animated.Value(1)).current;

  const sosImage = require('../../../assets/images/SOS.png');

  React.useEffect(() => {
    const pulseAnimation = Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.spring(scaleAnim, {
            toValue: 1.1,
            friction: 3,
            tension: 40,
            useNativeDriver: true,
          }),
          Animated.spring(scaleAnim, {
            toValue: 1,
            friction: 3,
            tension: 40,
            useNativeDriver: true,
          })
        ]),
        Animated.sequence([
          Animated.timing(opacityAnim, {
            toValue: 0.7,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(opacityAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          })
        ])
      ])
    );
    pulseAnimation.start();
  }, []);

  const helpOptions = [
    { title: "Sesak Nafas, Harus Apa?", content: "Jika mengalami sesak napas, segera duduk atau berdiri dalam posisi tegak untuk membantu pernapasan. Usahakan tetap tenang dan ambil napas perlahan." },
    { title: "Serangan Panik Bagaimana?", content: "Saat mengalami serangan panik, cobalah untuk tetap tenang dan fokus pada pernapasan. Tarik napas dalam-dalam selama beberapa detik, dan hembuskan." },
    { title: "Melihat indikasi bunuh diri, Harus apa?", content: "Jika seseorang menunjukkan indikasi bunuh diri, jangan mengabaikan tanda-tandanya. Bicaralah dengan orang tersebut secara terbuka dan empati." },
    { title: "Bagaimana Menangani Luka Bakar Ringan?", content: "Untuk menangani luka bakar ringan, segera basuh area yang terbakar dengan air dingin selama 10-20 menit, lalu tutup dengan perban steril." },
    { title: "Pingsan, Harus Bagaimana?", content: "Jika seseorang pingsan, posisikan tubuhnya terlentang dengan kaki diangkat sedikit. Pastikan jalur napas tetap terbuka dan jangan memberinya minum." },
    { title: "Mimisan, Apa yang Harus Dilakukan?", content: "Duduk tegak dan condongkan tubuh sedikit ke depan. Jepit hidung menggunakan ibu jari dan jari telunjuk selama 10-15 menit." },
    { title: "Tersedak, Bagaimana Penanganannya?", content: "Jika orang tersedak masih bisa batuk, biarkan ia mencoba mengeluarkannya sendiri. Namun, jika tidak bisa bernapas, lakukan Heimlich maneuver." },
    { title: "Kejang, Apa yang Harus Dilakukan?", content: "Jauhkan benda berbahaya dari sekitar orang yang sedang kejang. Jangan masukkan apapun ke dalam mulutnya, dan tunggu sampai kejang berhenti." }
  ];

  const toggleOption = (index: number): void => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" /> 
        </TouchableOpacity>
        <CustomTextBold style={styles.title}>Emergency</CustomTextBold>
        <Image
          source={require('../../../assets/images/logo.png')}
          style={styles.profilePicture}
        />
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.infoItem}>
          <CustomTextBold style={styles.infoLabel}>Hello, Wisnu</CustomTextBold>
          <CustomTextReg style={styles.infoValue}>Complete your Profile</CustomTextReg>
        </View>
        <View style={styles.infoItemDivider} />
        <View style={styles.infoItem}>
          <CustomTextBold style={styles.infoLabel}>Define Location</CustomTextBold>
          <CustomTextReg style={styles.infoValue}>Alton Residence</CustomTextReg>
        </View>
      </View>

      <View style={styles.mainContent}>
        <CustomTextBold style={styles.emergencyTitle}>Emergency Help Needed?</CustomTextBold>
        <CustomTextReg style={styles.emergencySubtitle}>Just hold the button to call.</CustomTextReg>

        <TouchableOpacity onPress={() => navigation.navigate('DetailSos')}>
          <View style={styles.sosButtonContainer}>
            {imageLoading && (
              <ActivityIndicator 
                size="large" 
                color="#FF6B6B" 
                style={styles.loadingIndicator}
              />
            )}
            <Animated.View
              style={[
                styles.sosImageContainer,
                {
                  transform: [{ scale: scaleAnim }],
                  opacity: opacityAnim
                }
              ]}
            >
              <Image
                source={sosImage}
                style={[
                  styles.sosButton,
                  imageLoading ? styles.hiddenImage : null
                ]}
                resizeMode="contain"
                onLoadStart={() => setImageLoading(true)}
                onLoadEnd={() => {
                  console.log('Image loaded');
                  setImageLoading(false);
                }}
                onError={(error) => {
                  console.log('Image loading error:', error);
                  setImageLoading(false);
                }}
              />
            </Animated.View>
          </View>
        </TouchableOpacity>

        <CustomTextReg style={styles.helpText}>Not sure what to do?</CustomTextReg>

        <ScrollView style={styles.helpOptionsScrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.helpOptions}>
            {helpOptions.map((option, index) => (
              <HelpOption
                key={index}
                title={option.title}
                content={option.content}
                isOpen={openIndex === index}
                onToggle={() => toggleOption(index)}
              />
            ))}
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  backButton: {
    padding: 5,
  },
  title: {
    fontSize: 18,
    flex: 1,
    textAlign: 'center',
  },
  profilePicture: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoItem: {
    flex: 1,
  },
  infoItemDivider: {
    width: 1,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 16,
  },
  infoLabel: {
    fontSize: 14,
    color: '#000000',
  },
  infoValue: {
    fontSize: 12,
    color: '#FF6B6B',
  },
  mainContent: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 10,
  },
  emergencyTitle: {
    fontSize: 24,
    marginBottom: 4,
    textAlign: 'center',
  },
  emergencySubtitle: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 20,
    textAlign: 'center',
  },
  sosButtonContainer: {
    width: 250,
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  sosImageContainer: {
    width: 250,
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sosButton: {
    width: '100%',
    height: '100%',
  },
  hiddenImage: {
    opacity: 0,
  },
  loadingIndicator: {
    position: 'absolute',
  },
  helpText: {
    fontSize: 16,
    marginBottom: 16,
  },
  helpOptionsScrollView: {
    width: '100%',
    flex: 1,
  },
  helpOptions: {
    width: '100%',
    paddingBottom: 20,
  },
  helpOption: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    marginBottom: 8,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
  },
  helpOptionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  helpOptionText: {
    fontSize: 14,
    color: '#333333',
    flex: 1,
  },
  helpOptionBody: {
    overflow: 'hidden',
  },
  helpOptionContent: {
    padding: 16,
    paddingTop: 0,
    fontSize: 14,
    color: '#666666',
  },
});

export default SOSScreen;