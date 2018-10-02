console.ignoredYellowBox = [
    'Setting a timer'
]
import firebase from 'firebase';
import StatusBar from '../constants/statusBar'
import ComponentsRedefinePassword from './componentsRedefinePassword';
import { login, checkUserDetails } from '../firebase/database'
import React, { Component } from 'react';
import { ImageBackground, Image, Alert, BackHandler, Platform, Animated, Easing} from 'react-native';
import { styles, images} from '../constants/constants'
import FBSDK, { LoginManager, AccessToken, GraphRequestManager, GraphRequest } from 'react-native-fbsdk'
import Loader from '../loadingModal/loadingModal';
import { auth } from '../firebase/firebase'
let listener = null

export class RedefinePasswordScreen extends Component {

  componentDidMount() {
    //Encerrar app se for android e se back for pressionado
    if (Platform.OS == "android" && listener == null) {
      listener = BackHandler.addEventListener("hardwareBackPress", () => {
        BackHandler.exitApp()
      })
    }

  }
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      loading: false
    }


  }

  updateEmail = (text) => {
    this.setState({email: text})
  }


  render(){
    return (
      <ImageBackground
        source={images.backgroundLogin}
        style={styles.backgroundImage}>
        <Loader
          loading={this.state.loading}
          message="Aguarde enquanto a preguiça faz o seu login"/>
        <StatusBar/>
        <ComponentsRedefinePassword
          goBack={()=>{this.props.navigation.navigate('LoginEmail')}}
          sendEmailRedefinition={()=>{
            if(this.state.email){
            console.log("this.state.email"+this.state.email);
            auth.sendPasswordResetEmail(this.state.email).then(function() {
                console.log("email sent");
                // Email sent.
                Alert.alert(
                 'E-mail Redefinição de Senha.',
                 'Um e-mail foi enviado para o e-mail cadastrado. Basta seguir as instruções para o cadastramento de uma nova senha.',
                 [
                   {text: 'OK', onPress: () => {
                     this.props.navigation.navigate('LoginRegister')
                   }},
                 ],
                 { cancelable: false }
               )
              }).catch(function(error) {
                let erro =""
                if(error.code=="auth/invalid-email"){
                  erro = "E-mail inserido é invalido. Verifique se o e-mail inserido está correto."
                }else if(error.code=="auth/user-not-found"){
                  erro = "E-mail não cadastrado na base de dados."
                }else{
                  erro = "Ocorreu um erro. Verifique se o e-mail inserido está correto."
                }
                  // An error happened.

                  Alert.alert(
                   'Ocorreu um erro',
                    erro,
                   [
                     {text: 'OK', onPress: () => {

                     }},
                   ],
                   { cancelable: false }
                 )
              });
          }else {
            Alert.alert(
              'Campo vazio',
              'Por favor, inserir o e-mail',
              [
                {text: 'OK', onPress:()=>{

                }}
              ],
              {cancelable : false }
            )
          }
        }}
          textEmail={this.updateEmail}
          />
      </ImageBackground>
    )
  }
}
