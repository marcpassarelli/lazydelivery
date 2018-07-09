console.ignoredYellowBox = [
    'Setting a timer'
]
import React, { Component } from 'react';
import { Text, Image, View } from 'react-native';
import FadeInOutView from '../animation/fadeinoutview'
import { styles } from '../constants/constants'
import * as firebase from 'firebase';
/*import { Home } from './home'*/

export class SplashScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loggedIn:''
    };
  }
  validateUserName(){
    console.log("setState:"+this.state.loggedIn)
    return this.state.loggedIn+""
  }

  async getUser(){
    const { navigate } = this.props.navigation;
    let user = await firebase.auth().currentUser
    this.setState({loggedIn: user}, function(){
      this.validateUserName();
    })
    console.log("LOGGEDIN:"+this.state.loggedIn);
    if(this.state.loggedIn){
      navigate('Home')
    }else{
      navigate('LoginRegister')
    }
  }

  componentWillMount() {
      setTimeout (() => {
        this.getUser()
      }, 3000);
  }

  static navigationOptions = {
     header: null,
  };

   render() {
     return(
       <FadeInOutView>
         <Image
          style={styles.logo}
          source={require('../../img/delivery-truck-icon.png')}
         />
       <Text style={styles.developedBy}>desenvolvido por Marc Passarelli</Text>
       </FadeInOutView>
     );
   }
}
