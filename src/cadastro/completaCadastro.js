console.ignoredYellowBox = [
    'Setting a timer'
]
import React, { Component } from 'react';
import { Image, Text } from 'react-native';
import { styles, images} from '../constants/constants'
import * as firebase from 'firebase';
import ComponentsCompletaCadastro from './componentsCompletaCadastro'
import { cadastrarUsuario } from '../firebase/database'
import { Hoshi } from 'react-native-textinput-effects';
import StatusBar from '../constants/statusBar'


export class CompletaCadastroScreen extends Component {

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
         uid: '',
         nameUser: '',
         profilePicURL:''
      }

      this.cadastrarInformacoesBD = this.cadastrarInformacoesBD.bind(this);
  }

  updateNome = (text) => {
    this.setState({nome: text})
  }
  updateTelefone = (text) => {
    this.setState({telefone: text})
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

   async cadastrarInformacoesBD () {

     if(this.state.nome && this.state.telefone &&
        this.state.endereco && this.state.bairro &&
        this.state.numeroEnd && this.state.referencia){

          let user = await firebase.auth().currentUser;

          this.setState({uid: user.uid})

          cadastrarUsuario(this.state.uid, this.state.nome,
            this.state.telefone, this.state.endereco,
            this.state.numeroEnd, this.state.bairro,
            this.state.referencia, this.state.profilePicURL)

        this.props.navigation.navigate('Home')

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
      var name = state.params ? state.params.name : ""
      var profilePic = state.params ? state.params.profilePic : ""
      if(name){
      this.setState({nome: name}, function(){
        this.validateUserName();
      })
      this.setState({profilePicURL: profilePic}, function(){
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
        source={images.imageBackground}
        style={styles.backgroundImage}>
        <StatusBar/>
        <Text style={styles.titleCadastro}>Complete o seu cadastro</Text>
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
        <ComponentsCompletaCadastro
          validateUserName = {this.validateUserName}
          updateNome = {this.updateNome}
          updateTelefone = {this.updateTelefone}
          updateEndereco = {this.updateEndereco}
          updateNumeroEnd = {this.updateNumeroEnd}
          updateBairro = {this.updateBairro}
          updateReferencia = {this.updateReferencia}
          cadastrarInformacoesBD = {this.cadastrarInformacoesBD}
          />
      </Image>
    )
  }
}
