import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

const examples = [
  { name: 'Basic', title: 'Basic Timeline' },
  { name: 'Custom', title: 'Custom Styling' },
  { name: 'Dot', title: 'Dot Inner Circle' },
  { name: 'Icon', title: 'Icon Inner Circle' },
  { name: 'Override', title: 'Override Render' },
  { name: 'Press', title: 'Press Events' },
  { name: 'RefreshLoadMore', title: 'Refresh & Load More' },
  { name: 'SingleRight', title: 'Single Column Right' },
  { name: 'TwoColumn', title: 'Two Column Layout' },
] as const;

export default function HomeScreen({ navigation }: HomeScreenProps) {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>React Native Timeline FlatList</Text>
      <Text style={styles.subheader}>Select an example:</Text>
      {examples.map((example) => (
        <TouchableOpacity
          key={example.name}
          style={styles.button}
          onPress={() => navigation.navigate(example.name)}
        >
          <Text style={styles.buttonText}>{example.title}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#009688',
  },
  subheader: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#666',
  },
  button: {
    backgroundColor: '#009688',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600',
  },
});
