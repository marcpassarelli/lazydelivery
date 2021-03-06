console.ignoredYellowBox = [
    'Setting a timer'
]
import React, { Component } from 'react';
import { ImageBackground,ActionSheetIOS, Image, Text,View,BackHandler } from 'react-native';
import { styles, images, cores } from '../constants/constants'
import ComponentsCompletaCadastro from './componentsCompletaCadastro'
import { cadastrarUsuario, getBairros, listaBairros } from '../firebase/database'
import StatusBar from '../constants/statusBar'
import LazyActivity from '../loadingModal/lazyActivity/'
import {db, auth} from '../firebase/firebase'

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
         bairroSelecionado:'',
         referencia:'',
         uid: '',
         nameUser: '',
         profilePicURL:'',
         loading: false
      }

      this.cadastrarInformacoesBD = this.cadastrarInformacoesBD.bind(this);
  }

  updateNome = (text) => {
    this.setState({nome: text})
  }
  updateTelefone = (text) => {
    var x = text.replace(/\D/g, '').match(/(\d{0,2})(\d{0,5})(\d{0,4})/);

    text = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');

    this.setState({telefone: text})
  }
  updateEndereco = (text) => {
    this.setState({endereco: text})
  }

  updateBairro = (text) => {
    this.setState({bairroSelecionado: text})
  }
  updateReferencia = (text) => {
    this.setState({referencia: text})
  }

   async cadastrarInformacoesBD () {

     if(this.state.nome && this.state.telefone &&
        this.state.endereco && this.state.bairroSelecionado &&
         this.state.referencia){

          let user = await auth.currentUser;

          this.setState({uid: user.uid})

          cadastrarUsuario(this.state.uid, this.state.nome,
            this.state.telefone, this.state.endereco, this.state.bairroSelecionado,
            this.state.referencia, this.state.profilePicURL)

        this.props.navigation.push('Home')

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
      this.setState({
        loading:true
      });
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

      getBairros(()=>{
        this.setState({
          loading:false
        });
      })
    }

    onSelectBairro(){
      var optBairro=[]
      listaBairros.map((item,index)=>{
        optBairro.push(item.value)
      })
      var length = optBairro.length
      optBairro.push('Cancelar')
      ActionSheetIOS.showActionSheetWithOptions({
        options:optBairro,
        cancelButtonIndex:length
      },
        (btnIndex)=>{
          if(btnIndex==length){

          }else{
            this.setState({
              bairroSelecionado: optBairro[btnIndex]
            });
          }
        }
      )
    }

  render(){
    console.ignoredYellowBox = [
        'Setting a timer'
    ]

    const content = this.state.loading?

    <View style={styles.containerIndicator}>
      <LazyActivity/>
    </View> :

    <ComponentsCompletaCadastro
      fecharApp={()=>{BackHandler.exitApp()}}
      validateUserName = {this.validateUserName}
      nome={this.state.nome}
      bairros={listaBairros}
      bairroSelecionado={this.state.bairroSelecionado}
      onSelectBairro={()=>{this.onSelectBairro()}}
      placeholderBairro={"CLIQUE PARA ESCOLHER O BAIRRO"}
      telefone={this.state.telefone}
      updateNome = {this.updateNome}
      updateTelefone = {this.updateTelefone}
      updateEndereco = {this.updateEndereco}
      updateBairro = {this.updateBairro}
      updateReferencia = {this.updateReferencia}
      cadastrarInformacoesBD = {this.cadastrarInformacoesBD}
      />

    return (
      <ImageBackground
        source={images.backgroundLazy}
        style={styles.backgroundImage}>
        <StatusBar/>
        {content}
      </ImageBackground>
    )
  }
}
