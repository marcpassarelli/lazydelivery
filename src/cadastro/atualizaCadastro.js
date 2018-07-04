console.ignoredYellowBox = [
    'Setting a timer'
]
import React, { Component } from 'react';
import { Image, Aler, Text, TouchableOpacity, View } from 'react-native';
import { styles, goToHome } from '../constants/constants'
import * as firebase from 'firebase';
import { login, signup, atualizarUsuario } from '../firebase/database'
import { Hoshi } from 'react-native-textinput-effects';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import StatusBar from '../constants/statusBar'


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
    this.setState({telefone: text})
  }


   async atualizarInformacoesBD () {
     const {navigate} = this.props.navigation
     if(this.state.nome && this.state.telefone){

          let user = await firebase.auth().currentUser;

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

    componentWillMount() {
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

  render(){
    console.ignoredYellowBox = [
        'Setting a timer'
    ]
    return (
      <Image
        source={require('../../img/alimentos-fundo2.jpg')}
        style={styles.backgroundImage}>
        <StatusBar/>
        <KeyboardAwareScrollView>
        <Text style={styles.titleCadastro}>Atualize o seu cadastro</Text>
        <Hoshi
          style={styles.labelCadastro}
          label={'Nome:'}
          labelStyle={{ color: '#8b0000' }}
          onChangeText = {this.updateNome}
          returnKeyType="next"
          autoCapitalize="words"
          value = {this.state.nome}
          borderColor={'#8b0000'}
        />
        <Hoshi
          style={styles.labelCadastro}
          label={'Telefone:'}
          labelStyle={{ color: '#8b0000' }}
          onChangeText = {this.updateTelefone}
          returnKeyType="next"
          keyboardType="numeric"
          value = {this.state.telefone}
          borderColor={'#8b0000'}
        />
        <View>
          <View style={styles.separator}/>
          <TouchableOpacity
            style={styles.buttons}
            onPress = { ()=>this.atualizarInformacoesBD() } >
            <Text style={styles.textButtons}>ATUALIZAR INFORMAÇÕES</Text>
          </TouchableOpacity>
        </View>
        </KeyboardAwareScrollView>
      </Image>
    )
  }
}
