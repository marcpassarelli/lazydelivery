import { Platform, AsyncStorage, AppState } from 'react-native';

import firebase from 'react-native-firebase';

function displayNotificationFromCustomData(message: RemoteMessage){
  console.log("displayNotificationFromCustomData message "+JSON.stringify(message));

  if(message.data && message.data.title){
    let notification = new firebase.notifications.Notification();
      notification = notification
      .setTitle(message.data.title)
      .setBody(message.data.body)
      .setData(message.data)
      .setSound("bell.mp3")
      notification.android.setPriority(firebase.notifications.Android.Priority.High)
      notification.android.setChannelId("test-channel")
    firebase.notifications().displayNotification(notification);
  }
}

export async function registerHeadlessListener(message: RemoteMessage){
  await AsyncStorage.setItem('headless', new Date().toISOString());
  displayNotificationFromCustomData(message);
}

// these callback will be triggered only when app is foreground or background
export function registerAppListener(navigation){
console.log("notification 123 inside listener");
  this.notificationListener = firebase.notifications().onNotification(notification => {
    console.log("notification 123 notificationListener "+notification);
    firebase.notifications().displayNotification(notification);
  })

  this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen: NotificationOpen) => {
    console.log("notification 123 notificationOpenedListener");
    const notif: Notification = notificationOpen.notification;

    if(notif.data.targetScreen === 'HistoricoPedidos'){
      setTimeout(()=>{
        navigation.navigate('HistoricoPedidos')
      }, 500)
    }
    setTimeout(()=>{
      alert(`User tapped notification\n${notif.notificationId}`)
    }, 500)
  });

  this.onTokenRefreshListener = firebase.messaging().onTokenRefresh(token => {
    console.log("notification 123 TOKEN (refreshUnsubscribe)", token);
  });

  this.messageListener = firebase.messaging().onMessage((message: RemoteMessage) => {
    console.log("notfication 123"+message);
    displayNotificationFromCustomData(message);
  });

}
