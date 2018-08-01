import React, { Component } from 'react';
import { styles, cores, images} from '../constants/constants'
import {
  StyleSheet,
  View,
  Modal,
  FlatList,
  TouchableOpacity,
  AsyncStorage,
  Text
} from 'react-native';
import { listaEnderecos } from '../firebase/database'
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
           marginBottom: 7
         }}
       />
     );
   };

   editEnd = (item, index) =>{

   }

   selecionaEnd = async (item, index) =>{
     try {
       await AsyncStorage.multiSet([['endAtual', item.endereco], ['numeroEnd', item.numeroEnd],
                                   ['bairro', item.bairro], ['referencia', item.referencia]]);


     } catch (error) {
       console.log("error AsyncStorage"+error)
     }
   }

render(){
    return (
      <Modal
        transparent={true}
        animationType={'none'}
        visible={this.props.loading}
        onRequestClose={() => {this.props.showModal()}}>
        <View style={stylesLocal.modalBackground}>
          <View style={stylesLocal.activityIndicatorWrapper}>
            <Text>Lista de Endereços</Text>
            <FlatList
              ItemSeparatorComponent={this.renderSeparator}
              data= {listaEnderecos}
              renderItem= {({item, index}) =>
              <ModalEndListItem
                item = {item}
                editEnd = {() => this.editEnd(item, index)}
                selecionaEnd = {() => this.selecionaEnd(item, index)}
                showModal = {()=>{this.props.showModal()}}/>
              }
              keyExtractor={item => item.key}/>
              <View>
                <TouchableOpacity
                  onPress={()=>{this.props.adicionaEnd()}}>
                  <Text>Adicionar Endereço</Text>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity
                  onPress={()=>{this.props.showModal()}}>
                  <Text>Fechar</Text>
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
    backgroundColor: '#8b000040'
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    width: 400,
    height: 200,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around'
  }
});
