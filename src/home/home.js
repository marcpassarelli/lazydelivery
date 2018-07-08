
import React, { Component } from 'react';
import { Image, Alert, View, Text, Button, ActivityIndicator,BackHandler, Platform, FlatList, TouchableOpacity, Modal, TouchableHighlight} from 'react-native'
import { styles, cores } from '../constants/constants'
import { getUserListEnd, checkUserDetails, getUserEndAtual, atualizarProfilePicture, getNomeEstabelecimentos, nomesEstabelecimentos } from '../firebase/database'
import * as firebase from 'firebase';
import HomeListItem from './homeListItem'
import StatusBar from '../constants/statusBar'
import SearchEstabelecimentoListItem from './searchEstabelecimentoListItem'
import {dadosTipoEstabelecimento} from './dadosTipoEstabelecimento'
import { SearchBar } from 'react-native-elements'
import Loader from '../loadingModal/loadingModal';
import ModalEnd from './modalEnd'


import _ from 'lodash'

let listener = null
let user =''

export class HomeScreen extends Component {
  static navigationOptions = {
    header: null,
    tabBarLabel: 'Delivery',
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
      loadingList: false,
      showProcura: false,
      nomesEstabSearch:'',
      text:'',
      modalVisible: true,
      modalLoaded: true,
      key:'',
      modalEnd: false
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

    this.setState({
            loadingList: true
          });
    this.user = await firebase.auth().currentUser;
    console.log("user"+JSON.stringify(this.user.uid));



    getNomeEstabelecimentos()
    getUserListEnd(this.user.uid)

    this.setState({
      nomesEstabSearch: nomesEstabelecimentos
    });

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

    getUserEndAtual((enderecoP,numeroEndP,bairroP,referenciaP)=>{

        this.setState({
          endereco:enderecoP,
          numeroEnd:numeroEndP,
          bairro:bairroP,
          referencia:referenciaP
        },function(){
          console.log("state.endereco"+this.state.endereco);
        });
        this.setState({
                loadingList: false
              });
      })

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

  showModal(){
    this.setState({
      modalEnd: !this.state.modalEnd,
      loadingList: false
    });

    getUserEndAtual((enderecoP,numeroEndP,bairroP,referenciaP)=>{

        this.setState({
          endereco:enderecoP,
          numeroEnd:numeroEndP,
          bairro:bairroP,
          referencia:referenciaP
        },function(){
          console.log("state.endereco"+this.state.endereco);
        });
        this.setState({
                loadingList: false
              });
      })
  }

  adicionaEnd = () => {
     this.props.navigation.navigate('CadastrarEndereco')
     this.showModal()
   }
  // () => this.goToAtualizarEndereco(this.state.endereco,this.state.numeroEnd,
  //   this.state.bairro,this.state.referencia, this.state.key)

  render() {
    console.ignoredYellowBox = [
      'Setting a timer'
    ]

    const content = this.state.loadingList ?

    <View style={styles.containerIndicator}>
      <ActivityIndicator
        color = '#8b0000'
        size="large"
        style = {styles.activityIndicator}/>
    </View> :

    <View style={{flex:1}}>
    <StatusBar/>
      <View style={{flexDirection: 'row',alignItems: 'center', justifyContent: 'center'}}>
        <Text style={styles.textEndHome}>{_.upperFirst(this.state.endereco)}, {this.state.numeroEnd} - </Text>
        <Text
          style={styles.textUpdateEnd}
          onPress = {()=>{
            this.setState({
              loadingList: true,
              modalEnd: !this.state.modalEnd
            });
          }}>
        Trocar Endereço
        </Text>
      </View>
      <View>
        <SearchBar
          onChangeText={(text) => {this.filterSearch(text)}}
          onClearText={() => this.setState({showProcura: false, opacity: 1})}
          containerStyle={styles.searchBarContainer}
          style={styles.searchBar}
          inputStyle={styles.searchBarInput}
          placeholder='Procurar estabelecimento...'
          placeholderTextColor='#8b0000'
          returnKeyType="search"
          clearIcon={{color:cores.corPrincipal}}/>
        <View style={{backgroundColor: '#e6e4e6', opacity: 0.8}}>
          {this.state.showProcura && this.procuraEstabelecimento() }
        </View>
      </View>

      <View style={{opacity: this.state.opacity, flex:1}}>
        <Text style={styles.nomeAppHome}>Opções Delivery</Text>
        <FlatList
          ItemSeparatorComponent={this.renderSeparator}
          data= {dadosTipoEstabelecimento}
          renderItem= {({item}) =>
          <HomeListItem
            loadingTrue = {()=> this.loadingTrue()}
            tipoEstabelecimento = {item.tipoEstabelecimento}
            imglogo = {item.logo}
            navigation = {this.props.navigation}
            loadingFalse = {()=> this.loadingFalse()}>
          </HomeListItem>}
          keyExtractor={item => item.tipoEstabelecimento}
          />
      </View>
    </View>

    return (
      <Image
        source={require('../../img/alimentos-fundo2.jpg')}
        style={styles.backgroundImage}>
        <Loader
          loading = {this.state.loading}/>
        <ModalEnd
          loading = {this.state.modalEnd}
          showModal = {()=>{this.showModal()}}
          adicionaEnd = {()=>{this.adicionaEnd()}}/>
        {content}
      </Image>
    );
  }
}
