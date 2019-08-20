
import React, { Component } from 'react';
import { ImageBackground, Linking, Image,TouchableOpacity, Alert, View, Text, BackHandler, Platform, FlatList, Modal, AsyncStorage } from 'react-native'
import { styles, cores, images } from '../constants/constants'
import { getAppVersion, abertoFechado, listaEnderecos, getUserListEnd, checkUserDetails,deleteEnd, getUserEndAtual, getNomeEstabelecimentos, nomesEstabelecimentos } from '../firebase/database'
import HomeListItem from './homeListItem'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import StatusBar from '../constants/statusBar'
import SearchEstabelecimentoListItem from './searchEstabelecimentoListItem'
import {dadosTipoEstabelecimento} from './dadosTipoEstabelecimento'
import { SearchBar } from 'react-native-elements'
import Loader from '../loadingModal/loadingModal';
import ModalEnd from './modalEnd'
import {auth} from '../firebase/firebase'
import firebase from 'react-native-firebase';
import { Notification, NotificationOpen } from 'react-native-firebase';
import LazyActivity from '../loadingModal/lazyActivity'
import LazySearchBar from '../constants/lazySearchBar'
import _ from 'lodash'
import { atualizarCarrinho} from '../addproduto/addproduto'
import ListItemSeparator from '../constants/listItemSeparator'
import { semCadastro } from '../login/loginregister'
import VersionNumber from 'react-native-version-number';

let listener = null
let user =''
let newListaEstabelecimentosOpen = []
let todoCounter=0

export var aberto=''
export var fechando=''
export var horarioFechamento=''
export function atualizarAberto(abertoNovo,fechandoNovo,horarioFechamentoNovo){
  aberto = abertoNovo
  fechando = fechandoNovo
  horarioFechamento = horarioFechamentoNovo
}


