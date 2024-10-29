// app/auth/RegisterScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, SafeAreaView, Alert, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { auth } from '../../firebaseConfig';
import CustomTextBold from '../components/CustomTextBold';
import CustomTextInput from '../components/CustomTextInput';
import CustomTextReg from '../components/CustomTextReg';

type RegisterScreenNavigationProp = StackNavigationProp<RootStackParamList, 'RegisterScreen'>;

const RegisterScreen = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation<RegisterScreenNavigationProp>();

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Kata sandi tidak cocok');
      return;
    }
  
    if (password.length < 6) {
      Alert.alert('Error', 'Kata sandi harus minimal 6 karakter');
      return;
    }
  
    setLoading(true);
  
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      await updateProfile(user, {
        displayName: username
      });
  
      console.log('Terdaftar:', { username, email });
      Alert.alert('Sukses', 'Pendaftaran berhasil!', [
        { text: 'OK', onPress: () => navigation.navigate('LoginScreen') }
      ]);
    } catch (error) {
      console.error(error);
      let errorMessage = 'Pendaftaran gagal. Silakan coba lagi.';
      
      if (error instanceof Error) {
        if ('code' in error && typeof error.code === 'string') {
          switch (error.code) {
            case 'auth/email-already-in-use':
              errorMessage = 'Email sudah digunakan. Silakan gunakan email lain.';
              break;
            case 'auth/invalid-email':
              errorMessage = 'Format email tidak valid.';
              break;
            case 'auth/weak-password':
              errorMessage = 'Kata sandi terlalu lemah. Gunakan kombinasi huruf, angka, dan simbol.';
              break;
          }
        }
      }
      
      Alert.alert('Error', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <CustomTextBold style={styles.title}>Halo! Daftar untuk memulai</CustomTextBold>
        
        <View style={styles.inputContainer}>
          <CustomTextInput
            style={styles.input}
            placeholder="Nama Pengguna"
            value={username}
            onChangeText={setUsername}
          />
        </View>
        
        <View style={styles.inputContainer}>
          <CustomTextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        
        <View style={styles.inputContainer}>
          <CustomTextInput
            style={styles.input}
            placeholder="Kata Sandi"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
            <Ionicons name={showPassword ? "eye-off" : "eye"} size={24} color="#888" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.inputContainer}>
          <CustomTextInput
            style={styles.input}
            placeholder="Konfirmasi Kata Sandi"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showConfirmPassword}
          />
          <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)} style={styles.eyeIcon}>
            <Ionicons name={showConfirmPassword ? "eye-off" : "eye"} size={24} color="#888" />
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity style={styles.registerButton} onPress={handleRegister} disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <CustomTextBold style={styles.registerButtonText}>Daftar</CustomTextBold>
          )}
        </TouchableOpacity>
        
        <CustomTextReg style={styles.orText}>Atau Daftar dengan</CustomTextReg>
        
        <View style={styles.socialLoginContainer}>
          <TouchableOpacity style={styles.socialButton}>
            <Image source={require('../../assets/images/facebook.png')} style={styles.socialButtonImage} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Image source={require('../../assets/images/google.png')} style={styles.socialButtonImage} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Image source={require('../../assets/images/apple.png')} style={styles.socialButtonImage} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.loginContainer}>
          <CustomTextReg style={styles.loginText}>Sudah punya akun? </CustomTextReg>
          <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
            <CustomTextReg style={styles.loginLink}>Masuk Sekarang</CustomTextReg>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 60,
    paddingBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F8F9',
    borderRadius: 8,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 55,
    paddingHorizontal: 15,
  },
  eyeIcon: {
    padding: 10,
  },
  registerButton: {
    backgroundColor: '#4AB7B6',
    height: 55,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  registerButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  orText: {
    textAlign: 'center',
    marginBottom: 20,
    color: '#6B7280',
  },
  socialLoginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  socialButton: {
    width: 100,
    height: 50,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  socialButtonImage: {
    width: '50%',
    height: '50%',
    resizeMode: 'contain',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  loginText: {
    color: '#6B7280',
  },
  loginLink: {
    color: '#4AB7B6',
    fontWeight: 'bold',
  },
});

export default RegisterScreen;