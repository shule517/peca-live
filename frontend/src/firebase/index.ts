import * as firebase from 'firebase/app';
import 'firebase/messaging';
import { firebaseConfig } from './config'

export const firebaseApp = firebase.initializeApp(firebaseConfig)
export const messaging = firebaseApp.messaging()

export default firebase
