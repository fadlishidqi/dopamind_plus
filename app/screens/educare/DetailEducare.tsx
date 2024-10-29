//app/screens/Educare/DetailEducare.tsx
import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground, Animated, Dimensions } from 'react-native';
import CustomTextBold from '../../components/CustomTextBold';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Articles from '../../components/educare/Artikel';
import Counseling from '../../components/educare/Counseling';
import CustomTextReg from '../../components/CustomTextReg';

const { width } = Dimensions.get('window');

const DetailEducare: React.FC = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('Articles');
  const slideAnim = useRef(new Animated.Value(0)).current;

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    Animated.spring(slideAnim, {
      toValue: tab === 'Articles' ? 0 : -width,
      useNativeDriver: true,
    }).start();
  };

  // Ganti Background
  const getBackgroundImage = () => {
    return activeTab === 'Articles'
      ? require('../../../assets/images/bgartikel.png')  
      : require('../../../assets/images/bgkonseling.png'); 
  };

  // Ganti Gambar
  const getPersonImage = () => {
    return activeTab === 'Articles'
      ? require('../../../assets/images/detaileducare.png')
      : require('../../../assets/images/dokterkonsul.png');
  };

  return (
    <View style={styles.container}>
      <ImageBackground 
        source={getBackgroundImage()} 
        style={styles.backgroundImage}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <CustomTextBold style={styles.headerTitle}>Educare</CustomTextBold>
        </View>

        <View style={styles.tabContainer}>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'Articles' && styles.activeTab]}
            onPress={() => handleTabChange('Articles')}
          >
            <CustomTextBold style={[styles.tabText, activeTab === 'Articles' && styles.activeTabText]}>Articles</CustomTextBold>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'Counseling' && styles.activeTabCounseling]}
            onPress={() => handleTabChange('Counseling')}
          >
            <CustomTextBold style={[styles.tabText, activeTab === 'Counseling' && styles.activeTabText]}>Counseling</CustomTextBold>
          </TouchableOpacity>
        </View>

        <Image
          source={getPersonImage()}
          style={activeTab === 'Articles' ? styles.articlesImage : styles.counselingImage}
        />


        <View style={styles.whiteCard}>
          <Animated.View 
            style={[
              styles.contentContainer,
              { transform: [{ translateX: slideAnim }] }
            ]}
          >
            <Articles />
            <Counseling />
          </Animated.View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 40,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  backButton: {
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    flex: 1,
    marginRight: 30,
    textAlign: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 25,
    marginHorizontal: 20,
    padding: 5,
  },
  tab: {
    flex: 1,
    paddingVertical: 6,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#75B1A7',
    borderRadius: 20,
  },
  activeTabCounseling: {
    backgroundColor: '#95B5F6',
    borderRadius: 20,
  },
  tabText: {
    fontSize: 16,
    color: 'black',
  },
  activeTabText: {
    color: 'white',
  },
  articlesImage: {
    width: '100%',
    height: 180,
    marginLeft: 70,
    marginTop: 20,
    resizeMode: 'contain',
  },
  counselingImage: {
    width: '100%',
    height: 180,
    marginLeft: -60,
    marginTop: 20,
    resizeMode: 'contain',
  },
  whiteCard: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flex: 1,
    overflow: 'hidden',
  },
  contentContainer: {
    flexDirection: 'row',
    width: width * 2,
  },
});

export default DetailEducare;
