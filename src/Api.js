
import messaging from '@react-native-firebase/messaging'
import firestore from '@react-native-firebase/firestore'
import { Alert, NativeModules, Platform } from 'react-native'
import React, { useEffect } from 'react'
import SendSMS from 'react-native-sms'
import AsyncStorage  from '@react-native-community/async-storage'
import {request, PERMISSIONS} from 'react-native-permissions'
const DirectSms = NativeModules.DirectSms;


const clearPhoneNumberMask = async (value) =>{
    return value.replace('(', '').replace(')', '').replace('-','').split(/\s/).join('')
}

const saveTokenToDatabase = async (token, phoneNumber) =>{
    try{
        if(phoneNumber === 'undefined' || phoneNumber == null){
            return null
        }
        
        await firestore().collection('Users').doc(phoneNumber).set({token: token, phoneNumber: phoneNumber})
        return token ;
    }catch(err){
        return null
    }   
}

const requestPermissionsSendSms = async () =>{
    let result = await request(PERMISSIONS.ANDROID.SEND_SMS)
    return result;
}

const validateMessagePhoneNumber = async (phoneNumber, message) => {
    return (message != null && phoneNumber != null) || (message != 'undefined' && phoneNumber != 'undefined') || (message != '' && phoneNumber != '')
}

export default {

    
    registerDevice: async (phoneNumber) => {

        try{
            let phoneNumberClearMask = await clearPhoneNumberMask(phoneNumber);
            var result = await requestPermissionsSendSms()
            if(result == 'granted'){
                let token =  await messaging().getToken()
                AsyncStorage.setItem('token', token)
                AsyncStorage.setItem('phoneNumber', phoneNumberClearMask)
                return await saveTokenToDatabase(token, phoneNumberClearMask)
            }else{
                Alert.alert('Permisão de envio de SMS não consedida!')
            }

        }catch(err){

            return null;
        }
        
        
    },

    onTokenRefresh: () => {
        messaging().onTokenRefresh(async token => {
            const phoneNumber = await AsyncStorage.getItem('phoneNumber')
            saveTokenToDatabase(token, phoneNumber);
        })
        
    },

    setOnReceveMensagerBackground: () =>{

        // Register background handler
        messaging().setBackgroundMessageHandler(async remoteMessage => {
            try{

                console.log(remoteMessage.data)
                let result =  await requestPermissionsSendSms()
                let phoneNumber = remoteMessage.data.DestinationNumber
                let message  = remoteMessage.data.Message 

                console.log(NativeModules)
                console.log(DirectSms)
                var valid = await validateMessagePhoneNumber(phoneNumber, message);
                if(result == 'granted' && valid){
                    // Send SMS android
                    DirectSms.sendDirectSms(""+phoneNumber, ""+message)
                }
            }catch(err){
                console.log('erro send SMS: ' +err)
            }
        })
    },

    
    setOnReceveMensager: () =>{

        useEffect(() => {
            requestPermissionsSendSms()
            const unsubscribe = messaging().onMessage(async remoteMessage => {
                let phoneNumber = clearPhoneNumberMask(remoteMessage.data.DestinationNumber)
                let message  = remoteMessage.data.Message

                var valid = await validateMessagePhoneNumber(phoneNumber, message)
                if(Platform.OS === 'ios'){
                    if(!valid){
                        return;
                    }

                    SendSMS.send(
                        {
                          // Message body
                          body: message,
                          // Recipients Number
                          recipients: [phoneNumber],
                          // An array of types 
                          // "completed" response when using android
                          successTypes: ['sent', 'queued'],
                        },
                        (completed, cancelled, error) => {
                          if (completed) {
                            console.log('SMS Sent Completed');
                          } else if (cancelled) {
                            console.log('SMS Sent Cancelled');
                          } else if (error) {
                            console.log('Some error occured');
                          }
                        },
                      );
                }else{

                    let result =  await requestPermissionsSendSms()
                    if(result == 'granted' && valid){
                        // Send SMS android
                        DirectSms.sendDirectSms(""+phoneNumber, ""+message)
                
                    }
                } 
            //   Alert.alert('A new FCM message arrived!', );
            });
        
            return unsubscribe;
          }, []);
    }
}