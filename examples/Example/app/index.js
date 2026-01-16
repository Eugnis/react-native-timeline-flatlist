import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Link, Stack } from 'expo-router';

const examples = [
  { href: '/basic', title: 'Basic Example' },
  { href: '/custom', title: 'Custom Example' },
  { href: '/dot', title: 'Circle Dot Example' },
  { href: '/icon', title: 'Icon Example' },
  { href: '/press', title: 'Press Example' },
  { href: '/override', title: 'Override Render Example' },
  { href: '/single-right', title: 'Single Column Right Example' },
  { href: '/two-column', title: 'Two Column Example' },
  { href: '/refresh-loadmore', title: 'Refresh and Load More' },
];

export default function Menu() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Stack.Screen options={{ title: 'Timeline Flatlist' }} />
      {examples.map((example) => (
        <Link key={example.href} href={example.href} asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.menu}>{example.title}</Text>
          </TouchableOpacity>
        </Link>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 20,
  },
  button: {
    padding: 15,
  },
  menu: {
    fontSize: 18,
  },
});
