console.ignoredYellowBox = [
    'Setting a timer'
]

import React, { Component } from 'react';
import { ImageBackground, Image, Alert, Text, View, TouchableOpacity } from 'react-native'
import LazyActivity from '../loadingModal/lazyActivity'
import { styles, images, cores } from '../constants/constants'
import { logout, getUserProfile } from '../firebase/database'
import FBSDK, { AccessToken, GraphRequestManager, GraphRequest } from 'react-native-fbsdk'
import { auth} from '../firebase/firebase'

export class ProfileScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      nome:'',
      telefone:'',
      endereco:'',
      numeroEnd:'',
      bairro:'',
      referencia:'',
      profilePicURL:'',
      loading: false,
    };
  }

  static navigationOptions = {
     header: null,
     tabBarLabel: 'Meu Cadastro',
     // Note: By default the icon is only shown on iOS. Search the showIcon option below.
     tabBarIcon: ({ tintColor }) => (
     <Image
       source={require('../../img/makefg.png')}
       style={[styles.icon, {tintColor: tintColor}]}
     />
   ),
  };

  async componentWillMount(){
    this.setState({
            loading: true
          });
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
                  string: 'picture.width(100).height(100)' // what you want to get
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
      }

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
       uri: this.state.profilePicURL ? this.state.profilePicURL : 'require(../../img/makefg.png)'
     }

     const content = this.state.loading ?

     <View style={styles.containerIndicator}>
       <LazyActivity/>
     </View> :

     <View style={{flex:1}}>
       <Text style={styles.titleCadastro}>Perfil</Text>
       <Image
       style={{height:100, width:100, borderWidth:1, borderRadius:30, alignSelf:'center'}}
       source={{uri:imageProfile.uri}}/>
       <Text style={styles.textProfileDetails}> {this.state.nome} </Text>
       <Text style={[styles.textProfileDetails,{marginBottom: 10}]}> {this.state.telefone} </Text>
       <TouchableOpacity
         style={styles.buttons}
         onPress = { () => {
           this.goToAtualizarCadastro(
           this.state.nome, this.state.telefone, this.state.endereco,
           this.state.numeroEnd, this.state.bairro, this.state.referencia,
           this.state.profilePicURL)
         }}>
         <Text style={styles.textButtons}>ATUALIZAR INFORMAÇÕES</Text>
       </TouchableOpacity>

       <View style={styles.separator}></View>

       <TouchableOpacity
         style={styles.buttons}
         onPress = { () => {
           logout()
           this.goToLogin()
         }
         }>
         <Text style={styles.textButtons}> LOGOUT </Text>
       </TouchableOpacity>

       <View style={styles.separator}></View>

       <TouchableOpacity
         style={styles.buttons}
         onPress = { () => {
           this.goToHistoricoPedidos()
         }
         }>
         <Text style={styles.textButtons}> HISTÓRICO DE PEDIDOS </Text>
       </TouchableOpacity>
     </View>

     return (
       <ImageBackground
         source={images.imageBackground}
         style={styles.backgroundImage}>
         {content}
       </ImageBackground>
     );
     }
}

//export default Home
