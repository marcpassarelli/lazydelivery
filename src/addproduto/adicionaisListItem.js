import React, { Component } from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native';
import { styles, images} from '../constants/constants'
import { CheckBox } from 'react-native-elements'


export default class AdicionaisListItem extends Component {
  constructor(props) {
    super(props);

  }



  render() {
    const { item } = this.props;

    return (
      <View>
        {
          this.props.tipoProduto=="Pizzas" ?
          <View style={{flex: 1, flexDirection: 'row', marginTop: 5, justifyContent: 'space-between'}}>
            <View style={{flex:1}}>
              <Text style={[styles.textAdicionais, {alignSelf: 'center', marginHorizontal: 10}]}>
                {item.nome}
              </Text>
            </View>
            <View style={{flex:1}}>
              {this.props.preco()}
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'flex-end', marginRight: 10}}>
              <CheckBox
                textStyle={{fontSize: 16}}
                containerStyle={{backgroundColor: 'rgba(0,0,0,0.1)'}}
                checkedIcon='dot-circle-o'
                uncheckedIcon='circle-o'
                checked={this.props.checkBoxChecked}
                onPress={this.props.onCheckBoxPress}
              />
            </View>
          </View>

           :

           <View style={{flex: 1, flexDirection: 'row', marginTop: 5, justifyContent: 'space-between'}}>
             <View style={{flex:1}}>
               <Text style={[styles.textAdicionais, {alignSelf: 'center', marginHorizontal: 10}]}>
                 {item.nome}
               </Text>
             </View>
             <View style={{flex:1}}>
               {this.props.preco()}
             </View>
             <View style={{flex:1, flexDirection: 'row', justifyContent: 'flex-end', marginRight: 10}}>
               <TouchableOpacity
                 style={{justifyContent: 'center', alignSelf: 'center', marginBottom: 10}}
                 onPress={this.props.onSubtract}>
                 <Image
                   source={require('../../img/minus.png')}
                   style={styles.icon}/>
               </TouchableOpacity>
               <Text
                 style={[styles.textAdicionais, {alignSelf: 'center', justifyContent: 'center', marginHorizontal: 10, fontSize: 16, lineHeight: 16}]}>
                 {item.quantidade}
               </Text>
               <TouchableOpacity
                 style={{justifyContent: 'center', alignSelf: 'center', marginBottom: 10}}
                 onPress={this.props.onAdd}>
                 <Image
                   source={require('../../img/plus.png')}
                   style={styles.icon}/>
               </TouchableOpacity>
             </View>
           </View>
        }
      </View>
    );
  }
}


// render() {
//   const { item } = this.props;
//   return (
//     <View>
//
//       {this.functionAdicionais(item)}
//     </View>
//   );
// }
// }
