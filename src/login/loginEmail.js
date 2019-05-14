console.ignoredYellowBox = [
    'Setting a timer'
]
import firebase from 'firebase';
import StatusBar from '../constants/statusBar'
import ComponentsLoginEmail from './componentsLoginEmail';
import { login, checkUserDetails } from '../firebase/database'
import React, { Component } from 'react';
import { ImageBackground, Image, Alert, BackHandler, Platform, Animated } from 'react-native';
import { styles, images} from '../constants/constants'
import FBSDK, { LoginManager, AccessToken, GraphRequestManager, GraphRequest } from 'react-native-fbsdk'
import Loader from '../loadingModal/loadingModal';
import { auth } from '../firebase/firebase'
import { checkInternetConnection } from 'react-native-offline';
import { atualizarSemCadastro } from '../login/loginregister'
let listener = null

export class LoginEmailScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      senha: '',
      nameUser: '',
      profilePicUrl:'',
      loading: false,
      checked:false,
      temInternet: null
    }

    this.loginToHome = this.loginToHome.bind(this);
    this.logintToCadastro = this.logintToCadastro.bind(this);

  }

  updateEmail = (text) => {
    this.setState({email: text})
  }
  updateSenha = (text) => {
    this.setState({senha: text})
  }


  async loginToHome () {
    this.setState({
      loading: true
    });
    if(this.state.email && this.state.senha){
      //detectar se há internet

        const isConnected = await checkInternetConnection();

        if(isConnected) {
          atualizarSemCadastro(false)

          login(
            this.state.email,
            this.state.senha,
            () => {
              this.setState({
                loading:false
              })
              this.props.navigation.push('Home')
            },
            () => {this.setState({
              loading:false
            });}
          )
        }else{


          Alert.alert(
            'Conexão com a Internet',
            'Aparantemente há um problema com sua conexão de internet e não conseguimos fazer o login. Cheque para haver se você possui conexão com a internet no momento e tente novamente',
            [
              {text: 'OK', onPress: () => {
                this.setState({
                  loading: false
                });
              }},
            ],
            { cancelable: false }
          )
        }


    }else{
      this.setState({
        loading:false
      });
      Alert.alert(
        'Campos Vazios',
        'Preencha todos os campos para proceder com o login',
        [
          {text: 'OK', onPress: () => {

          }},
        ],
        { cancelable: false }
      )
    }

  }

  logintToCadastro ()
  {
    this.setState({
      loading: true
    })
    const {navigate} = this.props.navigation
    navigate('CadastroInicial')
    this.setState({
      loading: false
    })
  }

  componentWillUnmount() {
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick=()=> {
    this.props.navigation.goBack();
    return true;
  }

   componentWillMount(){
     BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick)
   }

  render(){
    return (
      <ImageBackground
        source={images.backgroundLoginEmail}
        style={styles.backgroundImage}>
        <Loader
          loading={this.state.loading}
          message="Aguarde enquanto a preguiça faz o seu login. Caso a internet esteja lenta pode demorar um pouco. Aguarde ou feche o aplicativo, verifique sua conexão com a internet e tente novamente." />
        <StatusBar/>
        <ComponentsLoginEmail
          goBack={()=>{this.props.navigation.navigate('LoginRegister')}}
          loginToHome = {this.loginToHome}
          checked={this.state.checked}
          textEmail={this.updateEmail}
          textSenha={this.updateSenha}
          functionCheck={()=>{this.setState({
            checked: !this.state.checked
          });}}
          esqueciSenha={()=>{this.props.navigation.navigate('RedefinePassword');}}
          />
      </ImageBackground>
    )
  }
}
