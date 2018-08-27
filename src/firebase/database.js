console.ignoredYellowBox = [
    'Setting a timer'
]
import { AsyncStorage } from 'react-native';
import {db, auth} from './firebase'
import firebase from 'firebase'

export var listaEstabelecimentos = []
export var listaAdicionais = []
export var estabelecimentoProd = []
export var listaTamanhosPizzas = []
export var nomesEstabelecimentos = []
export var allDatabase = []
export var listaEnderecos = []
export var numTamanhos = 0
export var listaPedidos=[]
var todoCounter = 1;


export async function login (email, pass, onLogin) {

    try {
        await db
            .signInWithEmailAndPassword(email, pass);
            onLogin()

    } catch (error) {
        var errorCode = error.code
        if (errorCode === 'auth/wrong-password' || errorCode === 'auth/invalid-email' ){
          alert('Credenciais Incorretas');
        }
        else if (errorCode === 'auth/user-disabled'){
          alert('Usuário desabilitado')
        }else if (errorCode === 'auth/user-not-found'){
          alert('Usuário não cadastrado')
        }
    }

}

export async function signup (email, pass, onSignup) {

    try {
        await db
            .createUserWithEmailAndPassword(email, pass);

        onSignup()
        // Navigate to the Home page, the user is auto logged in

    } catch (error) {
      var errorCode = error.code
      if (errorCode === 'auth/email-already-in-use'){
        alert('Já existe uma conta com esse email');
      }
      else if (errorCode === 'auth/invalid-email'){
        alert('Email inválido')
      }
    }
}

export async function cadastrarUsuario(userId, nome, telefone, endereco,
  numeroEnd, bairro, referencia, profilePicURL) {

  let userInformationPath = "/user/" + userId + "/details";
  let userInformationPathEnd = "/user/" + userId + "/details/listaEnderecos";

  db.ref(userInformationPath).set({
      nome: nome,
      telefone: telefone,
      profilePicURL: profilePicURL
  })

  db.ref(userInformationPathEnd).push({
    endereco: endereco,
    numeroEnd: numeroEnd,
    bairro: bairro,
    referencia: referencia
  })

  try {
    await AsyncStorage.multiSet([['endAtual', endereco], ['numeroEnd', numeroEnd],
                                ['bairro', bairro], ['referencia', referencia]]);

  } catch (error) {
    console.log("error AsyncStorage cadastrarUsuario"+error)
  }

}

export function atualizarUsuario(userId, nome, telefone) {

  let userInformationPath = "/user/" + userId + "/details";

  return db.ref(userInformationPath).update({
      nome: nome,
      telefone: telefone
  })
}

export async function cadastrarEndereco(userId,  endereco,
  numeroEnd, bairro, referencia){
    let userInformationPath = "/user/" + userId + "/details/listaEnderecos/"

      db.ref(userInformationPath).push({
        endereco: endereco,
        numeroEnd: numeroEnd,
        bairro: bairro,
        referencia: referencia
      })

      try {
        await AsyncStorage.multiSet([['endAtual', endereco], ['numeroEnd', numeroEnd],
                                    ['bairro', bairro], ['referencia', referencia]]);

      } catch (error) {
        console.log("error AsyncStorage cadastrarEndereco"+error)
      }

  }

  export function selecionarEndereco(userId){

  }

export async function atualizarEndereco(userId, key, endereco,
  numeroEnd, bairro, referencia) {

  let userInformationPath = "/user/" + userId + "/details/listaEnderecos/"+key+"/";

  return db.ref(userInformationPath).update({
      endereco: endereco,
      numeroEnd: numeroEnd,
      bairro: bairro,
      referencia: referencia,
  })

  try {
    await AsyncStorage.multiSet([['endAtual', endereco], ['numeroEnd', numeroEnd],
                                ['bairro', bairro], ['referencia', referencia]]);

  } catch (error) {
    console.log("error AsyncStorage atualizarEndereco"+error)
  }

}


export async function logout() {

    try {

        await auth.signOut();

        // Navigate to login view

    } catch (error) {
        console.log(error);
    }

}

export async function deleteUser(){

  try {

    let user = await auth.currentUser;
    let userInformationPath = "/user/" + user.uid
    user.delete().then(function() {
      db.ref(userInformationPath).remove()
      console.log("user deletado")
    }, function(error) {
      console.log("user não deletado"+error)// An error happened.
    });

  } catch (error) {
      console.log(error);
  }
}

