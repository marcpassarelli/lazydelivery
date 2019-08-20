console.ignoredYellowBox = [
    'Setting a timer'
]
import { AsyncStorage } from 'react-native';
import {db, auth} from './firebase'
import firebase from 'firebase'
import _ from 'lodash';

export var listaEstabelecimentos = []
export var listaAdicionais = []
export var estabelecimentoProd = []
export var listaTamanhosPizzas = []
export var nomesEstabelecimentos = []
export var allDatabase = []
export var listaEnderecos = []
export var numTamanhos = 0
export var listaPedidos=[]
export var listaBairros=[]
export var abertoFechado=[]
export var listaTipoItens=[]
var numChildrenLista=0
var todoCounter = 1;

var weekday = ["domingo","segunda","terca","quarta","quinta","sexta","sabado"]
var months = ["January","February","March","April","May","June","July","August","September","October","November","December"]

export function getAppVersion(callback){

  db.ref("/appInfo/version/").once('value').then(function(snapshot){
    callback({version:snapshot.val()})
  })
}

export async function login (email, pass, onLogin,onError) {

    try {
        await auth
            .signInWithEmailAndPassword(email, pass);
            onLogin()

    } catch (error) {
        var errorCode = error.code
        if (errorCode === 'auth/wrong-password' || errorCode === 'auth/invalid-email' ){
          alert('Credenciais Incorretas');
          onError()
        }
        else if (errorCode === 'auth/user-disabled'){
          alert('Usuário desabilitado')
          onError()
        }else if (errorCode === 'auth/user-not-found'){
          alert('Usuário não cadastrado')
          onError()
        }
    }

}

export async function signup (email, pass, onSignup) {

    try {
        await auth
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
  bairro, referencia, profilePicURL) {

  let userInformationPath = "/user/" + userId + "/details";
  let userInformationPathEnd = "/user/" + userId + "/details/listaEnderecos";

  db.ref(userInformationPath).set({
      nome: nome,
      telefone: telefone,
      profilePicURL: profilePicURL
  })

  db.ref(userInformationPathEnd).push({
    endereco: endereco,
    bairro: bairro,
    referencia: referencia
  })

  try {
    await AsyncStorage.multiSet([['endAtual', endereco],
                                ['bairro', bairro], ['referencia', referencia]]);

  } catch (error) {
    //console.log("error AsyncStorage cadastrarUsuario"+error)
  }

}

export function atualizarUsuario(userId, nome, telefone) {

  let userInformationPath = "/user/" + userId + "/details";

  return db.ref(userInformationPath).update({
      nome: nome,
      telefone: telefone
  })
}

export async function semEndCadastro(endereco, bairro, referencia, cadastroEfetuado){
  try {
    await AsyncStorage.multiSet([['endAtual', endereco],
                                ['bairro', bairro], ['referencia', referencia]]);
    cadastroEfetuado()
  } catch (error) {
    //console.log("error AsyncStorage cadastrarEndereco"+error)
  }
}

export async function cadastrarEndereco(userId,  endereco,
  bairro, referencia,cadastroEfetuado){
    let userInformationPath = "/user/" + userId + "/details/listaEnderecos/"

      db.ref(userInformationPath).push({
        endereco: endereco,
        bairro: bairro,
        referencia: referencia
      })


      try {
        await AsyncStorage.multiSet([['endAtual', endereco],
                                    ['bairro', bairro], ['referencia', referencia]]);
        cadastroEfetuado()
      } catch (error) {
        //console.log("error AsyncStorage cadastrarEndereco"+error)
      }

  }

  export function deleteEnd(userId,keyEnd,onEndDeleted){
      let userInformationPath = "/user/" + userId + "/details/listaEnderecos/"+keyEnd+"/";

      db.ref(userInformationPath).remove()
      onEndDeleted()
  }

export async function atualizarEndereco(userId, key, endereco, bairro, referencia) {

  let userInformationPath = "/user/" + userId + "/details/listaEnderecos/"+key+"/";

  return db.ref(userInformationPath).update({
      endereco: endereco,
      bairro: bairro,
      referencia: referencia,
  })

  try {
    await AsyncStorage.multiSet([['endAtual', endereco],
                                ['bairro', bairro], ['referencia', referencia]]);

  } catch (error) {
    //console.log("error AsyncStorage atualizarEndereco"+error)
  }

}


export async function logout() {

    try {

        await auth.signOut();

        // Navigate to login view

    } catch (error) {
        //console.log(error);
    }

}

export async function deleteUser(){

  try {

    let user = await auth.currentUser;
    let userInformationPath = "/user/" + user.uid
    user.delete().then(function() {
      db.ref(userInformationPath).remove()
    }, function(error) {
      //console.log("user não deletado"+error)// An error happened.
    });

  } catch (error) {
      //console.log(error);
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
  var bairro = "";
  var referencia = "";
  // var key =""

  try {
    await AsyncStorage.multiGet(['endAtual','bairro', 'referencia']).then((response)=>{
      endereco = response[0][1]
      bairro = response[1][1]
      referencia = response[2][1]

      callback(endereco, bairro, referencia)
    });

  } catch (error) {
    //console.log("error AsyncStorage getUserEndAtual: "+error)
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
        referencia: child.val().referencia,
        key: child.key
      })
    })
    onListLoad()
  })

}

