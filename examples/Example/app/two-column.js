import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import Timeline from 'react-native-timeline-flatlist';

const data = [
  {
    time: '09:00',
    title: 'Archery Training',
    description:
      'The Beginner Archery and Beginner Crossbow course does not require you to bring any equipment.',
    lineColor: '#009688',
    icon: require('../img/archery.png'),
  },
  {
    time: '10:45',
    title: 'Play Badminton',
    description:
      'Badminton is a racquet sport played using racquets to hit a shuttlecock across a net.',
    icon: require('../img/badminton.png'),
  },
  { time: '12:00', title: 'Lunch', icon: require('../img/lunch.png') },
  {
    time: '14:00',
    title: 'Watch Soccer',
    description:
      'Team sport played between two teams of eleven players with a spherical ball.',
    lineColor: '#009688',
    icon: require('../img/soccer.png'),
  },
  {
    time: '16:30',
    title: 'Go to Fitness center',
    description: 'Look out for the Best Gym & Fitness Centers around me :)',
    icon: require('../img/dumbbell.png'),
  },
];

export default function TwoColumnExample() {
  const [selected, setSelected] = useState(null);

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Two Column Example' }} />
      {selected && (
        <Text style={{ marginTop: 10 }}>
          Selected event: {selected.title} at {selected.time}
        </Text>
      )}
      <Timeline
        style={styles.list}
        data={data}
        circleSize={20}
        circleColor="rgba(0,0,0,0)"
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
        innerCircle="icon"
        onEventPress={setSelected}
        separator={false}
        detailContainerStyle={{
          marginBottom: 20,
          paddingLeft: 5,
          paddingRight: 5,
          backgroundColor: '#BBDAFF',
          borderRadius: 10,
        }}
        columnFormat="two-column"
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
