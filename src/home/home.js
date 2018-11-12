
import React, { Component } from 'react';
import { ImageBackground, Image, Alert, View, Text, BackHandler, Platform, FlatList, Modal, AsyncStorage } from 'react-native'
import { styles, cores, images } from '../constants/constants'
import { listaEnderecos, getUserListEnd, checkUserDetails, getUserEndAtual, getNomeEstabelecimentos, nomesEstabelecimentos } from '../firebase/database'
import HomeListItem from './homeListItem'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import StatusBar from '../constants/statusBar'
import SearchEstabelecimentoListItem from './searchEstabelecimentoListItem'
import {dadosTipoEstabelecimento} from './dadosTipoEstabelecimento'
import { SearchBar } from 'react-native-elements'
import Loader from '../loadingModal/loadingModal';
import ModalEnd from './modalEnd'
import {auth} from '../firebase/firebase'
import LazyActivity from '../loadingModal/lazyActivity'
import LazySearchBar from '../constants/lazySearchBar'
import _ from 'lodash'
import ListItemSeparator from '../constants/listItemSeparator'

let listener = null
let user =''

export class HomeScreen extends Component {
  static navigationOptions = {
    tabBarLabel: 'DELIVERY',
    // Note: By default the icon is only shown on iOS. Search the showIcon option below.
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../../img/delivery.png')}
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
      modalLoaded: true,
      key:'',
      modalEnd: false
    }

  }
  async componentWillMount(){
    this.setState({
            loadingList: true
          });

    this.user = await auth.currentUser;
    console.log(this.user.uid);

    getNomeEstabelecimentos()
    getUserListEnd(this.user.uid,
    ()=>{
      getUserEndAtual((enderecoP,bairroP,referenciaP)=>{
        if(enderecoP){
          console.log("dentro do if");
          this.setState({
            endereco: enderecoP,
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
            bairro:listaEnderecos[0].bairro,
            referencia:listaEnderecos[0].referencia
          },async function(){
            try {
              await AsyncStorage.multiSet([['endAtual', this.state.endereco],
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
      <View style = {{height:130,width:wp('80%')}}>
        <FlatList
          keyboardShouldPersistTaps={'always'}
          ItemSeparatorComponent={ListItemSeparator}
          data= {this.state.nomesEstabSearch}
          renderItem= {({item}) =>
          <SearchEstabelecimentoListItem
            estabelecimento = {item.nome}
            tipoEstabelecimento = {item.tipoEstabelecimento}
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

    getUserEndAtual((enderecoP,bairroP,referenciaP)=>{

        this.setState({
          endereco:enderecoP,
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

   editEnd = (item, index) =>{
     this.props.navigation.navigate('')
   }

  render() {
    console.ignoredYellowBox = [
      'Setting a timer'
    ]

    const content = this.state.loadingList ?

    <View style={styles.containerIndicator}>
      <LazyActivity/>

    </View> :

    <View style={{flex:1}}>
    <StatusBar/>
      <View style={{marginBottom: hp('1.11%'),flexDirection: 'row',alignItems: 'center', justifyContent: 'center'}}>
        <Text style={styles.textEndHome}>{_.upperFirst(this.state.endereco)} - </Text>
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
        <LazySearchBar
          value={this.state.text}
          clearText={()=>{this.setState({
            text:"",
            showProcura:false,
            opacity:1
          });}}
          onChangeText={(text) => {this.filterSearch(text)}}
          onClearText={() => this.setState({showProcura: false, opacity: 1})}
          returnKeyType="search"
          placeholder={'PROCURAR ESTABELECIMENTO'}/>
        <View style={{marginHorizontal: 40,backgroundColor: '#e6e4e6', opacity: 0.8}}>
          {this.state.showProcura && this.procuraEstabelecimento() }
        </View>
      </View>

      <View style={{opacity: this.state.opacity, flex:1}}>
        <Text style={[styles.nomeAppHome]}>ESCOLHA A CATEGORIA</Text>
        <FlatList
          ItemSeparatorComponent={ListItemSeparator}
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
      <ImageBackground
        source={images.imageBackground}
        style={styles.backgroundImage}>
        <Loader
          loading = {this.state.loading}/>
        <ModalEnd
          editEnd = {()=>{this.editEnd()}}
          loading = {this.state.modalEnd}
          showModal = {()=>{this.showModal()}}
          adicionaEnd = {()=>{this.adicionaEnd()}}/>
        {content}
      </ImageBackground>
    );
  }
}
