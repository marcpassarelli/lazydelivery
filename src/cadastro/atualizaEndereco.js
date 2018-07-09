console.ignoredYellowBox = [
    'Setting a timer'
]
import React, { Component } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { styles } from '../constants/constants'
import * as firebase from 'firebase';
import { atualizarEndereco } from '../firebase/database'
import { Hoshi } from 'react-native-textinput-effects';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import StatusBar from '../constants/statusBar'


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
         numeroEnd: '',
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
  updateNumeroEnd = (text) => {
    this.setState({numeroEnd: text})
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
        this.state.numeroEnd && this.state.referencia){

          let user = await firebase.auth().currentUser;

          this.setState({uid: user.uid})

          atualizarEndereco(this.state.uid, this.state.key, this.state.endereco,
            this.state.numeroEnd, this.state.bairro,
            this.state.referencia)

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
      var enderecoUp = state.params ? state.params.enderecoUp : ""
      var numeroEndUp = state.params ? state.params.numeroEndUp : ""
      var bairroUp = state.params ? state.params.bairroUp : ""
      var referenciaUp = state.params ? state.params.referenciaUp : ""
      var keyUp = state.params ? state.params.keyUp : ""
      if(enderecoUp){

        this.setState({
          endereco: enderecoUp,
          numeroEnd: numeroEndUp,
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
      <Image
        source={require('../../img/alimentos-fundo2.jpg')}
        style={styles.backgroundImage}>
        <KeyboardAwareScrollView>
        <StatusBar/>
        <Text style={styles.titleCadastro}>Atualize o seu cadastro</Text>
        <Hoshi
          style={styles.labelCadastro}
          label={'Endereço:'}
          labelStyle={{ color: '#8b0000' }}
          onChangeText = {this.updateEndereco}
          returnKeyType="next"
          value = {this.state.endereco}
          borderColor={'#8b0000'}
          autoCapitalize='words'
        />
        <Hoshi
          style={styles.labelCadastro}
          label={'Número Endereço:'}
          labelStyle={{ color: '#8b0000' }}
          onChangeText = {this.updateNumeroEnd}
          returnKeyType="next"
          value = {this.state.numeroEnd}
          borderColor={'#8b0000'}
        />
        <Hoshi
          style={styles.labelCadastro}
          label={'Bairro:'}
          labelStyle={{ color: '#8b0000' }}
          onChangeText = {this.updateBairro}
          returnKeyType="next"
          value = {this.state.bairro}
          borderColor={'#8b0000'}
          autoCapitalize='words'
        />
        <Hoshi
          style={styles.labelCadastro}
          label={'Referência:'}
          labelStyle={{ color: '#8b0000' }}
          onChangeText = {this.updateReferencia}
          returnKeyType="done"
          value = {this.state.referencia}
          borderColor={'#8b0000'}
          autoCapitalize='words'
        />
        <View>
          <View style={styles.separator}/>
          <TouchableOpacity
            style={styles.buttons}
            onPress = { ()=>this.atualizarEnderecoBD() } >
            <Text style={styles.textButtons}>ATUALIZAR ENDEREÇO</Text>
          </TouchableOpacity>
        </View>
        </KeyboardAwareScrollView>
      </Image>
    )
  }
}
