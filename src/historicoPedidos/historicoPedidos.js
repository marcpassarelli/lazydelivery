
import React, { Component } from 'react';
import { ImageBackground, FlatList, Image, View, Text, Button, TouchableHighlight, YellowBox,BackHandler } from 'react-native'
import { styles, cores, images} from '../constants/constants'
import LazyActivity from '../loadingModal/lazyActivity'
import ListItemSeparator from '../constants/listItemSeparator'
import { updateStatus, carregarPedidos } from '../firebase/database'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import HistoricoPedidosListItem from './historicoPedidosListItem'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LazyBackButton from '../constants/lazyBackButton'
import _ from 'lodash';

let todocount=0
let listener = null
let temPedidos=''
let pedidosHistorico=[];
export class HistoricoPedidosScreen extends Component {

  static navigationOptions = ({navigation}) => ({
    title: "HISTÓRICO DE PEDIDOS",
    headerTitleStyle: styles.headerText,
    headerStyle: styles.header,
    headerLeft: (
      <LazyBackButton
        goBack={()=>{
          navigation.navigate('Home')
          }}/>
      ),
      headerRight:(<View style={styles.headerRight}></View>)
  })

  constructor(props) {
    super(props);
    //Estados para pegar as informações do Usuário
    this.state = {
      loading:true,
      messages:[],
      refreshing: false
    }
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);

  }


  componentWillMount() {
      BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick)
  }

  componentWillUnmount() {
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick=()=> {
    this.props.navigation.goBack();
    return true;
  }


  componentDidMount(){
      pedidosHistorico=[]
    carregarPedidos((message)=>{

      temPedidos = message._id
      if(temPedidos==false){

        this.setState({
          messages: false
        },function(){
          this.setState({
            loading:false
          });
        });
      }else{
      
      pedidosHistorico.push({
        status:message.status,
        id:message._id,
        endereco:message.endereco,
        bairro: message.bairro,
        estabelecimento: message.estabelecimento,
        formaPgto: message.formaPgto,
        carrinho: message.carrinho,
        frete: message.frete,
        total: message.total,
        valorCompra: message.valorCompra,
        createdAt: message.createdAt,
        logo: message.logo,
        retirar: message.retirar,
        key: message.key,
        })
        pedidosHistorico=_.orderBy(pedidosHistorico,['createdAt'],['desc'])
      this.setState({
        messages:pedidosHistorico
      },function(){

        this.setState({
          loading:false
        });
      })
    }
    })
  }

  renderSeparatorComponent = () => {
    return (<View style={styles.renderSeparatorComponent}/>)
  };


  _renderItem=({item,index})=>{
    return(
      <HistoricoPedidosListItem
        onPressSend={()=>this.onPressSend(item,index)}
        avaliarPedido={()=>this.avaliarPedido(item,index)}
        item={item}>
      </HistoricoPedidosListItem>
    )
  }

  onPressSend=(item,index)=>{
    // const messages = [...this.state.messages]
    const { navigate } = this.props.navigation;
    navigate('DetalhesPedido',{
      status:item.status,
      id: item.id,
      endereco:item.endereco,
      bairro: item.bairro,
      estabelecimento: item.estabelecimento,
      formaPgto: item.formaPgto,
      carrinho: item.carrinho,
      total: item.total,
      createdAt: item.createdAt,
      logo: item.logo,
      frete: item.frete,
      retirar: item.retirar,
      valorCompra: item.valorCompra
  })
  }

  avaliarPedido=(item,index)=>{
    const {navigate} = this.props.navigation
    navigate('Avaliacao',{
      id: item.id,
      key: item.key,
      estabelecimento: item.estabelecimento
    })
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
      {
        temPedidos ?
        <View>
          <FlatList
            ItemSeparatorComponent={ListItemSeparator}
            data={this.state.messages}
            extraData={this.state}
            renderItem={this._renderItem}
            keyExtractor={item => item.id.toString()}
          />
        </View>


            :
<View style={{marginTop:hp('1.11%')}}><Text style={styles.textAddProduto}>Sem pedidos realizados.</Text></View>
      }
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
