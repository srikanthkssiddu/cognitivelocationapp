import * as React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, View, Dimensions } from 'react-native';
import { useEffect, useState } from 'react';


export default function App2() {
  const [lat, setLat] = useState('');
  const [lag, setLag] = useState('');
  
  
  
  
  const getData = () => {
    fetch('https://api.opencagedata.com/geocode/v1/json?key=c6d3b81a88744d11bd27c31d665ac459&q=52.3877830%2C+9.7334394&pretty=1&no_annotations=1')
      .then(response => response.json())
      .then(data => {
        setLat(JSON.stringify(data.results[0].geometry.lat))
        setLag(JSON.stringify(data.results[0].geometry.lag))  
        })
          
      .catch(error => {
        console.error(error);
      });
  }


useEffect(()=>{
  getData();
},[])

  return (
    <View style={styles.container}>
        <MapView style={styles.map}
          initialRegion={{
              latitude: 52.387783,
              longitude: 9.7334394 ,
              latitudeDelta: 0.0,
              longitudeDelta: 0.0,
          }}
        >
        <MapView.Marker
            coordinate={{latitude: 52.387783,
            longitude: 9.7334394}}
            
         />
      </MapView>
 </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});