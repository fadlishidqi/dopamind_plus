//app/auth/LoginScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, SafeAreaView, Alert, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { auth } from '../../firebaseConfig';
import CustomTextInput from '../components/CustomTextInput';
import CustomTextBold from '../components/CustomTextBold';
import CustomTextReg from '../components/CustomTextReg';

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'LoginScreen'>;

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation<LoginScreenNavigationProp>();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Silakan isi email dan kata sandi');
      return;
    }

    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('Berhasil login:', email);
      Alert.alert('Sukses', 'Login berhasil!', [
        { text: 'OK', onPress: () => navigation.navigate('HomeScreen') }
      ]);
    } catch (error) {
      console.error(error);
      let errorMessage = 'Login gagal. Silakan coba lagi.';
      
      if (error instanceof Error) {
        if ('code' in error && typeof error.code === 'string') {
          switch (error.code) {
            case 'auth/user-not-found':
            case 'auth/wrong-password':
              errorMessage = 'Email atau kata sandi salah.';
              break;
            case 'auth/invalid-email':
              errorMessage = 'Format email tidak valid.';
              break;
            case 'auth/user-disabled':
              errorMessage = 'Akun ini telah dinonaktifkan.';
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
        <CustomTextBold style={styles.title}>Selamat datang kembali!</CustomTextBold>
        
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
        
        <TouchableOpacity style={styles.forgotPassword}>
          <CustomTextReg style={styles.forgotPasswordText}>Lupa Kata Sandi?</CustomTextReg>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin} disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <CustomTextBold style={styles.loginButtonText}>Masuk</CustomTextBold>
          )}
        </TouchableOpacity>
        
        <CustomTextReg style={styles.orText}>Atau masuk dengan</CustomTextReg>
        
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
        
        <View style={styles.registerContainer}>
          <CustomTextReg style={styles.registerText}>Belum punya akun? </CustomTextReg>
          <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
            <CustomTextReg style={styles.registerLink}>Daftar Sekarang</CustomTextReg>
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
    paddingTop: 90,
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
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 30,
  },
  forgotPasswordText: {
    color: '#4AB7B6',
  },
  loginButton: {
    backgroundColor: '#4AB7B6',
    height: 55,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  loginButtonText: {
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
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  registerText: {
    color: '#6B7280',
  },
  registerLink: {
    color: '#4AB7B6',
    fontWeight: 'bold',
  },
});

export default LoginScreen;
