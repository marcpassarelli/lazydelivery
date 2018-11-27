import React, { Component } from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native';
import { styles, images,cores} from '../constants/constants'


export default class ModalEndListItem extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    const { item } = this.props;
    return(
      <View>
        <View style={{flex: 1, flexDirection: 'row',justifyContent:'space-between'}}>
          <View style={{alignSelf: 'flex-start',flexDirection: 'column',marginTop:5}}>
            <Text style={[styles.textCarrinho,
                {alignSelf:'center',
                marginHorizontal: 10}]}>
              {item.endereco}
            </Text>
            <Text style={{alignSelf: 'center',fontFamily:'Futura Book',marginVertical: 5}}>
              {item.referencia}
            </Text>
          </View>
          <View style={{flexDirection: 'column', alignItems: 'flex-end',marginRight: 5,marginTop: 5}}>
            <TouchableOpacity
              onPress={()=>{this.props.selecionaEnd(),
                            this.props.showModal()}}>
              <Text style={{color: cores.textDetalhes,fontFamily:'Futura Book',marginVertical: 5}}>Selecionar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={()=>{this.props.deleteEnd()}}>
              <Text style={{color: cores.textDetalhes,fontFamily:'Futura Book'}}>Excluir Endereço</Text>
            </TouchableOpacity>
            </View>
        </View>
      </View>
    )
  }
}
