import React from 'react'
import styled from 'styled-components/native'


export const Container = styled.SafeAreaView`
    background-color: #63C2D1;
    flex : 1;
    justify-content : center;
    align-items : center;
`

export const Text  = styled.Text`
    font-size: 18px;
    color: #FFF;

`

export const InputArea = styled.View`
    width: 100%;
    padding: 30px;
`
export const CustomButton = styled.TouchableOpacity`
    height: 60px;
    background-color: #268596;
    border-radius: 30px;
    justify-content: center;
    align-items: center;
`
export const CustomButtonText = styled.Text`
    font-size: 18px;
    color: #FFF;
`
export const LoadingIcon  = styled.ActivityIndicator`
    margin-top: 50px;
`
