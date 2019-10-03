import React, {useState, useContext, useEffect} from 'react';
import {AppContext} from "../AppContext/AppContext";
import './App.css';
import AdvertList from "../AdvertList/AdvertList";
import SearchField from "../Search/SearchField";
import PostsList from "../PostsList/PostsList";
import {Container, Grid} from "semantic-ui-react";
import SecretComponent from "../Secret/SecretComponent";
import LoginForm from "../Login/LoginForm";

function App() {
    const [appState, setAppState] = useContext(AppContext);


    // useEffect(() => {
    //      appState.actions.updatePosts();
    // },[appState.actions]);

    useEffect(() => {
        if (!appState.actions.checkLoginState()) {
            appState.actions.login('suprem1@mail.ru', 'String1');
        }

    }, [appState.actions]);

    useEffect(() => {
        appState.actions.getAdverts(appState.criteria);
    }, [appState.actions, appState.criteria]);

     useEffect(() => {
        appState.actions.getAdvertsByTechnology(appState.technology);
    }, [appState.actions, appState.technology]);

    return (
        <div className="App">
            <Container>
                {appState.loggedIn ? "Logged in" : "Not logged in"}
                <Grid centered id="searchElement">
                    <SearchField/>
                    {/*<SecretComponent/>*/}
                    {appState.criteria === 'Kaunas' && <SecretComponent/>}
                    {appState.adverts.length > 0 && <AdvertList/>}
                </Grid>
                <LoginForm/>
            </Container>
            {/*<PostsList textColor="red"/>*/}
        </div>
    );
}

export default App;

//TODO convert in backend Set<Technology> to Set<String>
//TODO make rows of adverts clickable (add link to whole row)