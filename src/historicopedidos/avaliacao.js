console.ignoredYellowBox = [
    'Setting a timer'
]

import React, { Component } from 'react';
import { Image, Alert, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native'
import { styles, images } from '../constants/constants'
import { logout, getUserProfile } from '../firebase/database'


export class AvaliacaoScreen extends Component {

  constructor(props) {
    super(props);

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

  async componentWillMount(){
    this.setState({
            loading: true
          });


  }


   render() {

     console.ignoredYellowBox = [
         'Setting a timer'
     ]

     const content = this.state.loading ?

     <View style={styles.containerIndicator}>
       <ActivityIndicator
         color = {cores.corPrincipal}
         size="large"
         style = {styles.activityIndicator}/>
     </View> :

     <View style={{flex:1}}>

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
