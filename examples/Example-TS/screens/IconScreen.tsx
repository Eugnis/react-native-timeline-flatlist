import { View, StyleSheet, Image } from 'react-native';
import Timeline, { Data } from 'react-native-timeline-flatlist';

const data: Data[] = [
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
  {
    time: '12:00',
    title: 'Custom rendered icon',
    icon: (
      <Image
        style={{ width: 20, height: 20 }}
        source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
      />
    ),
  },
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

export default function IconScreen() {
  return (
    <View style={styles.container}>
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
          borderRadius: 4,
        }}
        descriptionStyle={{ color: 'gray' }}
        options={{ style: { paddingTop: 5 } }}
        innerCircle="icon"
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
