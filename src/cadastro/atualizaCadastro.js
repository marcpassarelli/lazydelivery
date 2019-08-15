console.ignoredYellowBox = [
    'Setting a timer'
]
import React, { Component } from 'react';
import { ImageBackground, Image, Text, TouchableOpacity, View,BackHandler } from 'react-native';
import { styles, images} from '../constants/constants'
import { atualizarUsuario } from '../firebase/database'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import StatusBar from '../constants/statusBar'
import {db, auth} from '../firebase/firebase'
import ComponentsAtualizaCadastro from './componentsAtualizaCadastro'

export class AtualizaCadastroScreen extends Component {

  static navigationOptions = {
     header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
         nome: '',
         telefone: '',
         uid: '',
      }

      this.atualizarInformacoesBD = this.atualizarInformacoesBD.bind(this);
  }

  updateNome = (text) => {
    this.setState({nome: text})
  }
  updateTelefone = (text) => {
    var x = text.replace(/\D/g, '').match(/(\d{0,2})(\d{0,5})(\d{0,4})/);

    text = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');

    this.setState({telefone: text})
  }

   async atualizarInformacoesBD () {
     const {navigate} = this.props.navigation

     if(this.state.nome && this.state.telefone){

          let user = await auth.currentUser;

          this.setState({uid: user.uid})

          atualizarUsuario(this.state.uid, this.state.nome,
            this.state.telefone)

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
      var nomeUp = state.params ? state.params.nomeUp : ""
      var telefoneUp = state.params ? state.params.telefoneUp : ""
      if(nomeUp){
      this.setState({
        nome: nomeUp,
        telefone: telefoneUp
      }, function(){
        this.validateUserName();
      })
      }
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

  render(){
    console.ignoredYellowBox = [
        'Setting a timer'
    ]
    return (
      <ImageBackground
        source={images.backgroundLazy}
        style={styles.backgroundImage}>
        <StatusBar/>
        <ComponentsAtualizaCadastro
          updateNome={this.updateNome}
          updateTelefone={this.updateTelefone}
          nome={this.state.nome}
          telefone={this.state.telefone}
          atualizarInformacoesBD={() => {this.atualizarInformacoesBD()}}
          />
      </ImageBackground>
    )
  }
}
