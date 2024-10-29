// components/MoodStats.tsx
import React from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import { Canvas, Path, Circle, Group, useFont } from '@shopify/react-native-skia';
import * as shape from 'd3-shape';

const MoodStats: React.FC = () => {
  const font = useFont(require('../../../assets/fonts/Poppins-Regular.ttf'), 10);

  const data = [
    { day: 'Sun', value: 30 },
    { day: 'Mon', value: 80 },
    { day: 'Tue', value: 20 },
    { day: 'Wed', value: 100 },
    { day: 'Thu', value: 40 },
    { day: 'Frid', value: 30 },
    { day: 'Sat', value: 25 },
  ];

  const width = Dimensions.get('window').width - 40;
  const height = 200;
  const padding = { top: 20, bottom: 50, left: 20, right: 20 };
  const graphWidth = width - padding.left - padding.right;
  const graphHeight = height - padding.top - padding.bottom;

  const xScale = (index: number) => padding.left + (index / (data.length - 1)) * graphWidth;
  const yScale = (value: number) => height - padding.bottom - (value / 100) * graphHeight;

  const lineGenerator = shape
    .line<{ day: string; value: number }>()
    .x((_, index) => xScale(index))
    .y(d => yScale(d.value))
    .curve(shape.curveCatmullRom.alpha(0.5));

  const linePath = lineGenerator(data) as string;

  if (!font) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mood Stats</Text>
        <Text style={styles.week}>Week 1</Text>
      </View>
      <Canvas style={{ width, height: height - 20, marginBottom: -10 }}>
        <Group>
          {[0, 25, 50, 75, 100].map((value, index) => (
            <Path
              key={index}
              path={`M ${padding.left} ${yScale(value)} H ${width - padding.right}`}
              color="#E0E0E0"
              style="stroke"
              strokeWidth={1}
              
            />
          ))}

          <Path
            path={linePath}
            color="#81C7BA"
            style="stroke"
            strokeWidth={3}
          />

          {data.map((item, index) => (
            <Group key={index}>
              <Circle
                cx={xScale(index)}
                cy={yScale(item.value)}
                r={8}
                color="white"
                style="fill"
              />
              <Circle
                cx={xScale(index)}
                cy={yScale(item.value)}
                r={6}
                color="#81C7BA"
                style="fill"
              />
            </Group>
          ))}
        </Group>
      </Canvas>
      <View style={styles.labelsContainer}>
        {data.map((item, index) => (
          <Text key={index} style={styles.label}>
            {item.day}
          </Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    right: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  week: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#888',
  },
  labelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 16,
    width: '100%',
   
  },
  label: {
    fontFamily: 'Poppins-Regular',
    color: '#888',
    fontSize: 14,
    textAlign: 'left',
    width: 48,
  },
});

export default MoodStats;