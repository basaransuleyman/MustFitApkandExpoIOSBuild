// SignUp.js
import React from 'react'
import {
  View,
  Button,
  TextInput,
  StyleSheet,
  Dimensions,
  Text,
  ImageBackground,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
  KeyboardAvoidingView
} from 'react-native'



const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import AsyncStorage from '@react-native-async-storage/async-storage';


import Logos from '../pages/Logos';

export default class Login extends React.Component {


  state = {
   email: '', password: '' , isLoading:false,
  
  }

  onChangeText = (key, val) => {
    this.setState({ [key]: val })
  }



  signUp = async ()=> {
    const { email, password } = this.state
    const {navigate} = this.props.navigation;
    this.setState({isLoading:true})

    fetch("https://must-fit-backend.herokuapp.com/signin",{
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
             await AsyncStorage.setItem('jwt',data.token)
             navigate('Cinsiyet');
              Alert.alert('Login Successful')
            

            } catch (e) {
              console.log("error hai",e)
               Alert.alert('Fill the all blanks or wrong username/password')
            
      

            }
    })
  }
 

render() {

  const {isLoading}=this.state

  return (


  <ImageBackground 
  source={require('../../images/loginback.jpg')}
  style={{width:'100%' , height:'100%',  opacity: 0.9}}>

  
     <KeyboardAvoidingView enabled behavior={ Platform.OS === 'ios'? 'padding': null}
                style= {styles.FlexGrowOne}>



   <View style={styles.container}>
       <Logos/>
<View style={styles.sideByside}>
  <Text style={{fontSize:20,color:'#24465c',marginBottom:0,marginTop:20,fontWeight:'bold'}}>MUST</Text>
  <Text style={{fontSize:20,color:'#88e315',marginBottom:0,marginTop:20}}>FIT</Text>
    <Text style={{fontSize:15,color:'white',marginBottom:0,marginTop:20,marginLeft:20}}>LOGIN </Text>
</View>

 

     <View style={styles.inputContainer}>
  

         <TextInput 
          style={styles.inputs}
          placeholder='Username'
          maxLength={15}
          autoCapitalize="none"
          value={this.state.Email}
          onChangeText={val => this.onChangeText('email', val)}
        />
       </View>


   <View style={styles.inputContainer}>

        <TextInput
          style={styles.inputs}
          placeholder='Password'
          maxLength={15}
          secureTextEntry={true}
          value={this.state.password}
          autoCapitalize="none"
          underlineColorAndroid='transparent'
          onChangeText={val => this.onChangeText('password', val)}
        />
        

        </View>


  


            <TouchableOpacity style={styles.submitButtonText}
              onPress={this.signUp}>
              {this.state.isLoading ? (
                <ActivityIndicator animating={this.state.isLoading} size={"large"} color={"white"} />
                ) : (
                  <Text style={styles.signUpTextone}>Login</Text>
                )}
             </TouchableOpacity>


            <TouchableOpacity style={styles.submitButtonTextone}
              onPress={()=>this.props.navigation.navigate('SignUp')}>
             <Text style={styles.signUpText}>Don't have account, Signup</Text>
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
   margin: 15,
   fontSize: 25,
   marginBottom :10,
   marginTop :0,
   color : 'white',
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
   marginTop:20,
   marginBottom:0,

 },
 sideByside:{
  alignItems:'center',
  justifyContent:'center',
  flexDirection:'row',
},
signUpTextone:{
 color: 'white',
   alignItems: 'center',
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
   fontWeight:'bold',
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
   marginTop:10,
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