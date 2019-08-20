console.ignoredYellowBox = [
    'Setting a timer'
]

import React, { Component } from 'react';
import { TextInput, Image, ImageBackground, Alert, Text, View, TouchableOpacity } from 'react-native'
import { styles, images, cores } from '../constants/constants'
import { logout, getUserProfile } from '../firebase/database'
import { Rating } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LazyActivity from '../loadingModal/lazyActivity'
import LazyBackButton from '../constants/lazyBackButton'

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
    title: "AVALIAÇÃO DO PEDIDO",
    headerTitleStyle: styles.headerText,
    headerStyle: styles.header,
    headerLeft: (
      <LazyBackButton
        goBack={()=>{
          navigation.navigate('HistoricoPedidos')
        }}/>
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
  ratingCompleted(rating){
    //console.log("rating"+rating);

  }

   render() {

     console.ignoredYellowBox = [
         'Setting a timer'
     ]

     const content = this.state.loading ?

     <View style={styles.containerIndicator}>
       <LazyActivity/>
     </View> :

     <View style={{flex:1, marginHorizontal: 3}}>
       <Text style={styles.textAddProduto}>Dê de 0 a 5 estrelas para o pedido feito para o {this.state.estabelecimento}:</Text>
       <View style={{marginHorizontal: 2}}>
         <Text>Tempo de Entrega:</Text>
           <Rating
             showRating
             type='custom'
             style={{alignSelf: 'center'}}
             ratingImage={images.preguicaRating}
             ratingColor={cores.corSecundaria}
             ratingBackgroundColor={'rgba(0,0,0,0)'}
             fractions={1}
             onFinishRating={this.ratingCompleted}
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
