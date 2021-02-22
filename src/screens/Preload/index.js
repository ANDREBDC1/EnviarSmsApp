import React, { useEffect, useContext } from 'react';
import { Container, LoadingIcon} from './styles'
import AsyncStorage  from '@react-native-community/async-storage'
import {useNavigation} from '@react-navigation/native'
export default () =>{

    const navigation = useNavigation()
    useEffect(()=> {
        const checkToken = async ()=>{
            const token = await AsyncStorage.getItem('token')
            if(token){
                navigation.reset({
                    routes: [{name: 'Home'}]
                })

            }else{
                navigation.reset({
                    routes: [{name: 'SignUp'}]
                })
            }

        }

        checkToken()
    }, [])
    return (
         <Container>
              <LoadingIcon size="large" color="#FFFFFF"/>
        </Container>
        )
}
