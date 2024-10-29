//app/components/Artikel.tsx
import React, { useEffect, useState } from 'react';
import {View,StyleSheet,Image,ScrollView,TouchableOpacity,Dimensions,ActivityIndicator} from 'react-native';
import CustomTextBold from '../CustomTextBold';
import CustomTextReg from '../CustomTextReg';
import { useNavigation } from '@react-navigation/native';
import { getLifestyleNews } from '../../services/newsService';
import { RootStackParamList } from '../../types';
import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack/types';

type ArticlesScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ArticlesDetail'
>;

const { width } = Dimensions.get('window');

const Articles: React.FC = () => {
  const navigation = useNavigation<ArticlesScreenNavigationProp>();
  const [trendingData, setTrendingData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrendingData = async () => {
      try {
        const data = await getLifestyleNews();
        setTrendingData(data.slice(0, 10));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching trending data:', error);
        setLoading(false);
      }
    };

    fetchTrendingData();
  }, []);

  const renderContent = () => {
    if (loading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#75B1A7" />
          <CustomTextReg style={styles.loadingText}>Loading...</CustomTextReg>
        </View>
      );
    }

    return (
      <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.trendingSection}>
          <View style={styles.trendingHeader}>
            <CustomTextBold style={styles.trendingTitle}>Trending</CustomTextBold>
            <TouchableOpacity>
              <CustomTextReg style={styles.seeMoreText}>Search more {'>'}</CustomTextReg>
            </TouchableOpacity>
          </View>

          {trendingData.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.articleCard}
              onPress={() => navigation.navigate('ArticlesDetail', { url: item.link })}
            >
              <Image
                source={{ uri: item.image.large }}
                style={styles.articleImage}
              />
              <View style={styles.articleContent}>
                <CustomTextReg style={styles.articleTitle}>{item.title}</CustomTextReg>
                <View style={styles.articleMeta}>
                  <CustomTextReg style={styles.articleReadTime}>
                    {new Date(item.isoDate).toLocaleDateString('en-GB')}
                  </CustomTextReg>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    );
  };

  return (
    <View style={styles.container}>
      <CustomTextBold style={styles.greeting}>Hi, Joy</CustomTextBold>
      <CustomTextReg style={styles.question}>What is your favorite thing to do?</CustomTextReg>
      {renderContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width,
    padding: 20,
  },
  scrollContent: {
    flex: 1,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 400,
  },
  loadingText: {
    marginTop: 10,
    color: '#75B1A7',
    fontSize: 16,
  },
  greeting: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
  },
  question: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  trendingSection: {
    flex: 1,
  },
  trendingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  trendingTitle: {
    fontSize: 18,
  },
  seeMoreText: {
    color: '#75B1A7',
  },
  articleCard: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  articleImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
  },
  articleContent: {
    flex: 1,
  },
  articleTitle: {
    fontSize: 14,
    marginBottom: 5,
  },
  articleMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  articleReadTime: {
    fontSize: 12,
    color: '#666',
  },
});

export default Articles;