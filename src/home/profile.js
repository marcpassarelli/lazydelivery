console.ignoredYellowBox = [
    'Setting a timer'
]

import React, { Component } from 'react';
import { Image, Alert, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native'
import { styles } from '../constants/constants'
import { logout, checkUserDetails, getUserDetails } from '../firebase/database'
import * as firebase from 'firebase';



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
    let user = await firebase.auth().currentUser;

    getUserDetails(user.uid, (nomeP,telefoneP,enderecoP,numeroEndP,bairroP,referenciaP,profilePicURLP)=>{
      this.setState({
        nome: nomeP,
        telefone: telefoneP,
        endereco:enderecoP,
        numeroEnd:numeroEndP,
        bairro:bairroP,
        referencia:referenciaP,
        profilePicURL:profilePicURLP
      });
      this.setState({
              loading: false
            });
    })

  }

  goToLogin = () =>
  {
    const {navigate} = this.props.navigation;
    navigate('LoginRegister')
  }

  goToAtualizarCadastro(nome, telefone, endereco, numeroEnd, bairro, referencia, profilePicURL){
    const {navigate} = this.props.navigation
    navigate('AtualizaCadastro', { nomeUp: nome, telefoneUp: telefone,
    enderecoUp: endereco, numeroEndUp: numeroEnd, bairroUp: bairro,
    referenciaUp: referencia, profilePicUp: profilePicURL })
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
       <ActivityIndicator
         color = '#8b0000'
         size="large"
         style = {styles.activityIndicator}/>
     </View> :

     <View style={{flex:1}}>
       <Text style={styles.titleCadastro}>Perfil</Text>
       <Image
       style={{height:100, width:100, borderWidth:1, borderRadius:30, alignSelf:'center'}}
       source={{uri:imageProfile.uri}}/>
       <Text style={styles.textProfileDetails}> {this.state.nome} </Text>
       <Text style={styles.textProfileDetails}> {this.state.telefone} </Text>
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
     </View>

     return (
       <Image
         source={require('../../img/alimentos-fundo2.jpg')}
         style={styles.backgroundImage}>
         {content}
       </Image>
     );
     }
}

//export default Home
