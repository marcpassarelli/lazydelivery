console.ignoredYellowBox = [
    'Setting a timer'
]

import React, { Component } from 'react';
import { Platform,ImageBackground, Image, Alert, Text, View, TouchableOpacity,BackHandler } from 'react-native'
import LazyActivity from '../loadingModal/lazyActivity'
import { styles, images, cores } from '../constants/constants'
import { logout, getUserProfile } from '../firebase/database'
import FBSDK, { AccessToken, GraphRequestManager, GraphRequest } from 'react-native-fbsdk'
import { auth} from '../firebase/firebase'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import LazyYellowButton from '../constants/lazyYellowButton'
import { semCadastro } from '../login/loginregister'

let listener =null

export class ProfileScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      nome:'',
      telefone:'',
      endereco:'',
      bairro:'',
      referencia:'',
      profilePicURL:'',
      loading: false,
    };
  }

  static navigationOptions = {
     header: null,
     tabBarLabel: 'MEU CADASTRO',
     // Note: By default the icon is only shown on iOS. Search the showIcon option below.
     tabBarIcon: ({ tintColor }) => (
     <Image
       source={require('../../img/cadastro.png')}
       style={[styles.icon]}
     />
   ),
  };

  componentWillUnmount(){
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  async componentWillMount(){


      BackHandler.addEventListener("hardwareBackPress", () => {
        console.log("dentro backhandler");
        this.props.navigation.navigate('Home')
      })

    this.setState({
      loading: true
    });

    if(semCadastro){
      this.setState({
        loading:false 
      });
    }else{
    let user = await auth.currentUser;
    let provider = user.providerData[0].providerId
    console.log("provider"+provider);

          getUserProfile(user.uid, (nomeP,telefoneP,profilePicURLP)=>{
            console.log("nomePPPP"+nomeP);
            this.setState({
              nome: nomeP,
              telefone: telefoneP,
            },function(){
              console.log("state.nome"+this.state.nome);
            });
          })

        if(provider=="facebook.com"){
        console.log("AccessToken"+JSON.stringify(AccessToken.getCurrentAccessToken()));
        AccessToken.getCurrentAccessToken().then((accessTokenData) => {
          console.log("AccessTokenData"+JSON.stringify(accessTokenData));
          let accessToken = accessTokenData.accessToken
          console.log("dentroaccesstoken");
          const responseInfoCallback = (error, result) => {
            if (error) {
              error_json = JSON.stringify(error)
              console.log("error_json"+error_json)
              alert('Error fetching data: ' + error.toString());
            } else {
              this.setState({profilePicURL: result.picture.data.url})
            }
          }

          //GET PHOTOURL
          const infoRequest = new GraphRequest(
            '/me',
            {
              parameters: {
                fields: {
                  string: 'picture.width(150).height(150)' // what you want to get
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
          this.setState({
                  loading: false
                });
        }, (error) => {
          console.log("Some error occured: " + error)
          this.setState({
                  loading: false
                });
        })
      }else{
        this.setState({
          loading:false
        });
      }}

  }

  goToLogin = () =>
  {
    const {navigate} = this.props.navigation;
    navigate('LoginRegister')
  }

  goToAtualizarCadastro(nome, telefone){
    const {navigate} = this.props.navigation
    navigate('AtualizaCadastro', { nomeUp: nome, telefoneUp: telefone })
  }

  goToHistoricoPedidos(){
    const {navigate} = this.props.navigation
    navigate('HistoricoPedidos')
  }

   render() {

     console.ignoredYellowBox = [
         'Setting a timer'
     ]

     let imageProfile = {
       uri: this.state.profilePicURL!="" ? this.state.profilePicURL : 'require(../../img/makefg.png)'
     }

     const content = this.state.loading ?

     <View style={styles.containerIndicator}>
       <LazyActivity/>
     </View> :

     <View style={{flex:1}}>
       {semCadastro?
         <View>
         <Text style={[styles.titleCadastro,{marginTop: hp('23.5%'),
           marginBottom: hp('2%')}]}>VOLTAR PARA A TELA DE LOGIN PARA FAZER CADASTRO</Text>
         <LazyYellowButton
             style={{marginBottom: hp('4%')}}
             onPress={() => {
               this.props.navigation.push('LoginRegister')
             }}
             text={"IR PARA TELA INICIAL"}/>
           </View>
         :
        <View>
       <Text style={[styles.titleCadastro,{marginTop: hp('3.5%'),marginBottom: hp('2%')}]}>PERFIL</Text>
       <Image
       style={{height:120, width:120, borderWidth:1, borderRadius:55, alignSelf:'center',
         borderColor: cores.corPrincipal,borderWidth: 3}}
       source={{uri:imageProfile.uri}}/>
       <Text style={[styles.textProfileDetails,{color: 'white',fontSize: wp('4.5%')}]}> {this.state.nome} </Text>
       <Text style={[styles.textProfileDetails,
           {marginBottom: hp('2.77%'),color: 'white',fontFamily: 'FuturaBT-MediumItalic'}
         ]}> {this.state.telefone} </Text>
       <LazyYellowButton
         style={{marginBottom: hp('4%')}}
         onPress={() => {
           this.goToAtualizarCadastro(
           this.state.nome, this.state.telefone, this.state.endereco,
           this.state.bairro, this.state.referencia,
           this.state.profilePicURL)
         }}
         text={"ATUALIZAR INFORMAÇÕES"}/>
       <LazyYellowButton
         style={{marginBottom: hp('4%')}}
         onPress={() => {
           logout()
           this.goToLogin() }}
           text={'LOGOUT'}/>
       <LazyYellowButton
         style={{marginBottom: hp('1.5%')}}
         onPress={ () => {
            this.goToHistoricoPedidos()}}
          text={"HISTÓRICO DE PEDIDOS"}/>
        </View>
      }
        <Image
          source={images.iconYellow}
          style={{height: 80,width: 80,alignSelf: 'center',marginTop:hp('3.5%')}}/>

   </View>

     return (
       <ImageBackground
         source={images.backgroundLazy}
         style={styles.backgroundImage}>
         {content}
       </ImageBackground>
     );
     }
}
