import React from 'react';
import { View, Modal, StyleSheet, TouchableOpacity, Image } from 'react-native';
import CustomTextBold from '../components/CustomTextBold';
import CustomTextReg from '../components/CustomTextReg';

interface AlertSosProps {
  visible: boolean;
  onClose: () => void;
}

const AlertSos: React.FC<AlertSosProps> = ({ visible, onClose }) => {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
    >
      <View style={styles.overlay}>
        <View style={styles.alertWrapper}>
          <View style={styles.imageContainer}>
            <Image
              source={require('../../assets/images/dokterpink.png')}
              style={styles.image}
              resizeMode="contain"
            />
          </View>
          <View style={styles.alertContainer}>
            <CustomTextBold style={styles.title}>SOS Confirmed</CustomTextBold>
            <CustomTextReg style={styles.message}>
              Your emergency request has been confirmed and help is on the way.
            </CustomTextReg>
            <TouchableOpacity 
              style={styles.button}
              onPress={onClose}
            >
              <CustomTextBold style={styles.buttonText}>YES</CustomTextBold>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertWrapper: {
    width: '80%',
    backgroundColor: '#FCC3D2',
    borderRadius: 20,
    paddingTop: 100,
  },
  imageContainer: {
    position: 'absolute',
    top: -84,
    width: '126%',
    alignItems: 'center',
    zIndex: 1,
  },
  image: {
    width: 230,
    height: 200,
  },
  alertContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    width: '100%',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    color: '#333333',
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#666666',
    paddingHorizontal: 20,
    lineHeight: 22,
  },
  button: {
    backgroundColor: '#FF6B6B',
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 25,
    marginTop: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default AlertSos;