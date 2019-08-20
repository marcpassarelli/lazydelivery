const functions = require('firebase-functions');


const admin = require('firebase-admin');
   admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.sendMessageNotificationNewOrder = functions.database.ref('messages/{estab}/{messageID}').onCreate((snap,context) => {
    var estab = context.params.estab
    var token = ""
    var payload = {
      notification: {
        title: "Novo Pedido",
        body: "Chegou um novo pedido para o estabelecimento.",
      }
    };
    return admin.database().ref('infoEstabelecimentosNovo/'+estab+'/token').once('value').then((snapshot)=>{
        token = snapshot.val().token
        return admin.messaging().sendToDevice(token, payload)
            .then((response)=> {
              return null
            })
            .catch((error)=>{
              return null
            });
    });
});

exports.sendMessageNotificationUpdateStatus = functions.database.ref('user/{userID}/details/pedidos/{messageID}/').onUpdate((snap,context) => {
    var messageID = context.params.messageID
    var status = snap.after.val().status
    var estab = snap.after.val().estabelecimento
    var token = snap.after.val().tokenUser
    var payload = ""

      if(status==="Confirmado Recebimento"){
        payload = {
          notification: {
            title: "Pedido sendo preparado para envio.",
            body: "Assim que estiver tudo pronto com seu pedido em "+estab+" para sair para a entrega, lhe avisaremos."
          }
        };
      }else if (status==="Pedido Enviado") {
        payload = {
          notification: {
            title: "Pedido saindo para a entrega",
            body: "Seu pedido realizado em "+estab+" já está com o entregador"
          }
        };
      }else if (status==="Pedido Cancelado"){
        payload = {
          notification: {
            title: "Pedido em "+estab+" cancelado",
            body: "Sinto muito que seu pedido não tenha dado certo. Qualquer dúvida entre em contato com o estabelcimento."
          }
        };
      }

      return admin.messaging().sendToDevice(token, payload)
          .then((response)=> {
            return null
          })
          .catch((error)=>{
            return null
          });

});