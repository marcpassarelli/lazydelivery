import React from 'react';
import {
  AppRegistry, Easing, Animated
} from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import { SplashScreen } from './src/splash/splash'
import { CadastroInicialScreen } from './src/cadastro/cadastroInicial'
import { CompletaCadastroScreen } from './src/cadastro/completaCadastro'
import { LoginRegisterScreen } from './src/login/loginregister'
import { HomeScreen } from './src/home/home'
import { CadastrarEnderecoScreen } from './src/cadastro/cadastrarEndereco'
import { AtualizaCadastroScreen } from './src/cadastro/atualizaCadastro'
import { AtualizaEnderecoScreen } from './src/cadastro/atualizaEndereco'
import { ProfileScreen } from './src/home/profile'
import { ListaEstabelecimentosScreen } from './src/listaEstabelecimentos/listaEstabelecimentos'
import { PizzaScreen } from './src/estabelecimentos/pizza'
import { AddProdutoScreen } from './src/addproduto/addproduto'
import { CarrinhoScreen } from './src/carrinho/carrinho'
import { ResumoPgtoScreen } from './src/resumopgto/resumopgto'
import { EstabelecimentoProdutosScreen } from './src/estabelecimentos/estabelecimentoProdutos'
import { EstabelecimentoInformacoesScreen } from './src/estabelecimentos/estabelecimentoInformacoes'
import { AdicionaisScreen } from './src/addproduto/adicionais'
import { DestaquesScreen } from './src/home/destaques'
import { HistoricoPedidosScreen } from './src/historicoPedidos/historicoPedidos'
import * as firebase from 'firebase';

const TabHome = TabNavigator({
  Home: {
    screen: HomeScreen,
  },
  Destaques:{
    screen: DestaquesScreen,
  },
  Profile: {
    screen: ProfileScreen,
  },
}, {
  tabBarOptions: {
    activeTintColor: '#FFFFFF',
    labelStyle: {
      fontSize: 11,
    },
    iconStyle:{
      marginTop:9,
    },
    style: {
      backgroundColor: '#8b0000',
      height:50
    },
    showIcon: true,
    tabStyle: {
      height: 50,
    },
  },
  tabBarPosition:'bottom',
})

const TabEstabelecimento = TabNavigator({
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
      fontSize: 16,
      marginBottom:10
    },
    style: {
      backgroundColor: '#8b0000',
    },
    showIcon: false,
    tabStyle: {

    },
  },
  tabBarPosition:'top',
  backBehavior: 'none',
})

const DeliveryPassa = StackNavigator({
  Splash: { screen: SplashScreen },
  LoginRegister: { screen: LoginRegisterScreen },
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
  AddProduto: { screen: AddProdutoScreen },
  Adicionais: { screen: AdicionaisScreen},
  ResumoPgto: { screen: ResumoPgtoScreen },
  HistoricoPedidos: { screen: HistoricoPedidosScreen }
},
  { headerMode: 'float',},

);

console.ignoredYellowBox = ['Warning: BackAndroid']


AppRegistry.registerComponent('DeliveryPassa', () => DeliveryPassa);
