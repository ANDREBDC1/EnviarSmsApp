import React from 'react'
import styled from 'styled-components/native'
import { mask } from 'remask'


const InputArea = styled.View`
    width: 100%;
    height: 60px;
    background-color: #83D6E3;
    flex-direction: row;
    border-radius: 30px;
    padding-left: 15px;
    align-items: center;
    margin-bottom: 15px;
`

const Input = styled.TextInput`
    flex:1;
    font-size: 16px;
    color: #268596;
    margin-left: 10px;
`

export default ({placeholder, value, onChange, typeInput, patterns, maxLength, IconSvg = '', disabled}) =>{

    const onChangeText = value =>{

        if(patterns){
            onChange(mask(value, patterns))
        }else{
            onChange(value)
        }
    }

    return(
        <InputArea>
            {IconSvg != '' ?<IconSvg width ="24" height ="24" fill= "#268596"/> : <></> }
            
            <Input 
                placeholder={placeholder}
                placeholderTextColor= "#268596"
                value={value}
                onChangeText = {onChangeText}
                keyboardType = {typeInput}
                maxLength = {maxLength}
                disabled = {disabled}

            />

        </InputArea>
    )

}