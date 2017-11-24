console.ignoredYellowBox = [
    'Setting a timer'
]

import React, { Component } from 'react';
import { Image, Alert, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native'
import { styles } from '../constants/constants'
import { getEstabelecimentoInfo, estabelecimentoInfo } from '../firebase/database'
import * as firebase from 'firebase';



export class EstabelecimentoInformacoesScreen extends Component {

  static navigationOptions = {
    header: null,
    tabBarLabel: 'Informações',
    // Note: By default the icon is only shown on iOS. Search the showIcon option below.
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../../img/shop-building.png')}
        style={[styles.icon, {tintColor: tintColor}]}
        />
    ),
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      estabInfo:"",
      nomeEstabelecimento:""

    };
  }

  componentWillMount(){
    this.setState({
            loading: true
          });

    const {state} = this.props.navigation;
    var nomeEstabelecimentoUp = state.params ? state.params.nomeEstabelecimento : ""

    if(nomeEstabelecimentoUp){
    this.setState({nomeEstabelecimento: nomeEstabelecimentoUp}, function(){
      this.validateUserName()

    })
    }

  }

  validateUserName(){
    console.log("setState:"+this.state.estabInfo)
    return this.state.estabInfo+""
  }

  componentDidMount(){

    console.log("antes getEstabelecimentos"+this.state.tipoEstabelecimento)

    getEstabelecimentoInfo(this.state.nomeEstabelecimento)
    this.setState({estabInfo: estabelecimentoInfo}, function(){
      this.validateUserName()
    })
    if(estabelecimentoInfo){
    this.setState({
            loading: false
          });
      }
    console.log("info"+JSON.stringify(this.state.estabInfo.logo))

  }


   render() {

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
       <Image
         style={styles.imagemTipoEstabelecimento}
         source={{uri:imageProfile.uri}}/>

       <Text style={styles.textProfileDetails}>Taxa Delivery: {this.state.nome} </Text>
       <Text style={styles.textProfileDetails}>Tempo Estimado de Entrega: {this.state.telefone} </Text>

       <Text style={styles.textProfileDetails}>Horários de Funcionamento</Text>
       <Text style={styles.textProfileDetails}>Segunda-Feira: {this.state.estabInfo.segA} às {this.state.estabInfo.segF}</Text>
       <Text style={styles.textProfileDetails}>Terça-Feira: {this.state.estabInfo.terA} às {this.state.estabInfo.terF}</Text>
       <Text style={styles.textProfileDetails}>Quarta-Feira: {this.state.estabInfo.quaA} às {this.state.estabInfo.quaF}</Text>
       <Text style={styles.textProfileDetails}>Quinta-Feira: {this.state.estabInfo.quiA} às {this.state.estabInfo.quiF}</Text>
       <Text style={styles.textProfileDetails}>Sexta-Feira: {this.state.estabInfo.sexA} às {this.state.estabInfo.sexF}</Text>
       <Text style={styles.textProfileDetails}>Sábado: {this.state.estabInfo.sabA} às {this.state.estabInfo.sabF}</Text>
       <Text style={styles.textProfileDetails}>Domingo: {this.state.estabInfo.domA} às {this.state.estabInfo.domF}</Text>

       <Text>Formas de Pagamento</Text>

       <View style={styles.separator}></View>

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
