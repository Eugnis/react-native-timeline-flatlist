import { useState, useCallback } from 'react';
import { View, Text, StyleSheet, RefreshControl, ActivityIndicator } from 'react-native';
import { Stack } from 'expo-router';
import Timeline from 'react-native-timeline-flatlist';

const initialData = [
  {
    time: '09:00',
    title: 'Archery Training',
    description:
      'The Beginner Archery and Beginner Crossbow course does not require you to bring any equipment.',
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
  },
  {
    time: '16:30',
    title: 'Go to Fitness center',
    description: 'Look out for the Best Gym & Fitness Centers around me :)',
  },
];

export default function RefreshLoadMoreExample() {
  const [data, setData] = useState(initialData);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [waiting, setWaiting] = useState(false);

  const onRefresh = useCallback(() => {
    setIsRefreshing(true);
    setTimeout(() => {
      setData(initialData);
      setIsRefreshing(false);
    }, 2000);
  }, []);

  const onEndReached = useCallback(() => {
    if (!waiting) {
      setWaiting(true);
      setTimeout(() => {
        setData((prev) => [
          ...prev,
          { time: '18:00', title: 'Load more data', description: 'Appended event at bottom of timeline' },
          { time: '18:30', title: 'Load more data', description: 'Appended event at bottom of timeline' },
          { time: '19:00', title: 'Load more data', description: 'Appended event at bottom of timeline' },
        ]);
        setWaiting(false);
      }, 2000);
    }
  }, [waiting]);

  const renderFooter = useCallback(() => {
    if (waiting) {
      return <ActivityIndicator />;
    }
    return <Text>~</Text>;
  }, [waiting]);

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Refresh & Load More' }} />
      <Timeline
        style={styles.list}
        data={data}
        circleSize={20}
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
        options={{
          style: { paddingTop: 5 },
          refreshControl: (
            <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
          ),
          ListFooterComponent: renderFooter,
          onEndReached: onEndReached,
        }}
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
