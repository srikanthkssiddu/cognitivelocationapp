import { SafeAreaView, Text, TouchableOpacity, StyleSheet, Button, View, FlatList, ScrollView } from "react-native";
import { Avatar, Card } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from 'expo-status-bar';
import { useAppSelector, useAppDispatch } from '../app/hooks'
import React, { useEffect } from "react";
import { fetchUsers } from './Locationslice'

export default function App1 ( ) {
  let previous: readonly any[] | null | undefined = []
  const navigation = useNavigation();
  const user = useAppSelector(state => state.user)
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchUsers())
  }, [])
  
 
  const pushData  = (data) => {
    previous.push(data) 
    
  }
  // const deleteData  = () => {
  //   previous.splice()
  // }

  setInterval(() => {
    pushData(user.users);
  }, 10000)
  
 
  
    

return(
        <SafeAreaView style={styles.container}>
          <SafeAreaView style={[{ width: "27%", marginLeft:255 }]}>
          <Button
            title="Go to map"
            color='#000000'
            onPress={() => navigation.navigate('MapDetails')}
        />
        </SafeAreaView>
        <Text style={styles.title1} >-Current location</Text>
        
          <Card style={styles.card} >
            
            {/* <Avatar.Icon size={42} icon="map-marker-circle" /> */}
            <Text style={styles.title3}>{JSON.stringify(user.users.results[0].formatted)}</Text>
            <Text style={styles.title3}>{JSON.stringify(user.users.timestamp.created_http)}</Text>
          </Card >
          
          <Text style={styles.title1}>-Previous locations</Text>
          
          <View>
          <Text>{JSON.stringify(previous)}</Text>
          </View>
          
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 0,
      justifyContent: 'center',
      alignItems: 'baseline',
      paddingTop: 30,
    },
    text: {
      fontSize: 15,
      color: 'black',
    },
    title1: {
      fontWeight: "600",
      fontSize: 21,
      padding:10,
      color: '#000000'
    },
      card: {
      width:350,
      height:80
    },
    button: {
      borderRadius:10,
      alignItems: "center",
      width:70,
      height:35,
      backgroundColor: "#DDDDDD",
    },
    title2: {
        fontWeight: "600",
        fontSize: 15,
        padding:5,
        color: '#000000' 
    },
    action: {
        alignItems: "center"
    },
    title3: {
      fontWeight: "300",
      fontSize: 15,
      padding:5,
      color: '#000000' 
  }
  
  });


