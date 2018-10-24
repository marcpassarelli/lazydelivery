
import React, { Component } from 'react';
import { ImageBackground, FlatList, Image, View, Text, Button, TouchableHighlight, YellowBox } from 'react-native'
import { styles, cores, images} from '../constants/constants'
import LazyActivity from '../loadingModal/lazyActivity'
import { updateStatus, carregarPedidos } from '../firebase/database'
import DetalhesPedidoListItem from './detalhesPedidoListItem'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ListItemSeparator from '../constants/listItemSeparator'

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

export class DetalhesPedidoScreen extends Component {

  static navigationOptions = ({navigation}) => ({
    title: "Detalhes do Pedido",
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
          navigation.navigate('HistoricoPedidos')
          }}>
        </Icon>
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

  componentWillMount(){
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
    console.log("this.carrinho"+this.carrinho);
    this.valorCompra = state.params ? state.params.valorCompra : ""
    this.logo = state.params ? state.params.logo : ""
    this.createdAt = state.params ? state.params.createdAt : ""
    this.frete = state.params ? state.params.frete : ""
    this.retirar = state.params ? state.params.retirar : ""
    console.log("this.frete"+(this.frete).toFixed(2));

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
    var str = (valor).toFixed(2)
    var res = str.toString().replace(".",",")
    return(
        <Text style={styles.textResumoPgto}>{res}</Text>
    )
  }

  functionListaPedidos(){
    return(
    <View style={{flexDirection: 'column'}}>
      <View style={{flexDirection: 'row',justifyContent: 'space-between',marginVertical: 10}}>
        <View>
          <Text style={[styles.textHistoricoPedidos,{fontSize: 22, marginTop:5}]}>
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

      <Text style={[styles.textResumoPgto, {alignSelf: 'center', fontSize: 15}]}>Resumo do Pedido</Text>
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
                    <Text style={[styles.textCarrinho, {fontSize: 13, alignSelf: 'flex-end', marginRight: 15}]}>R$ {res}</Text>
                )
              }}>
            </DetalhesPedidoListItem>}
          keyExtractor={item => item._id.toString()}
          />
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 10, marginTop: 5}}>
        <Text style={[styles.textResumoPgto]}>Valor Pedido:</Text>
        <Text style={[styles.textResumoPgto,{alignItems:'flex-end'}]}>R$ {this.valorVirgula(this.valorCompra)}</Text>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 10, marginTop: 5}}>
        <Text style={[styles.textResumoPgto]}>Valor Frete:</Text>
        <Text style={[styles.textResumoPgto,{alignItems:'flex-end'}]}>R$ {this.frete}</Text>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 10, marginTop: 5}}>
        <Text style={[styles.textResumoPgto]}>Valor Total Pedido:</Text>
        <Text style={[styles.textResumoPgto,{alignItems:'flex-end'}]}>R$ {this.valorVirgula(this.valorCompra+this.frete)}</Text>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 10, marginTop: 5}}>
        <Text style={[styles.textResumoPgto]}>Forma de Pagamento Utilizada:</Text>
        <Text style={[styles.textResumoPgto,{alignItems:'flex-end'}]}>{this.formaPgto}</Text>
      </View>


        {this.retirar?
          <View style={{marginTop: 10}}></View>
        :
          <View style={{marginTop: 10}}>
          <Text style={[styles.textAdicionais,{fontSize: 16}]}>Informações da entrega</Text>
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
