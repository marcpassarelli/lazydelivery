
import React, { Component } from 'react';
import { Image, Alert, View, Text, ActivityIndicator, BackHandler, Platform, FlatList, Modal, AsyncStorage } from 'react-native'
import { styles, cores, images } from '../constants/constants'
import { listaEnderecos, getUserListEnd, checkUserDetails, getUserEndAtual, getNomeEstabelecimentos, nomesEstabelecimentos } from '../firebase/database'
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


    getNomeEstabelecimentos()
    getUserListEnd(this.user.uid,
    ()=>{
      getUserEndAtual((enderecoP,numeroEndP,bairroP,referenciaP)=>{
        if(enderecoP){
          console.log("dentro do if");
          this.setState({
            endereco: enderecoP,
            numeroEnd:numeroEndP,
            bairro:bairroP,
            referencia:referenciaP
          },function(){
            console.log("state.endereco"+this.state.endereco);
          });
          this.setState({
                  loadingList: false
                });
        }else{
          console.log("dentro do else");
          this.setState({
            endereco: listaEnderecos[0].endereco,
            numeroEnd:listaEnderecos[0].numeroEnd,
            bairro:listaEnderecos[0].bairro,
            referencia:listaEnderecos[0].referencia
          },async function(){
            try {
              await AsyncStorage.multiSet([['endAtual', this.state.endereco], ['numeroEnd', this.state.numeroEnd],
                                          ['bairro', this.state.bairro], ['referencia', this.state.referencia]]);

            } catch (error) {
              console.log("error AsyncStorage cadastrarEndereco"+error)
            }
          });
          this.setState({
                  loadingList: false
                });
        }
        })
    })

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
            navigation={this.props.navigation}>
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

  render() {
    console.ignoredYellowBox = [
      'Setting a timer'
    ]

    const content = this.state.loadingList ?

    <View style={styles.containerIndicator}>
      <ActivityIndicator
        color = {cores.corPrincipal}
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
          placeholderTextColor={cores.corPrincipal}
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
            tipoEstabelecimento = {item.tipoEstabelecimento}
            imglogo = {item.logo}
            navigation = {this.props.navigation}>
          </HomeListItem>}
          keyExtractor={item => item.tipoEstabelecimento}
          />
      </View>
    </View>

    return (
      <Image
        source={images.imageBackground}
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
