import React from "react";
import { View, ScrollView, FlatList, StyleSheet, Image } from "react-native";
import StyledText from "./StyleText";
import RepositoryStats from "./RepositoryStats";
import theme from "../theme";

const RepositoryItemHeader = (props) =>(
    <View style = {{flexDirection: 'row', paddingBottom: 2 }}>
        <View style = {{paddingRight: 10}}>
            <Image style = {styles.image} source={{uri: props.ownerAvatarUrl}} />
        </View>
        <View style = {{ flex: 1, justifyContent: 'center'}}>
            <StyledText fontSize={'Subheading'} fontWeight={'bold'}>{props.full_name}</StyledText>
            <StyledText style={styles.language}>{props.description}</StyledText>
        </View>
    </View>
)

const RepositoryItem = (props) => (
    <View key = {props.id} style = {styles.container}>
                <RepositoryItemHeader {...props}/>
                <RepositoryStats{...props} /> 
            </View>
)

const styles = StyleSheet.create({
    container:{
        padding: 20,
        paddingBottom:5,
        paddingTop: 5
    },
    language:{
        padding:4,
        color: theme.colors.white,
        backgroundColor: theme.colors.primary,
        alignSelf:'flex-start',
        borderRadius: 4,
        overflow:'hidden'
    },
    image:{
        width:48,
        height:48,
        margin:'auto',
        borderRadius: 4
    }
})

export default RepositoryItem