import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

import HomeScreen from './screens/HomeScreen';
import BasicScreen from './screens/BasicScreen';
import CustomScreen from './screens/CustomScreen';
import DotScreen from './screens/DotScreen';
import IconScreen from './screens/IconScreen';
import OverrideScreen from './screens/OverrideScreen';
import PressScreen from './screens/PressScreen';
import RefreshLoadMoreScreen from './screens/RefreshLoadMoreScreen';
import SingleRightScreen from './screens/SingleRightScreen';
import TwoColumnScreen from './screens/TwoColumnScreen';

export type RootStackParamList = {
  Home: undefined;
  Basic: undefined;
  Custom: undefined;
  Dot: undefined;
  Icon: undefined;
  Override: undefined;
  Press: undefined;
  RefreshLoadMore: undefined;
  SingleRight: undefined;
  TwoColumn: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#009688' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Timeline Examples' }} />
        <Stack.Screen name="Basic" component={BasicScreen} options={{ title: 'Basic Example' }} />
        <Stack.Screen name="Custom" component={CustomScreen} options={{ title: 'Custom Example' }} />
        <Stack.Screen name="Dot" component={DotScreen} options={{ title: 'Dot Example' }} />
        <Stack.Screen name="Icon" component={IconScreen} options={{ title: 'Icon Example' }} />
        <Stack.Screen name="Override" component={OverrideScreen} options={{ title: 'Override Render' }} />
        <Stack.Screen name="Press" component={PressScreen} options={{ title: 'Press Example' }} />
        <Stack.Screen name="RefreshLoadMore" component={RefreshLoadMoreScreen} options={{ title: 'Refresh & Load More' }} />
        <Stack.Screen name="SingleRight" component={SingleRightScreen} options={{ title: 'Single Column Right' }} />
        <Stack.Screen name="TwoColumn" component={TwoColumnScreen} options={{ title: 'Two Column' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
