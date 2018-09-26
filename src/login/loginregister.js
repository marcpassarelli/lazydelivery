console.ignoredYellowBox = [
    'Setting a timer'
]
import firebase from 'firebase';
import StatusBar from '../constants/statusBar'
import ComponentsLoginRegister from './componentsloginregister';
import { login, checkUserDetails } from '../firebase/database'
import React, { Component } from 'react';
import { ImageBackground, Image, Alert, BackHandler, Platform, Animated, Easing} from 'react-native';
import { styles, images} from '../constants/constants'
import FBSDK, { LoginManager, AccessToken, GraphRequestManager, GraphRequest } from 'react-native-fbsdk'
import Loader from '../loadingModal/loadingModal';
import { auth} from '../firebase/firebase'
let listener = null
export class LoginRegisterScreen extends Component {
  componentWillMount(){
    this.animatedValue = new Animated.Value(0)
  }

  componentDidMount() {
    this.runAnimation()
    //Encerrar app se for android e se back for pressionado
    if (Platform.OS == "android" && listener == null) {
      listener = BackHandler.addEventListener("hardwareBackPress", () => {
        BackHandler.exitApp()
      })
    }

  }

  runAnimation() {
    this.animatedValue.setValue(-3);
    Animated.timing(this.animatedValue, {
      toValue: -1,
      duration: 3000,
      easing:Easing.linear
    }).start(() => this.runAnimation());
  }

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
      loading: false
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


  loginToHome () {
    this.props.navigation.navigate('LoginEmail')
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

  logintToCadastroFacebook (nomeUsuario, profilePicUrl) {
    this.setState({
      loading: true
    })
    const {navigate} = this.props.navigation
    navigate('CompletaCadastro', { name: nomeUsuario, profilePic: profilePicUrl })
    this.setState({
      loading: false
    })
  }


  loginToHomeFacebook(){
    this.setState({
      loading: true
    })
    const {navigate} = this.props.navigation
    navigate('Home')
    this.setState({
      loading: false
    })
  }


  loginWithFacebook = () => {

    var that = this
    LoginManager.logInWithReadPermissions(['public_profile', 'email']).then(function(result){
      if (result.isCancelled){
        console.log('Login was cancelled');
      } else {
        this.setState({
          loading: true
        });
        AccessToken.getCurrentAccessToken().then((accessTokenData) => {
          let accessToken = accessTokenData.accessToken
          const credential = firebase.auth.FacebookAuthProvider.credential(accessToken)
            auth.signInAndRetrieveDataWithCredential(credential).then((result)=> {

            const responseInfoCallback = (error, result) => {
              if (error) {
                error_json = JSON.stringify(error)
                console.log(error_json)
                alert('Error fetching data: ' + error.toString());
              } else {

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
            console.log(error)
          })
        }, (error) => {
          console.log("Some error occured: " + error)
        })
      }
    }.bind(this), function(error){
      console.log(' Login fail with error:  '+error);
    })
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
        <ComponentsLoginRegister
          loginToHome = {this.loginToHome}
          logintToCadastro = {this.logintToCadastro}
          logintToCadastroFacebook = {this.logintToCadastroFacebook}
          loginWithFacebook = {this.loginWithFacebook}
          />
      </ImageBackground>
    )
  }
}
