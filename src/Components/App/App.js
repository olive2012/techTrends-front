import React, {useContext, useEffect} from 'react';
import {AppContext, SEARCHBY} from "../AppContext/AppContext";
import './App.css';
import SearchField from "../Search/SearchField";
import {Container, Grid} from "semantic-ui-react";
import SecretComponent from "../Secret/SecretComponent";
import LoginForm from "../Login/LoginForm";
import NotFound from "../NotFound/NotFound";
import NavBar from "../Navigation/NavBar";
import {BrowserRouter, Redirect, Route, Switch, useHistory} from "react-router-dom";
import {useRedirect, navigate} from 'hookrouter';


function App() {
    const [appState, setAppState] = useContext(AppContext);

    // useEffect(() => {
    //      appState.actions.updatePosts();
    // },[appState.actions]);

    // useEffect(() => {
    //     if (!appState.actions.checkLoginState()) {
    //         appState.actions.login('suprem1@mail.ru', 'String1');
    //     }
    //
    // }, [appState.actions]);

    useEffect(() => {
        appState.actions.checkLoginState();
    }, [appState.actions]);


    useEffect(() => {
        appState.actions.getAdverts(appState.searchBy, appState.advertsCriteria, appState.advertsTechnology);
    }, [appState.actions, appState.searchBy, appState.advertsCriteria, appState.advertsTechnology]);


    useEffect(() => {
        showAuthPage();
    }, [appState.actions, appState.loggedIn]);


    useEffect(() => {
        if (appState.navigationItem === 'home') {
            navigate('/search-field');
        }
    }, [appState.actions, appState.navigationItem]);

    // const showAuthPage = () => {
    //
    //     if (appState.loggedIn) {
    //         return <Redirect to="/"/>;
    //     } else {
    //         return <h3>User not loggedin</h3>;
    //     }
    // };

    const redirect = useRedirect('/login', '/search-field');
    //let history = useHistory();

    const showAuthPage = () => {
        if (appState.loggedIn) {
            console.log("message from AuthPage OK");

            //navigate('/search-field', true);
            setAppState(state => ({...state, navigationItem: 'home'}));
            console.log("navigationItem " + appState.navigationItem);
            //redirect();
            //history.replace('/search-field');
            console.log("message after navigate()");
            //return <Redirect from='/login' to='/search-field'/>;
        } else {
            console.log("message from AuthPage NOT OK");
            return <h3>User not loggedIn</h3>;
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
                        {/*<Redirect to={isLoggedIn ? "/wallet/portfolio" : "/wallet/login"}/>*/}
                        <Redirect exact from='/' to='/search-field'/>
                        <Route path="/search-field" exact component={SearchField}/>
                        <Route path="/login" exact component={LoginForm}/>
                        <Route component={NotFound}/>
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