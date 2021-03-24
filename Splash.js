import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';

import LottieView from 'lottie-react-native';

export default class Splash extends Component  {


 constructor(props) {
  super()

  }

render(){
	   const {navigate} = this.props.navigation;
	return(

			
      <View	style={{flex:1,backgroundColor:'#ffffff'}}>

      	<View style={{width:500}}>
      	</View>
      <LottieView	
            source={require('../../assets/splash.json')}
      		autoPlay
      		loop ={false}
      		speed = {1}
      		onAnimationFinish = {()=>{
      				this.props.navigation.navigate('Profile');
      		}}
      		
      		
      />
      </View>


		)
   }
 }


const styles = StyleSheet.create({

	  sideByside:{
  alignItems:'center',
  justifyContent:'center',
  flexDirection:'row',
},

  
});
