console.ignoredYellowBox = [
    'Setting a timer'
]
import React, { Component } from 'react';
import { ActionSheetIOS,ImageBackground, Image, Text, TouchableOpacity, View } from 'react-native';
import { styles, images,cores} from '../constants/constants'
import { cadastrarEndereco,getBairros, listaBairros } from '../firebase/database'
import { Hoshi } from 'react-native-textinput-effects';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import StatusBar from '../constants/statusBar'
import {db, auth} from '../firebase/firebase'
import ComponentsCadastrarEndereco from './componentsCadastrarEndereco'
import LazyActivity from '../loadingModal/lazyActivity/'
import { NavigationActions } from 'react-navigation';

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
         bairroSelecionado:'',
         referencia:'',
         uid: '',
         profilePicURL:'',
         loading:false
      }
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

  componentWillMount(){
    this.setState({
      loading: true
    });

    getBairros(()=>{
      this.setState({
        loading:false
      });
    })

  }

   async cadastrarEnderecoBD () {
     const {push} = this.props.navigation
     if(this.state.endereco && this.state.bairroSelecionado && this.state.referencia){

          let user = await auth.currentUser;

          this.setState({uid: user.uid})

          cadastrarEndereco(this.state.uid, this.state.endereco,
           this.state.bairroSelecionado,this.state.referencia,
         ()=>{
           setTimeout (() => {
             push('Home')
          }, 1000);

         })




      }else{
        alert('Preencha todos os campos')
      }
    }

    //callback to wait for the user to be found
    validateUserName(){
      return this.state.nome+""
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

    const content = this.state.loading?

    <View style={styles.containerIndicator}>
      <LazyActivity/>
    </View> :

    <ComponentsCadastrarEndereco
      goBack={()=>{this.props.navigation.navigate('Home')}}
      placeholderBairro={"CLIQUE PARA ESCOLHER O BAIRRO"}
      endereco={this.state.endereco}
      bairros={listaBairros}
      onSelectBairro={()=>{this.onSelectBairro()}}
      bairroSelecionado={this.state.bairroSelecionado}
      referencia={this.state.referencia}
      updateEndereco={this.updateEndereco}
      updateBairro={this.updateBairro}
      updateReferencia={this.updateReferencia}
      cadastrarEnderecoBD={()=>this.cadastrarEnderecoBD()}/>

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
