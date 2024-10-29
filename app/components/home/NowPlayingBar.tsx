// components/NowPlayingBar.tsx
import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import CustomTextReg from '../CustomTextReg';
import CustomTextBold from '../CustomTextBold';

interface NowPlayingBarProps {
  artistName: string;
  songTitle: string;
  albumArt: any;
}

const NowPlayingBar: React.FC<NowPlayingBarProps> = ({ artistName, songTitle, albumArt }) => {
  return (
    <View style={styles.container}>
      <Image source={albumArt} style={styles.albumArt} />
      <View style={styles.songInfo}>
        <CustomTextBold style={styles.artistName}>{artistName}</CustomTextBold>
        <CustomTextReg style={styles.songTitle}>{songTitle}</CustomTextReg>
      </View>
      <Image 
        source={require('../../../assets/images/spectrum.png')} 
        style={styles.spectrum}
        resizeMode="contain"
      />
      <TouchableOpacity style={styles.iconContainer}>
        <Image 
          source={require('../../../assets/images/heart.png')} 
          style={styles.icon}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconContainer}>
        <Image 
          source={require('../../../assets/images/play.png')} 
          style={styles.icon}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'white',
      padding: 10,
      borderRadius: 20,
      
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 3,
      marginBottom: 30,
    },
    albumArt: {
      width: 50,
      height: 50,
      borderRadius: 25,
    },
    songInfo: {
      marginLeft: 10,
      flex: 1,
    },
    songTitle: {
      fontSize: 12,
      color: 'gray'
    },
    artistName: {
      fontSize: 12,
      color: 'gray',
    },
    spectrum: {
      width: 100,
      height: 40,
      marginHorizontal: 10,
   
    },
    iconContainer: {
      width: 32,
      height: 32,
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: 5,
    },
    icon: {
      width: 20,
      height: 20,
    },
  });

export default NowPlayingBar;