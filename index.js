import React from 'react';
import { cores,styles } from './src/constants/constants'
import {
  AppRegistry, Easing, Animated, View, Text, Platform,YellowBox,Alert
} from 'react-native';
import _ from 'lodash';
import {carrinho, atualizarCarrinho} from './src/addproduto/addproduto'
import LazyBackButton from './src/constants/lazyBackButton'
import { createStackNavigator, createBottomTabNavigator,createMaterialTopTabNavigator} from 'react-navigation';
import { SplashScreen } from './src/splash/splash'
import { CadastroInicialScreen } from './src/cadastro/cadastroInicial'
import { CompletaCadastroScreen } from './src/cadastro/completaCadastro'
import { LoginRegisterScreen } from './src/login/loginregister'
import { LoginEmailScreen } from './src/login/loginEmail'
import { RedefinePasswordScreen } from './src/login/redefinePassword'
import { HomeScreen } from './src/home/home'
import { CadastrarEnderecoScreen } from './src/cadastro/cadastrarEndereco'
import { AtualizaCadastroScreen } from './src/cadastro/atualizaCadastro'
import { AtualizaEnderecoScreen } from './src/cadastro/atualizaEndereco'
import { ProfileScreen } from './src/home/profile'
import { ListaEstabelecimentosScreen } from './src/listaEstabelecimentos/listaEstabelecimentos'
import { PizzaScreen } from './src/estabelecimentos/pizza'
import { AntesAddProdutoScreen } from './src/addproduto/antesAddProduto'
import { AddProdutoScreen } from './src/addproduto/addproduto'
import { CarrinhoScreen } from './src/carrinho/carrinho'
import { ResumoPgtoScreen } from './src/resumopgto/resumopgto'
import { EstabelecimentoProdutosScreen } from './src/estabelecimentos/estabelecimentoProdutos'
import { EstabelecimentoInformacoesScreen } from './src/estabelecimentos/estabelecimentoInformacoes'
import { AdicionaisScreen } from './src/addproduto/adicionais'
import { DestaquesScreen } from './src/home/destaques'
import { HistoricoPedidosScreen } from './src/historicoPedidos/historicoPedidos'
import { DetalhesPedidoScreen } from './src/historicoPedidos/detalhesPedido'
import { AvaliacaoScreen } from './src/historicoPedidos/avaliacao'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader', 'Setting a timer for a long']);

const TabHome = createBottomTabNavigator({
  Home: {
    screen: HomeScreen,

  },
  Destaques:{
    screen: DestaquesScreen
  },
  Profile: {
    screen: ProfileScreen,
  },
}, {
  tabBarOptions: {
    activeTintColor: cores.corPrincipal,
    labelStyle: {
      fontSize: wp('3.75%'),
      color:cores.corPrincipal,

    },
    style: {
      backgroundColor: cores.corSecundaria,
      height:hp('9.1%'),

    },
    showIcon: true,
    indicatorStyle:{
      backgroundColor:cores.corPrincipal,
    }
  },
  navigationOptions: {
    title: 'NoHeader!',
    header: null
  },
  tabBarPosition:'bottom',
})

TabHome.navigationOptions = {
  header: null
}

const TabEstabelecimento = createMaterialTopTabNavigator({
  EstabelecimentoProdutos: {
    screen: EstabelecimentoProdutosScreen,
  },
  EstabelecimentoInformacoes: {
    screen: EstabelecimentoInformacoesScreen
  },
},{
  tabBarOptions: {
    activeTintColor: '#FFFFFF',
    inactiveTintColor: '#000000',
    labelStyle: {
      fontSize: wp('4.5%'),
      marginBottom:10,
      fontFamily: 'Futura-Book',
      color: cores.corSecundaria
    },
    style: {
      backgroundColor: cores.corPrincipal,
    },
    showIcon: false,
    tabStyle: {

    },
  },
  tabBarPosition:'top',
  backBehavior: 'none',
})

TabEstabelecimento.navigationOptions = ({navigation}) =>{
  return{
  title: _.upperCase(navigation.state.params.nomeEstabelecimento),
  headerTitleStyle: styles.headerText,
  headerStyle: styles.header,
  headerLeft: (
    <LazyBackButton
      goBack={()=>{
          if(carrinho.length>0){
            Alert.alert(
              'Sair do Estabelecimento',
              'Tem certeza que deseja sair deste estabelecimento? Todos os items do carrinho serão perdido.',
              [
                {text: 'Sim', onPress: () => {
                  console.log("tipoestabelecimento onPress:"+navigation.state.params.tipoEstabelecimento);
                  atualizarCarrinho([])
                  if(navigation.state.params.telaAnterior=="home"){
                    navigation.navigate('Home')
                  }else{
                    navigation.navigate('ListaEstabelecimentos',
                    {tipoEstabelecimento:navigation.state.params.tipoEstabelecimento})
                  }
                }},
                {text: 'Não', onPress: ()=>{
                  console.log("cancelado");
                }},
              ],
              {cancelable: false}
            )
          }else{

              navigation.push('Home')
            //   if(navigation.state.params.telaAnterior=="home"){
            // }else{
            //   navigation.push('ListaEstabelecimentos',
            //   {tipoEstabelecimento:navigation.state.params.tipoEstabelecimento})
            // }
          }
        }}/>
    ),
  headerRight: (<View style={styles.headerRight}></View>),}
}

const DeliveryPassa = createStackNavigator({
  Splash: { screen: SplashScreen },
  LoginRegister: { screen: LoginRegisterScreen },
  LoginEmail: { screen: LoginEmailScreen },
  RedefinePassword : { screen: RedefinePasswordScreen },
  CadastroInicial: { screen: CadastroInicialScreen },
  CompletaCadastro: { screen: CompletaCadastroScreen },
  Home: { screen: TabHome },
  CadastrarEndereco: { screen: CadastrarEnderecoScreen },
  AtualizaCadastro: { screen: AtualizaCadastroScreen },
  AtualizaEndereco: { screen: AtualizaEnderecoScreen },
  ListaEstabelecimentos: { screen: ListaEstabelecimentosScreen},
  Estabelecimento: { screen: TabEstabelecimento},
  Pizza: { screen: PizzaScreen },
  Carrinho: { screen: CarrinhoScreen },
  AntesAddProduto: { screen: AntesAddProdutoScreen },
  AddProduto: { screen: AddProdutoScreen },
  Adicionais: { screen: AdicionaisScreen},
  ResumoPgto: { screen: ResumoPgtoScreen },
  HistoricoPedidos: { screen: HistoricoPedidosScreen },
  DetalhesPedido: { screen: DetalhesPedidoScreen },
  Avaliacao: { screen: AvaliacaoScreen }
},
  { headerMode: 'float'},

);

console.ignoredYellowBox = ['Warning: BackAndroid']


AppRegistry.registerComponent('DeliveryPassa', () => DeliveryPassa);
