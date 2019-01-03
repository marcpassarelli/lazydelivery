
import React, { Component } from 'react';
import { ImageBackground, Image, Alert, View, Text, Button,BackHandler, Platform, FlatList, TouchableOpacity, Modal, TouchableHighlight} from 'react-native'
import { styles, cores, images} from '../constants/constants'
import LazyActivity from '../loadingModal/lazyActivity'
import { checkUserDetails, getUserDetails, atualizarProfilePicture, getNomeEstabelecimentos, nomesEstabelecimentos } from '../firebase/database'
import HomeListItem from './homeListItem'
import SearchEstabelecimentoListItem from './searchEstabelecimentoListItem'
import {dadosTipoEstabelecimento} from './dadosTipoEstabelecimento'
import { SearchBar } from 'react-native-elements'
import Loader from '../loadingModal/loadingModal';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {auth} from '../firebase/firebase'

import _ from 'lodash'

let listener = null

export class DestaquesScreen extends Component {
  static navigationOptions = {
    header: null,
    tabBarLabel: 'DESTAQUES',
    // Note: By default the icon is only shown on iOS. Search the showIcon option below.
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../../img/destaques.png')}
        style={[styles.icon]}
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
      bairro:'',
      referencia:'',
      profilePicURL:'',
      loading: false,
      loadingList: false,
      showProcura: false,
      nomesEstabSearch:'',
      text:'',
      modalVisible: true,
      modalLoaded: true
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
         marginBottom:hp('0.77%')
       }}
     />
   );
 };

  async componentWillMount(){
    this.setState({
            loadingList: true
          });
    let user = await auth.currentUser;

    // getNomeEstabelecimentos()

    this.setState({
      nomesEstabSearch: nomesEstabelecimentos
    });

  }

  goToAtualizarEndereco (endereco, bairro, referencia){
    const { navigate } = this.props.navigation;
    navigate('AtualizaEndereco', {enderecoUp: endereco, bairroUp: bairro,
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

    if (Platform.OS == "android" && listener == null) {
      listener = BackHandler.addEventListener("hardwareBackPress", () => {
        BackHandler.exitApp()
      })
    }

    //checar se o usuario já tem o cadastro completo
    checkUserDetails(
      //se já tiver cadastro completo
      ()=> this.usuarioCompleto(),
      //se não tiver cadastro completo
      ()=> this.usuarioNaoCompleto()
    )
  }

  procuraEstabelecimento(){
    return (
      <View style = {{marginLeft:10, height:130}}>
        <FlatList
          keyboardShouldPersistTaps={'always'}
          ItemSeparatorComponent={this.renderSeparator}
          data= {this.state.nomesEstabSearch}
          renderItem= {({item}) =>
          <SearchEstabelecimentoListItem
            estabelecimento = {item.nome}
            imglogo = {item.logo}
            navigation={this.props.navigation}
            loadingTrue = {()=> this.loadingTrue()}
            loadingFalse = {()=> this.loadingFalse()}>
          </SearchEstabelecimentoListItem>}
          keyExtractor={item => item.nome}/>
      </View>
    )
  }

  filterSearch(text){
    this.setState({
      showProcura: true,
      opacity: 0.2})
    const newData = nomesEstabelecimentos.filter(function(item){
      const itemData= item.nome.toUpperCase()
      const textData= text.toUpperCase()
      return itemData.indexOf(textData) > -1
    })
    this.setState({
      nomesEstabSearch: newData,
      text: text
    }, function(){
      if(!this.state.text){
        this.setState({
          showProcura:false,
          opacity: 1
        });
      }
    });
  }

  loadingTrue(){
    console.log("dentroLoadingTrue");
    this.setState({loadingList:true})
  }
  loadingFalse(){
    console.log("dentroLoadingFalse");
    this.setState({loadingList:false})
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

    //    <View style={styles.separator}></View>
// style={{position: 'absolute', backgroundColor: '#e6e4e6', opacity: 0.8, top:49, left: 18, right: 18}}
  render() {
    console.ignoredYellowBox = [
      'Setting a timer'
    ]

    const content =

    <View style={{flex:1}}>
      <Text style={{fontSize: wp('5%'), marginTop: hp('3.33%')}}>Em breve...</Text>
    </View>

    return (
      <ImageBackground
        source={images.imageBackground}
        style={styles.backgroundImage}>
        <Loader
          loading = {this.state.loading}/>
        {content}
      </ImageBackground>
  );
}

}
// const content = this.state.loadingList ?
//
// <View style={styles.containerIndicator}>
//   <LazyActivity/>
// </View> :
//
// <View style={{flex:1}}>
//   <Text style={{fontSize: wp('5%'), marginTop: hp('3.33%')}}>Em breve...</Text>
// </View>
//