export function getUserProfile(userID, callback){
  let userPath = "/user/"+userID

  var nome = "";
  var telefone = "";
  var profilePicURL = "";

  db.ref(userPath).once('value').then(function(snapshot) {
    var userData = snapshot.val()

//Se userData não for nulo, isso quer dizer que o usuário já existe e não precisa completar cadastro
    if(userData){
      nome = userData.details.nome
      console.log("nome"+nome);
      telefone = userData.details.telefone
      profilePicURL = userData.details.profilePicURL
    }
    callback(nome, telefone, profilePicURL)
  });


}

export async function getUserEndAtual(callback){
  // let userPath = "/user/"+userID
  //
  var endereco = "";
  var numeroEnd = "";
  var bairro = "";
  var referencia = "";
  // var key =""

  try {

    await AsyncStorage.multiGet(['endAtual','numeroEnd','bairro', 'referencia']).then((response)=>{
      endereco = response[0][1]
      numeroEnd = response[1][1]
      bairro = response[2][1]
      referencia = response[3][1]

      callback(endereco, numeroEnd, bairro, referencia)
    });

  } catch (error) {
    console.log("error AsyncStorage getUserEndAtual: "+error)
  }

}

export function getUserListEnd(userID, onListLoad){
  let userPath = "/user/"+userID

  db.ref(userPath+"/details/listaEnderecos/").once('value').then(function(snapshot){
    listaEnderecos=[]
    snapshot.forEach((child)=>{
      listaEnderecos.push({
        bairro: child.val().bairro,
        endereco: child.val().endereco,
        numeroEnd: child.val().numeroEnd,
        referencia: child.val().referencia,
        key: child.key
      })
    })
    onListLoad()
  })

}

export function addEndereco(userID){

}


export async function checkUserDetails(userExiste, userNaoExiste){

  try {
    let userId = await auth.currentUser.uid
    db.ref("/user/"+userId).once('value').then(function(snapshot) {
      var userData = snapshot.val()

  //Se userData não for nulo, isso quer dizer que o usuário já existe e não precisa completar cadastro
      if(userData){
        userExiste()
      }else{
        userNaoExiste()
      }
    });

  } catch (error) {
      console.log(error);
  }

}

export async function getListaEstabelecimentos(tipoEstabelecimento, onListLoad){
  try{
    listaEstabelecimentos = []
    db.ref("/tiposEstabelecimentos/"+tipoEstabelecimento).once('value').then(function(snapshot){
      var estabelecimentoData = snapshot.val()
      if(estabelecimentoData){
        snapshot.forEach((child) =>{
          listaEstabelecimentos.push({
            logo: child.val().Logo,
            nome: child.val().Nome,
            precoDelivery: child.val().PreçoDelivery,
            tempoEntrega: child.val().TempoEntrega,
            _id:todoCounter++
          });
        })
        onListLoad()
      }

    })
  } catch(error){
    console.log(error)
  }
}

export async function getEstabelecimentoProd(nomeEstabelecimento, sectionDataFunction, onListLoad ){
  try{
    estabelecimentoProd = []
    db.ref("/produtos/"+nomeEstabelecimento).once('value').then(function(snapshot){
      var estabelecimentoData = snapshot.val()
      if(estabelecimentoData){
        snapshot.forEach((child) =>{
          estabelecimentoProd.push({
            imgProduto: child.val().imagem,
            nomeProduto: child.val().nome,
            preco: child.val().preco,
            detalhes: child.val().detalhes,
            tipo: child.val().tipo,
            sabores: child.val().sabores,
            tamanho: child.val().tamanho,
            _id:todoCounter++
          });
        })
        sectionDataFunction()
        onListLoad()
        ;
      }
    })
  } catch(error){
    console.log(error)
  }
}

export async function getTamanhosPizzas(nomeEstabelecimento){
  try{
    listaTamanhosPizzas = []
    db.ref("/pizza/"+nomeEstabelecimento).once('value').then(function(snapshot){
      var estabelecimentoPizzas = snapshot.val()
      if(estabelecimentoPizzas){
        snapshot.forEach((child) =>{
          listaTamanhosPizzas.push({
            fatias: child.val().fatias,
            sabores: child.val().sabores,
            tamanho: child.val().tamanho,
            _id:todoCounter++
          });
        })
        numTamanhos = snapshot.numChildren()
      }
    })
  } catch(error){
    console.log(error)
  }
}



