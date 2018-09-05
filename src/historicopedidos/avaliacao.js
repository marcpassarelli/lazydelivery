console.ignoredYellowBox = [
    'Setting a timer'
]

import React, { Component } from 'react';
import { TextInput, Image, ImageBackground, Alert, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native'
import { styles, images, cores } from '../constants/constants'
import { logout, getUserProfile } from '../firebase/database'
import Rating from 'react-native-rating-simple';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export class AvaliacaoScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      id:'',
      key:'',
      estabelecimento:''
    }
  }

  static navigationOptions = ({navigation}) => ({
    title: "Avaliar o Pedido",
    headerTitleStyle: styles.headerText,
    headerStyle: styles.header,
    headerLeft: (
      <Icon
        style={{marginLeft: 15}}
        name={'arrow-left'}
        size={26}
        color="#000000"
        onPress={
          ()=>{
          navigation.navigate('HistoricoPedidos')
          }}>
        </Icon>
      ),
    headerRight: (<View></View>)
  })

  componentWillMount(){
    this.setState({
            loading: true
          });

      // CRIAR FUNÇÃO EM DATABASE PARA SALVAR EM MESSAGES/KEY E USER/PEDIDOS/ID
      const {state} = this.props.navigation
      //id do pedido dentro de user/pedidos/id
      var id = state.params ? state.params.id : ""
      //key da message dentro de messages/key
      var key = state.params ? state.params.key : ""
      var estabelecimento = state.params ? state.params.estabelecimento : ""
      this.setState({
        id: id,
        key: key,
        estabelecimento: estabelecimento
      }, function(){
        this.setState({
          loading: false
        });
      });
  }

  avaliarPedido = () => {

  }

  onStarRatingPress(rating) {
    this.setState({
      starCount: rating
    });
  }


   render() {

     console.ignoredYellowBox = [
         'Setting a timer'
     ]
     const {rating}=this.props

     const content = this.state.loading ?

     <View style={styles.containerIndicator}>
       <ActivityIndicator
         color = {cores.corPrincipal}
         size="large"
         style = {styles.activityIndicator}/>
     </View> :

     <View style={{flex:1, marginHorizontal: 3}}>
       <Text style={styles.textAddProduto}>Dê de 0 a 5 estrelas para o pedido feito para o {this.state.estabelecimento}:</Text>
       <View style={{marginHorizontal: 2}}>
         <Text>Tempo de Entrega:</Text>
           <Rating
             halfStar={
               <Image source={halfStar} style={{ width: 40, height: 40 }} />
             }
             fullStar={
               <Image source={fullStar} style={{ width: 40, height: 40 }} />
             }
             emptyStar={
               <Image source={emptyStar} style={{ width: 40, height: 40 }} />
             }
             starSize={40}
             onChange={rating => {
               this.setState({ rating1: rating });
             }}
           />
      </View>
       <Text style={styles.textAddProduto}>Escreva algum comentário se desejar:</Text>
       <TextInput>

       </TextInput>
       <View style={{marginRight: 10}}>
         <TouchableOpacity
           style={[styles.buttons,{width: null, marginHorizontal: 10}]}
           onPress = { () => {this.avaliarPedido()} } >
           <Text style={[styles.textButtons,{marginHorizontal: 5}]}>AVALIAR PEDIDO</Text>
         </TouchableOpacity>
         </View>
     </View>

     return (
       <ImageBackground
         source={images.imageBackground}
         style={styles.backgroundImage}>
         {content}
       </ImageBackground>
     );
     }
}

//export default Home
