import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import CustomTextBold from '../CustomTextBold';

interface VirtualCommunityCardProps {
  onPress: () => void;
}

const VirtualCommunityCard: React.FC<VirtualCommunityCardProps> = ({ onPress }) => (
  <TouchableOpacity style={styles.container} onPress={onPress}>
    <Image 
      source={require('../../../assets/images/hp-virtual.png')} 
      style={styles.image}
    />
    <View style={styles.textContainer}>
      <CustomTextBold style={styles.titleWhite}>Virtual</CustomTextBold>
      <CustomTextBold style={styles.titleGreen}>Community</CustomTextBold>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#A4D4CC',
    borderRadius: 20,
    height: 90,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    overflow: 'hidden',
  },
  image: {
    width: 86,
    height: 76,
    resizeMode: 'contain',
    top: 7,
    left: -10,
  },
  textContainer: {
    alignItems: 'flex-start',
    right: 25,
  },
  titleWhite: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  titleGreen: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#329D8D',
    marginTop: -5,
  },
});

export default VirtualCommunityCard;