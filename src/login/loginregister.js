console.ignoredYellowBox = [
    'Setting a timer'
]
import StatusBar from '../constants/statusBar'
import firebase from 'firebase'
import ComponentsLoginRegister from './componentsloginregister';
import { login, checkUserDetails } from '../firebase/database'
import React, { Component } from 'react';
import { ImageBackground, Image, Alert, BackHandler, Platform, Animated, Easing, AsyncStorage} from 'react-native';
import { styles, images} from '../constants/constants'
import firebase1 from 'react-native-firebase';
import FBSDK, { LoginManager, AccessToken, GraphRequestManager, GraphRequest } from 'react-native-fbsdk'
import Loader from '../loadingModal/loadingModal';
import { auth} from '../firebase/firebase'
let listener = null
import { checkInternetConnection } from 'react-native-offline';

export var semCadastro = false
export function atualizarSemCadastro(estadoSemCadastro){
  semCadastro = estadoSemCadastro
}

export class LoginRegisterScreen extends Component {

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
      temInternet: true
    }

    this.loginToHome = this.loginToHome.bind(this);
    this.logintToCadastro = this.logintToCadastro.bind(this);

  }


  async componentDidMount() {
    this.checkPermission();
    //Encerrar app se for android e se back for pressionado
    if (Platform.OS == "android" && listener == null) {
      listener = BackHandler.addEventListener("hardwareBackPress", () => {
        BackHandler.exitApp()
      })
    }

  }

  //1
    async checkPermission() {
    const enabled = await firebase1.messaging().hasPermission();
    if (enabled) {
      //console.log("gettoken");
        this.getToken();
    } else {
      //console.log("requestPermission");
        this.requestPermission();
    }
    }

    //3
    async getToken() {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    //console.log("fcmtoken fora: "+fcmToken);
    if (!fcmToken) {
        fcmToken = await firebase1.messaging().getToken();
        if (fcmToken) {
            // user has a device token
            //console.log("fcmtoken dentro: "+fcmToken);
            await AsyncStorage.setItem('fcmToken', fcmToken);
        }
    }
    }

    //2
    async requestPermission() {
    try {
        await firebase1.messaging().requestPermission();
        // User has authorised
        this.getToken();
    } catch (error) {
        // User has rejected permissions
        //console.log('permission rejected');
    }
    }

  updateEmail = (text) => {
    this.setState({email: text})
  }
  updateSenha = (text) => {
    this.setState({senha: text})
  }


  loginToHome () {
    this.props.navigation.navigate('LoginEmail')
  }

  logintToCadastro ()
  {
    semCadastro = false
    this.setState({
      loading: true
    })
    // const {navigate} = this.props.navigation
    this.props.navigation.push('CadastroInicial')
    this.setState({
      loading: false
    })
  }

  async logintToCadastroFacebook (nomeUsuario, profilePicUrl) {
    //console.log("logintToCadastroFacebook");
    semCadastro = false
    this.setState({
      loading: true
    })
    const isConnected = await checkInternetConnection();
    if(isConnected){
      this.setState({
        loading: false
      })
      this.props.navigation.push('CompletaCadastro', { name: nomeUsuario, profilePic: profilePicUrl })
    }else{
      this.setState({
        loading: false
      })
      Alert.alert(
        'Conexão com a Internet',
        'Aparantemente há um problema com sua conexão de internet e não conseguimos fazer o login. Cheque para haver se você possui conexão com a internet no momento e tente novamente',
        [
          {text: 'OK', onPress: () => {

          }},
        ],
        { cancelable: false }
      )
    }

  }


  async loginToHomeFacebook(){
    //console.log("loginToHomeFacebook");
    semCadastro = false
    this.setState({
      loading: true
    })
    const isConnected = await checkInternetConnection();


    if(isConnected){
    //console.log("dentro if");
      this.setState({
        loading: false
      })
      this.props.navigation.push('Home')

    }else{
      //console.log("dentro else");
      this.setState({
        loading: false
      })
      Alert.alert(
        'Conexão com a Internet',
        'Aparantemente há um problema com sua conexão de internet e não conseguimos fazer o login. Cheque para haver se você possui conexão com a internet no momento e tente novamente',
        [
          {text: 'OK', onPress: () => {

          }},
        ],
        { cancelable: false }
      )
    }


  }

  loginSemCadastro = () => {
    this.setState({
      loading:true
    });
    //p
    semCadastro = true
    this.props.navigation.push('CadastrarEndereco')
    this.setState({
      loading: false
    });
  }


  loginWithFacebook = () => {

    var that = this
    LoginManager.logInWithReadPermissions(['public_profile', 'email']).then(function(result){
      //console.log("result 1"+JSON.stringify(result));
      if (result.isCancelled){
        //console.log("result 12"+JSON.stringify(result));
        //console.log('Login was cancelled');
      } else {
        this.setState({
          loading: true
        });
        AccessToken.getCurrentAccessToken().then((accessTokenData) => {
          let accessToken = accessTokenData.accessToken
          //console.log("accessToken"+accessToken);
          //console.log("log14");
          const credential = firebase.auth.FacebookAuthProvider.credential(accessToken)
          //console.log("credential"+JSON.stringify(credential));
            auth.signInAndRetrieveDataWithCredential(credential).then((result)=> {
              //console.log("log1");
            const responseInfoCallback = (error, result) => {
              if (error) {
                //console.log("log12");
                error_json = JSON.stringify(error)
                //console.log(error_json)
                alert('Error fetching data: ' + error.toString());
              } else {
                //console.log("log3");
                //Se tiver resposta do Graph para o Facebook
                this.setState({nameUser: result.name});
                this.setState({profilePicUrl: result.picture.data.url})
                checkUserDetails(
                  () => that.loginToHomeFacebook(),
                  () => that.logintToCadastroFacebook(this.state.nameUser, this.state.profilePicUrl)
                )
              }
            }

            //GET PHOTOURL
            const infoRequest = new GraphRequest(
              '/me',
              {
                parameters: {
                  fields: {
                    string: 'email,name,picture.width(100).height(100)' // what you want to get
                  },
                  access_token: {
                    string: accessToken.toString() // put your accessToken here
                  }
                }
              },
              responseInfoCallback
            );

            // Start the graph request.
            new GraphRequestManager().addRequest(infoRequest).start()

          }, (error) => {

            //Promise was rejected
            //console.log("promise rejected"+error)
          })
        }, (error) => {
          //console.log("Some error occured: " + error)
        })
      }
    }.bind(this), function(error){
      //console.log(' Login fail with error:  '+error);
    })
  }
  render(){
    return (
      <ImageBackground
        source={images.backgroundLogin}
        style={styles.backgroundImage}>
        <Loader
          loading={this.state.loading}
          message="Aguarde enquanto a preguiça faz o seu login. Caso a internet esteja lenta pode demorar um pouco. Aguarde ou feche o aplicativo, verifique sua conexão com a internet e tente novamente."/>
        <StatusBar/>
        <ComponentsLoginRegister
          loginToHome = {this.loginToHome}
          logintToCadastro = {this.logintToCadastro}
          logintToCadastroFacebook = {this.logintToCadastroFacebook}
          loginWithFacebook = {this.loginWithFacebook}
          loginSemCadastro={this.loginSemCadastro}
          />
      </ImageBackground>
    )
  }
}
