import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  Image
} from 'react-native';

import logo from '../../images/logo.png';

export default class Logos extends React.Component {
  render(){
  return (
    
           <View style={styles.container}>
             <Image source={logo}
             resizeMode={'contain'} 
             style={{   justifyContent: 'center',alignItems: 'center',marginTop:-90,marginBottom:-50,width:122, height:122}}/>
             

           </View>
        
  );
 }
}

const styles = StyleSheet.create({

  
});