export function addEndereco(userID){

}

export function getValorFrete(){

  db.ref("/"+tipoEstabelecimento+"/")
}

export function getBairros(onListLoad){
  listaBairros=[]
  db.ref("/bairros/Altamira/").once('value').then(function(snapshot){
    snapshot.forEach((child)=>{
      listaBairros.push({
        label:_.upperFirst(child.val().nome),
        value:child.val().nome
      })
    })
    onListLoad()
  })
}


export async function checkUserDetails(userExiste, userNaoExiste){

  try {
    let userId = await auth.currentUser.uid

    db.ref("/user/"+userId).once('value').then(function(snapshot) {
      var userData = snapshot.val()

  // Se userData não for nulo, isso quer dizer que o usuário já existe e não precisa completar cadastro
      if(userData){
        if(userData.details.listaEnderecos){
          userExiste()
        }else{
          userNaoExiste()
        }
      }else{
        userNaoExiste()
      }
    });

  } catch (error) {
      //console.log(error);
  }

}



export function getEstabelecimentoProd(nomeEstabelecimento, sectionDataFunction, onListLoad ){
  try{
    estabelecimentoProd = []
    db.ref("/produtosNovo/"+nomeEstabelecimento).once('value').then(function(snapshot){
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
            ordem: child.val().ordem,
            paginas: child.val().qtdePaginas,
            _id:todoCounter++
          });
        })
        sectionDataFunction()
        onListLoad()
        ;
      }
    })
  } catch(error){
    //console.log(error)
  }
}

export function getTiposItens(nomeEstabelecimento,tipoItem,onListLoad){
  //console.log("nomeEstabelecimento "+nomeEstabelecimento);
  //console.log("tipoItem "+tipoItem);
  try{
    listaTipoItens = []
    db.ref("/tipoItens/"+nomeEstabelecimento+"/"+tipoItem).once('value').then(function(snapshot){
      var estabelecimentoData = snapshot.val()
      //console.log("snapshotsnapshot "+JSON.stringify(snapshot));
      if(estabelecimentoData){
        snapshot.forEach((child) =>{
          listaTipoItens.push({
            nome:child.val().nome,
            quantidade:0,
            tipoItem:tipoItem,
            _id:todoCounter++
          })
        })
        onListLoad()
      }
    })
  } catch(error){
    //console.log(error)
  }
}

