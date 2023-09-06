import React from "react";
import { Text, View, StyleSheet } from "react-native";
import RepositoryList from "./RespositoryList";
import AppBar from "./AppBar";
import { Switch, Route, Routes, Navigate } from "react-router-native";
import LogInPage from "../pages/Login";

const Main = () => {
    return(
        <View>
            <AppBar />
            <Routes>
                <Route path='/' element={<RepositoryList />} />
                <Route path='/signin' element={<LogInPage />} />
                <Route path='/data' element={<Text>Esta es una seccion de pruebas</Text>} />
                <Route path='*' element={<Navigate to='/' />} />
            </Routes>
        </View>
    )
}

export default Main