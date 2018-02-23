
import React, { Component } from 'react';
import { Image, Alert, View, Text,TextInput, Button, ActivityIndicator, TouchableOpacity, FlatList, Icon, Dimensions, Picker } from 'react-native'
import { styles, cores } from '../constants/constants'
import * as firebase from 'firebase';
import {getListaEstabelecimentos, listaEstabelecimentos, getListaAdicionais} from '../firebase/database'
import {adicionaisEscolhidos} from './adicionais'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import _ from 'lodash'

export var carrinho =[]
var todoCounter = 1;

export class AddProdutoScreen extends Component{

  static navigationOptions = ({navigation}) => ({
    title: navigation.state.params.estabelecimento,
    headerTitleStyle: styles.headerText,
    headerStyle: styles.header,
    headerRight: (<View></View>)
  });

  constructor(props){
    super(props);
    this.state = {
      nome:'',
      preco:'',
      detalhes:'',
      imgProduto:'',
      tipoProduto:'',
      estabelecimento:'',
      qtde:1,
      total:'',
      listaAdicionais:'',
      loading: false,
      obs:''
    }

  updateAdicionais = (adicionais) => {
   this.setState({ adicionais: adicionais })
  }
}

  componentWillMount(){

    const {state} = this.props.navigation
    var nome = state.params ? state.params.nome : ""
    var preco = state.params ? state.params.preco : ""
    var detalhes = state.params ? state.params.detalhes : ""
    var imgProduto = state.params ? state.params.imgProduto : ""
    var tipoProduto = state.params ? state.params.tipo : ""
    var estabelecimento = state.params ? state.params.estabelecimento : ""

    console.log("tipoProduto: "+tipoProduto)

    this.setState({
      loading: true,
      nome: nome,
      preco: preco,
      detalhes: detalhes,
      imgProduto: imgProduto,
      tipoProduto: tipoProduto,
      estabelecimento: estabelecimento,
      total: preco
    }, function(){
        this.setState({
          loading: false
        })
        console.log("state: "+this.state.imgProduto)
    });

  }

  menosQtde(){
    let qtde = this.state.qtde
    if(qtde>0){
      this.setState({
        qtde: qtde - 1,
      }, function(){
        this.setState({
          total: this.state.qtde*this.state.preco
        });
      });
    }
  }

  maisQtde(){
    let qtde = this.state.qtde + 1
    this.setState({
      qtde: qtde
    }, function(){
      this.setState({
        total: this.state.qtde*this.state.preco
      });
    });
  }

  adicionarAoCarrinho(){
    carrinho.push({
      nome:this.state.nome,
      preco:this.state.preco,
      qtde:this.state.qtde,
      obs:this.state.obs,
      adicionais: adicionaisEscolhidos,
      _id:todoCounter++
    })
    const { navigate } = this.props.navigation;
    navigate('Carrinho')
    console.log("Carrinho"+JSON.stringify(carrinho));
  }

  adicionaisEscolhidosFunction(){

  }

  render() {
    console.ignoredYellowBox = [
      'Setting a timer'
    ]
    var {width, height} = Dimensions.get('window');


    const content = this.state.loading ?

    <View style={styles.containerIndicator}>
      <ActivityIndicator
        color = '#8b0000'
        size="large"
        style = {styles.activityIndicator}/>
    </View> :

    <View style={{flex: 1}}>

      <Image
        source={{uri:this.state.imgProduto}}
        style={[styles.imgProduto,{width: width*0.98, height: height*0.3}]}>
      </Image>

      <Text style={[styles.textAddProduto,{marginBottom: 0}]}>
          {this.state.nome}
      </Text>

      <Text style={[styles.textAddProduto,{fontSize: 13, marginHorizontal: 10,color: '#2F4F4F'}]}>
        {this.state.detalhes}
      </Text>

      <Text style={styles.textAddProduto}>
        Preço Unitário: R$ {this.state.preco}
      </Text>

      <Text style={[styles.textAddProduto,{marginBottom: 5}]}>Quantidade:</Text>

      <View style={{flexDirection: 'row', alignSelf: 'center'}}>

        <TouchableOpacity style={{}} onPress={()=>{this.menosQtde()}}>
          <Image source={require('../../img/minus.png')} style={styles.icon}/>
        </TouchableOpacity>

        <Text style={[styles.textAddProduto, {marginHorizontal: 10, fontSize: 16}]}>{this.state.qtde}</Text>

        <TouchableOpacity style={{}} onPress={()=>{this.maisQtde()}}>
          <Image source={require('../../img/plus.png')} style={styles.icon}/>
        </TouchableOpacity>

      </View>

      <Text style={styles.textAddProduto}>
        Total: R$ {this.state.total}
      </Text>

      <TouchableOpacity onPress={()=>{
          this.props.navigation.navigate('Adicionais')
        }}>
        <Text style={[styles.textAddProduto,{marginBottom: 10,textDecorationLine:'underline'}]}>
          Adicionais?
        </Text>
      </TouchableOpacity>

      <Text style={[styles.textAddProduto,{fontSize: 12}]}>{
          adicionaisEscolhidos.map((item, key)=>(
                <Text key={key}>{item.nome}</Text>
              ))
            }
      </Text>

      <Text style={[styles.textAddProduto,{marginBottom: 0, alignSelf: 'flex-start'}]}>Observações:</Text>
      <TextInput
        style={{borderColor: cores.corPrincipal, borderWidth: 0.5, marginBottom: 5}}
        multiline = {true}
        onChangeText={(text) => this.setState({obs: text})}
        value={this.state.obs}
        placeholder='Exemplos: Carne bem passada. Sem cebola. Sem salada, etc...'
        >
      </TextInput>

      <Button
        onPress={()=>{this.adicionarAoCarrinho()}}
        title="Adicionar ao Carrinho"
        color={cores.corPrincipal}
        accessibilityLabel="YourLabelHere"
      />

    </View>

    return (
      <Image
        source={require('../../img/alimentos-fundo2.jpg')}
        style={styles.backgroundImage}>
        <KeyboardAwareScrollView>
          {content}
        </KeyboardAwareScrollView>
      </Image>
    );
  }
}
// <Picker
//   style={{width: width*0.9, alignSelf: 'center'}}
//   selectedValue={this.state.adicionais}
//   onValueChange={(itemValue, itemIndex) => this.setState({adicionais: itemValue})}>
//   {options.map((item, index) => {
//     return (
//       <Picker.Item
//       label={item} value={index} key={index}/>
//     )
//   })}
// </Picker>
