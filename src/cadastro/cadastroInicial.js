console.ignoredYellowBox = [
    'Setting a timer'
]
import React, { Component } from 'react';
import { ImageBackground, Image, Alert } from 'react-native';
import { styles, images} from '../constants/constants'
import ComponentsCadastroInicial  from './componentsCadastroInicial'
import { signup, cadastrarUsuario } from '../firebase/database'
import StatusBar from '../constants/statusBar'

export class CadastroInicialScreen extends Component {

  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      confirmarEmail: '',
      senha: '',
      confirmarSenha: '',
      checked:false
    }

    this.cadastrarUsuarioBD = this.cadastrarUsuarioBD.bind(this);

  }

  updateEmail = (text) => {
    this.setState({email: text})
  }
  updateConfirmarEmail = (text) => {
    this.setState({confirmarEmail: text})
  }
  updateSenha = (text) => {
    this.setState({senha: text})
  }
  updateConfirmarSenha = (text) => {
    this.setState({confirmarSenha: text})
  }

  checarEmail = () =>{
    if(this.state.email!=this.state.confirmarEmail){
      alert('Emails diferentes. Cheque o email e tenha certeza que colocou o e-mail correto.')
    }
  }

  checarSenha = () =>{
    if(this.state.senha!=this.state.confirmarSenha){
      alert('Senhas diferentes. Tenha certeza que colocou a senha correta.')
    }
  }

  cadastrarUsuarioBD () {

    if(this.state.email && this.state.confirmarEmail &&
      this.state.senha && this.state.confirmarSenha){

        if(this.state.senha!=this.state.confirmarSenha){
          alert('Senhas diferentes. Tenha certeza que colocou a senha correta.')
        }else if(this.state.email!=this.state.confirmarEmail){
          alert('Emails diferentes. Cheque o email e tenha certeza que colocou o e-mail correto.')
        }else{
          signup(
            this.state.email,
            this.state.senha,
            () => this.props.navigation.navigate('CompletaCadastro')
          )
        }

      }else{
        alert('Preencha todos os campos')
      }

    }

    functionCheck=()=>{
      this.setState({
        checked: !this.state.checked
      });}


    render(){
      console.ignoredYellowBox = [
          'Setting a timer'
      ]
      return (
        <ImageBackground
          source={images.backgroundCadastro}
          style={styles.backgroundImage}>
          <StatusBar/>
          <ComponentsCadastroInicial
            goBack={()=>{this.props.navigation.navigate('LoginRegister')}}
            updateEmail = {this.updateEmail}
            updateConfirmarEmail = {this.updateConfirmarEmail}
            updateSenha = {this.updateSenha}
            updateConfirmarSenha = {this.updateConfirmarSenha}
            checarEmail = {this.checarEmail}
            checarSenha = {this.checarSenha}
            cadastrarUsuarioBD = {this.cadastrarUsuarioBD}
            functionCheck={this.functionCheck}
            checked={this.state.checked}
            />
        </ImageBackground>
      )
    }
  }
