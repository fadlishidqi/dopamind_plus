import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import CustomTextBold from '../CustomTextBold';

interface EduCareCardProps {
  onPress: () => void;
}

const EduCareCard: React.FC<EduCareCardProps> = ({ onPress }) => (
  <TouchableOpacity style={styles.container} onPress={onPress}>
    <View style={styles.textContainer}>
      <CustomTextBold style={styles.titleWhite}>EduCare and</CustomTextBold>
      <CustomTextBold style={styles.titleGreen}>Consultation</CustomTextBold>
    </View>
    <Image 
      source={require('../../../assets/images/dokter.png')} 
      style={styles.image}
    />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#C7E4DF',
    borderRadius: 20,
    padding: 15,
    height: 120,
    width: '100%',
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    overflow: 'hidden',
  },
  textContainer: {
    flex: 1,
  },
  titleWhite: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    bottom: 20,
  },
  titleGreen: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#329D8D',
    bottom: 26,
  },
  image: {
    width: 96,
    height: 100,
    resizeMode: 'contain',
    position: 'absolute',
    right: -16,
    top: 40,
  },
});

export default EduCareCard;