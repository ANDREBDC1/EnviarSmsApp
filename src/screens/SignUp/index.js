import React, { useEffect, useState } from 'react';
import { Alert, Animated } from 'react-native'
import {
    Container,
    CustomButton,
    CustomButtonText,
    InputArea,
    LoadingIcon
} from './styles'
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder'


import SignInput from '../../components/SignInput'
import PhoneIcon from '../../assets/phone-icon.svg';
import { useNavigation } from '@react-navigation/native'
import Api from '../../Api'
export default () => {

    const [phoneNumberField, setPhoneNumberField] = useState('');
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation()

    const registerDevice = async () => {

        setLoading(true)
        if (phoneNumberField === '' || phoneNumberField.length < 14) {
            Alert.alert('Numero de telefone inválido')
            return;
        }
        const token = await Api.registerDevice(phoneNumberField)

        if (token != null) {
            navigation.reset({
                routes: [{ name: 'Home' }]
            })
        }
        setLoading(false)

    }
    return (
        <Container>
            <InputArea>


                <SignInput
                    placeholder="Digite Numero Telefone"
                    value={phoneNumberField}
                    onChange={t => setPhoneNumberField(t)}
                    typeInput='phone-pad'
                    patterns={['(99) 99999-9999']}
                    IconSvg={PhoneIcon}
                    maxLength={16}
                    disabled = {loading}
                />

                <CustomButton visible = {!loading} onPress={registerDevice}>
                    <CustomButtonText>Registra</CustomButtonText>
                </CustomButton>

                {loading &&
                     <LoadingIcon size="large" color="#FFFFFF"/>}


            </InputArea>

        </Container>
    )
}
