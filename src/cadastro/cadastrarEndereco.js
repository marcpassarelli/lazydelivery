console.ignoredYellowBox = [
    'Setting a timer'
]
import React, { Component } from 'react';
import { ImageBackground, Image, Text, TouchableOpacity, View } from 'react-native';
import { styles, images,cores} from '../constants/constants'
import { cadastrarEndereco } from '../firebase/database'
import { Hoshi } from 'react-native-textinput-effects';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import StatusBar from '../constants/statusBar'
import {db, auth} from '../firebase/firebase'
import ComponentsCadastrarEndereco from './componentsCadastrarEndereco'

export class CadastrarEnderecoScreen extends Component {

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

   async cadastrarEnderecoBD () {
     const {navigate} = this.props.navigation
     if(this.state.endereco && this.state.bairro && this.state.referencia){

          let user = await auth.currentUser;

          this.setState({uid: user.uid})

          cadastrarEndereco(this.state.uid, this.state.endereco,
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

  render(){

    return (
      <ImageBackground
        source={images.backgroundLazy}
        style={styles.backgroundImage}>
        <StatusBar/>
        <ComponentsCadastrarEndereco
          goBack={()=>{this.props.navigation.navigate('Home')}}
          endereco={this.state.endereco}
          bairro={this.state.bairro}
          referencia={this.state.referencia}
          updateEndereco={this.updateEndereco}
          updateBairro={this.updateBairro}
          updateReferencia={this.updateReferencia}
          cadastrarEnderecoBD={()=>this.cadastrarEnderecoBD()}/>
      </ImageBackground>
    )
  }
}
