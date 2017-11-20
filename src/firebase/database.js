console.ignoredYellowBox = [
    'Setting a timer'
]
import * as firebase from 'firebase';

export var listaEstabelecimentos = []
export var estabelecimentoInfo = []

var todoCounter = 1;


export async function login (email, pass, onLogin) {

    try {
        await firebase.auth()
            .signInWithEmailAndPassword(email, pass);
            console.log("logou")
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

        console.log("Account created");
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
      endereco: endereco,
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
      endereco = userData.details.endereco
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
      console.log("DATABASE estabelecimentos:"+JSON.stringify(estabelecimentoInfo))
    })
  } catch(error){
    console.log(error)
  }
}

export async function getEstabelecimentoInfo(nomeEstabelecimento){
  try{
    estabelecimentoInfo = []
    firebase.database().ref("/estabelecimentos/"+nomeEstabelecimento).once('value').then(function(snapshot){
      var estabelecimentoData = snapshot.val()
      if(estabelecimentoData){
        snapshot.forEach((child) =>{
          estabelecimentoInfo.push({
            logo: child.val().logo,
            nome: child.val().nome,
            precoDelivery: child.val().precoDelivery,
            tempoEntrega: child.val().tempoEntrega,
            _id:todoCounter++
          });
        });
      }
      console.log("DATABASE estabelecimentos:"+JSON.stringify(estabelecimentoInfo))
    })
  } catch(error){
    console.log(error)
  }
}
