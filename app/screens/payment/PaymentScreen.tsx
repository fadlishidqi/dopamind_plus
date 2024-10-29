import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, Animated } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import CustomTextReg from '../../components/CustomTextReg';
import CustomTextBold from '../../components/CustomTextBold';
import { RootStackParamList } from '../../types';
import { StackNavigationProp } from '@react-navigation/stack';

const { width: screenWidth } = Dimensions.get('window');
const CARD_WIDTH = screenWidth * 0.90;
const CARD_HEIGHT = CARD_WIDTH / 1.700;

interface CreditCard {
  id: string;
  image: any;
}

const creditCards: CreditCard[] = [
  {
    id: '1',
    image: require('../../../assets/images/cc1.png'),
  },
  {
    id: '2',
    image: require('../../../assets/images/cc2.png'),
  },
  {
    id: '3',
    image: require('../../../assets/images/cc3.png'),
  },
];

const PaymentScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const route = useRoute();
  const { doctor } = route.params as { doctor: any };
  const [sendReceipt, setSendReceipt] = useState(false);
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef<Animated.FlatList>(null);

  const handleConfirmPayment = () => {
    navigation.navigate('ConfirmationScreen', { 
      doctor: doctor.name,
      date: doctor.date,
      clock: doctor.clock
    } as never);
  };

  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({ index: 1, animated: false });
    }
  }, []);

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { useNativeDriver: true }
  );

  const renderCard = ({ item, index }: { item: CreditCard; index: number }) => {
    const inputRange = [
      (index - 1) * CARD_WIDTH,
      index * CARD_WIDTH,
      (index + 1) * CARD_WIDTH,
    ];

    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.8, 1, 0.8],
      extrapolate: 'clamp',
    });

    return (
      <Animated.View
        style={[
          styles.cardContainer,
          { transform: [{ scale }] }
        ]}
      >
        <Image source={item.image} style={styles.cardImage} />
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <CustomTextBold style={styles.headerTitle}>Payment</CustomTextBold>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.cardWrapper}>
        <Animated.FlatList
          ref={flatListRef}
          data={creditCards}
          renderItem={renderCard}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={CARD_WIDTH}
          decelerationRate="fast"
          contentContainerStyle={styles.cardScrollViewContent}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          getItemLayout={(data, index) => ({
            length: CARD_WIDTH,
            offset: CARD_WIDTH * index,
            index,
          })}
        />
      </View>

      <View style={styles.sectionContainer}>
        <View style={styles.sectionHeader}>
          <CustomTextReg style={styles.sectionTitle}>Offers</CustomTextReg>
          <TouchableOpacity>
            <CustomTextReg style={styles.addCode}>Add code</CustomTextReg>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.sectionContainer}>
        <CustomTextReg style={styles.sectionTitle}>Order Summary</CustomTextReg>
        <View style={styles.summaryRow}>
          <CustomTextReg style={styles.summaryLabel}>Doctor</CustomTextReg>
          <CustomTextReg style={styles.summaryValue}>{doctor.name}</CustomTextReg>
        </View>
        <View style={styles.summaryRow}>
          <CustomTextReg style={styles.summaryLabel}>Date</CustomTextReg>
          <CustomTextReg style={styles.summaryValue}>{`${doctor.date} / ${doctor.clock}`}</CustomTextReg>
        </View>
        <View style={styles.summaryRow}>
          <CustomTextReg style={styles.summaryLabel}>Total</CustomTextReg>
          <CustomTextReg style={styles.summaryValue}>{doctor.price}</CustomTextReg>
        </View>
      </View>

      <View style={styles.sectionContainer}>
        <View style={styles.sectionHeader}>
          <CustomTextReg style={styles.sectionTitle}>Address</CustomTextReg>
          <CustomTextReg style={styles.changeAddress}>RS Banyumanik 2, Semarang</CustomTextReg>
        </View>
      </View>

      <View style={styles.receiptContainer}>
        <TouchableOpacity onPress={() => setSendReceipt(!sendReceipt)} style={styles.checkbox}>
          {sendReceipt && <View style={styles.checkboxInner} />}
        </TouchableOpacity>
        <CustomTextReg style={styles.receiptText}>Send order receipt to email after confirming</CustomTextReg>
      </View>

      <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmPayment}>
        <CustomTextBold style={styles.confirmButtonText}>Confirm Payment</CustomTextBold>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 26,
    justifyContent: 'space-between',
    padding: 16,
  },
  headerTitle: {
    fontSize: 20,
  },
  placeholder: {
    width: 24,
  },
  cardWrapper: {
    height: CARD_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardScrollViewContent: {
    paddingHorizontal: (screenWidth - CARD_WIDTH) / 2,
  },
  cardContainer: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 10,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  sectionContainer: {
    padding: 16,
    backgroundColor: 'white',
    marginTop: 10,
    marginHorizontal: 20,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  addCode: {
    color: '#55A498',
    fontSize: 14,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#888',
  },
  summaryValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  changeAddress: {
    fontSize: 14,
    color: '#55A498',
  },
  receiptContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginHorizontal: 20,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#55A498',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxInner: {
    width: 12,
    height: 12,
    backgroundColor: '#55A498',
    borderRadius: 2,
  },
  receiptText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#55A498',
  },
  confirmButton: {
    backgroundColor: '#55A498',
    padding: 16,
    borderRadius: 40,
    margin: 20,
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PaymentScreen
