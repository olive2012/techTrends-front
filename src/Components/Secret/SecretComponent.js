import React, {Component, useContext, useState, useEffect} from 'react'
import {AppContext} from "../AppContext/AppContext";
import {Grid} from 'semantic-ui-react'

export default function SecretComponent(){

    const array = {
        sentences: [{title:"Hello1", id:1},{title:"Hello2", id:2}, {title:"Hello3", id:3}]
    }

    const [appState, setAppState] = useContext(AppContext);

    const [compVariable, setCompVariable] = useState("Hello");

    // let variable = array.sentences[Math.floor(Math.random()*array.sentences.length)];
    //
    // const showComponent = () => {
    //     console.log(variable);
    //     setCompVariable(variable);
    // };
    //
    //  useEffect(() => {
    //     showComponent();
    // }, [appState.actions]);

    return(
        <Grid.Row>
            <p>{compVariable}</p>
        </Grid.Row>
    )
}