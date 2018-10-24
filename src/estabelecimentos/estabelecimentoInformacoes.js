console.ignoredYellowBox = [
    'Setting a timer'
]
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import React, { Component } from 'react';
import { ImageBackground, Image, Text, View, ScrollView,Platform } from 'react-native'
import { styles,cores, images} from '../constants/constants'
import { getEstabelecimentoInfo, estabelecimentoInfo } from '../firebase/database'
import {carrinho, atualizarCarrinho} from '../addproduto/addproduto'
import StatusBar from '../constants/statusBar'
import LazyActivity from '../loadingModal/lazyActivity'
import LazyBackButton from '../constants/lazyBackButton'
import LazyYellowButton from '../constants/lazyYellowButton'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import _ from 'lodash';

export class EstabelecimentoInformacoesScreen extends Component {

  static navigationOptions = ({navigation}) => ({
    title: _.upperCase(navigation.state.params.nomeEstabelecimento),
    headerTitleStyle: styles.headerText,
    headerStyle: Platform.OS=="ios"? styles.headerIos : styles.header,
    headerLeft: (
      <LazyBackButton
        goBack={()=>{
            if(carrinho.length>0){
              Alert.alert(
                'Sair do Estabelecimento',
                'Tem certeza que deseja sair deste estabelecimento? Todos os items do carrinho serão perdido.',
                [
                  {text: 'Sim', onPress: () => {
                    atualizarCarrinho([])
                    navigation.navigate('ListaEstabelecimentos',
                    {tipoEstabelecimento:navigation.state.params.tipoEstabelecimento})
                  }},
                  {text: 'Não', onPress: ()=>{
                    console.log("cancelado");
                  }},
                ],
                {cancelable: false}
              )
            }else{
              navigation.navigate('Home')
            }
          }}/>
      ),
    headerRight: (<View style={styles.headerRight}></View>),
    tabBarLabel: 'Informações',
  });

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      estabInfo:"",
      nomeEstabelecimento:"",
      logo: "",
      nome: "",
      precoDelivery: "",
      tempoEntrega: "",
      seg: "",
      ter: "",
      qua: "",
      qui: "",
      sex: "",
      sab: "",
      dom: "",
      deb: "",
      cre: "",
      din: ""
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
        this._callback()
      })
    }

  }

  _callback(){
    console.log("inside callback");
    getEstabelecimentoInfo(this.state.nomeEstabelecimento, (logoUp, nomeUp, precoDeliveryUp,
      tempoEntregaUp, segUp, terUp, quaUp, quiUp, sexUp, sabUp, domUp, creUp, debUp, dinUp)=>{
      this.setState({
          logo: logoUp,
          nome: nomeUp,
          precoDelivery: precoDeliveryUp,
          tempoEntrega: tempoEntregaUp,
          seg: segUp,
          ter: terUp,
          qua: quaUp,
          qui: quiUp,
          sex: sexUp,
          sab: sabUp,
          dom: domUp,
          cre: creUp,
          deb: debUp,
          din: dinUp
      })
      this.setState({
            loading: false
          });
    })
  }

  componentDidMount(){



    console.log("CREDITO"+this.state.cre)

  }


   render() {

     let imageProfile = {
       uri: this.state.logo ? this.state.logo : 'require(../../img/makefg.png)'
     }

     const content = this.state.loading ?

     <View style={styles.containerIndicator}>
       <LazyActivity/>
     </View> :

     <ScrollView style={{flex:1}}>
       <StatusBar/>
       <View style={styles.separator}></View>
       <Image
         style={styles.imagemEstabInfo}
         source={{uri:imageProfile.uri}}/>

       <Text style={{backgroundColor: 'transparent',alignSelf: 'center',
         fontSize:26,fontFamily: 'Futura Medium Italic BT',color:cores.corPrincipal}}>{this.state.nomeEstabelecimento} </Text>

       <Text style={[styles.textInformacoes,{alignSelf: 'center',marginLeft: 0,color: cores.textDetalhes}]}>Tempo de Entrega:{this.state.tempoEntrega} </Text>

       <View style={{height: 2,backgroundColor: cores.corSecundaria,marginVertical: 15, marginHorizontal: 10}}></View>

       <Text style={styles.textInformacoes}>Horários de Funcionamento</Text>
       <Text style={styles.textInformacoesD}>Segunda-Feira: {this.state.seg}</Text>
       <Text style={styles.textInformacoesD}>Terça-Feira: {this.state.ter}</Text>
       <Text style={styles.textInformacoesD}>Quarta-Feira: {this.state.qua}</Text>
       <Text style={styles.textInformacoesD}>Quinta-Feira: {this.state.qui}</Text>
       <Text style={styles.textInformacoesD}>Sexta-Feira: {this.state.sex}</Text>
       <Text style={styles.textInformacoesD}>Sábado: {this.state.sab}</Text>
       <Text style={styles.textInformacoesD}>Domingo: {this.state.dom}</Text>

       <View style={styles.separator}></View>

       <Text style={styles.textInformacoes}>Formas de Pagamento</Text>
       <Text style={styles.textInformacoes2}>Crédito:</Text>
       <Text style={styles.textInformacoesD}>{this.state.cre.map((item, i, arr)=>{
           if(arr.length===i+1){
             return(<Text key={i}>{item.bandeira}</Text>)
           }else{
             return(<Text key={i}>{item.bandeira}, </Text>)
           }
         })
       }</Text>
       <Text style={styles.textInformacoes2}>Débito:</Text>
         <Text style={styles.textInformacoesD}>{this.state.deb.map((item, i, arr)=>{
             if(arr.length===i+1){
               return(<Text key={i}>{item.bandeira}</Text>)
             }else{
               return(<Text key={i}>{item.bandeira}, </Text>)
             }
           })
         }</Text>
       <Text style={styles.textInformacoes2}>{this.state.din}</Text>

       <View style={styles.separator}></View>

     </ScrollView>

     return (
       <ImageBackground
         source={images.imageBackground}
         style={styles.backgroundImage}>
         {content}
       </ImageBackground>
     );
     }
}
