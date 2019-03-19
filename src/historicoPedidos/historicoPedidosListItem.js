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
    console.log("item.total"+item.total+"   item.frete"+item.frete);
    var year = item.createdAt.getFullYear();
    var month = item.createdAt.getMonth() + 1; // getMonth() is zero-indexed, so we'll increment to get the correct month number
    var day = item.createdAt.getDate();
    var hours = item.createdAt.getHours();
    var minutes = item.createdAt.getMinutes();
    var seconds = item.createdAt.getSeconds();

    month = (month < 10) ? '0' + month : month;
    day = (day < 10) ? '0' + day : day;
    hours = (hours < 10) ? '0' + (hours) : (hours);
    minutes = (minutes < 10) ? '0' + minutes : minutes;
    seconds = (seconds < 10) ? '0' + seconds: seconds;

      return (
        <View style={{marginHorizontal: wp('2.5%'),flex: 1, flexDirection: 'row'}}>
          <View>
          <View style={{flexDirection: 'row',justifyContent: 'space-between',marginTop:hp('1.11%')}}>
            <View>
              <Text style={[styles.textHistoricoPedidos,{color:cores.corPrincipal,
                  fontFamily: 'FuturaPT-Bold',fontSize: wp('5.5%')}]}>
                {_.upperCase(item.estabelecimento)}
              </Text>
              <View style={{flexDirection: 'row'}}>
                <Text style={[styles.textHistoricoPedidos,{color:cores.textDetalhes}]}>
                  Valor Compra:
                </Text>
                <Text style={[styles.textHistoricoPedidos]}>
                  R${(item.total+item.frete).toFixed(2)}
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
              {item.status?
                <View style={{flexDirection: 'row'}}>
                  <Text style={[styles.textHistoricoPedidos,{color:cores.textDetalhes}]}>
                    Status do Pedido:
                  </Text>
                  <Text style={[styles.textHistoricoPedidos]}>{item.status}</Text>
                </View>
                :
                <View></View>
              }

            </View>
          </View>
            <View style={{flexDirection: 'row',flex:1}}>
            <Text
              onPress={this.props.onPressSend}
              style={{fontFamily:'Futura-Medium',marginHorizontal: 5,fontSize:wp('3%'),textDecorationLine:'underline'}}>
              Mais detalhes sobre o pedido
            </Text>
            <Icon
              name={'chevron-down'}
              size={wp('5%')}
              color={cores.textDetalhes}>
            </Icon>
            </View>
            </View>

            <View style={{flexDirection: 'column',flex:1,justifyContent:'center',alignContent: 'center',alignItems:'center',marginBottom: 5}}>
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
  //         fontFamily: 'FuturaPT-Bold',marginHorizontal: 5,
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
