import React, { Component } from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native';
import { styles, images,cores} from '../constants/constants'
import { CheckBox } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Feather';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import _ from 'lodash';

export default class AntesAddProdutoListItem extends Component {
  constructor(props) {
    super(props);
    // <CheckBox
    //   textStyle={{fontSize: wp('4%')}}
    //   containerStyle={{backgroundColor: 'rgba(0,0,0,0.1)'}}
    //   checkedIcon='dot-circle-o'
    //   uncheckedIcon='circle-o'
    //   checked={this.props.checkBoxChecked}
    //   onPress={this.props.onCheckBoxPress}
    // />
  }

  render() {
    const { item } = this.props;
    return (
      <View>
        {
          this.props.tipoPagina=="checkbox" ?
          <View style={{height: 70,flex: 1, flexDirection: 'row',alignItems: 'center',
           justifyContent: 'space-between'}}>
            <View style={{flexShrink:1,width:wp('38%'),marginLeft:wp('3.8%'),justifyContent: 'center',flex:1}}>
              <Text style={[styles.textAdicionais, {marginHorizontal: 5}]}>
                {_.upperFirst(item.nome)}
              </Text>
            </View>

            <View style={{flexDirection: 'row', justifyContent: 'flex-end', marginRight: wp('3.8%')}}>
              <Icon
                style={{alignSelf: 'center',justifyContent: 'center'}}
                color={cores.corPrincipal}
                name={this.props.checkBoxChecked? 'check-circle':'circle'}
                size={24}
                onPress={()=>{this.props.onCheckBoxPress()}}
                ></Icon>
            </View>
          </View>

           :

           <View style={{height: 70,flexDirection: 'row'}}>

             <View style={{flexShrink:1,width:wp('45%'),marginLeft:wp('3.8%'),justifyContent: 'center',flex:1}}>
               <Text style={[styles.textAdicionais, {marginHorizontal: 5}]}>
                 {_.upperFirst(item.nome)}
               </Text>
             </View>

             <View style={{width: wp('12%'),justifyContent: 'center'}}>
               <TouchableOpacity  onPress={this.props.onSubtractDez}>
               <Text style={[styles.textAdicionais],{alignSelf: 'center', fontSize: wp('5%'),
                 marginBottom: hp('1.11%'),
                 fontFamily:'FuturaBT-MediumItalic',color: cores.textDetalhes}}>-10</Text>
               </TouchableOpacity>
             </View>

             <View style={{width: wp('12%'), justifyContent: 'center'}}>
               <TouchableOpacity  onPress={this.props.onAddDez}>
               <Text style={[styles.textAdicionais],{alignSelf: 'center', fontSize: wp('5%'),
                 marginBottom: hp('1.11%'),
                 fontFamily:'FuturaBT-MediumItalic',color: cores.textDetalhes}}>+10</Text>
               </TouchableOpacity>
             </View>

             <View style={{flexDirection: 'row', justifyContent: 'flex-end', marginRight: wp('3.8%'),width: wp('25%')}}>
               <TouchableOpacity
                 style={{justifyContent: 'center', alignSelf: 'center', marginBottom: hp('1.11%')}}
                 onPress={this.props.onSubtract}>
                 <Icon
                   name={'minus-circle'}
                   size={23}
                   color={'rgb(43, 189, 204)'}/>
               </TouchableOpacity>
               <Text
                 style={[styles.textAdicionais, {marginBottom: 10,alignSelf: 'center', justifyContent: 'center', marginHorizontal: 10, fontSize: wp('4%')}]}>
                 {item.quantidade}
               </Text>
               <TouchableOpacity
                 style={{justifyContent: 'center', alignSelf: 'center', marginBottom: hp('1.11%')}}
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
