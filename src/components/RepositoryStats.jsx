import React from 'react';
import { View } from 'react-native';
import StyledText from './StyleText';

const parseThousands = value => {
    return value >= 1000
    ? `${Math.round(value / 100)/10}k`
    : String(value)
}

const RepositoryStats = props => {
    return (
        <View style = {{ flexDirection: 'row', justifyContent: "space-around"}} >
            <View>
                <StyledText fontWeight='bold'> Estrallas </StyledText>
                <StyledText> {parseThousands(props.stargazers_count)} </StyledText>
            </View>
            <View>
            <StyledText fontWeight='bold'>Id</StyledText>
            <StyledText>{props.id} </StyledText>
            </View>
            <View>
            <StyledText fontWeight='bold'>Name</StyledText>
            <StyledText>{props.name} </StyledText>
            </View>
            <View>
            <StyledText fontWeight='bold'>Lenguaje</StyledText>
            <StyledText>{props.Idioma} </StyledText>
            </View>
        </View>
    )
}

export default RepositoryStats