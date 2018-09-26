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
let listener = null

export class LoginEmailScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  componentWillMount(){
      this.animatedValue = new Animated.Value(0)
  }

  componentDidMount() {
    //Encerrar app se for android e se back for pressionado
    if (Platform.OS == "android" && listener == null) {
      listener = BackHandler.addEventListener("hardwareBackPress", () => {
        this.props.navigation.navigate('LoginRegister')
      })
    }
  }


  constructor(props) {
    super(props);
    this.state = {
      email: '',
      senha: '',
      nameUser: '',
      profilePicUrl:'',
      loading: false,
      checked:false
    }

    this.loginToHome = this.loginToHome.bind(this);
    this.logintToCadastro = this.logintToCadastro.bind(this);

  }

  updateEmail = (text) => {
    this.setState({email: text},function(){console.log(this.state.email);})
  }
  updateSenha = (text) => {
    this.setState({senha: text},function(){console.log(this.state.senha);})
  }


  loginToHome () {
    if(this.state.email && this.state.senha){

      login(
        this.state.email,
        this.state.senha,
        () => this.props.navigation.navigate('Home')
      )
    }else{

      Alert.alert(
        'Campos Vazios',
        'Preencha todos os campos para proceder com o login',
        [
          {text: 'OK'},
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

  render(){
    return (
      <ImageBackground
        source={images.backgroundLoginEmail}
        style={styles.backgroundImage}>
        <Loader
          loading={this.state.loading}
          message="Aguarde enquanto a preguiça faz o seu login" />
        <StatusBar/>
        <ComponentsLoginEmail
          loginToHome = {this.loginToHome}
          checked={this.state.checked}
          textEmail={this.updateEmail}
          textSenha={this.updateSenha}
          functionCheck={()=>{this.setState({
            checked: !this.state.checked
          });}}
          />
      </ImageBackground>
    )
  }
}
