import React, { Component } from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native';
import { styles, images,cores} from '../constants/constants'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default class ResumoCarrinhoListItem extends Component {
  constructor(props) {
    super(props);

  }

  functionObservacao=(item)=>{
    if(item.obs){
      return(
        <Text>Observação:{item.obs}</Text>
      )
    }else{
      <Text></Text>
    }

  }

  functionCarrinhoListItem=(item)=>{
    if(item.adicional==false){
      return (
        <View style={{flex:1,
            height:35, flexDirection: 'row',justifyContent: 'space-between',
            alignItems: 'center'}}>

          <View style={
              {
              borderColor: cores.corSecundaria,
              borderWidth: 1,
              height:35,
              marginLeft:10,
              justifyContent: 'center',
              width:wp('18%')}}>
              <Text style={[styles.textCarrinho,
                  {alignSelf: 'center',
                  marginLeft: 5,
                fontSize: wp('3.75%')}]}>{item.quantidade}
              </Text>
            </View>

            <View style={{width:wp('54%'),height:35, justifyContent: 'center',
              borderColor: cores.corSecundaria,borderWidth: 1}}>
              <Text style={[styles.textCarrinho,
                  {alignSelf: 'flex-start',
                  marginHorizontal: 10,
                fontSize: wp('3.25%')}]}>
              {item.nome}
              </Text>
            </View>

            <View style={{width: wp('24%'),height: 35,marginRight: 10,
              justifyContent: 'center',borderColor: cores.corSecundaria,borderWidth: 1}}>
              {this.props.preco()}
            </View>

        </View>
      );
    }else{
      return (
        <View style={{flex:1,
            height:30, flexDirection: 'row',justifyContent: 'space-between',
            alignItems: 'center'}}>

          <View style={
              {backgroundColor:'rgba(252, 204, 60,0.5)',
              borderColor: cores.corSecundaria,
              borderWidth: 1,
              height:30,
              marginLeft:10,
              justifyContent: 'center',
              width:wp('18%')}}>
              <Text style={[styles.textCarrinho,
                  {alignSelf: 'center',
                  marginLeft: 5,
                fontSize: wp('3.75%')}]}>{item.quantidade}
              </Text>
            </View>

            <View style={{backgroundColor:'rgba(252, 204, 60,0.5)',width:wp('54%'),height:30, justifyContent: 'center',
              borderColor: cores.corSecundaria,borderWidth: 1}}>
              <Text style={[styles.textCarrinho,
                  {alignSelf: 'flex-start',
                  marginHorizontal: 10,
                fontSize: wp('3.25%')}]}>
              {item.nome}
              </Text>
            </View>

            <View style={{backgroundColor:'rgba(252, 204, 60,0.5)',width: wp('24%'),height: 30,marginRight: 10,
              justifyContent: 'center',borderColor: cores.corSecundaria,borderWidth: 1}}>
              {this.props.preco()}
            </View>

        </View>
      );
    }
  }

  render() {
    const { item } = this.props;
    return(
      <View>
        {this.functionCarrinhoListItem(item)}
      </View>
    )
  }
}
