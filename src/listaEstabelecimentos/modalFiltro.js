import React, { Component } from 'react';
import { styles, cores, images} from '../constants/constants'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {
  StyleSheet,
  View,
  Modal,
  FlatList,
  TouchableOpacity,
  AsyncStorage,
  Text
} from 'react-native';
import { Button } from 'react-native-elements';


export default class ModalFiltro extends Component {

  constructor(props) {
    super(props);

  }


render(){
    return (
      <Modal transparent={true}
      animationType={'none'}
      visible={this.props.modalVisible}
      onRequestClose={() => {this.props.showModal()}}>
        <View style={stylesLocal.modalBackground}>
          <View style={stylesLocal.activityIndicatorWrapper}>
            <Text style={{alignSelf: 'center',fontSize:wp('4%'),color: cores.corPrincipal,marginVertical: 10,fontFamily: 'FuturaBT-MediumItalic'}}>Selecione os tipos de estabelecimento que deseja</Text>
            <View style={{flexDirection: 'row',flexWrap: 'wrap', justifyContent: 'center'}}>
              {this.props.listaFiltros}
            </View>
            <View style={{flexDirection: 'column', alignItems: 'center',alignSelf: 'center',position: 'absolute',bottom: 10}}>
              <View style={{}}>
                <TouchableOpacity
                  onPress={()=>{this.props.aplicarFiltro()}}>
                  <Text style={{fontSize:wp('5%'),marginVertical: 10,color: cores.textDetalhes,fontFamily: 'FuturaBT-MediumItalic'}}>Aplicar Filtro</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={()=>{this.props.limparFiltro()}}>
                  <Text style={{fontSize:wp('5%'),marginVertical: 10,color: cores.textDetalhes,fontFamily: 'FuturaBT-MediumItalic'}}>Limpar Filtro</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                onPress={()=>{this.props.showModal()}}>
                <Text style={{fontSize:wp('5%'),marginVertical: 10,fontFamily: 'FuturaBT-MediumItalic'}}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    )
    }
  }

  const stylesLocal = StyleSheet.create({
    modalBackground: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-around',
      backgroundColor: 'rgba(252, 204, 60,0.3)'
    },
    activityIndicatorWrapper: {
      backgroundColor: '#FFFFFF',
      width: wp('97%'),
      height: hp('80%'),
      borderRadius: 10,
      display: 'flex',

      flexDirection: 'column'
    }
  })

  // <Button
  //   disabled={this.props.btnRestaurantes}
  //   onPress={()=>{this.props.onPressBtnRestaurantes}}
  //   />
  // <Button
  //   disabled={this.props.btnLanches}
  //   onPress={()=>{this.props.onPressBtnLanches}}
  //   />
  // <Button
  //   disabled={this.props.btnSalgados}
  //   onPress={()=>{this.props.onPressBtnSalgados}}
  //   />
  // <Button
  //   disabled={this.props.btnDocerias}
  //   onPress={()=>{this.props.onPressBtnDocerias}}
  //   />
  // <Button
  //   disabled={this.props.btnPizzas}
  //   onPress={()=>{this.props.onPressBtnPizzas}}
  //   />
  // <Button
  //   disabled={this.props.btnSushi}
  //   onPress={()=>{this.props.onPressBtnSushi}}
  //   />
  // <Button
  //   disabled={this.props.btnChurrasco}
  //   onPress={()=>{this.props.onPressBtnChurrasco}}
  //   />
  // <Button
  //   disabled={this.props.btnAcai}
  //   onPress={()=>{this.props.onPressBtnAcai}}
  //   />
