import React, { Component } from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native';
import { styles, images} from '../constants/constants'
import { CheckBox } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Feather';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

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
          <View style={{height: 50,flex: 1, flexDirection: 'row', marginTop: 5, justifyContent: 'space-between'}}>
            <View style={{width:wp('38%'),marginLeft:wp('3.8%'),justifyContent: 'center'}}>
              <Text style={[styles.textAdicionais, {alignSelf: 'flex-start', marginHorizontal: 5}]}>
                {item.nome}
              </Text>
            </View>

            <View style={{flex:1, justifyContent: 'center'}}>
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

           <View style={{height: 50,flex: 1, flexDirection: 'row', marginTop: 5, justifyContent: 'space-between'}}>

             <View style={{width:wp('38%'),marginLeft:wp('3.8%'),justifyContent: 'center'}}>
               <Text style={[styles.textAdicionais,
                   {marginHorizontal: 5,alignSelf: 'flex-start'}]}>
                 {item.nome}
               </Text>
             </View>

             <View style={{flex:1, justifyContent: 'center'}}>
               {this.props.preco()}
             </View>

             <View style={{flex:1, flexDirection: 'row', justifyContent: 'flex-end', marginRight: wp('3.8%')}}>
               <TouchableOpacity
                 style={{justifyContent: 'center', alignSelf: 'center', marginBottom: 10}}
                 onPress={this.props.onSubtract}>
                 <Icon
                   name={'minus-circle'}
                   size={23}
                   color={'rgb(43, 189, 204)'}/>
               </TouchableOpacity>
               <Text
                 style={[styles.textAdicionais, {alignSelf: 'center', justifyContent: 'center', marginHorizontal: 10, fontSize: 16}]}>
                 {item.quantidade}
               </Text>
               <TouchableOpacity
                 style={{justifyContent: 'center', alignSelf: 'center', marginBottom: 10}}
                 onPress={this.props.onAdd}>
                 <Icon
                   name={'plus-circle'}
                   size={23}
                   color={'rgb(43, 189, 204)'}/>
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
