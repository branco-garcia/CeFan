import React from "react";
import { Formik, useField } from "formik";
import { View, TextInput, Button, StyleSheet } from "react-native";
import StyledTextInput from "../components/StyledTextInput";
import StyledText from "../components/StyleText";
import { loginValidationSchema } from "../ValidationSchemas/login";

const initialValues = {
    email: '',
    password: ''
}

const styles = StyleSheet.create({
    form: {
        margin: 12
    },
    error:{
        color: 'red',
        fontSize: 15,
        marginBottom:20,
        marginTop: 0,
    }
})



const FormikInputValue = ({name, ...props}) =>{
    const [field, meta, helpers] = useField(name)

    return(
        <>
            <StyledTextInput error = {meta.error} value = {field.value} onChangeText = {value => helpers.setValue(value)} {... props} />
            {meta.error && <StyledText style={styles.error}> {meta.error} </StyledText> }
        </>
    )
}

export default function LogInPage(){
    return <Formik validationSchema={loginValidationSchema} initialValues={initialValues} on onSubmit={values=> console.log(values)}> 
    {({handleChange, handleSubmit, values}) => {
        return (
        <View style = {styles.form}>
            <FormikInputValue name = "email" placeholder="EMail"/>
            <FormikInputValue name = "password" placeholder="Contraseña" secureTextEntry/>
            <Button onPress={handleSubmit} title="Log In" />
        </View>)
    }}
    </Formik>
}