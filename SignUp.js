// SignUp.js
import React from 'react'
import {
  View,
  Button,
  TextInput,
  StyleSheet,
  Alert,
  Text,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  KeyboardAvoidingView,
  ActivityIndicator,
} from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { SliderBox } from "react-native-image-slider-box";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import Logo from '../pages/Logo';
export default class SignUp extends React.Component {


  state = {
   email: '', password: '' , isLoading:false,
    images: [
    require('../../images/slide1.png'), 
    require('../../images/slide2.png'),
    require('../../images/slide3.png'),
      ]
  }

  onChangeText = (key, val) => {
    this.setState({ [key]: val })
  }




  signUp = async ()=> {
    const { email, password } = this.state
    const {navigate} = this.props.navigation;

/*if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email))
{
  Toast.show('Email  must be this way like this blabla@gmail.com',Toast.LONG,Toast.TOP,styletoast);
 return
            
}*/
    fetch("https://must-fit-backend.herokuapp.com/signup",{
       method:"POST",
       headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        "email":email,
        "password":password
      })
    })
    .then(res=>res.json())
     .then(async (data)=>{
            try {
             await AsyncStorage.setItem('token',data.token)
             Alert.alert('Registration Successful')
              
             navigate('Login');
              
            } catch (e) {  
            
              console.log("err hai",e)
                Alert.alert('Fill the all blanks or username using already')
              
            }
    })
  }
 




  render() {

     const {isLoading}=this.state
    return (
 
      <ImageBackground 
  source={require('../../images/loginback.jpg')}
  style={{width:'100%' , height:'100%',  opacity: 0.9}}>

  <SliderBox
  images={this.state.images}
   sliderBoxHeight={250}
  dotColor="#88e315"
  inactiveDotColor="#24465c"
  paginationBoxVerticalPadding={20}
  autoplay
  circleLoop
  resizeMethod={'resize'}
  resizeMode={'cover'}
  paginationBoxStyle={{
    position: "absolute",
    bottom: 20,
    padding: 0,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    paddingVertical: -5
  }}
  dotStyle={{
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 0,
    padding: 0,
    margin: 0,
    backgroundColor: "#88e315"
  }}
  ImageComponentStyle={{borderRadius: 15, width: '98%', marginTop:10}}
  imageLoadingColor="#88e315"
/>

<KeyboardAvoidingView enabled behavior={ Platform.OS === 'ios'? 'padding': null}
                style= {styles.FlexGrowOne}>

   <View style={styles.container}>


<View style={styles.sideByside}>
  <Text style={{fontSize:20,color:'#24465c',marginTop:0,marginBottom:20,fontWeight:'bold'}}>MUST</Text>
  <Text style={{fontSize:20,color:'#88e315',marginTop:0,marginBottom:20,}}>FIT</Text>
    <Text style={{fontSize:15,color:'white',marginTop:0,marginBottom:20,marginLeft:20}}>SIGNUP </Text>
</View>

    
  <View style={{top:-30}}>
   <View style={styles.inputContainer}>
           <TextInput
               style={styles.inputs}
            placeholder='Username'
            autoCapitalize="none"
            maxLength={10}
            value={this.state.email}
            onChangeText={val => this.onChangeText('email', val)}
          />
        </View>
   <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputs}
          placeholder='Password'    
          secureTextEntry={true}
          maxLength={10}
          svalue={this.state.password}
          autoCapitalize="none"
          onChangeText={val => this.onChangeText('password', val)}
        />
      </View>
    </View>


            <TouchableOpacity style={styles.submitButtonText}
              onPress={this.signUp}>
              {this.state.isLoading ? (
                <ActivityIndicator animating={this.state.isLoading} size={"large"} color={"white"} />
                ) : (
                  <Text style={styles.signUpTextone}>Signup</Text>
                )}
             </TouchableOpacity>

            <TouchableOpacity style={styles.submitButtonTextone}
              onPress={()=>this.props.navigation.navigate('Login')}>
             <Text style={styles.signUpText}>I have account, Login</Text>
             
             </TouchableOpacity>
      </View>


            </KeyboardAvoidingView>
      </ImageBackground>

     
    )
  }
}
const styles = StyleSheet.create({
  container: {
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center',


  },
    FlexGrowOne: {
        flexGrow : 1
    },
  input: {
   margin: 0,
   fontSize: 25,
   marginBottom :0,
   marginTop :0,
   color : 'black',
  },
  submitButton: {
   backgroundColor: '#7a42f4',
   padding: 10,
   margin: 15,
   height: 60,
 },
 submitButtonText:{
   color: '#FFFFFF',
   backgroundColor:'#24465c',
   width:100,
   height:45,
   borderRadius:10,
   justifyContent: 'center',
   alignItems: 'center',
   marginTop:0,


 },
  sideByside:{
  alignItems:'center',
  justifyContent:'center',
  flexDirection:'row',
  marginTop:20
},

 submitButtonTextone:{
  color: 'white',
   width:185,
   height:45,
   borderRadius:10,
   justifyContent: 'center',
   alignItems: 'center',
   marginTop:0,

 },
 signUpText:{
   color: '#88e315',
   alignItems: 'center',
   fontWeight:'bold'

 },
 signUpTextone:{
 color: 'white',
   alignItems: 'center',
 },
 inputContainer: {
   borderBottomColor: '#FF5A54',
   backgroundColor:'white',
   borderRadius:5,
    opacity:0.8,
   borderBottomWidth: 1,
   width:275,
   height:45,
   marginTop:15,
   marginBottom:0,
   flexDirection: 'row',
   alignItems:'center'
 },
 inputs:{
   height:45,
   marginLeft:12,
   borderBottomColor: '#FFFFFF',
   flex:1,
  },
})

