import React, { Component } from 'react';
import { View, TouchableOpacity, Image, Text, Button } from 'react-native';
import { styles, cores, images} from '../constants/constants'
import _ from 'lodash'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Feather';

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
        <View style={{marginHorizontal: wp('2.5%'),flex: 1, flexDirection: 'row'}}>
          <View>
          <View style={{flexDirection: 'row',justifyContent: 'space-between',marginTop:hp('1.11%')}}>
            <View>
              <Text style={[styles.textHistoricoPedidos,{color:cores.corPrincipal,
                  fontFamily: 'Futura PT Bold',fontSize: wp('5.5%'), marginTop:hp('0.55%')}]}>
                {_.upperCase(item.estabelecimento)}
              </Text>
              <View style={{flexDirection: 'row'}}>
                <Text style={[styles.textHistoricoPedidos,{color:cores.textDetalhes}]}>
                  Valor Compra:
                </Text>
                <Text style={[styles.textHistoricoPedidos]}>
                  R${(item.valorCompra+item.frete).toFixed(2)}
                </Text>
              </View>
            </View>

          </View>
          <View style={{flexDirection: 'row',justifyContent: 'space-between',marginVertical:hp('1.11%')}}>
            <View>
              <View style={{flexDirection: 'row'}}>
                <Text style={[styles.textHistoricoPedidos,{color:cores.textDetalhes}]}>
                  Data do Pedido:
                </Text>
                <Text style={[styles.textHistoricoPedidos]}>{day+"/"+month+"/"+year}</Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text style={[styles.textHistoricoPedidos,{color:cores.textDetalhes}]}>
                  Horário do Pedido:
                </Text>
                <Text style={[styles.textHistoricoPedidos]}>{hours+":"+minutes}</Text>
              </View>
            </View>
          </View>
            <View style={{flexDirection: 'row',flex:1}}>
            <Text
              onPress={this.props.onPressSend}
              style={{fontFamily:'Futura Medium',marginHorizontal: 5,fontSize:wp('3%'),textDecorationLine:'underline'}}>
              Mais detalhes sobre o pedido
            </Text>
            <Icon
              name={'chevron-down'}
              size={wp('5%')}
              color={cores.textDetalhes}>
            </Icon>
            </View>
            </View>

            <View style={{flexDirection: 'column',flex:1,justifyContent:'center',alignContent: 'center',alignItems:'center' }}>
              <Image
                source={{uri:item.logo}}
                style={{height: hp('12%'),
                    width: wp('25%'),
                    justifyContent: 'center',
                    alignSelf: 'center'}}
                />
            </View>
        </View>
      );
  }

  // Botão Avaliar Pedido
  // <View style={{marginRight:wp('3%')}}>
  //   <TouchableOpacity
  //     style={[styles.buttons,{width:wp('25%') ,marginHorizontal: 10,borderRadius: 20}]}
  //     onPress = { () => {this.props.avaliarPedido()} } >
  //     <Text style={[styles.textButtons,{textAlign: 'center',
  //         fontFamily: 'Futura PT Bold',marginHorizontal: 5,
  //         fontSize:wp('3%') ,color:cores.corPrincipal}]}>AVALIAR PEDIDO</Text>
  //   </TouchableOpacity>
  // </View>

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
