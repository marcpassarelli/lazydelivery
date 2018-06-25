import React, { Component } from 'react';
import { View, TouchableOpacity, Image, Text, Button } from 'react-native';
import { styles, cores } from '../constants/constants'


export default class HistoricoPedidosListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status:false
    }
  }

  functionButton=(item,functionProps)=>{
    console.log(" dentro function button status"+JSON.stringify(item.status));
    if(item.status=="recebido"){
      console.log("dentro do pedido já aceito")
      return(
        <Text>Pedido já aceito.</Text>
      )
    }else{
      return(
      <Button
        onPress={functionProps}
        title="Pedido Pendente"
        color="#8b0000"
        accessibilityLabel="YourLabelHere"
      />)
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
          <TouchableOpacity
            style={item.status=="recebido" ? styles.recebidoStatus : styles.aguardandoStatus}
            onPress={this.props.onPressSend}>
            <View style={{flex: 1, flexDirection: 'column', justifyContent: 'flex-start', height: 160}}>
                <Text style={[styles.textCarrinho,
                    {marginHorizontal: 5,
                  fontSize: 13}]}>Nome Cliente: {item.nome}
                </Text>
                <Text style={[styles.textCarrinho]}>
                  Telefone: {item.telefone}
                </Text>
                <Text style={[styles.textCarrinho]}>
                  Endereco: {item.endereco}
                </Text>
                <Text style={[styles.textCarrinho]}>
                  Bairro: {item.bairro}
                </Text>
                <Text style={[styles.textCarrinho]}>
                  Referência: {item.referencia}
                </Text>
                <Text style={[styles.textCarrinho]}>
                  Horário do Pedido: {hours+":"+minutes+":"+seconds}
                </Text>
                <Text style={[styles.textCarrinho]}>
                  Data do Pedido: {day+"/"+month+"/"+year}
                </Text>
                <Text style={[styles.textCarrinho, {fontSize: 16  , alignSelf: 'center'}]}>Status: {item.status}</Text>
            </View>
          </TouchableOpacity>
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
