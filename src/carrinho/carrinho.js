
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
import Icon from 'react-native-vector-icons/Feather'
import LazyBackButton from '../constants/lazyBackButton'
import LazyYellowButton from '../constants/lazyYellowButton'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import ListItemSeparator from '../constants/listItemSeparator'
import ModalItem from './modalItem'
let totalPrice =0
const produtosCarrinho = []
const detalhesModal = ""

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
      retirar:false,
      modalItem: false
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
    console.log("carrinho"+carrinho);
    if(carrinho.length>0){
      this.setState({
        produtosCarrinho: carrinho
      }, function(){
          this.setState({
            loading: false
          },function(){
            console.log("this.state.produtosCarrinho"+JSON.stringify(this.state.produtosCarrinho));
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
        <Text style={[styles.textAddProduto,{color: cores.textDetalhes}]}>{res}</Text>
    )
  }

  showModal(obs,detalhes){
    this.setState({
      modalItem: !this.state.modalItem,
    });
    this.detalhesModal =
      <View>
        <Text style={{flex:1, color:'#666666', fontSize: 12}}>{detalhes}</Text>
        <Text style={{flex:1, color:'#666666', fontSize: 12}}>Observação: {obs}</Text>
      </View>
  }

  closeModal(){
    this.setState({
      modalItem:!this.state.modalItem
    });
  }

  renderHeader=()=>{
    return (
      <View style={{marginBottom: 10,shadowOpacity: 0.5,
          borderWidth: 0.8,backgroundColor: cores.corPrincipal,
          height:50, flexDirection: 'row',justifyContent: 'space-between',alignItems: 'center'}}>
          <View style={{width:wp('54%'),height:50, justifyContent: 'center',marginLeft: 10,
            borderRightColor: cores.corSecundaria,borderRightWidth: 0.5}}>
            <Text style={{marginLeft: 5,color:cores.corSecundaria,fontFamily: 'Futura Medium'}}>ITEM</Text>
          </View>

          <View style={{width: wp('24%'),height: 50,
            borderRightColor: cores.corSecundaria,borderRightWidth: 0.5,justifyContent: 'center'}}>
            <Text style={{color:cores.corSecundaria,fontFamily: 'Futura Medium',alignSelf: 'center'}}>PREÇO</Text>
          </View>

          <View style={
              {width:wp('18%'),height:50,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems:'center',
              marginRight: 10}}>
              <Text style={{color:cores.corSecundaria,fontFamily: 'Futura Medium'}}>QTD.</Text>
          </View>
      </View>)
  }


            // ItemSeparatorComponent={ListItemSeparator}
  functionCarrinho=()=>{
    if(Object.keys(this.state.produtosCarrinho).length>0){
      return(
        <View style={{flex: 1}}>
          <FlatList
            stickyHeaderIndices={[0]}
            ListHeaderComponent={this.renderHeader}
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
                  let fontSize=0
                  if(item.adicional==true){
                    fontSize=16
                  }else{
                    fontSize=18
                  }
                  return(
                      <Text style={[styles.textCarrinho,{
                          color: cores.textDetalhes,
                          fontFamily: "Futura Medium Italic BT",
                          alignSelf: 'center', fontSize: fontSize}]}>
                        R$ {res}
                      </Text>
                  )
                }}
                detalhes={()=>{
                  this.showModal(item.obs,item.detalhes)
                }}/>
            )}
            keyExtractor={item => item._id.toString()}
          />
        <View style={{backgroundColor: cores.corSecundaria,marginHorizontal: 5,marginTop:5,height: 2}}></View>
          <View>
            {this.state.retiraNaLoja ?
              <View style={{flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 10,marginVertical: 15}}>
                <Text style={[styles.textAdicionais,{fontSize: 16,marginBottom: 3}]}>Retirar na loja?</Text>
                <Icon
                  color={'#d1d1d1'}
                  name={this.state.retirar? 'check-square':'square'}
                  size={24}
                  onPress={()=>{
                    if(this.state.retirar){
                      this.setState({
                        frete: 6.00,
                        retirar: false
                      });
                    }else{
                      this.setState({
                        frete:0.00,
                        retirar: true
                      })
                    }
                  }}
                  ></Icon>
              </View>
            :
              <View></View>
            }
          </View>
        <View style={{backgroundColor: cores.corSecundaria,marginHorizontal: 5,height: 2}}></View>
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
          <View style={{flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 10,marginVertical: 10}}>
            <Text style={[styles.textAdicionais,
                {fontSize: 18,marginBottom: 3}]}>
                Total:
            </Text>
            <Text style={[styles.textAdicionais,
                {alignItems:'flex-end', fontSize: 18,marginBottom: 3,color:cores.textDetalhes}]}>
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
      return(<Text style={[styles.textAddProduto,{marginTop: 10}]}>Não há itens no carrinho.</Text>)
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
        <ModalItem
          detalhes={this.detalhesModal}
          loading = {this.state.modalItem}
          showModal = {()=>{this.closeModal()}}/>
        {content}
      </ImageBackground>
    );
  }
}
