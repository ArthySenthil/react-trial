import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { StyleSheet, Text, View ,Image} from 'react-native';

export default class WeatherScreen extends Component() {

  constructor(){
    super();
    this.state = {
      weather: ''
    };
  }
  

  getWeather = async () => {
    var url = 'https://fcc-weather-api.glitch.me/api/current?lat=35&lon=139'
    return fetch(url)
      .then(response => response.json())
      .then(responseJSON => {
        this.setState({
          weather: responseJSON,
        });
      })
      .catch(error => {
        console.error(error);
      });
    
  };

  componentDidMount(){
    this.getWeather();
  };
  render(){

    if(this.state.weather === ''){
      return (

        <View style={styles.container}>
          <Text>Loading...</Text>
          <StatusBar style="auto" />
        </View>
      );
    }else{return (
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <Text style={styles.title}>
            Weather Forecast
          </Text>
          <Image
            style={styles.cloudImage}
            source={require('./assets/cloud.png')}
          />
          <View style={styles.textContainer}>
          <Text style={{ fontSize: 18}}>
            {this.state.weather.main.temp}&deg;C
          </Text>
          <Text style={{ fontSize: 20, margin:10}}>
            humidity : {this.state.weather.main.humidity}
          </Text>
          <Text style={{fontSize: 20}}>
            {this.state.weather.weather[0].description}
          </Text>
        </View>
        </View>    
      </View>
    );
    }
  }
}