export function getTamanhosPizzas(nomeEstabelecimento){
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
    //console.log(error)
  }
}
var aberto=''
var abertoBool=''
export function getDay(estabelecimento,onListLoad){

  var d = new Date()
  var currentDay = weekday[d.getDay()];
  var day = d.getDate()
  var month = months[d.getMonth()]
  var year = d.getFullYear()
  var atual = Date.parse(d)
  var madrugada;

  //detectar se é madrugada e diminuir um dia
    if(d.getHours()>=0  && d.getHours()<6){
        if(d.getDay()==0){
          madrugada= true
          currentDay = weekday[6]
        }else{
          currentDay = weekday[d.getDay()-1]
          madrugada= true
        }
    }else{
      madrugada= false
    }
try{
  db.ref("/infoEstabelecimentosNovo/"+estabelecimento+"/horarioFuncionamento/"+currentDay+"/").once('value').then(function(snapshot){
    //determina valores para abertura e fechamento
    db.ref("infoEstabelecimentosNovo/"+estabelecimento+"/aberto").once('value').then(function(snap){

      this.abertoBool = snap.val()
      //console.log('SNAPCARAI1'+this.abertoBool);

      // //console.log(currentDay+" "+month+" "+day+", "+year+" "+snapshot.val().abertura)
      // //console.log('ESTAB'+estabelecimento);
      var abertura = Date.parse(month+" "+day+", "+year+" "+snapshot.val().abertura)

      var fechamento = Date.parse(month+" "+day+", "+year+" "+snapshot.val().fechamento)


      //se fechamento for menor que abertura quer dizer que o estabelecimento fecha de madrugada
      if(fechamento<abertura&&madrugada==true){
        // tiro um dia da abertura pois ela é o no dia anterior
        var dayAbertura = new Date(month+" "+day+", "+year+" "+snapshot.val().abertura)
        let dayBefore = dayAbertura.getDate()-1
        dayAbertura.setDate(dayBefore)
        abertura = Date.parse(dayAbertura)
        if(this.abertoBool==false){
          //console.log("1"+estabelecimento);
          aberto = false
        }else{
          if(atual>abertura&&atual<fechamento){
            //console.log("2"+estabelecimento);
            aberto = true
          }else{
            //console.log("3"+estabelecimento);
            aberto = false
          }
        }
      }
      else if(fechamento<abertura&&madrugada==false){
        var dayFechamento = new Date(month+" "+day+", "+year+" "+snapshot.val().fechamento)
        var dayAfter = dayFechamento.getDate()+1
        dayFechamento.setDate(dayAfter)
        fechamento = Date.parse(dayFechamento)
        if(this.abertoBool==false){
          //console.log("4"+estabelecimento);
          aberto = false
        }else{
          //console.log("atual"+atual);
          //console.log("abertura"+abertura);
          //console.log("fechamento"+fechamento);
          if(atual>abertura&&atual<fechamento){
            //console.log("5"+estabelecimento);
            aberto = true
          }else{
            //console.log("6"+estabelecimento);
            aberto = false
          }
        }
      }
      else{
        if(this.abertoBool==false){
          //console.log("7"+estabelecimento);
          aberto = false
        }else{
          if(atual>abertura&&atual<fechamento){
            //console.log("8"+estabelecimento);
            aberto = true
          }else{
            //console.log("9"+estabelecimento);
            aberto = false
          }
        }
      }

      var quaseFechando = fechamento - atual

      var quaseFechandoSt=''
      if(quaseFechando<600000&&quaseFechando>0){
        quaseFechandoSt=true
      }else{
        quaseFechandoSt=false
      }

      abertoFechado.push({
        nome:estabelecimento,
        aberto:aberto,
        fechando:quaseFechandoSt,
        horarioFechamento:snapshot.val().fechamento
      })
      if(abertoFechado.length==numChildrenLista){
        onListLoad()
      }






    })

  })

}catch(error){
  //console.log("ERROR CARALHO"+error);
}
}



export function limparEstabelecimentoProd(){
  //console.log("dentro limparEstabelecimentoProd");
  estabelecimentoProd = []
}
export var semEstabelecimentos=''
export function getListaEstabelecimentos(tipoEstabelecimento, bairro,onListLoad){
  try{
    listaEstabelecimentos = []
    abertoFechado=[]
    numChildrenLista=0
    db.ref("/tiposEstabelecimentosNovo/"+tipoEstabelecimento).once('value').then(function(snapshot){

      var estabelecimentoData = snapshot.val()

      if(estabelecimentoData){
        semEstabelecimentos=false
        numChildrenLista= snapshot.numChildren()
        snapshot.forEach((child) =>{
          listaEstabelecimentos.push({
            logo: child.val().Logo,
            nome: child.val().Nome,
            precoDelivery: child.val().PreçoDelivery,
            tempoEntrega: child.val().TempoEntrega,
            frete:child.val().frete[bairro].valor,
            _id:todoCounter++
          })
          getDay(child.val().Nome,
        ()=>{onListLoad()})

        })
      }else{
        semEstabelecimentos=true
        onListLoad()

      }

    })
  } catch(error){
    //console.log("error lista"+error)
  }
}

