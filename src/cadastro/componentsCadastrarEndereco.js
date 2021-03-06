console.ignoredYellowBox = [
    'Setting a timer'
]
import { styles, images, cores} from '../constants/constants'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { TouchableOpacity,Text,View,Platform,PickerIOS,Picker } from 'react-native';
import React, { Component } from 'react';
import LazyTextInput from '../constants/lazyTextInput';
import LazyYellowButton from '../constants/lazyYellowButton'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import LazyBackButton from '../constants/lazyBackButton'
import { semCadastro } from '../login/loginregister'
import Icon from 'react-native-vector-icons/Feather';

export default ComponentsCadastrarEndereco = (props) => {
  return (

    <KeyboardAwareScrollView>
      <LazyBackButton
        goBack={props.goBack}/>
      <View>
        {semCadastro?
          <Text style={[styles.titleCadastro,
            {marginTop: hp('15%'),fontSize:wp('4.5%'),
              marginBottom: hp('2.22%')}]}>PRECISAMOS APENAS DO SEU ENDEREÇO PARA O CÁLCULO DO FRETE
          </Text>
          :
          <Text style={[styles.titleCadastro,
            {marginTop: hp('15%'),marginBottom: hp('2.22%')}]}>CADASTRE NOVO ENDEREÇO
          </Text>}
      </View>

      <LazyTextInput
        style={{marginBottom: hp('2.22%')}}
        placeholder={'ENDEREÇO COM NÚMERO'}
        nameIcon={'home'}
        onChangeText = {props.updateEndereco}
        returnKeyType="next"
        value = {props.endereco}
        autoCapitalize='words'/>
        <View style={{marginBottom: hp('2.22%'),justifyContent: 'center',
          alignItems: 'center', flexDirection: 'row'}}>
          <View style={{width: wp('14%'),height: hp('7%'),
            borderWidth: 0.5,borderColor: '#d1d1d1',
            alignItems: 'center',justifyContent: 'center'}}>
            <Icon
              name={'home'}
              size={wp('6.5%')}
              color={'#d1d1d1'} />
          </View>
        {
          Platform.OS==='ios'?

          <View style={{}}>
            <TouchableOpacity style={{flexDirection: 'column',
              backgroundColor:'#d1d1d1',height:hp('7%'),
              borderColor: '#d1d1d1',borderWidth: 1,
              justifyContent: 'center',
              width:wp('63.30%')}}
              onPress={props.onSelectBairro}>
              <Text style={{marginLeft: 15,
                justifyContent: 'center',
                textDecorationLine: 'underline',
                fontFamily: 'Futura-Book',
                fontSize: wp('3.75%')}}>{props.bairroSelecionado?props.bairroSelecionado:props.placeholderBairro}</Text>
            </TouchableOpacity>
          </View>
          :
              <Picker
                itemStyle={{fontFamily: 'Futura-Book'}}
                style={{height: hp('7%'),backgroundColor: "#d1d1d1",width: wp('63.30%')}}
                selectedValue={props.bairroSelecionado}
                onValueChange={props.updateBairro}>
                <Picker.Item label="Escolha seu bairro..." value={null}/>
                {props.bairros.map((item, index)=>{
                  return (<Picker.Item label={item.label} value={item.value} key={index}color={"#464949"} />)
                })}

              </Picker>
        }
        </View>
      <LazyTextInput
        style={{marginBottom: hp('2.22%')}}
        placeholder={'REFERÊNCIA / COMPLEMENTO'}
        onChangeText = {props.updateReferencia}
        returnKeyType="done"
        value = {props.referencia}
        autoCapitalize='words'
        nameIcon={'home'}/>
      <LazyYellowButton
        onPress = { () => {props.cadastrarEnderecoBD()} }
        text={"CADASTRAR ENDEREÇO"}/>
    </KeyboardAwareScrollView>
  )
}
// <LazyTextInput
//   style={{marginBottom: hp('2.22%')}}
//   placeholder={'BAIRRO'}
//   onChangeText = {props.updateBairro}
//   returnKeyType="next"
//   value = {props.bairro}
//   autoCapitalize='words'
//   nameIcon={'home'}/>
