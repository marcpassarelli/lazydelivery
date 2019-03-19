import React, { Component } from 'react';
import { styles, cores, images} from '../constants/constants'
import {
  StyleSheet,
  View,
  Modal,
  TouchableOpacity,
  Text
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


export default class ModalItem extends Component {

  constructor(props) {
    super(props);

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
            {this.props.detalhes}
            <TouchableOpacity
              onPress={()=>{this.props.showModal()}}>
              <Text style={{fontSize: wp('4%')}}>Fechar</Text>
            </TouchableOpacity>
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
    height: 200,
    width: wp('90%'),
    borderRadius: 10,
    marginHorizontal: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around'
  }
});
