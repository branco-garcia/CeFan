import React from "react";
import { StyleSheet,View, ScrollView } from "react-native";
import StyledText from "./StyleText";
import Constants from 'expo-constants';
import theme from "../theme";
import { Link, useLocation } from "react-router-native";


const styles = StyleSheet.create({
    container:{
        backgroundColor: theme.appBar.primary,
        flexDirection: 'row',
        paddingTop: Constants.statusBarHeight + 10,
        paddingBottom:10,
        paddingLeft: 0,
    },
    text:{
        color: theme.appBar.textSecondary,
        paddingHorizontal: 10,
    },
    scroll:{
        paddingBottom: 10
    },
    active:{
        color: theme.appBar.textPrimary
    }
})


const AppBarTab = ({children, to}) => {
    const { pathname } = useLocation()

    const active = pathname == to

    const textStyles = [
        styles.text,
        active && styles.active
    ]
    
    return (
    <Link to = {to}>
        <StyledText fontWeight={'bold'} style={textStyles}>
            {children}
        </StyledText>
    </Link>)
}

const AppBar = () => {
    
    return (
        <View style = {styles.container}>
            <ScrollView horizontal style={styles.scroll}>
                <AppBarTab  to = '/'> Repositories</AppBarTab>
                <AppBarTab  to = '/signin'> Sign in</AppBarTab>
                <AppBarTab  to = '/data'> Ver mas datos </AppBarTab>
            </ScrollView>
        </View>
    )
}

export default AppBar