export async function limparEstabelecimentoProd(){
  console.log("dentro limparEstabelecimentoProd");
  estabelecimentoProd = []
}

export async function getNomeEstabelecimentos(){
  try{
    nomesEstabelecimentos = []
    db.ref("/nomeEstabelecimentos/").once('value').then(function(snapshot){
      var estabelecimentoTiposProdData = snapshot.val()
      if(estabelecimentoTiposProdData){
        snapshot.forEach((child) =>{
          nomesEstabelecimentos.push({
            nome: child.val().nome,
            logo: child.val().logo
          });
        });
      }
    })
  } catch(error){
    console.log(error)
  }
}

export async function getEstabelecimentoInfo(nomeEstabelecimento, callback){
  try{
    estabelecimentoInfo = []
    db.ref("/infoEstabelecimentos/"+nomeEstabelecimento).once('value').then(function(snapshot){
      var estabelecimentoData = snapshot.val()
      var logo, nome, precoDelivery, tempoEntrega, seg, ter, qua, qui, sex, sab, dom, deb, din  = "";
      var cre = []
      var deb = []
      if(estabelecimentoData){
            logo = estabelecimentoData.logo
            nome = estabelecimentoData.nome
            precoDelivery = estabelecimentoData.precoDelivery
            tempoEntrega = estabelecimentoData.tempoEntrega

            if(estabelecimentoData.horarioFuncionamento.segunda.abertura=="fechado"){
              seg = "Fechado"
            }else{
              seg = estabelecimentoData.horarioFuncionamento.segunda.abertura+" às "+
              estabelecimentoData.horarioFuncionamento.segunda.fechamento
            }

            if(estabelecimentoData.horarioFuncionamento.terca.abertura=="fechado"){
              ter = "Fechado"
            }else{
              ter = estabelecimentoData.horarioFuncionamento.terca.abertura+" às "+
              estabelecimentoData.horarioFuncionamento.terca.fechamento
            }

            if(estabelecimentoData.horarioFuncionamento.quarta.abertura=="fechado"){
              qua = "Fechado"
            }else{
              qua = estabelecimentoData.horarioFuncionamento.quarta.abertura+" às "+
              estabelecimentoData.horarioFuncionamento.quarta.fechamento
            }

            if(estabelecimentoData.horarioFuncionamento.quinta.abertura=="fechado"){
              qui = "Fechado"
            }else{
              qui = estabelecimentoData.horarioFuncionamento.quinta.abertura+" às "+
              estabelecimentoData.horarioFuncionamento.quinta.fechamento
            }

            if(estabelecimentoData.horarioFuncionamento.sexta.abertura=="fechado"){
              sex = "Fechado"
            }else{
              sex = estabelecimentoData.horarioFuncionamento.sexta.abertura+" às "+
              estabelecimentoData.horarioFuncionamento.sexta.fechamento
            }

            if(estabelecimentoData.horarioFuncionamento.sabado.abertura=="fechado"){
              sab = "Fechado"
            }else{
              sab = estabelecimentoData.horarioFuncionamento.sabado.abertura+" às "+
              estabelecimentoData.horarioFuncionamento.sabado.fechamento
            }

            if(estabelecimentoData.horarioFuncionamento.domingo.abertura=="fechado"){
              dom = "Fechado"
            }else{
              dom = estabelecimentoData.horarioFuncionamento.domingo.abertura+" às "+
              estabelecimentoData.horarioFuncionamento.domingo.fechamento
            }

            estabelecimentoData.formaPagamento.credito.map((item,i)=>{
              cre.push({
                bandeira: item.bandeira,
                id: todoCounter++
              })
            })

            estabelecimentoData.formaPagamento.debito.map((item,i)=>{
              deb.push({
                bandeira: item.bandeira,
                id: todoCounter++
              })
            })

            if(estabelecimentoData.formaPagamento.dinheiro=="s"){
                din = "Dinheiro"
            }else{
              din = ""
            }

          }

      callback(logo, nome, precoDelivery, tempoEntrega, seg, ter,
        qua, qui, sex, sab, dom, cre, deb, din)


    })
  } catch(error){
    console.log(error)
  }
}

