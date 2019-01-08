console.ignoredYellowBox = [
    'Setting a timer'
]
import React, { Component } from 'react';
import { Text, Image, View,ImageBackground } from 'react-native';
import FadeInOutView from '../animation/fadeinoutview'
import { styles, images,cores} from '../constants/constants'
import {auth} from '../firebase/firebase'
import { checkUserDetails } from '../firebase/database'

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
    let user = await auth.currentUser
    this.setState({loggedIn: user}, function(){
      this.validateUserName();
    })
    console.log("LOGGEDIN:"+this.state.loggedIn);
    if(this.state.loggedIn){
      checkUserDetails(
        //se já tiver cadastro completo
        ()=> {
          navigate('Home')
        },
        //se não tiver cadastro completo
        ()=> {
          navigate('LoginRegister')
        }
      )

    }else{
      navigate('LoginRegister')
    }
  }

  componentWillMount() {
      setTimeout (() => {
        this.getUser()
      }, 4000);
  }

  static navigationOptions = {
     header: null,
  };

   render() {
     return(
       <ImageBackground
         source={images.backgroundSplash}
         style={styles.backgroundImage}>
         <FadeInOutView style={{justifyContent: 'center',alignContent: 'center'}}>
           <View >
             <Image
              style={styles.logo}
              source={images.iconSplash}
             />
           </View>
         <Text style={[styles.developedBy,{color:cores.corPrincipal}]}>desenvolvido por Marc Passarelli</Text>
         </FadeInOutView>
       </ImageBackground>
     );
   }
}
