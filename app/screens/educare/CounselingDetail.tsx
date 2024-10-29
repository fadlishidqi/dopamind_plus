import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Image, TextInput, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CustomTextBold from '../../components/CustomTextBold';
import CustomTextReg from '../../components/CustomTextReg';
import { fetchDoctorsBySpecialization } from '../../services/dokterService';
import { useRoute, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types';

type CounselingDetailScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'CounselingDetail'
>;

interface Doctor {
  name: string;
  specialty: string;
  price: string;
  image: string;
  date: string;
  clock: string;
}

const CounselingDetail: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>('');
  
  const route = useRoute(); 
  const navigation = useNavigation<CounselingDetailScreenNavigationProp>();
  const { doctorType } = route.params as { doctorType: string }; 

  useEffect(() => {
    const fetchDoctors = async () => {
      setLoading(true);
      try {
        const fetchedDoctors = await fetchDoctorsBySpecialization(doctorType);
        const doctorArray = Object.values(fetchedDoctors) as Doctor[];
        setDoctors(doctorArray);
        setFilteredDoctors(doctorArray);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, [doctorType]);

  const handleSearch = (text: string) => {
    setSearch(text);
    const filtered = doctors.filter(doctor => 
      doctor.name.toLowerCase().includes(text.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredDoctors(filtered);
  };

  const handleBook = (doctor: Doctor) => {
    console.log(`Booking ${doctor.name}`);
    navigation.navigate('PaymentScreen', { 
      doctor: {
        name: doctor.name,
        specialty: doctor.specialty,
        price: doctor.price,
        date: doctor.date,
        clock: doctor.clock,
        id: ''
      }
    });
  };

  const renderDoctorItem = ({ item }: { item: Doctor }) => (
    <View style={styles.doctorCard}>
      <Image source={{ uri: item.image }} style={styles.doctorImage} />
      <View style={styles.doctorInfo}>
        <CustomTextBold style={styles.doctorName}>{item.name}</CustomTextBold>
        <CustomTextReg style={styles.doctorTitle}>{item.specialty}</CustomTextReg>
        <View style={styles.metaInfo}>
          <View style={styles.dateBadge}>
            <CustomTextReg style={styles.dateText}>{item.date}</CustomTextReg>
          </View>
          <CustomTextReg style={styles.timeText}>{item.clock}</CustomTextReg>
        </View>
        <View style={styles.priceBookContainer}>
          <CustomTextReg style={styles.costValue}>{item.price}</CustomTextReg>
          <TouchableOpacity style={styles.bookButton} onPress={() => handleBook(item)}>
            <CustomTextBold style={styles.bookButtonText}>Book</CustomTextBold>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <CustomTextBold style={styles.title}>{doctorType}</CustomTextBold> 
        <View style={styles.placeholderView} />
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color="#888" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          value={search}
          onChangeText={handleSearch}
        />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#00897B" style={styles.loader} />
      ) : (
        <FlatList
          data={filteredDoctors}
          renderItem={renderDoctorItem}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 16,
    paddingBottom: 10,
  },
  backButton: {
    padding: 10,
  },
  title: {
    fontSize: 20,
    flex: 1,
    textAlign: 'center',
  },
  placeholderView: {
    width: 44,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 16,
  },
  listContent: {
    paddingBottom: 20,
  },
  doctorCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  doctorImage: {
    width: 100,
    height: '100%',
    borderRadius: 10,
  },
  doctorInfo: {
    flex: 1,
    padding: 15,
  },
  doctorName: {
    fontSize: 16,
    marginBottom: 5,
  },
  doctorTitle: {
    fontSize: 14,
    color: '#888',
    marginBottom: 5,
  },
  metaInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  dateBadge: {
    backgroundColor: '#E0F2F1',
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  dateText: {
    fontSize: 12,
    color: '#00897B',
  },
  timeText: {
    fontSize: 12,
    color: '#888',
    marginLeft: 10,
  },
  priceBookContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  costValue: {
    fontSize: 14,
    color: '#000',
  },
  bookButton: {
    backgroundColor: '#E0F2F1',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  bookButtonText: {
    color: '#00897B',
    fontSize: 12,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CounselingDetail;