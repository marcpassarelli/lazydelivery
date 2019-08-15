console.ignoredYellowBox = [
    'Setting a timer'
]
import React, { Component } from 'react';
import { ImageBackground, Image, Text, TouchableOpacity, View,BackHandler } from 'react-native';
import { styles, images} from '../constants/constants'
import { atualizarEndereco } from '../firebase/database'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import StatusBar from '../constants/statusBar'
import {db, auth} from '../firebase/firebase'
import ComponentsAtualizaEndereco from './componentsAtualizaEndereco'

export class AtualizaEnderecoScreen extends Component {

  static navigationOptions = {
     header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
         nome: '',
         telefone: '',
         endereco: '',
         bairro:'',
         referencia:'',
         key:'',
         uid: '',
         profilePicURL:''
      }
  }

  updateEndereco = (text) => {
    this.setState({endereco: text})
  }

  updateBairro = (text) => {
    this.setState({bairro: text})
  }
  updateReferencia = (text) => {
    this.setState({referencia: text})
  }

   async atualizarEnderecoBD () {
     const {navigate} = this.props.navigation
     if(this.state.endereco && this.state.bairro &&
       this.state.referencia){

          let user = await auth.currentUser;

          this.setState({uid: user.uid})

          atualizarEndereco(this.state.uid, this.state.key, this.state.endereco,
             this.state.bairro,this.state.referencia)

        navigate('Home')

      }else{
        alert('Preencha todos os campos')
      }
    }

    //callback to wait for the user to be found
    validateUserName(){
      return this.state.nome+""
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick=()=> {
      this.props.navigation.goBack();
      return true;
    }

    componentWillMount() {
      BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick)
      const {state} = this.props.navigation;
      var enderecoUp = state.params ? state.params.enderecoUp : ""
      var bairroUp = state.params ? state.params.bairroUp : ""
      var referenciaUp = state.params ? state.params.referenciaUp : ""
      var keyUp = state.params ? state.params.keyUp : ""
      if(enderecoUp){

        this.setState({
          endereco: enderecoUp,
          bairro: bairroUp,
          referencia: referenciaUp,
          key: keyUp
        }, function(){
          this.validateUserName();
        })
      }
    }

  render(){

    return (
      <ImageBackground
        source={images.backgroundLazy}
        style={styles.backgroundImage}>
        <StatusBar/>
        <ComponentsAtualizaEndereco
          endereco={this.state.endereco}
          bairro={this.state.bairro}
          referencia={this.state.referencia}
          updateEndereco={this.updateEndereco}
          updateBairro={this.updateBairro}
          updateReferencia={this.updateReferencia}
          atualizarEnderecoBD= { ()=>this.atualizarEnderecoBD() }/>
      </ImageBackground>
    )
  }
}