export function getNomeEstabelecimentos(bairro,onListLoad){
  try{
    nomesEstabelecimentos = []
    abertoFechado=[]
    numChildrenLista=0
    db.ref("/nomeEstabelecimentosNovo/").once('value').then(function(snapshot){
      var estabelecimentoTiposProdData = snapshot.val()
      if(estabelecimentoTiposProdData){
        numChildrenLista= snapshot.numChildren()
        snapshot.forEach((child) =>{
          let nome = child.val().nome
          let logo= child.val().logo
          let frete= child.val().frete[bairro].valor
          let tipoEstabelecimento= child.val().tipoEstabelecimento
          nomesEstabelecimentos.push({
            nome: nome,
            logo: logo,
            frete: frete,
            tipoEstabelecimento: tipoEstabelecimento
          })
          getDay(child.val().nome,
          ()=>{onListLoad()})
        })
      }
    })
  } catch(error){
    //console.log("erro nome estabelecimentos"+error)
  }
}

export function getEstabelecimentoInfo(nomeEstabelecimento, callback){
  try{
    estabelecimentoInfo = []
    db.ref("/infoEstabelecimentosNovo/"+nomeEstabelecimento).once('value').then(function(snapshot){
      var estabelecimentoData = snapshot.val()
      var logo, nome, precoDelivery, tempoEntrega, seg, ter, qua, qui, sex, sab, dom, deb, din, foneContato, obs  = "";
      var cre = []
      var deb = []
      if(estabelecimentoData){
        //console.log("obs"+estabelecimentoData.obs);
            logo = estabelecimentoData.logo
            nome = estabelecimentoData.nome
            precoDelivery = estabelecimentoData.precoDelivery
            tempoEntrega = estabelecimentoData.tempoEntrega
            foneContato = estabelecimentoData.foneContato
            obs = estabelecimentoData.obs

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
        qua, qui, sex, sab, dom, cre, deb, din,foneContato,obs)



    })
  } catch(error){
    //console.log(error)
  }
}

export function zerarAdicionais(){
  listaAdicionais=[]
}

export function getListaAdicionais(nomeEstabelecimento, tipoProduto, onListLoad){
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
        onListLoad()

      }
    })
  } catch(error){
    onListLoad()
    //console.log("error:"+error)
  }
  onListLoad()

}

export function loadMessages(estabelecimento, chave, callback){
  // //console.log("dentro loadMessages"+estabelecimento);
  this.messageRef = db.ref("/messages/"+estabelecimento+"/"+chave+"/status")
  //console.log("messageRef"+this.messageRef);
  this.messageRef.off();
  this.messageRef.on('value',function(snap){
    callback({status:snap.val()})
  })
}

export function loadMessagesSemItem(estabelecimento, chave, callback){
  // //console.log("dentro loadMessages"+estabelecimento);
  this.messageRef = db.ref("/messages/"+estabelecimento+"/"+chave+"/itemIndisponivel")
  //console.log("messageRef"+this.messageRef);
  this.messageRef.off();
  this.messageRef.on('value',function(snap){
    snap.forEach((child)=>{

      callback({nome:child.val()})
    })


  })
}

export function salvarPedidoPerdido(estabelecimento,chave,onListLoad){
  try{
    db.ref("/messages/"+estabelecimento+"/"+chave+"/").once('value').then(function(snapshot){
      var pedidosPerdido = snapshot.val()
      this.messageRef = db.ref("/messages/"+estabelecimento+"/pedidosPerdidos/")
      this.messageRef.push(pedidosPerdido)
        onListLoad()
      })
  } catch(error){
    onListLoad()
    //console.log("error:"+error)
  }

}


export function deleteMessages(estabelecimento, chave){
  // //console.log("dentro loadMessages"+estabelecimento);
  this.messageRef = db.ref("/messages/"+estabelecimento+"/"+chave)

  this.messageRef.remove()
  this.messageRef.off()
}

