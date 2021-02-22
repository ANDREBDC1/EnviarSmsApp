import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import MainStack from './src/stacks/MainStack'
import UserContextProvider from './src/contexts/UserContext'
import Api from './src/Api'


export default () => {
   Api.setOnReceveMensager();
   return (
     <UserContextProvider>
        < NavigationContainer>
              <MainStack/>
        </NavigationContainer>
     </UserContextProvider>
   );
}