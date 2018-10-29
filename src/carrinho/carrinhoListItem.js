import React, { Component } from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native';
import { styles, images,cores} from '../constants/constants'
import Icon from 'react-native-vector-icons/Feather';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
export default class CarrinhoListItem extends Component {
  constructor(props) {
    super(props);
  }

  functionCarrinhoListItem=(item)=>{

    if(item.adicional==false){
      return (
        <View style={{marginBottom: 2,height:50, flexDirection: 'row',justifyContent: 'space-between',alignItems: 'center',flex:1}}>
            <View style={{width:wp('54%'),height:50,justifyContent: 'center',marginLeft: 10,
              borderWidth: 1,borderColor:cores.corSecundaria}}>
              <TouchableOpacity onPress={()=>this.props.detalhes()}>
              <Text style={[styles.textCarrinho,{marginLeft: 5}]}>
                {item.nome}
              </Text>
              </TouchableOpacity>
            </View>

            <View style={{width: wp('24%'),marginHorizontal: 1.5,justifyContent: 'center',
              height:50,borderWidth: 1,borderColor:cores.corSecundaria}}>
              {this.props.preco()}
            </View>

            <View style={
                {width:wp('18%'),
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems:'center',height:50,
                marginRight: 10,borderWidth: 1,borderColor:cores.corSecundaria}}>
              <TouchableOpacity
                onPress={()=>{this.props.onSubtract()}}>
                <Icon
                  name={'minus-circle'}
                  size={23}
                  color={'rgb(43, 189, 204)'}/>
              </TouchableOpacity>
              <Text
                style={[styles.textCarrinho,
                  {alignSelf: 'center',
                  justifyContent: 'center',
                  marginHorizontal: 3,
                  fontSize: 16}]}>
                {item.quantidade}
              </Text>
              <TouchableOpacity
                style={{justifyContent: 'center', alignSelf: 'center'}}
                onPress={()=>{this.props.onAdd()}}>
                <Icon
                  name={'plus-circle'}
                  size={23}
                  color={'rgb(43, 189, 204)'}/>
              </TouchableOpacity>
            </View>
        </View>
      );
    }else{

      return (

        <View style={{marginBottom: 2,height:45, flexDirection: 'row',justifyContent: 'space-between',alignItems: 'center',flex:1}}>
            <View style={{backgroundColor:'rgba(252, 204, 60,0.8)',width:wp('54%'),height:45,justifyContent: 'center',marginLeft: 10,
              borderWidth: 1,borderColor:cores.corSecundaria}}>
              <Text style={[styles.textCarrinho,{fontSize: 14,marginLeft: 5}]}>
                {item.nome} (adicional)
              </Text>
            </View>

            <View style={{backgroundColor:'rgba(252, 204, 60,0.8)',width: wp('24%'),marginHorizontal: 1.5,justifyContent: 'center',
              height:45,borderWidth: 1,borderColor:cores.corSecundaria}}>
              {this.props.preco()}
            </View>

            <View style={
                {backgroundColor:'rgba(252, 204, 60,0.8)',width:wp('18%'),
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems:'center',height:45,
                marginRight: 10,borderWidth: 1,borderColor:cores.corSecundaria}}>
              <TouchableOpacity
                onPress={()=>{this.props.onSubtract()}}>
                <Icon
                  name={'minus-circle'}
                  size={23}
                  color={'rgb(43, 189, 204)'}/>
              </TouchableOpacity>
              <Text
                style={[styles.textCarrinho,
                  {alignSelf: 'center',
                  justifyContent: 'center',
                  marginHorizontal: 3,
                  fontSize: 16}]}>
                {item.quantidade}
              </Text>
              {item.tipoProduto=="Pizzas" ?
                <View style={{justifyContent: 'center', alignSelf: 'center'}}></View>
                :
                <TouchableOpacity
                  style={{justifyContent: 'center', alignSelf: 'center'}}
                  onPress={()=>{this.props.onAdd()}}>
                  <Icon
                    name={'plus-circle'}
                    size={23}
                    color={'rgb(43, 189, 204)'}/>
                </TouchableOpacity>
              }
            </View>
            <View>
              <Text style={{color:'#666666', marginLeft: 15, fontSize: 15}}>{item.obs}</Text>
            </View>
        </View>
      );
    }
  }

  render() {
    const { item } = this.props;
    console.log("item"+JSON.stringify(item));
    return(
      <View>
        {this.functionCarrinhoListItem(item)}
      </View>
    )
  }
}
