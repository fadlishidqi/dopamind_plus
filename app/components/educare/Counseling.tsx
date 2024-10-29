//app/components/Counseling.tsx
import React from 'react';
import { View, StyleSheet, Image, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import CustomTextBold from '../CustomTextBold';
import CustomTextReg from '../CustomTextReg';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack/types';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../types';

type CounselingScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'CounselingDetail'
>;

const { width } = Dimensions.get('window');

const Counseling: React.FC = () => {
  const navigation = useNavigation<CounselingScreenNavigationProp>();

  const handleDoctorPress = (doctorType: string) => {
    navigation.navigate('CounselingDetail', { doctorType });
  };
  return (
    <View style={styles.container}>
      <CustomTextBold style={styles.greeting}>Hi, Joy</CustomTextBold>
      <CustomTextReg style={styles.question}>What is your problem?</CustomTextReg>

      <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContentContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.cardScrollView}>
          <View style={styles.cardContainer}>
            <TouchableOpacity style={[styles.card, styles.stressCard]}>
              <Image
                source={require('../../../assets/images/stress.png')}
                style={imageStyles.cardImage}
              />
              <Image
                source={require('../../../assets/images/kotakstress.png')}
                style={imageStyles.iconBox}
              />
              <CustomTextBold style={styles.cardTitle}>Stress</CustomTextBold>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.card, styles.menstruationCard]}>
              <Image
                source={require('../../../assets/images/mens.png')}
                style={imageStyles.cardImage}
              />
              <Image
                source={require('../../../assets/images/kotakmens.png')}
                style={imageStyles.iconBox}
              />
              <CustomTextBold style={styles.cardTitle}>Red Period</CustomTextBold>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.card, styles.pregnancyCard]}>
              <Image
                source={require('../../../assets/images/hamil.png')}
                style={imageStyles.cardImage}
              />
              <Image
                source={require('../../../assets/images/kotakhamil.png')}
                style={imageStyles.iconBox}
              />
              <CustomTextBold style={styles.cardTitle}>Pregnancy</CustomTextBold>
            </TouchableOpacity>
          </View>
        </ScrollView>

        <View style={styles.doctorSection}>
          <CustomTextBold style={styles.sectionTitle}>Our Doctor</CustomTextBold>
          <TouchableOpacity style={styles.doctorItem} onPress={() => handleDoctorPress('Psychiatrist')}>
            <Ionicons name="medical" size={24} color="#75B1A7" />
            <View style={styles.doctorInfo}>
              <CustomTextBold style={styles.doctorTitle}>Psychiatrist</CustomTextBold>
              <CustomTextReg style={styles.doctorSubtitle}>Specialist for psychology</CustomTextReg>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.doctorItem} onPress={() => handleDoctorPress('Gynecology')}>
            <Ionicons name="female" size={24} color="#FF69B4" />
            <View style={styles.doctorInfo}>
              <CustomTextBold style={styles.doctorTitle}>Gynecology</CustomTextBold>
              <CustomTextReg style={styles.doctorSubtitle}>Female reproductive system specialist</CustomTextReg>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.doctorItem} onPress={() => handleDoctorPress('Pediatrician')}>
            <Ionicons name="body" size={24} color="#4169E1" />
            <View style={styles.doctorInfo}>
              <CustomTextBold style={styles.doctorTitle}>Pediatrician</CustomTextBold>
              <CustomTextReg style={styles.doctorSubtitle}>Child health specialist</CustomTextReg>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.doctorItem} onPress={() => handleDoctorPress('Dermatologist')}>
            <Ionicons name="flower" size={24} color="#FF8C00" />
            <View style={styles.doctorInfo}>
              <CustomTextBold style={styles.doctorTitle}>Dermatologist</CustomTextBold>
              <CustomTextReg style={styles.doctorSubtitle}>Skin, hair, and nail specialist</CustomTextReg>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.doctorItem} onPress={() => handleDoctorPress('Nutritionist')}>
            <Ionicons name="nutrition" size={24} color="#32CD32" />
            <View style={styles.doctorInfo}>
              <CustomTextBold style={styles.doctorTitle}>Nutritionist</CustomTextBold>
              <CustomTextReg style={styles.doctorSubtitle}>Diet and nutrition expert</CustomTextReg>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width,
    padding: 20,
  },
  scrollContentContainer: {
    paddingBottom: 55,
  },
  scrollContent: {
    marginTop: 20,
  },
  greeting: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
  },
  question: {
    fontSize: 16,
    color: '#666',
  },
  cardScrollView: {
    marginBottom: 20,
  },
  cardContainer: {
    flexDirection: 'row',
    paddingRight: 20,
  },
  card: {
    width: 150,
    height: 150,
    borderRadius: 20,
    marginRight: 15,
    overflow: 'hidden',
    justifyContent: 'flex-end',
    padding: 15,
  },
  stressCard: {
    backgroundColor: '#C7E4DF',
  },
  menstruationCard: {
    backgroundColor: '#FCC3D2',
  },
  pregnancyCard: {
    backgroundColor: '#AFCAFF',
  },
  cardTitle: {
    fontSize: 20,
    color: '#fff',
    shadowColor: '#000',
    marginBottom: 90,
  },
  doctorSection: {
    marginTop: 5,
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 8,
  },
  doctorItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  doctorInfo: {
    marginLeft: 15,
  },
  doctorTitle: {
    fontSize: 16,
  },
  doctorSubtitle: {
    fontSize: 14,
    color: '#666',
  },
});

const imageStyles = StyleSheet.create({
  cardImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    marginLeft: 55,
    marginTop: 45,
  },
  iconBox: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    width: 40,
    height: 40,
    borderRadius: 10,
  },
});

export default Counseling;