export async function getListaAdicionais(nomeEstabelecimento, tipoProduto){
  try{
    listaAdicionais = []
    todoCounter=0
    db.ref("/listaAdicionais/"+nomeEstabelecimento+"/"+tipoProduto+"/").once('value').then(function(snapshot){

      var estabelecimentoTiposProdData = snapshot.val()
      if(estabelecimentoTiposProdData){
        snapshot.forEach((child) =>{
          listaAdicionais.push({
            nome: child.val().nome,
            preco: child.val().preco,
            quantidade: child.val().quantidade,
            _id: todoCounter++
          });
        });
        console.log("listaAdicionais"+listaAdicionais);
      }
    })
  } catch(error){
    console.log(error)
  }
}

export async function loadMessages(estabelecimento, chave, callback){
  // console.log("dentro loadMessages"+estabelecimento);
  this.messageRef = db.ref("/messages/"+estabelecimento+"/"+chave+"/status")
  console.log("messageRef"+this.messageRef);
  this.messageRef.off();
  this.messageRef.on('value',function(snap){
    callback({status:snap.val()})
  })



}

export async function carregarPedidos(callback){
  let userId = await auth.currentUser.uid
  // console.log("dentro waitMessages");
  db.ref("/user/"+userId+"/details/pedidos").once('value').then(function(snapshot){
    snapshot.forEach((child)=>{
      db.ref("/infoEstabelecimentos/"+child.val().estabelecimento+"/logo").once('value').then(function(logo){
      callback({
        logo: logo.val(),
        _id:child.key,
        carrinho: child.val().carrinho,
        bairro: child.val().bairro,
        frete: child.val().frete,
        createdAt: new Date(child.val().createdAt),
        endereco: child.val().endereco,
        estabelecimento: child.val().estabelecimento,
        formaPgto: child.val().formaPgto,
        formaPgtoDetalhe: child.val().formaPgtoDetalhe,
        valorCompra: child.val().valorCompra
      })
    })
  })
  })
}

export var chaveMsg=""
export async function sendMessage(retirarNovo, carrinhoNovo, formaPgtoNovo, formaPgtoDetalheNovo,
   nomeNovo, telefoneNovo, enderecoNovo, bairroNovo, referenciaNovo,
   estabelecimento, statusNovo, key) {
    this.messageRef = db.ref("/messages/"+estabelecimento+"/")
    this.messageRef.off();
    this.messageRef.push({
      retirar: retirarNovo,
      carrinho: carrinhoNovo,
      formaPgto: formaPgtoNovo,
      formaPgtoDetalhe: formaPgtoDetalheNovo,
      nome: nomeNovo,
      telefone: telefoneNovo,
      endereco: enderecoNovo,
      bairro: bairroNovo,
      referencia: referenciaNovo,
      createdAt: firebase.database.ServerValue.TIMESTAMP,
      status: statusNovo
    }).then((snap)=>{
      key({key: snap.key})
    })

  }

  export async function salvarPedido(retirarNovo, carrinhoNovo, totalPriceNovo, freteNovo, formaPgtoNovo, formaPgtoDetalheNovo,
     enderecoNovo, bairroNovo, estabelecimentoNovo, keyNovo){
       let userId = await auth.currentUser.uid
       console.log("userId"+userId);
       this.historicoPedidos = db.ref("/user/"+userId+"/details/pedidos/")
       this.historicoPedidos.off();
       this.historicoPedidos.push({
        retirar: retirarNovo,
        carrinho: carrinhoNovo,
        formaPgto: formaPgtoNovo,
        formaPgtoDetalhe: formaPgtoDetalheNovo,
        endereco: enderecoNovo,
        bairro: bairroNovo,
        frete: freteNovo,
        estabelecimento: estabelecimentoNovo,
        valorCompra: totalPriceNovo,
        createdAt: firebase.database.ServerValue.TIMESTAMP,
        key: keyNovo
    })
  }

  export async function retiraLoja(nomeEstabelecimento, callback){
    try{
      db.ref("/infoEstabelecimentos/"+nomeEstabelecimento+"/retiraLoja").once('value').then(function(snapshot){
          callback({retiraLoja: snapshot.val()})
      })
    } catch(error){
      console.log(error)
    }
  }
