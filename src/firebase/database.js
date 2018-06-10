console.ignoredYellowBox = [
    'Setting a timer'
]
import * as firebase from 'firebase';

export var listaEstabelecimentos = []
export var listaAdicionais = []
export var estabelecimentoProd = []
export var nomesEstabelecimentos = []

var todoCounter = 1;


export async function login (email, pass, onLogin) {

    try {
        await firebase.auth()
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
        await firebase.auth()
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

export function cadastrarUsuario(userId, nome, telefone, endereco,
  numeroEnd, bairro, referencia, profilePicURL) {

  let userInformationPath = "/user/" + userId + "/details";

  return firebase.database().ref(userInformationPath).set({
      nome: nome,
      telefone: telefone,
      listaEndereco: {
        endereco: endereco
      },
      numeroEnd: numeroEnd,
      bairro: bairro,
      referencia: referencia,
      profilePicURL: profilePicURL
  })
}

export function atualizarUsuario(userId, nome, telefone, endereco,
  numeroEnd, bairro, referencia, profilePicURL) {

  let userInformationPath = "/user/" + userId + "/details";

  return firebase.database().ref(userInformationPath).update({
      nome: nome,
      telefone: telefone,
      endereco: endereco,
      numeroEnd: numeroEnd,
      bairro: bairro,
      referencia: referencia,
      profilePicURL: profilePicURL
  })
}

export function atualizarEndereco(userId, endereco,
  numeroEnd, bairro, referencia) {

  let userInformationPath = "/user/" + userId + "/details";

  return firebase.database().ref(userInformationPath).update({
      endereco: endereco,
      numeroEnd: numeroEnd,
      bairro: bairro,
      referencia: referencia,
  })
}

export function atualizarProfilePicture(userId, profilePicURL) {

  let userInformationPath = "/user/" + userId + "/details";

  return firebase.database().ref(userInformationPath).update({
    profilePicURL: profilePicURL
  })
}


export async function logout() {

    try {

        await firebase.auth().signOut();

        // Navigate to login view

    } catch (error) {
        console.log(error);
    }

}

export async function deleteUser(){

  try {

    let user = await firebase.auth().currentUser;
    let userInformationPath = "/user/" + user.uid
    user.delete().then(function() {
      firebase.database().ref(userInformationPath).remove()
      console.log("user deletado")
    }, function(error) {
      console.log("user não deletado"+error)// An error happened.
    });

  } catch (error) {
      console.log(error);
  }
}

export function getUserDetails(userID, callback){
  let userPath = "/user/"+userID
  firebase.database().ref(userPath).once('value').then(function(snapshot) {
    var userData = snapshot.val()
    var nome = "";
    var telefone = "";
    var endereco = "";
    var numeroEnd = "";
    var bairro = "";
    var referencia = "";
    var profilePicURL = "";
//Se userData não for nulo, isso quer dizer que o usuário já existe e não precisa completar cadastro
    if(userData){
      nome = userData.details.nome
      telefone = userData.details.telefone
      endereco = userData.details.listaEndereco.endereco
      numeroEnd = userData.details.numeroEnd
      bairro = userData.details.bairro
      referencia = userData.details.referencia
      profilePicURL = userData.details.profilePicURL
    }

    callback(nome, telefone, endereco, numeroEnd, bairro, referencia, profilePicURL)

  });
}


export async function checkUserDetails(userExiste, userNaoExiste){

  try {
    let userId = await firebase.auth().currentUser.uid
    firebase.database().ref("/user/"+userId).once('value').then(function(snapshot) {
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

export async function getListaEstabelecimentos(tipoEstabelecimento){
  try{
    listaEstabelecimentos = []
    firebase.database().ref("/tiposEstabelecimentos/"+tipoEstabelecimento).once('value').then(function(snapshot){
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
        });
      }

    })
  } catch(error){
    console.log(error)
  }
}

export async function getEstabelecimentoProd(nomeEstabelecimento){
  try{
    estabelecimentoProd = []
    firebase.database().ref("/produtos/"+nomeEstabelecimento).once('value').then(function(snapshot){
      var estabelecimentoData = snapshot.val()
      if(estabelecimentoData){
        snapshot.forEach((child) =>{
          estabelecimentoProd.push({
            imgProduto: child.val().imagem,
            nomeProduto: child.val().nome,
            preco: child.val().preco,
            detalhes: child.val().detalhes,
            tipo: child.val().tipo,
            _id:todoCounter++
          });
        });
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
    firebase.database().ref("/nomeEstabelecimentos/").once('value').then(function(snapshot){
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
    firebase.database().ref("/infoEstabelecimentos/"+nomeEstabelecimento).once('value').then(function(snapshot){
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
    firebase.database().ref("/listaAdicionais/"+nomeEstabelecimento+"/"+tipoProduto+"/").once('value').then(function(snapshot){

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
      }
    })
  } catch(error){
    console.log(error)
  }
}

export async function loadMessages(estabelecimento, chave, callback){
  // console.log("dentro loadMessages"+estabelecimento);
  this.messageRef = firebase.database().ref("/messages/Casa Nova/"+chave+"/status")
  console.log("messageRef"+this.messageRef);
  this.messageRef.off();
  this.messageRef.on('value',function(snap){
    callback({status:snap.val()})
  })


  // const onReceive = (data) =>{
  //   const message = data.val()
  //   callback({
  //     status: message.status
  //   })
  // }
  // this.messageRef.on('value', onReceive);
}

export var chaveMsg=""
export async function sendMessage(carrinhoNovo, formaPgtoNovo, formaPgtoDetalheNovo,
   nomeNovo, telefoneNovo, enderecoNovo, bairroNovo, referenciaNovo,
   estabelecimento, statusNovo, key) {
    this.messageRef = firebase.database().ref("/messages/"+estabelecimento+"/")
    this.messageRef.push({
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
