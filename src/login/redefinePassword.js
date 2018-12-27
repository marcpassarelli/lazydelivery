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
  static navigationOptions  = ({navigation}) =>({
    header: null,
  });

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      loading: false
    }
    this.updateEmail = this.updateEmail.bind(this)

  }

  updateEmail = (text) => {
    this.setState({email: text})
    console.log("this.state.email"+this.state.email);
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


   sendEmailRedefinition= ()=>{
    console.log("sendEmailRedefinition");
    const { navigate } = this.props.navigation
    let email = this.state.email
    // let user = await auth.currentUser;
    // log
    // let provider = user.providerData[0].providerId
    console.log("this.state.email"+this.state.email);
    if(this.state.email){
    auth.fetchSignInMethodsForEmail(email).then(function(signInMethods){
      let metodoLogin = signInMethods
      if(metodoLogin==""){
        console.log("metodoLogin e-mail nao cadastrado"+metodoLogin);
        Alert.alert(
          "E-mail não cadastrado",
          "Este e-mail não consta em nossa base de dados. Verifique se o e-mail está correto ou volte à tela inicial e faça um cadastro com e-mail ou login com o Facebook.",
          [
           {text: 'OK', onPress: ()=>{}}
          ],
          { cancelable: false }
        )
      }else if(metodoLogin=="password"){
        console.log("metodoLogin password"+metodoLogin);

        auth.sendPasswordResetEmail(email).then(function() {
          // Email sent.
          Alert.alert(
           'E-mail Redefinição de Senha.',
           'Um e-mail foi enviado para o e-mail cadastrado. Basta seguir as instruções para o cadastramento de uma nova senha.',
           [
             {text: 'OK', onPress: ()=>{
               navigate('LoginEmail')}}
           ],
           { cancelable: false }
          )
        }).catch(function(error){
          console.log("error sendPasswordResetEmail"+error);
        })
      }else if(metodoLogin=="facebook.com"){
        console.log("metodoLogin facebook"+metodoLogin);
        Alert.alert(
          "E-mail já usado por uma conta Facebook",
          "O e-mail informado já é usado por uma conta do Facebook. Faça o login usando o botão Login com o Facebook ou então cadastre um novo e-mail.",
          [
           {text: 'OK', onPress: ()=>{}}
          ],
          { cancelable: false }
        )
      }else{
        console.log("metodoLogin email nao cadastrado"+metodoLogin);
        Alert.alert(
          "E-mail não cadastrado",
          "Este e-mail não consta em nossa base de dados. Verifique se o e-mail está correto ou volte à tela inicial e faça um cadastro com e-mail ou login com o Facebook.",
          [
           {text: 'OK', onPress: ()=>{}}
          ],
          { cancelable: false }
        )
      }
    }).catch(function(error){
      console.log("error  "+error);
      Alert.alert(
        "E-mail incorreto",
        "O e-mail informado está mal formatado. Verifique se o e-mail digitado está correto.",
        [
         {text: 'OK', onPress: ()=>{}}
        ],
        { cancelable: false }
      )
    })

  }else{
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
            this.sendEmailRedefinition()}}
          textEmail={this.updateEmail}
          />
      </ImageBackground>
    )
  }
}
