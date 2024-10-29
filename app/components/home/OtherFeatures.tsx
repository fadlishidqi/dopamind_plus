import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CustomTextBold from '../CustomTextBold';

interface FeatureItemProps {
  icon: React.ComponentProps<typeof Ionicons>['name'];
  title: string;
  description: string;
  iconColor: string;
  iconBackgroundColor: string;
  onPress?: () => void;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ icon, title, description, iconColor, iconBackgroundColor, onPress }) => {
  const content = (
    <>
      <View style={[styles.iconContainer, { backgroundColor: iconBackgroundColor }]}>
        <Ionicons name={icon} size={24} color={iconColor} />
      </View>
      <View style={styles.featureTextContainer}>
        <Text style={styles.featureTitle}>{title}</Text>
        <Text style={styles.featureDescription}>{description}</Text>
      </View>
    </>
  );

  if (onPress) {
    return (
      <TouchableOpacity style={styles.featureItem} onPress={onPress}>
        {content}
      </TouchableOpacity>
    );
  }

  return <View style={styles.featureItem}>{content}</View>;
};

const OtherFeaturesSection: React.FC = () => {
  const handleSleepTrackerPress = () => {
    console.log('Sleep Tracker pressed');
    // Add your navigation logic or other actions here
  };

  return (
    <View style={styles.container}>
      <CustomTextBold style={styles.sectionTitle}>Other features</CustomTextBold>
      <FeatureItem
        icon="bed-outline"
        title="Sleep Tracker"
        description="Tracking your Daily Sleep"
        iconColor="#FFFFFF"
        iconBackgroundColor="#A4D4CC"
        onPress={handleSleepTrackerPress}
      />
      <FeatureItem
        icon="game-controller-outline"
        title="Simple Games"
        description="Make your mood better with simple games"
        iconColor="#FFFFFF"
        iconBackgroundColor="#AFCAFF"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  featureTextContainer: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
    fontFamily: 'Poppins-Bold',
  },
  featureDescription: {
    fontSize: 13,
    color: '#666',
    fontFamily: 'Poppins-Regular',
  },
});

export default OtherFeaturesSection;