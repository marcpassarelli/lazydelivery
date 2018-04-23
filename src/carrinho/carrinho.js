
import React, { Component } from 'react';
import { Image, Alert, View, Text, Button, ActivityIndicator, FlatList } from 'react-native'
import { styles, cores } from '../constants/constants'
import * as firebase from 'firebase';
import {getListaEstabelecimentos, listaEstabelecimentos} from '../firebase/database'
import {carrinho, atualizarCarrinho} from '../addproduto/addproduto'
import CarrinhoListItem from './carrinhoListItem'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import _ from 'lodash'
let totalPrice =0
const produtosCarrinho = []

export class CarrinhoScreen extends Component{


  static navigationOptions = ({navigation}) => ({
    title: "Carrinho - "+navigation.state.params.nomeEstabelecimento,
    headerTitleStyle: styles.headerText,
    headerStyle: styles.header,
    headerRight: (<View></View>)
  });

  constructor(props){
    super(props);
    this.state = {
      tipoEstabelecimento:'',
      listaEstabelecimentosUp:'',
      loading: false,
      produtosCarrinho
    }

  }


  componentWillMount(){

    console.log("carrinho: "+JSON.stringify(carrinho));

    this.setState({
      loading: true
    })

    this.setState({
      produtosCarrinho: carrinho
    }, function(){
        this.setState({
          loading: false
        })
    })
  }

  renderSeparatorComponent = () => {
   return (<View style={styles.renderSeparatorComponent}/>);
  };

  onSubtract = (item, index) =>{
    const produtosCarrinho = [...this.state.produtosCarrinho];
    console.log("produtosCarrinho"+JSON.stringify(produtosCarrinho));
    if(produtosCarrinho[index].quantidade>1){
      produtosCarrinho[index].quantidade -= 1;
      this.setState({ produtosCarrinho });
    }
    else if (produtosCarrinho[index].quantidade==1) {
      if(produtosCarrinho[index].adicional==false){
        Alert.alert(
          'Remover Item Carrinho',
          'Tem certeza que deseja remover este item do carrinho? Todos os adicionais desse item serão removidos também.',
          [
            {text: 'Sim', onPress: () => {
              var indexToRemove=[]
              produtosCarrinho.map((item, i, arr)=>{
                if(produtosCarrinho[index].tag == item.tag){
                  indexToRemove.push(index)
                }
              })
              for (var i = indexToRemove.length - 1; i>=0;i--){
                produtosCarrinho.splice(indexToRemove[i],1)
              }

              this.setState({ produtosCarrinho}, function(){
                atualizarCarrinho(this.state.produtosCarrinho)
              })
            }},
            {text: 'Não', onPress: ()=>{
              console.log("cancelado");
            }},
          ],
          {cancelable: false}
        )

      }else{
        Alert.alert(
          'Remover Item Carrinho',
          'Tem certeza que deseja remover este adicional do carrinho?',
          [
            {text: 'Sim', onPress: () => {
              produtosCarrinho.splice(index,1)
              this.setState({ produtosCarrinho }, function(){
                atualizarCarrinho(this.state.produtosCarrinho)
              });
            }},
            {text: 'Não', onPress: ()=>{
              console.log("cancelado");
            }},
          ],
          {cancelable: false}
        )

      }
    }
  }

  onAdd = (item, index) =>{
    const produtosCarrinho = [...this.state.produtosCarrinho];
    produtosCarrinho[index].quantidade += 1;
    this.setState({ produtosCarrinho });
  }

  functionCarrinho=()=>{
    console.log("carrinho"+JSON.stringify(carrinho));
    if(carrinho.length>0){
      return(
        <View style={{flex: 1}}>
          <FlatList
            ItemSeparatorComponent={this.renderSeparatorComponent}
            data= {this.state.produtosCarrinho}
            extraData={this.state}
            renderItem={({ item, index }) => (
              <CarrinhoListItem
                item={item}
                onSubtract={() => this.onSubtract(item, index)}
                onAdd={() => this.onAdd(item, index)}/>
            )}
            keyExtractor={item => item._id}
          />
        <View style={{backgroundColor: cores.corPrincipal, height: 1}}></View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 10, marginTop: 3}}>
          <Text style={[styles.textAdicionais,{fontSize: 18}]}>Valor Total Pedido:</Text>
          <Text style={[styles.textAdicionais,{alignItems:'flex-end', fontSize: 18}]}>R$ {this.totalPrice}</Text>
        </View>
        <Button
          onPress={()=>{
            if(this.state.produtosCarrinho.length>0){
              this.props.navigation.navigate('ResumoPgto',{nomeEstabelecimento: this.props.navigation.state.params.nomeEstabelecimento})
            }

          }}
          title="Encerrar Pedido"
          color= {cores.corPrincipal}
          accessibilityLabel="YourLabelHere"
        />
      </View>)

    }else{
      return(<Text style={styles.textAddProduto}>Não há itens no carrinho.</Text>)
    }
  }

  render() {
    const { produtosCarrinho } = this.state
    this.totalPrice=0
      produtosCarrinho.forEach((item) => {
        this.totalPrice += item.quantidade * item.preco;
      })
    console.ignoredYellowBox = [
      'Setting a timer'
    ]

    const content = this.state.loading ?

    <View style={styles.containerIndicator}>
      <ActivityIndicator
        color = '#8b0000'
        size="large"
        style = {styles.activityIndicator}/>
    </View> :

    <View style={{flex:1}}>
      {this.functionCarrinho()}
    </View>

    return (
      <Image
        source={require('../../img/alimentos-fundo2.jpg')}
        style={styles.backgroundImage}>
        <View style={styles.separator}></View>
        {content}
      </Image>
    );
  }
}
