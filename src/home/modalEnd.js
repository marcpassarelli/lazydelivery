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
import { listaEnderecos, atualizarEndereco } from '../firebase/database'
import ModalEndListItem from './modalEndListItem'


export default class ModalEnd extends Component {

  constructor(props) {
    super(props);

  }

    renderSeparator = () => {
     return (
       <View
         style={{
           height: 1,
           width: "100%",
           backgroundColor: "#CED0CE",
           marginLeft: 5,
           marginBottom:hp('0.77%')
         }}
       />
     );
   };


render(){
    return (
      <Modal
        transparent={true}
        animationType={'none'}
        visible={this.props.loading}
        onRequestClose={() => {this.props.showModal()}}>
        <View style={stylesLocal.modalBackground}>
          <View style={stylesLocal.activityIndicatorWrapper}>
            <Text style={{fontSize:wp('5%'),color: cores.corPrincipal,marginVertical: 10,fontFamily: 'FuturaBT-MediumItalic'}}>Lista de Endereços</Text>
            <FlatList
              ItemSeparatorComponent={this.renderSeparator}
              data= {this.props.listaEnderecos}
              extraData={this.props.listaEnderecos}
              renderItem= {({item, index}) =>
              <ModalEndListItem
                item = {item}
                deleteEnd = {() => this.props.deleteEnd(item)}
                selecionaEnd = {() => this.props.selecionaEnd(item)}
                showModal = {()=>{this.props.showModal()}}/>
              }
              keyExtractor={item => item.key}/>
              <View>
                <TouchableOpacity
                  onPress={()=>{this.props.adicionaEnd()}}>
                  <Text style={{color: cores.textDetalhes,marginBottom: 5,marginTop: 10,fontFamily:'Futura-Book' }}>Adicionar Novo Endereço</Text>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity
                  onPress={()=>{this.props.showModal()}}>
                  <Text style={{fontSize:wp('4%'),marginVertical: 10}}>Fechar</Text>
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
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(252, 204, 60,0.3)'
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    width: wp('97%'),
    height: hp('50%'),
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
});
