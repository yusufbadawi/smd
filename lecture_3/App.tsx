import HomeScreen from './screens/HomeScreen';
import MapScreen from './screens/MapScreen';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ListScreen2 from './screens/ListScreen2';
import Carousel from './components/Carousel'

const Stack = createNativeStackNavigator();

const images = [
  'https://images.pexels.com/photos/2115695/pexels-photo-2115695.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  'https://images.pexels.com/photos/4159435/pexels-photo-4159435.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  'https://images.pexels.com/photos/5991465/pexels-photo-5991465.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
];


const App: React.FC = () => (
  <><>
   
  </><NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false,
          }} />
        <Stack.Screen
          name="MapScreen"
          component={MapScreen}
          options={{
            headerShown: true,
            title: '',
          }} />
        <Stack.Screen
          name="ListScreen2"
          component={ListScreen2}
          options={{
            headerShown: true,
            title: '',
          }} />
        <Stack.Screen
          name="Carousel"
          component={Carousel}
          options={{
            headerShown: true,
            title: '',
          }} />

      </Stack.Navigator>
    </NavigationContainer></>
);

export default App;