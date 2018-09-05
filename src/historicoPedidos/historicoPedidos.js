
import React, { Component } from 'react';
import { ImageBackground, FlatList, Image, View, Text, Button, ActivityIndicator, TouchableHighlight, YellowBox } from 'react-native'
import { styles, cores, images} from '../constants/constants'
import { updateStatus, carregarPedidos } from '../firebase/database'
import HistoricoPedidosListItem from './historicoPedidosListItem'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

let todocount=0
let listener = null
let teste=[];
export class HistoricoPedidosScreen extends Component {

  static navigationOptions = ({navigation}) => ({
    title: "Histórico de Pedidos",
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
          navigation.navigate('Home')
          }}>
        </Icon>
      ),
    headerRight: (<View></View>)
  })

  constructor(props) {
    super(props);
    //Estados para pegar as informações do Usuário
    this.state = {
      loading:true,
      messages:[],
      refreshing: false
    }

  }

  componentDidMount(){
      teste=[]
    carregarPedidos((message)=>{
      console.log("dentro carregapedidos");
      this.setState({
        loading:true
      });
      teste.push({
        id:message._id,
        endereco:message.endereco,
        bairro: message.bairro,
        estabelecimento: message.estabelecimento,
        formaPgto: message.formaPgto,
        carrinho: message.carrinho,
        frete: message.frete,
        valorCompra: message.valorCompra,
        createdAt: message.createdAt,
        logo: message.logo,
        retirar: message.retirar,
        key: message.key
        })
      this.setState({
        messages:teste
      },function(){
        console.log("createdAt"+JSON.stringify(this.state.messages));
        this.setState({
          loading:false
        });
      });
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
      id: item.id,
      endereco:item.endereco,
      bairro: item.bairro,
      estabelecimento: item.estabelecimento,
      formaPgto: item.formaPgto,
      carrinho: item.carrinho,
      valorCompra: item.valorCompra,
      createdAt: item.createdAt,
      logo: item.logo,
      frete: item.frete,
      retirar: item.retirar
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
      <ActivityIndicator
        color = {cores.corPrincipal}
        size="large"
        style = {styles.activityIndicator}/>
    </View> :

    <View onLayout={()=>console.log(this.state.loading+"message"+this.state.messages)}>
      {
        this.state.messages ?
        <View>
          <FlatList
            ItemSeparatorComponent={this.renderSeparatorComponent}
            data={this.state.messages}
            extraData={this.state}
            renderItem={this._renderItem}
            keyExtractor={item => item.id.toString()}
          />
        </View>
            :
      <View style={{marginTop: 10}}><Text style={styles.textAddProduto}>Sem pedidos realizados.</Text></View>
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
