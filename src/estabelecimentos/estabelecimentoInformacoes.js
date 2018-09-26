console.ignoredYellowBox = [
    'Setting a timer'
]
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import React, { Component } from 'react';
import { ImageBackground, Image, Text, View, ScrollView } from 'react-native'
import { styles,cores, images} from '../constants/constants'
import { getEstabelecimentoInfo, estabelecimentoInfo } from '../firebase/database'
import StatusBar from '../constants/statusBar'
import LazyActivity from '../loadingModal/lazyActivity'

export class EstabelecimentoInformacoesScreen extends Component {

  static navigationOptions = ({navigation}) => ({
    title: navigation.state.params.nomeEstabelecimento,
    headerTitleStyle: styles.headerText,
    headerStyle: styles.header,
    headerLeft: (
      <Icon
        style={{marginLeft: 15}}
        name={'arrow-left'}
        size={26}
        color="#000000"
        onPress={
          ()=>{
          navigation.navigate('ListaEstabelecimentos',
          {tipoEstabelecimento:navigation.state.params.tipoEstabelecimento})
          }}>
        </Icon>
      ),
    headerRight: (<View></View>),
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

       <View style={styles.separator}></View>

       <Text style={styles.textInformacoes}>Taxa Delivery: {this.state.precoDelivery} </Text>
       <Text style={styles.textInformacoes}>Tempo Estimado de Entrega: {this.state.tempoEntrega} </Text>

       <View style={styles.separator}></View>

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
