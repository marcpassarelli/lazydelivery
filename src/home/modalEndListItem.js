import React, { Component } from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native';
import { styles, images} from '../constants/constants'


export default class ModalEndListItem extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    const { item } = this.props;
    return(
      <View>
        <View style={{flex: 1, flexDirection: 'row',justifyContent:'space-between'}}>
          <View style={{alignSelf: 'flex-start',flexDirection: 'column',}}>
            <Text style={[styles.textCarrinho,
                {alignSelf:'center',
                marginHorizontal: 10}]}>
              {item.endereco}
            </Text>
            <Text style={{alignSelf: 'center'}}>
              {item.referencia}
            </Text>
          </View>
          <View style={{flexDirection: 'column', alignItems: 'flex-end'}}>
            <TouchableOpacity
              onPress={()=>{this.props.editEnd()}}>
              <Text>Editar Endereço</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={()=>{this.props.selecionaEnd(),
                            this.props.showModal()}}>
              <Text>Selecionar</Text>
            </TouchableOpacity>
            </View>
        </View>
      </View>
    )
  }
}
