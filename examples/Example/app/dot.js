import { View, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import Timeline from 'react-native-timeline-flatlist';

const data = [
  {
    time: '09:00',
    title: 'Archery Training',
    description:
      'The Beginner Archery and Beginner Crossbow course does not require you to bring any equipment.',
    circleColor: '#009688',
    lineColor: '#009688',
  },
  {
    time: '10:45',
    title: 'Play Badminton',
    description:
      'Badminton is a racquet sport played using racquets to hit a shuttlecock across a net.',
  },
  { time: '12:00', title: 'Lunch' },
  {
    time: '14:00',
    title: 'Watch Soccer',
    description:
      'Team sport played between two teams of eleven players with a spherical ball.',
    lineColor: '#009688',
  },
  {
    time: '16:30',
    title: 'Go to Fitness center',
    description: 'Look out for the Best Gym & Fitness Centers around me :)',
    circleColor: '#009688',
  },
];

export default function DotExample() {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Circle Dot Example' }} />
      <Timeline
        style={styles.list}
        data={data}
        circleSize={35}
        dotSize={18}
        circleColor="rgb(45,156,219)"
        lineColor="rgb(45,156,219)"
        timeContainerStyle={{ minWidth: 52, marginTop: -5 }}
        timeStyle={{
          textAlign: 'center',
          backgroundColor: '#ff9797',
          color: 'white',
          padding: 5,
          borderRadius: 13,
        }}
        descriptionStyle={{ color: 'gray' }}
        options={{ style: { paddingTop: 5 } }}
        innerCircle="dot"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  list: {
    flex: 1,
    marginTop: 20,
  },
});
