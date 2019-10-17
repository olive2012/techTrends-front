import React, {useContext, useEffect} from 'react';
import {AppContext} from "../AppContext/AppContext";
import './App.css';
import SearchField from "../Search/SearchField";
import SearchField2 from "../Search/SearchField2";
import {Container, Menu} from "semantic-ui-react";
import LoginForm from "../Login/LoginForm";
import NotFound from "../NotFound/NotFound";
import {A, navigate, useRoutes} from 'hookrouter';
import Statistics from "../Statistics/Statistics";
import SignUpForm from "../Signup/SignUpForm";

const routes = {
    "/": () => <SearchField2/>,
    "/statistics": () => <Statistics/>,
    "/login": () => <LoginForm/>,
    "/signup": () => <SignUpForm/>,
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
        appState.actions.getAdvertsVersion2(appState.advertsByCity, appState.advertsBySalary, appState.advertsByTechnology);
    }, [appState.actions, appState.advertsByCity, appState.advertsBySalary, appState.advertsByTechnology]);


    //  useEffect(() => {
    //     appState.actions.getAdverts(appState.searchBy, appState.advertsCriteria, appState.advertsTechnology);
    // }, [appState.actions, appState.searchBy, appState.advertsCriteria, appState.advertsTechnology]);


    //const redirect = useRedirect('/login', '/search-field');


    const showAuthPage = () => {
        if (appState.loggedIn) {
            console.log("message from AuthPage OK");
            navigate('/');
            setAppState(state => ({...state, navigationItem: 'home'}));
            console.log("navigationItem " + appState.navigationItem);

            // return (<Redirect to={{pathname: '/search-field'}}/>);
        } else {
            console.log("message from AuthPage NOT OK");
            return <h3>User not loggedIn</h3>;
        }
    };

    const handleItemClick = (event, {name}) => {
        setAppState(oldState => ({...oldState, navigationItem: name}));
        console.log("active NavigationItem " + appState.navigationItem);
        if (name === 'home') {
            setAppState(oldState => ({...oldState, adverts: []}));
        }
        if (name === 'logout') {
            appState.actions.logout();
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


            <Container>
                <Menu>
                    {/*     <Menu.Item as={Link} to='/search-field' name='home'*/}
                    {/*active={appState.navigationItem === 'home'}>Home</Menu.Item>*/}

                    <Menu.Item name='home' active={appState.navigationItem === 'home'} onClick={handleItemClick}>
                        <A href="/">Home Page</A>
                    </Menu.Item>

                    <Menu.Item name='statistics' active={appState.navigationItem === 'statistics'} onClick={handleItemClick}>
                        <A href="/statistics">Statistics</A>
                    </Menu.Item>

                    <Menu.Menu position='right'>

                        {!appState.loggedIn ?

                            <Menu.Item name='login' active={appState.navigationItem === 'login'} onClick={handleItemClick}>
                                <A href="/login">Log In</A>
                            </Menu.Item> :

                            <Menu.Item name='logout' active={appState.navigationItem === 'logout'} onClick={handleItemClick}>
                                <A href="/logout">Log Out</A>
                            </Menu.Item>}

                        <Menu.Item name='signup' active={appState.navigationItem === 'signup'} onClick={handleItemClick}>
                            <A href="/signup">Sign Up</A></Menu.Item>
                    </Menu.Menu>
                </Menu>

                {appState.loggedIn ? "Logged in" : "Not logged in"}

                {routeResult || <NotFound/>}

            </Container>

            {/*<PostsList textColor="red"/>*/}

        </div>
    );
}

export default App;

//TODO convert in backend Set<Technology> to Set<String>
//TODO make rows of adverts clickable (add link to whole row)
//TODO pagination


//TODO BUG redirect after login