export var frete =0
export function atualizarFrete(freteNovo){
  frete = parseFloat(freteNovo)
}


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

  async usuarioCompleto () {

    this.setState({
            loadingList: true
          });

    this.user = await auth.currentUser;


    getUserListEnd(this.user.uid,
    ()=>{
      getUserEndAtual((enderecoP,bairroP,referenciaP)=>{
        if(enderecoP){
          this.setState({
            endereco: enderecoP,
            bairro:bairroP,
            referencia:referenciaP
          },function(){
            getNomeEstabelecimentos(this.state.bairro,
            ()=>{
              this.getEstabComFrete()
            })
          })
        }else{
          this.setState({
            endereco: listaEnderecos[0].endereco,
            bairro:listaEnderecos[0].bairro,
            referencia:listaEnderecos[0].referencia
          },async function(){
            // getNomeEstabelecimentos(this.state.bairro)
            try {
              await AsyncStorage.multiSet([['endAtual', this.state.endereco],
                                          ['bairro', this.state.bairro], ['referencia', this.state.referencia]]);

            } catch (error) {
              //console.log("error AsyncStorage cadastrarEndereco"+error)
            }
          })
          // getDay()
          this.setState({
                  listaModalEnd: listaEnderecos,
                  loadingList:false
                });
        }
        })
    })
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

  getEstabComFrete(){
    newListaEstabelecimentosOpen=[]
    abertoFechado.map((aberto,index2)=>{
      nomesEstabelecimentos.map((lista,index)=>{
        // //console.log("lista.frete"+lista.frete+"  lista.nome"+lista.nome);
        if(aberto.nome==lista.nome){
          if(aberto.aberto==true&&lista.frete!='n'){

            newListaEstabelecimentosOpen.push({
              logo: lista.logo,
              nome: lista.nome,
              tipoEstabelecimento:lista.tipoEstabelecimento,
              frete:lista.frete,
              aberto:aberto.aberto,
              fechando:aberto.fechando,
              horarioFechamento:aberto.horarioFechamento,
              _id:todoCounter++
            })
          }else if(aberto.aberto==false&&lista.frete!='n'){

            newListaEstabelecimentosOpen.push({
              logo: lista.logo,
              nome: lista.nome,
              tipoEstabelecimento:lista.tipoEstabelecimento,
              frete:lista.frete,
              aberto:aberto.aberto,
              fechando:aberto.fechando,
              horarioFechamento:aberto.horarioFechamento,
              _id:todoCounter++
            })
          }
        }
      })
    })
    this.setState({
      listaModalEnd: listaEnderecos,
    },function(){
      this.setState({
          nomesEstabSearch: newListaEstabelecimentosOpen,
          loadingList:false
      },function(){


      });
    });
  }

  componentWillMount(){
    if (Platform.OS == "android" && listener == null) {
      listener = BackHandler.addEventListener("hardwareBackPress", () => {
        BackHandler.exitApp()
      })
    }
  }

  componentWillUnmount(){
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    this.removeNotificationDisplayedListener();
    this.removeNotificationListener();
    this.removeNotificationOpenedListener()
  }

  async componentDidMount(){

    getAppVersion((appVersion)=>{
      if(appVersion.version == VersionNumber.appVersion){
        //console.log("versão atualizada");
      }else {
        Alert.alert(
          "Nova atualização disponível",
          "É importante sempre manter seu app atualizado para ter todas as correções e novas funcionalidade. Deseja atualizá-lo agora?",
          [
            {text: 'Agora não.', onPress: () => {}},
            {text: 'Me leve para atualizar', onPress: ()=>{
              if(Platform.OS == "android"){
                Linking.openURL('https://play.google.com/store/apps/details?id=com.deliverypassa')
              }else{
                Linking.openURL('https://itunes.apple.com/br/app/lazy-delivery/id1449359471?mt=8')
              }
            }
            }
          ],
          { cancelable: false }
        )
      }
      // Platform.OS == "android"
      // //console.log("version db: "+);
      // //console.log("appVersion"+);
    })
    this.removeNotificationDisplayedListener = firebase.notifications().onNotificationDisplayed((notification: Notification) => {
        // Process your notification as required
        // ANDROID: Remote notifications do not contain the channel ID. You will have to specify this manually if you'd like to re-display the notification.
    });
    this.removeNotificationListener = firebase.notifications().onNotification((notification: Notification) => {
      //console.log("notification"+notification);
      Alert.alert(
        notification.title,
        notification.body,
        [
          {text: 'OK', onPress: () => {}},
        ],
        { cancelable: false }
      )
        // Process your notification as required
    });
    this.removeNotificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen: NotificationOpen) => {
        // Get the action triggered by the notification being opened
        const action = notificationOpen.action;
        // Get information about the notification that was opened
        const notification: Notification = notificationOpen.notification;
    });

    // Build a channel

    this.checkPermission();

    atualizarCarrinho([])
    this.setState({
      loadingList:true
    });
    if(semCadastro){
      //console.log("sem cadastro");
      getUserEndAtual((enderecoP,bairroP,referenciaP)=>{
          this.setState({
            endereco: enderecoP,
            bairro:bairroP,
            referencia:referenciaP
          },function(){
            getNomeEstabelecimentos(this.state.bairro,
            ()=>{
              this.getEstabComFrete()
            })
          })
        })
    }else{
      //console.log("tem cadastro");
      //checar se o usuario já tem o cadastro completo
      checkUserDetails(
        //se já tiver cadastro completo
        ()=> {this.usuarioCompleto()},
        //se não tiver cadastro completo
        ()=> this.usuarioNaoCompleto()
      )
    }

  }

  async checkPermission() {
  const enabled = await firebase.messaging().hasPermission();
  if (enabled) {
    //console.log("checkPermission"+enabled);
      this.getToken();
  } else {
      this.requestPermission();
  }
  }

  //3
  async getToken() {
  let fcmToken = await AsyncStorage.getItem('fcmToken');
  if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
      if (fcmToken) {
          // user has a device token
          await AsyncStorage.setItem('fcmToken', fcmToken);
      }
  }
  }

  //2
  async requestPermission() {
  try {
      await firebase.messaging().requestPermission();
      // User has authorised
      this.getToken();
  } catch (error) {
      // User has rejected permissions
      //console.log('permission rejected');
  }
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
            horarioFechamento={item.horarioFechamento}
            aberto={item.aberto}
            fechando={item.fechando}
            frete={item.frete}
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
    const newData = newListaEstabelecimentosOpen.filter(function(item){
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
              //console.log("error AsyncStorage cadastrarEndereco"+error)
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

     if(listaEnderecos.length>1){
       Alert.alert(
         'Deletar Endereço',
         'Deseja confirmar a deleção do endereço?',
         [
           {text: 'Sim', onPress: () => {
             //se endereço deletado for o selecionado
             if(this.state.endereco==item.endereco){

               deleteEnd(this.user.uid,item.key,
               ()=>{
                 getUserListEnd(this.user.uid,
                 async()=>{

                   try {
                     await AsyncStorage.multiSet([['endAtual', listaEnderecos[0].endereco],
                                                 ['bairro', listaEnderecos[0].bairro], ['referencia', listaEnderecos[0].referencia]]);
                   } catch (error) {
                     //console.log("error AsyncStorage"+error)
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

   selecionaEnd =  (item) =>{
     this.setState({
       loadingList:true
     });
     getNomeEstabelecimentos(item.bairro,
     ()=>{
       newListaEstabelecimentosOpen=[]
       abertoFechado.map((aberto,index2)=>{
         nomesEstabelecimentos.map((lista,index)=>{

           //console.log("lista.frete"+lista.frete+"  lista.nome"+lista.nome);
           if(aberto.nome==lista.nome){
             if(aberto.aberto==true&&lista.frete!='n'){

               newListaEstabelecimentosOpen.push({
                 logo: lista.logo,
                 nome: lista.nome,
                 tipoEstabelecimento:lista.tipoEstabelecimento,
                 frete:lista.frete,
                 aberto:aberto.aberto,
                 fechando:aberto.fechando,
                 horarioFechamento:aberto.horarioFechamento,
                 _id:todoCounter++
               })
             }else if(aberto.aberto==false&&lista.frete!='n'){

               newListaEstabelecimentosOpen.push({
                 logo: lista.logo,
                 nome: lista.nome,
                 tipoEstabelecimento:lista.tipoEstabelecimento,
                 frete:lista.frete,
                 aberto:aberto.aberto,
                 fechando:aberto.fechando,
                 horarioFechamento:aberto.horarioFechamento,
                 _id:todoCounter++
               })
             }
           }
         })
       })
       this.setState({
         listaModalEnd: listaEnderecos,
         nomesEstabSearch:newListaEstabelecimentosOpen,
       },function(){

       });

     })
     try {
       this.setState({
         endereco:item.endereco,
         bairro:item.bairro,
         referencia:item.referencia,
       }, async function(){
         await AsyncStorage.multiSet([['endAtual', item.endereco],
                                     ['bairro', item.bairro], ['referencia', item.referencia]]);

         this.setState({

           loadingList:false
         },function(){

         });

       });

     } catch (error) {
       //console.log("error AsyncStorage"+error)
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
      <View>
        <Text style={[styles.textEndHome,{marginLeft: wp('5%'),marginTop: 5,fontSize: wp('3.75%')}]}>Entregar para:</Text>
      </View>

      <View style={{marginTop:5,marginBottom: 5,flexDirection: 'row',justifyContent: 'center',alignItems: 'center'}}>
        <View style={{width:wp('60%'),marginLeft: wp('4%'),flexWrap: 'wrap'}}>
          <Text style={[styles.textEndHome,{}]}>{_.upperFirst(this.state.endereco)}</Text>
        </View>
        <View style={{width:wp('25%'),marginLeft: wp('1.5%'), marginRight: wp('3%')}}>
          <TouchableOpacity
            onPress = {()=>{
              if(semCadastro){
                this.props.navigation.push('CadastrarEndereco')
              }else{
              this.setState({
                loadingList: true,
                modalEnd: !this.state.modalEnd
              });
              }
            }}>
            <Text
              style={[styles.textUpdateEnd,{flexWrap: 'wrap'}]}>
            Trocar Endereço
            </Text>
          </TouchableOpacity>
        </View>
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
            bairro={this.state.bairro}
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
