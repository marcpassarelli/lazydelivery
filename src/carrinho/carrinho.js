
import React, { Component } from 'react';
import { ImageBackground, Image, Alert, View, Text, Button, FlatList } from 'react-native'
import { styles, cores, images} from '../constants/constants'
import {carrinho, atualizarCarrinho} from '../addproduto/addproduto'
import CarrinhoListItem from './carrinhoListItem'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import StatusBar from '../constants/statusBar'
import { retiraLoja } from '../firebase/database'
import { CheckBox } from 'react-native-elements'
import LazyActivity from '../loadingModal/lazyActivity'
import _ from 'lodash'
import LazyBackButton from '../constants/lazyBackButton'
import LazyYellowButton from '../constants/lazyYellowButton'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import ListItemSeparator from '../constants/listItemSeparator'
let totalPrice =0
const produtosCarrinho = []

export class CarrinhoScreen extends Component{

  static navigationOptions = ({navigation}) => ({
    title: "CARRINHO",
    headerTitleStyle: [styles.headerText,{alignSelf:'center'}],
    headerStyle: styles.header,
    headerLeft: (
      <LazyBackButton
        goBack={()=>{
            navigation.navigate('Estabelecimento',
            {nomeEstabelecimento:navigation.state.params.nomeEstabelecimento,
            tipoEstabelecimento: navigation.state.params.tipoEstabelecimento})
          }}/>
    ),
    headerRight:(<View style={styles.headerRight}></View>)
  });

  constructor(props){
    super(props);
    this.state = {
      tipoEstabelecimento:'',
      loading: false,
      produtosCarrinho:[],
      frete:6,
      retiraNaLoja:'',
      retirar:false
    }

  }


  componentWillMount(){

    const {state} = this.props.navigation
    var nomeEstabelecimento = state.params ? state.params.nomeEstabelecimento : ""

    retiraLoja(nomeEstabelecimento,(callback)=>{
      this.setState({
        retiraNaLoja: callback.retiraLoja
      });
    });

    this.setState({
      loading: true
    })
    if(carrinho.length>0){
      this.setState({
        produtosCarrinho: carrinho
      }, function(){
          this.setState({
            loading: false
          })
      })
    }else{
      this.setState({
        loading: false
      })
    }

  }

  onSubtract = (item, index) =>{
    const produtosCarrinho = [...this.state.produtosCarrinho];
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

              if(produtosCarrinho.length>0){
                this.setState({produtosCarrinho},function(){
                  atualizarCarrinho(this.state.produtosCarrinho)
                });
              }else{
                this.setState({
                  produtosCarrinho:[]
                });
                atualizarCarrinho([])
              }

              // this.setState({ produtosCarrinho}, function(){
              //   if(produtosCarrinho.length>0){
              //   atualizarCarrinho(this.state.produtosCarrinho)
              // }else{
              //   atualizarCarrinho([])
              // }
              // })
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

  valorVirgula(valor){
    console.log("valor"+valor);
    var str = (valor).toFixed(2)
    var res = str.toString().replace(".",",")
    return(
        <Text style={styles.textAddProduto}>{res}</Text>
    )
  }

  functionCarrinho=()=>{
    if(Object.keys(this.state.produtosCarrinho).length>0){
      return(
        <View style={{flex: 1}}>
          <FlatList
            ItemSeparatorComponent={ListItemSeparator}
            data= {this.state.produtosCarrinho}
            extraData={this.state}
            renderItem={({ item, index }) => (
              <CarrinhoListItem
                item={item}
                onSubtract={() => this.onSubtract(item, index)}
                onAdd={() => this.onAdd(item, index)}
                preco={() => {
                  var str = (item.preco*item.quantidade).toFixed(2)
                  var res = str.toString().replace(".",",")
                  return(
                      <Text style={[styles.textCarrinho,{
                          color: cores.corSecundaria,
                          fontFamily: "Futura Medium Italic BT",
                          alignSelf: 'center', fontSize: 18}]}>
                        R$ {res}
                      </Text>
                  )
                }}/>
            )}
            keyExtractor={item => item._id.toString()}
          />
        <View style={{backgroundColor: cores.corPrincipal, height: 1}}></View>
          <View>
            {this.state.retiraNaLoja ?
              <View style={{flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 10}}>
                <Text style={[styles.textAdicionais,{fontSize: 16,marginBottom: 3}]}>Retirar na loja?</Text>
                <CheckBox
                  checked={this.state.retirar}
                  onPress={()=>{
                    if(this.state.retirar){
                      console.log("this.frete"+this.frete);
                      this.setState({
                        frete: 6.00,
                        retirar: false
                      });
                      console.log("this.totalPrice"+this.totalPrice);
                      console.log("this.state.frete"+this.state.frete);
                    }else{
                      this.setState({
                        frete:0.00,
                        retirar: true
                      })
                      console.log("this.totalPrice"+this.totalPrice);
                      console.log("this.state.frete"+this.state.frete);
                    }
                  }}
                  textStyle={{fontSize: 10}}
                  containerStyle={{backgroundColor: 'rgba(0,0,0,0.1)'}}
                />
              </View>
            :
              <View></View>
            }
          </View>
        <View style={{backgroundColor: cores.corPrincipal, height: 1}}></View>
        {this.state.retirar ?
            <View></View>
            :
            <View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 10, marginTop: 3}}>
              <Text style={[styles.textAdicionais,{fontSize: 16,marginBottom: 3}]}>
                Valor Pedido:
              </Text>
              <Text style={[styles.textAdicionais,
                  {alignItems:'flex-end', fontSize: 16,marginBottom: 3}]}>
                  R$ {this.valorVirgula(this.totalPrice)}
              </Text>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 10}}>
              <Text style={[styles.textAdicionais,{fontSize: 16, marginBottom: 3}]}>Frete:</Text>
              <Text style={[styles.textAdicionais,
                  {alignItems:'flex-end', fontSize: 16,marginBottom: 3}]}>
                  R$ {this.valorVirgula(this.state.frete)}
              </Text>
            </View>
            </View>
          }
          <View style={{flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 10}}>
            <Text style={[styles.textAdicionais,
                {fontSize: 18,marginBottom: 3}]}>
                Valor Total Pedido:
            </Text>
            <Text style={[styles.textAdicionais,
                {alignItems:'flex-end', fontSize: 18,marginBottom: 3}]}>
                R$ {this.valorVirgula(this.totalPrice+this.state.frete)}
            </Text>
          </View>
          <LazyYellowButton
            styleButton={{width: wp('100%')}}
            styleText={{fontFamily:'Futura PT Bold',color:cores.corPrincipal, fontSize: 20}}
            onPress={()=>{
              if(this.state.produtosCarrinho.length>0){
                this.props.navigation.navigate('ResumoPgto',{
                  nomeEstabelecimento: this.props.navigation.state.params.nomeEstabelecimento,
                  retirarLoja: this.state.retirar})
              }
            }}
            text={"CONTINUAR"}
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
      <LazyActivity/>
    </View> :

    <View style={{flex:1}}>
      <StatusBar/>
      {this.functionCarrinho()}
    </View>

    return (
      <ImageBackground
        source={images.imageBackground}
        style={styles.backgroundImage}>
        <View style={styles.separator}></View>
        {content}
      </ImageBackground>
    );
  }
}
