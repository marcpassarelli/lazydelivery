import React from 'react';
import {
  AppRegistry,
} from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import { SplashScreen } from './src/splash/splash'
import { CadastroInicialScreen } from './src/cadastro/cadastroInicial'
import { CompletaCadastroScreen } from './src/cadastro/completaCadastro'
import { LoginRegisterScreen } from './src/login/loginregister'
import { HomeScreen } from './src/home/home'
import { AtualizaCadastroScreen } from './src/cadastro/atualizaCadastro'
import { AtualizaEnderecoScreen } from './src/cadastro/atualizaEndereco'
import { ProfileScreen } from './src/home/profile'
import { EstabelecimentosScreen } from './src/estabelecimentos/estabelecimentos'
import { ProdutosCardapioScreen } from './src/produtos/produtosCardapio'
import { ProdutosInformacoesScreen } from './src/produtos/produtosCardapio'
import * as firebase from 'firebase';

const MyApp = TabNavigator({
  Home: {
    screen: HomeScreen,
  },
  Profile: {
    screen: ProfileScreen,
  },
}, {
  tabBarOptions: {
    activeTintColor: '#FFFFFF',
    labelStyle: {
      fontSize: 13,
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

const DeliveryPassa = StackNavigator({
  Splash: { screen: SplashScreen },
  LoginRegister: { screen: LoginRegisterScreen },
  CadastroInicial: { screen: CadastroInicialScreen },
  CompletaCadastro: { screen: CompletaCadastroScreen },
  Home: { screen: MyApp },
  AtualizaCadastro: { screen: AtualizaCadastroScreen },
  AtualizaEndereco: { screen: AtualizaEnderecoScreen },
  Estabelecimentos: { screen: EstabelecimentosScreen},
  ProdutosCardapio: { screen: ProdutosCardapioScreen},
  ProdutosCardapio: { screen: ProdutosCardapioScreen},
},
  { headerMode: 'screen' }
);

console.ignoredYellowBox = ['Warning: BackAndroid']


AppRegistry.registerComponent('DeliveryPassa', () => DeliveryPassa);