export async function carregarPedidos(callback){
  let userId = await auth.currentUser.uid

  let exists = ""
  db.ref("/user/"+userId+"/details/").once('value').then(function(snapshot){
    exists = snapshot.child("pedidos").exists()

    if(exists){

      db.ref("/user/"+userId+"/details/pedidos/").once('value').then(function(snapshot){
        snapshot.forEach((child)=>{
          db.ref("/infoEstabelecimentosNovo/"+child.val().estabelecimento+"/logo").once('value').then(function(logo){
          callback({
            logo: logo.val(),
            status: child.val().status,
            _id:child.key,
            total:child.val().total,
            valorCompra:child.val().valorCompra,
            carrinho: child.val().carrinho,
            bairro: child.val().bairro,
            frete: child.val().frete,
            createdAt: new Date(child.val().createdAt),
            endereco: child.val().endereco,
            estabelecimento: child.val().estabelecimento,
            formaPgto: child.val().formaPgto,
            formaPgtoDetalhe: child.val().formaPgtoDetalhe,
            key: child.val().key
          })
        })
      })
      })
    }else{
      callback({
        _id:exists
      })
    }
  })
}

export var chaveMsg=""
export function mandarPedido(token,uid,retirarNovo, carrinhoNovo, formaPgtoNovo, formaPgtoDetalheNovo,
  freteNovo, totalNovo,nomeNovo, telefoneNovo, enderecoNovo, bairroNovo, referenciaNovo,
   estabelecimento, statusNovo, key) {

    this.messageRef = db.ref("/messages/"+estabelecimento+"/")
    this.messageRef.push({
      tokenUser:token,
      idUser:uid,
      retirar: retirarNovo,
      carrinho: carrinhoNovo,
      formaPgto: formaPgtoNovo,
      formaPgtoDetalhe: formaPgtoDetalheNovo,
      frete:freteNovo,
      total:totalNovo,
      nome: nomeNovo,
      telefone: telefoneNovo,
      endereco: enderecoNovo,
      bairro: bairroNovo,
      referencia: referenciaNovo,
      createdAt: firebase.database.ServerValue.TIMESTAMP,
      status: statusNovo,
    }).then((snap)=>{
      key({key: snap.key})
    })

  }

  export async function salvarPedido(retirarNovo, carrinhoNovo, totalPriceNovo, freteNovo, formaPgtoNovo, formaPgtoDetalheNovo,
     enderecoNovo, bairroNovo, estabelecimentoNovo, keyNovo){
       let userId = await auth.currentUser.uid

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

  export function retiraLoja(nomeEstabelecimento, callback){
    try{
      db.ref("/infoEstabelecimentosNovo/"+nomeEstabelecimento+"/retiraLoja").once('value').then(function(snapshot){
          callback({retiraLoja: snapshot.val()})
      })
    } catch(error){
      //console.log(error)
    }
  }

  export function salvarKeyMessage(estabelecimento,key){
    this.messageRef = db.ref("/messages/"+estabelecimento+"/"+key+"/")
    this.messageRef.set({

    })
  }

  export function salvarPedidoUser(key,uid,tokenUser,retirarNovo, carrinhoNovo, formaPgtoNovo, formaPgtoDetalheNovo,
    freteNovo, totalNovo,nomeNovo, telefoneNovo, enderecoNovo, bairroNovo, referenciaNovo,
     estabelecimento, statusNovo) {

      this.messageRef = db.ref("/user/"+uid+"/details/pedidos/"+key+"/")
      this.messageRef.set({
        tokenUser: tokenUser,
        retirar: retirarNovo,
        carrinho: carrinhoNovo,
        formaPgto: formaPgtoNovo,
        formaPgtoDetalhe: formaPgtoDetalheNovo,
        frete:freteNovo,
        total:totalNovo,
        nome: nomeNovo,
        telefone: telefoneNovo,
        endereco: enderecoNovo,
        bairro: bairroNovo,
        referencia: referenciaNovo,
        createdAt: firebase.database.ServerValue.TIMESTAMP,
        estabelecimento:estabelecimento,
        status: statusNovo
      })

    }
