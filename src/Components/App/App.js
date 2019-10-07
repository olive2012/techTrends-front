import React, {useContext, useEffect} from 'react';
import {AppContext, SEARCHBY} from "../AppContext/AppContext";
import './App.css';
import SearchField from "../Search/SearchField";
import {Container, Grid} from "semantic-ui-react";
import SecretComponent from "../Secret/SecretComponent";
import LoginForm from "../Login/LoginForm";
import NotFound from "../NotFound/NotFound";
import NavBar from "../Navigation/NavBar";
import {BrowserRouter, Route, Switch, useHistory} from "react-router-dom";
import {Redirect} from "react-router-dom";
import {useRedirect, navigate, useRoutes, A} from 'hookrouter';

const routes = {
    "/search-field": () => <SearchField/>,
    "/login": () => <LoginForm/>,
    // "/form": () => <Contact />
};

function App() {
    const routeResult = useRoutes(routes);
    const [appState, setAppState] = useContext(AppContext);

    // useEffect(() => {
    //     console.log("useEffect1");
    //     redirect();
    //     console.log("useEffect2");
    // }, [appState.actions, appState.loggedIn]);


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


    // useEffect(() => {
    //     if (appState.navigationItem === 'home') {
    //         navigate('/search-field');
    //         console.log("navigate from useEffect");
    //     }
    // }, [appState.actions, appState.navigationItem, appState.loggedIn]);

    useEffect(() => {
        showAuthPage();
        console.log("navigate from useEffect");
    }, [appState.actions, appState.loggedIn]);


    useEffect(() => {
        appState.actions.getAdverts(appState.searchBy, appState.advertsCriteria, appState.advertsTechnology);
    }, [appState.actions, appState.searchBy, appState.advertsCriteria, appState.advertsTechnology]);


    // const redirect = () => {
    //     return (<Redirect exact from='/' to='/search-field'/>);
    // };

    //const redirect = useRedirect('/login', '/search-field');
    //let history = useHistory();

    const showAuthPage = () => {
        if (appState.loggedIn) {
            console.log("message from AuthPage OK");

            navigate('/search-field');
            setAppState(state => ({...state, navigationItem: 'home'}));
            console.log("navigationItem " + appState.navigationItem);
            //redirect();
            //history.replace('/search-field');
            console.log("message after navigate()");
            return (<Redirect to={{pathname: '/search-field'}}/>);
        } else {
            console.log("message from AuthPage NOT OK");
            return <h3>User not loggedIn</h3>;
        }
    };

    return (
        <div className="App">


            {/*<BrowserRouter>*/}


            {/*    <Container>*/}

            {/*        <NavBar/>*/}
            {/*        {appState.loggedIn ? "Logged in" : "Not logged in"}*/}
            {/*        /!*{appState.navigationItem === 'login' && <LoginForm/>}*!/*/}
            {/*        /!*{appState.navigationItem === 'home' && <SearchField/>}*!/*/}
            {/*        <Grid centered id="searchElement">*/}
            {/*            /!*<SearchField/>*!/*/}
            {/*            /!*{appState.criteria === 'Kaunas' && <SecretComponent/>}*!/*/}
            {/*            /!*{appState.adverts.length > 0 && <AdvertList/>}*!/*/}
            {/*        </Grid>*/}
            {/*        <Switch>*/}
            {/*            /!*<Redirect to={isLoggedIn ? "/wallet/portfolio" : "/wallet/login"}/>*!/*/}
            {/*            /!*<Redirect exact from='/' to='/search-field'/>*!/*/}
            {/*            <Route exact path="/search-field" component={SearchField}/>*/}
            {/*            <Route path="/login" component={LoginForm}/>*/}
            {/*            <Route component={NotFound}/>*/}
            {/*        </Switch>*/}

            {/*    </Container>*/}
            {/*</BrowserRouter>*/}


                {appState.loggedIn ? "Logged in" : "Not logged in"}

                <A href="/search-field">Home Page</A>
                <A href="/login">Login</A>
                {/*<A href="/contact">Contacts Page</A>*/}
                {routeResult || <NotFound/>}


            {/*<PostsList textColor="red"/>*/}

        </div>
    );
}

export default App;

//TODO convert in backend Set<Technology> to Set<String>
//TODO make rows of adverts clickable (add link to whole row)
//TODO pagination


//TODO BUG redirect after login