
import React, { Component } from 'react';
import { ImageBackground,BackHandler, FlatList, Image, View, Text, Button, TouchableHighlight, YellowBox } from 'react-native'
import { styles, cores, images} from '../constants/constants'
import LazyActivity from '../loadingModal/lazyActivity'
import { updateStatus, carregarPedidos } from '../firebase/database'
import DetalhesPedidoListItem from './detalhesPedidoListItem'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ListItemSeparator from '../constants/listItemSeparator'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import LazyBackButton from '../constants/lazyBackButton'

var endereco = ''
var bairro = ''
var estabelecimento = ''
var formaPgto = ''
var carrinho = []
var valorCompra = ''
var logo = ''
var createdAt = ''
var frete = 0
let totalPrice = 0
var year = ''
var month = ''
var day = ''
var hours = ''
var minutes = ''
var seconds = ''
var status = ''

export class DetalhesPedidoScreen extends Component {

  static navigationOptions = ({navigation}) => ({
    title: "DETALHES DO PEDIDO",
    headerTitleStyle: styles.headerText,
    headerStyle: styles.header,
    headerLeft: (
      <LazyBackButton
        goBack={()=>{
          navigation.navigate('HistoricoPedidos')
        }}/>
      ),
    headerRight: (<View></View>)
  })

  constructor(props) {
    super(props);
    //Estados para pegar as informações do Usuário
    this.state = {
      loading:false,
      messages:[],
      refreshing: false,
      frete: 6
    }

  }
  componentWillUnmount() {
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick=()=> {
    this.props.navigation.goBack();
    return true;
  }

  componentWillMount(){
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick)
    this.setState({
      loading:true
    });
  }

  componentDidMount(){
    const {state} = this.props.navigation
    this.endereco = state.params ? state.params.endereco : ""
    this.bairro = state.params ? state.params.bairro : ""
    this.estabelecimento = state.params ? state.params.estabelecimento : ""
    this.formaPgto = state.params ? state.params.formaPgto : ""
    this.carrinho = state.params ? state.params.carrinho : ""
    this.total = state.params ? state.params.total : ""
    console.log("total"+this.total);
    this.logo = state.params ? state.params.logo : ""
    this.createdAt = state.params ? state.params.createdAt : ""
    this.frete = state.params ? state.params.frete : ""
    console.log("frete"+this.frete);
    this.retirar = state.params ? state.params.retirar : ""
    this.status = state.params ? state.params.status : ""

    this.year = this.createdAt.getUTCFullYear();
    console.log("this.year"+this.year);
    this.month = this.createdAt.getUTCMonth() + 1; // getMonth() is zero-indexed, so we'll increment to get the correct month number
    this.day = this.createdAt.getUTCDate();
    this.hours = this.createdAt.getUTCHours();
    this.minutes = this.createdAt.getUTCMinutes();
    this.seconds = this.createdAt.getUTCSeconds();

    this.month = (this.month < 10) ? '0' + this.month : this.month;
    console.log("this.month"+this.month);
    this.day = (this.day < 10) ? '0' + this.day : this.day;
    this.hours = (this.hours < 10) ? '0' + (this.hours-3) : (this.hours-3);
    this.minutes = (this.minutes < 10) ? '0' + this.minutes : this.minutes;
    this.seconds = (this.seconds < 10) ? '0' + this.seconds: this.seconds;

    this.setState({
      loading: false
    });
    console.log("loading false");
  }

  valorVirgula(valor){
    console.log("valor"+valor);
    var str = (valor).toFixed(2)
    var res = str.toString().replace(".",",")
    return(
        <Text style={styles.textResumoPgto}>{res}</Text>
    )
  }

