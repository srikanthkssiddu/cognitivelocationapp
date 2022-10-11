import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import App1 from './src/components/LocationDetails';
import App2 from './src/components/MapDetails';
import { Provider } from 'react-redux';
import  store  from './src/app/store'




const Stack = createNativeStackNavigator();

export default function App() {
  return (
  <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="LocationDetails" component={App1}
          options={{
            title: 'Location Manager',
            headerStyle: {
            backgroundColor: '#000000',
            
            },
            headerTintColor: '#dcdcdc',
            headerTitleStyle: {
            fontWeight: 'bold',
            },
        }}/>
        <Stack.Screen name="MapDetails" component={App2}
          options={{
            title: 'Map Details',
            headerStyle: {
            backgroundColor: '#000000',
            
            },
            headerTintColor: '#dcdcdc',
            headerTitleStyle: {
            fontWeight: 'bold',
            },
        }}/>
        
        
      </Stack.Navigator>
    </NavigationContainer>
  </Provider>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
