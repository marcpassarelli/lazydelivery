console.ignoredYellowBox = [
    'Setting a timer'
]
import { styles, images, cores} from '../constants/constants'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Text, View, Button,TouchableHighlight, TouchableOpacity,Image,Platform,Picker,PickerIOS} from 'react-native';
import React, { Component } from 'react';
import LazyTextInput from '../constants/lazyTextInput';
import LazyYellowButton from '../constants/lazyYellowButton'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Feather';
import { findNodeHandle } from 'react-native'
import TextInputState from 'react-native/lib/TextInputState'

export default class ComponentsCompletaCadastro extends Component {

  // focusTextInput(node) {
  //   try {
  //     TextInputState.focusTextInput(findNodeHandle(node))
  //   } catch(e) {
  //     console.log("Couldn't focus text input: ", e.message)
  //   }
  // }
render(){

  return (
    <KeyboardAwareScrollView>
      <View style={{flexDirection: 'row',alignItems: 'center'}}>
        <TouchableHighlight onPress={()=>{this.props.fecharApp()}}
          style={{width: 20,height: 20,marginLeft: 10,
            marginTop:hp('0.33%'),alignSelf: 'center',justifyContent: 'center'}}>
          <Image
            style={{width: 20,height: 20}}
            source={images.seta2}>
          </Image>
        </TouchableHighlight>
        <Text style={{marginTop:hp('0.55%'),justifyContent: 'center',
          alignSelf: 'center',fontSize:wp('2.5%') ,
          fontFamily: 'FuturaBT-MediumItalic',color: 'white'}}> FECHAR APP </Text>
      </View>
      <Text style={[styles.titleCadastro,{marginTop:hp('8%'),marginBottom: hp('3%')}]}>COMPLETE O SEU CADASTRO</Text>
        <LazyTextInput
          style={{marginBottom: hp('2.22%')}}
          nameIcon={'user'}
          placeholder={'NOME'}
          value = {this.props.nome}
          onChangeText={this.props.updateNome}
          keyboardType="email-address"
          autoCapitalize="words"
          returnKeyType="next"/>
        <LazyTextInput
          style={{marginBottom: hp('2.22%')}}
          value = {this.props.telefone}
          nameIcon={'phone'}
          placeholder={'TELEFONE COM DDD'}
          onChangeText={this.props.updateTelefone}
          keyboardType="numeric"
          returnKeyType="next"/>
        <LazyTextInput
          style={{marginBottom: hp('2.22%')}}
          nameIcon={'home'}
          placeholder={'ENDEREÇO COM NÚMERO'}
          onChangeText={this.props.updateEndereco}
          autoCapitalize='words'
          returnKeyType="next"/>
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

            <PickerIOS
              itemStyle={{color: cores.corPrincipal,height:80, fontSize: wp('5%'),right: 10}}
              style={{height: 80}}
              selectedValue={this.props.bairroSelecionado}
              onValueChange={this.props.updateBairro}>
              <Picker.Item label="Escolha seu bairro..." value={null}/>
              {this.props.bairros.map((item, index)=>{
                return (<Picker.Item label={item.label} value={item.value} key={index} />)
              })}
            </PickerIOS>
          :
              <Picker
                itemStyle={{fontFamily: 'Futura-Book'}}
                style={{height: hp('7%'),backgroundColor: "#d1d1d1",width: wp('63.30%')}}
                selectedValue={this.props.bairroSelecionado}
                onValueChange={this.props.updateBairro}>
                <Picker.Item label="Escolha seu bairro..." value={null}/>
                {this.props.bairros.map((item, index)=>{
                  return (<Picker.Item label={item.label} value={item.value} key={index}color={"#464949"} />)
                })}

              </Picker>
        }
        </View>
        <LazyTextInput
          style={{marginBottom: hp('2.22%')}}
          nameIcon={'home'}
          placeholder={'REFERÊNCIA / COMPLEMENTO'}
          onChangeText={this.props.updateReferencia}
          returnKeyType="done"
          autoCapitalize='words'/>
        <LazyYellowButton
          style={{marginBottom: hp('4.22%')}}
          onPress = { () => {this.props.cadastrarInformacoesBD()} }
          text={"CADASTRAR"}/>
        <View style={{backgroundColor: '#FFFFFF',height: hp('0.1%'),marginHorizontal: wp('12.31%'),marginBottom: hp('4.4%')}}></View>
        <Image source={images.iconYellow} style={{height: hp('8.9%'),width: wp('14.81%'),alignSelf: 'center'}}></Image>
    </KeyboardAwareScrollView>
  )
  }
}
