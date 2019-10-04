import React, {useState, useContext, useEffect} from 'react';
import {AppContext} from "../AppContext/AppContext";
import './App.css';
import AdvertList from "../AdvertList/AdvertList";
import {mount, route, lazy} from 'navi'
import SearchField from "../Search/SearchField";
import PostsList from "../PostsList/PostsList";
import {Container, Grid} from "semantic-ui-react";
import SecretComponent from "../Secret/SecretComponent";
import LoginForm from "../Login/LoginForm";
import NotFound from "../NotFound/NotFound";
import NavBar from "../Navigation/NavBar";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";


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


    const authPage = () => {
        if (appState.loggedIn) {
            return <Redirect to="/dashboard"/>;
        } else {
            return <h3>User not loggedin</h3>;
        }
    };

    return (
        <div className="App">
            <BrowserRouter>

                <Container>
                    <NavBar/>
                    {appState.loggedIn ? "Logged in" : "Not logged in"}
                    {/*{appState.navigationItem === 'login' && <LoginForm/>}*/}
                    {/*{appState.navigationItem === 'home' && <SearchField/>}*/}
                    <Grid centered id="searchElement">
                        {/*<SearchField/>*/}
                        {appState.criteria === 'Kaunas' && <SecretComponent/>}
                        {/*{appState.adverts.length > 0 && <AdvertList/>}*/}
                    </Grid>
                    <Switch>
                        <Redirect exact from='/' to='/search-field'/>
                        <Route path="/search-field" exact component={SearchField}/>
                        <Route path="/login" exact component={LoginForm}/>
                        <Route path="/not-found" exact component={NotFound}/>
                    </Switch>

                </Container>
            </BrowserRouter>

            {/*<PostsList textColor="red"/>*/}
        </div>
    );
}

export default App;

//TODO convert in backend Set<Technology> to Set<String>
//TODO make rows of adverts clickable (add link to whole row)
//TODO pagination
//TODO do not get expired adverts

//TODO BUG redirect after login