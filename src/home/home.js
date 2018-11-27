
import React, { Component } from 'react';
import { ImageBackground, Image, Alert, View, Text, BackHandler, Platform, FlatList, Modal, AsyncStorage } from 'react-native'
import { styles, cores, images } from '../constants/constants'
import { listaEnderecos, getUserListEnd, checkUserDetails,deleteEnd, getUserEndAtual, getNomeEstabelecimentos, nomesEstabelecimentos } from '../firebase/database'
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

  async componentDidMount(){


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

    this.setState({
            loadingList: true
          });

    this.user = await auth.currentUser;
    console.log('rendered again');

    getNomeEstabelecimentos()
    getUserListEnd(this.user.uid,
    ()=>{
      getUserEndAtual((enderecoP,bairroP,referenciaP)=>{
        if(enderecoP){
          this.setState({
            endereco: enderecoP,
            bairro:bairroP,
            referencia:referenciaP
          },function(){
            console.log("state.endereco"+this.state.endereco);
          });
          this.setState({
                  loadingList: false,
                  listaModalEnd: listaEnderecos
                });
        }else{
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
                  loadingList: false,
                  listaModalEnd: listaEnderecos
                });
        }
        })
    })

    this.setState({
      nomesEstabSearch: nomesEstabelecimentos
    });


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

    getUserListEnd(this.user.uid,
    ()=>{
      getUserEndAtual((enderecoP,bairroP,referenciaP)=>{
        if(enderecoP){
          this.setState({
            endereco: enderecoP,
            bairro:bairroP,
            referencia:referenciaP
          },function(){
            console.log("state.endereco"+this.state.endereco);
          });
          this.setState({
                  loadingList: false,
                  listaModalEnd: listaEnderecos
                });
        }else{
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
                  loadingList: false,
                  listaModalEnd: listaEnderecos
                });
        }
        })
    })
  }

  adicionaEnd = () => {
     this.props.navigation.push('CadastrarEndereco')
     this.showModal()
   }

   // editEnd = (item, index) =>{
   //   this.props.navigation.navigate('AtualizaEndereco',{
   //     enderecoUp: ,
   //     bairroUp: ,
   //     referenciaUp: ,
   //     keyUp:
   //   })
   // }

   deleteEnd = (item)=>{
     console.log("listaenderecos"+JSON.stringify(listaEnderecos));
     if(listaEnderecos.length>1){
       Alert.alert(
         'Deletar Endereço',
         'Deseja confirmar a deleção do endereço?',
         [
           {text: 'Sim', onPress: () => {
             //se endereço deletado for o selecionado
             if(this.state.endereco==item.endereco){
               console.log("dentro if");
               deleteEnd(this.user.uid,item.key,
               ()=>{
                 getUserListEnd(this.user.uid,
                 async()=>{
                   console.log("endereco"+listaEnderecos[0].endereco);
                   console.log("bairro"+listaEnderecos[0].bairro);
                   console.log("referencia"+listaEnderecos[0].referencia);
                   try {
                     await AsyncStorage.multiSet([['endAtual', listaEnderecos[0].endereco],
                                                 ['bairro', listaEnderecos[0].bairro], ['referencia', listaEnderecos[0].referencia]]);
                   } catch (error) {
                     console.log("error AsyncStorage"+error)
                   }
                   this.setState({
                     listaModalEnd:listaEnderecos,
                     endereco: listaEnderecos[0].endereco,
                     bairro:listaEnderecos[0].bairro,
                     referencia:listaEnderecos[0].referencia
                   });
                 })
               })
             }
             //se endereco deletado NÃO for o selecionado
             else{
               console.log("dentro else");
               deleteEnd(this.user.uid,item.key,
               ()=>{
                 getUserListEnd(this.user.uid,
                 ()=>{
                   this.setState({
                     listaModalEnd: listaEnderecos
                   });
                 })
               })
             }


          }},
           {text: 'Não', onPress: ()=>{
             console.log("cancelado");
           }},
         ],
         {cancelable: false}
       )
     }else{
       Alert.alert(
         'Apenas um endereço cadastrado',
         'Você precisa adicionar um novo endereço para não ficar sem endereços cadastrados.',
         [
           {text: 'OK', onPress: () => {}},
         ],
         { cancelable: false }
       )
     }
   }

   selecionaEnd = async (item) =>{
     try {
       await AsyncStorage.multiSet([['endAtual', item.endereco],
                                   ['bairro', item.bairro], ['referencia', item.referencia]]);
     } catch (error) {
       console.log("error AsyncStorage"+error)
     }
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
          listaEnderecos={this.state.listaModalEnd}
          deleteEnd = {this.deleteEnd}
          loading = {this.state.modalEnd}
          selecionaEnd={this.selecionaEnd}
          showModal = {()=>{this.showModal()}}
          adicionaEnd = {()=>{this.adicionaEnd()}}/>
        {content}
      </ImageBackground>
    );
  }
}
