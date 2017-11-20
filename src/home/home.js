
import React, { Component } from 'react';
import { Image, Alert, View, Text, Button, ActivityIndicator, FlatList } from 'react-native'
import { styles } from '../constants/constants'
import { checkUserDetails, getUserDetails, atualizarProfilePicture } from '../firebase/database'
import * as firebase from 'firebase';
import HomeListItem from './homeListItem'
import {dadosTipoEstabelecimento} from './dadosTipoEstabelecimento'
import { SearchBarEstabelecimentos } from './searchBarEstabelecimentos'

import _ from 'lodash'

export class HomeScreen extends Component {
  static navigationOptions = {
    header: null,
    tabBarLabel: 'Estabelecimentos',
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
    //Estados para pegar as informações do Usuário
    this.state = {
      nome:'',
      telefone:'',
      endereco:'',
      numeroEnd:'',
      bairro:'',
      referencia:'',
      profilePicURL:'',
      loading: false,
    }

  }

  renderSeparator = () => {
   return (
     <View
       style={{
         height: 1,
         width: "100%",
         backgroundColor: "#CED0CE",
         marginLeft: 5,
         marginBottom: 7
       }}
     />
   );
 };

  async componentWillMount(){
    console.log('DADOSTIPOESTABELECIMENTO'+dadosTipoEstabelecimento)
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

  goToAtualizarEndereco (endereco, numeroEnd, bairro, referencia){
    const { navigate } = this.props.navigation;
    navigate('AtualizaEndereco', {enderecoUp: endereco, numeroEndUp: numeroEnd, bairroUp: bairro,
    referenciaUp: referencia})
  }

  usuarioCompleto(){
    console.log('usuario com cadastro completo')
  }

  usuarioNaoCompleto(){
    const { navigate } = this.props.navigation;
    Alert.alert(
      'Completar Cadastro',
      'Você precisa completar o cadastro para continuar navegando pelos estabelecimentos',
      [
        {text: 'OK', onPress: () => navigate('CompletaCadastro')},
      ],
      { cancelable: false }
    )
  }

  componentDidMount(){
    //checar se o usuario já tem o cadastro completo
    checkUserDetails(
      //se já tiver cadastro completo
      ()=> this.usuarioCompleto(),
      //se não tiver cadastro completo
      ()=> this.usuarioNaoCompleto()
    )
  }



  render() {
    console.ignoredYellowBox = [
      'Setting a timer'
    ]

    const content = this.state.loading ?

    <View style={styles.containerIndicator}>
      <ActivityIndicator
        color = '#8b0000'
        size="large"
        style = {styles.activityIndicator}/>
    </View> :

    <View style={{flex:1}}>

    <View style={{flexDirection: 'row',alignItems: 'center', justifyContent: 'center'}}>
      <Text style={styles.textEndHome}>{_.upperFirst(this.state.endereco)}, {this.state.numeroEnd} - </Text>
      <Text
        style={styles.textUpdateEnd}
        onPress = { () => this.goToAtualizarEndereco(this.state.endereco,this.state.numeroEnd,this.state.bairro,this.state.referencia) }>
      Trocar Endereço
      </Text>
    </View>

    <View style={styles.separator}></View>

    <SearchBarEstabelecimentos
      containerStyle={styles.searchBarContainer}
      style={styles.searchBar}
      inputStyle={styles.searchBarInput}
      placeholder='Procurar estabelecimento...'
      placeholderTextColor='#8b0000'
      returnKeyType="search"/>

    <View>
      <Text style={styles.nomeAppHome}>Opções Delivery</Text>
    </View>

    <FlatList
      ItemSeparatorComponent={this.renderSeparator}
      data= {dadosTipoEstabelecimento}
      renderItem= {({item}) =>
      <HomeListItem
        tipoEstabelecimento = {item.tipoEstabelecimento}
        imglogo = {item.logo}
        navigation={this.props.navigation}>
      </HomeListItem>}
      keyExtractor={item => item.tipoEstabelecimento}
      />

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
