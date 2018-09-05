import React, { Component } from 'react';
import { View, TouchableOpacity, Image, Text, Button } from 'react-native';
import { styles, cores, images} from '../constants/constants'
import _ from 'lodash'

export default class HistoricoPedidosListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status:false
    }
  }

  functionCarrinhoListItem=(item)=>{

    var year = item.createdAt.getUTCFullYear();
    var month = item.createdAt.getUTCMonth() + 1; // getMonth() is zero-indexed, so we'll increment to get the correct month number
    var day = item.createdAt.getUTCDate();
    var hours = item.createdAt.getUTCHours();
    var minutes = item.createdAt.getUTCMinutes();
    var seconds = item.createdAt.getUTCSeconds();

    month = (month < 10) ? '0' + month : month;
    day = (day < 10) ? '0' + day : day;
    hours = (hours < 10) ? '0' + (hours-3) : (hours-3);
    minutes = (minutes < 10) ? '0' + minutes : minutes;
    seconds = (seconds < 10) ? '0' + seconds: seconds;

      return (
        <View>

            <View style={{flex: 1, flexDirection: 'column'}}>
              <View style={{flexDirection: 'row',justifyContent: 'space-between',marginVertical: 10}}>
                <View>
                  <Text style={[styles.textHistoricoPedidos,{fontSize: 22, marginTop:5}]}>
                    {item.estabelecimento}
                  </Text>
                  <Text style={[styles.textHistoricoPedidos]}>
                    Valor Compra: R${(item.valorCompra+item.frete).toFixed(2)}
                  </Text>
                </View>
                <View style={{marginRight: 10}}>
                  <Image
                    source={{uri:item.logo}}
                    style={styles.imagemTipoEstabelecimento}
                    />
                </View>
              </View>
              <View style={{flexDirection: 'row',justifyContent: 'space-between',marginVertical: 10}}>
                <View>
                  <Text style={[styles.textHistoricoPedidos]}>
                    Data do Pedido: {day+"/"+month+"/"+year}
                  </Text>
                  <Text style={[styles.textHistoricoPedidos]}>
                    Horário do Pedido: {hours+":"+minutes+":"+seconds}
                  </Text>
                </View>
                <View style={{marginRight: 10}}>
                  <TouchableOpacity
                    style={[styles.buttons,{width: null, marginHorizontal: 10}]}
                    onPress = { () => {this.props.avaliarPedido()} } >
                    <Text style={[styles.textButtons,{marginHorizontal: 5}]}>AVALIAR PEDIDO</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <TouchableOpacity
                style={[styles.buttons,{width: null, marginBottom: 5}]}
                onPress={this.props.onPressSend}>
                <Text style={[styles.textButtons,{marginHorizontal: 5}]}>
                  CLIQUE PARA MAIS DETALHES SOBRE O PEDIDO
                </Text>
                </TouchableOpacity>
            </View>
        </View>
      );
  }

  //this.functionButton(item,this.props.onPressSend)

  render() {
    const { item } = this.props;
    return(
      <View>
        {this.functionCarrinhoListItem(item)}
      </View>
    )
  }
}
