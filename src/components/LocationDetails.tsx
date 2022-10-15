import { SafeAreaView, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Button, 
  FlatList, 
  ActivityIndicator } from "react-native";
import { Avatar, Card } from "react-native-paper";
import { StatusBar } from 'expo-status-bar';
import React, { Component } from "react";


export default class App1 extends React.Component{
 
  timer: number | undefined;
  constructor() {
    super();
    this.state = {
      loading: true,
      currentData: [],
      serverData: [],  
      fetching_from_server: false,
    };
  
  }
  componentDidMount() {
    this.timer = setInterval(() => this.getItems(),1000*10);
  }
  

  getItems() {
    fetch('https://api.opencagedata.com/geocode/v1/json?key=6b6b0d30fda04edd9230bf93d60d0cc4&q=52.3877830%2C+9.7334394&pretty=1&no_annotations=1')
      .then(response => response.json())
      .then(data => {
        let temp = {
          formatted: JSON.stringify(data.results[0].formatted) ,
          timestamp: JSON.stringify(data.timestamp.created_http)
        }
        this.postExample()
        if(this.state.serverData.length<30){
        this.setState({
          
          currentData : [...[JSON.stringify(data.results[0].formatted),JSON.stringify(data.timestamp.created_http),JSON.stringify(data.results[0].geometry.lat),JSON.stringify(data.results[0].geometry.lag)]],
          serverData: [...[temp],...this.state.serverData],
          loading: false,
        
          
        });
        }
      })
      .catch(error => {
        console.error(error);
      });
  }
  
  requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ Location_name: 'this.state.currentData[0]',
                           time: 'this.state.currentData[1]'
                        })
};

  postExample = async () => {
    try {
        await fetch(
            'https://httpstat.us/200', this.requestOptions)
            .then(response => {
                response.json()
                    .then(data => {
                       
                    });
            })
    }
    catch (error) {
        console.error(error);
    }
}
 
  deleteData2 = () => {
    this.state.serverData.splice(0,this.state.serverData.length)
  }
  
 
 
  render() {
    return (
      <SafeAreaView style={styles.container}>
        {this.state.loading ? (
          <ActivityIndicator size="large"/>
        ) : (
      <SafeAreaView>
          <StatusBar 
            animated={true}
            backgroundColor="#dcdcdc"
            />
      <SafeAreaView style={[{ width: "27%", marginLeft:255 }]}>
          <Button
            title="Go to map"
            color='#000000'
            onPress={() => { this.props.navigation.navigate('MapDetails') }}
          />
      </SafeAreaView>
          <Text style={styles.title1} >-Current location</Text>
          <Card style={styles.card} >
          <Card.Title
            title = {this.state.currentData[0]}
            subtitle = {this.state.currentData[1]}
            left={(props) =>  <Avatar.Icon size={42} icon="map-marker-circle" />}
          />
          </Card >
          
          <Text style={styles.title1}>-Previous locations</Text>
          <FlatList
        
            style={{ width: '100%' , height:'85%'}}
            keyExtractor={(item, index) => index}
            data={this.state.serverData.slice(1,30)}
            renderItem={({ item, index }) => <>
             
          <Card style={styles.card1}>
          <Card.Title
            title = {item.formatted}
            subtitle = {item.timestamp}/>
          <Card.Content>
          <TouchableOpacity 
            style={styles.button}
            onPress={() => {
            delete item.formatted,item.timestamp
            }}>
          <Text style={styles.title2}>Remove</Text>
          </TouchableOpacity>
          </Card.Content>
          </Card>
          </>}
            
            />
          <SafeAreaView style={[{  marginBottom:10 }]}>
          <Button
            color="#000000"
            title="Clear All"
            onPress={()=>this.deleteData2()}

            />
          </SafeAreaView>
          </SafeAreaView>
          )}


          </SafeAreaView>
    );
  }
  
}

const styles = StyleSheet.create({
    container: {
      flex: 0,
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: 30,
    },
    text: {
      fontSize: 15,
      color: 'black',
    },
    title1: {
      fontWeight: "800",
      fontSize: 22,
      padding:5,
      color: '#000000'
    },
    card: {
      width:350,
      height:80,
      marginBottom: 10
    },
    card1: {
      width:350,
      height:110,
      marginBottom: 10
    },
    
    button: {
      borderRadius:10,
      alignItems: "center",
      width:70,
      height:35,
      marginLeft: 250,
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
      width: 280,
      fontWeight: "300",
      fontSize: 15,
      padding:5,
      color: '#000000' 
  }
});