  functionListaPedidos(){
    return(
    <View style={{flexDirection: 'column'}}>
      <View style={{flexDirection: 'row',justifyContent: 'space-between',marginVertical:hp('1.11%')}}>
        <View>
          <Text style={[styles.textHistoricoPedidos,{fontSize: wp('5.5%'), marginTop:hp('0.55%')}]}>
            {this.estabelecimento}
          </Text>
        </View>
        <View style={{marginRight: 10}}>
          <Image
            source={{uri:this.logo}}
            style={styles.imagemTipoEstabelecimento}
            />
        </View>
      </View>

      <Text style={[styles.textResumoPgto, {alignSelf: 'center', fontSize: wp('3.75%')}]}>Resumo do Pedido</Text>
      <View style={{height: 100, borderWidth: 1,borderColor: cores.corPrincipal,marginHorizontal: 3}}>
        <FlatList
          ItemSeparatorComponent={ListItemSeparator}
          data= {this.carrinho}
          extraData={this.state}
          renderItem= {
            ({item}) =>
            <DetalhesPedidoListItem
              item ={item}
              preco={() => {
                var str = (item.preco*item.quantidade).toFixed(2)
                var res = str.toString().replace(".",",")
                return(
                    <Text style={[styles.textCarrinho, {fontSize: wp('3.25%'), alignSelf: 'flex-end', marginRight: 15}]}>R$ {res}</Text>
                )
              }}>
            </DetalhesPedidoListItem>}
          keyExtractor={item => item._id.toString()}
          />
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 10, marginTop: hp('0.55%')}}>
        <Text style={[styles.textResumoPgto]}>Valor Pedido:</Text>
        <Text style={[styles.textResumoPgto,{alignItems:'flex-end'}]}>R$ {this.valorVirgula(this.total)}</Text>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 10, marginTop: hp('0.55%')}}>
        <Text style={[styles.textResumoPgto]}>Valor Frete:</Text>
        <Text style={[styles.textResumoPgto,{alignItems:'flex-end'}]}>R$ {this.frete}</Text>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 10, marginTop: hp('0.55%')}}>
        <Text style={[styles.textResumoPgto]}>Valor Total Pedido:</Text>
        <Text style={[styles.textResumoPgto,{alignItems:'flex-end'}]}>R$ {this.valorVirgula(this.total+this.frete)}</Text>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 10, marginTop: hp('0.55%')}}>
        <Text style={[styles.textResumoPgto]}>Forma de Pagamento Utilizada:</Text>
        <Text style={[styles.textResumoPgto,{alignItems:'flex-end'}]}>{this.formaPgto}</Text>
      </View>


        {this.retirar?
          <View style={{marginTop:hp('1.11%')}}>
          <Text style={[styles.textAdicionais,{fontSize: wp('4%')}]}>Informações da entrega</Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.textHistoricoPedidos}>Pedido feito para retirar no estabelecimento.</Text>
          </View>
          </View>
        :
          <View style={{marginTop:hp('1.11%')}}>
          <Text style={[styles.textAdicionais,{fontSize: wp('4%')}]}>Informações da entrega</Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.textHistoricoPedidos}>Entregue no endereço: </Text>
            <Text>{this.endereco}</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={[styles.textHistoricoPedidos]}>
              Data do Pedido: {this.day+"/"+this.month+"/"+this.year}
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={[styles.textHistoricoPedidos]}>
              Horário do Pedido: {this.hours+":"+this.minutes+":"+this.seconds}
            </Text>
          </View>
          </View>
        }
        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 10, marginTop: hp('0.55%')}}>
          <Text style={[styles.textResumoPgto]}>Status do Pedido:</Text>
          <Text style={[styles.textResumoPgto,{alignItems:'flex-end'}]}>{this.status}</Text>
        </View>

    </View>

    )
  }

  render() {
    console.ignoredYellowBox = [
      'Setting a timer'
    ]

    const content = this.state.loading ?

    <View style={styles.containerIndicator}>
      <LazyActivity/>
    </View> :

    <View>
      <View>{this.functionListaPedidos()}</View>
    </View>


    return (
      <ImageBackground
        source={images.imageBackground}
        style={styles.backgroundImage}>
        <View style={{flex:1}}>
          {content}
        </View>
      </ImageBackground>
    );
  }

}
