import React from "react";
import { View, Text, ScrollView, FlatList } from "react-native";
import personas from "../data/personas.js";
import RepositoryItem from "./RepositoryItem.jsx";

const RepositoryList = () => {
    return(
        <FlatList 
            data={personas}
            renderItem ={({item:peop}) => (
                <RepositoryItem {...peop}  />
            )}>
        </FlatList>
    )
}

export default RepositoryList