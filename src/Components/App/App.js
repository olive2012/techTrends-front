import React, {useContext, useEffect} from 'react';
import {AppContext} from "../AppContext/AppContext";
import './App.css';
import SearchField2 from "../Search/SearchField";
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

    useEffect(() => {
        showAuthPage();
        console.log("navigate from useEffect 'showAuthPage()' ");
    }, [appState.actions, appState.loggedIn]);


    useEffect(() => {
        appState.actions.getAllAdverts();
    }, [appState.actions]);


    useEffect(() => {
        appState.actions.getAdvertsVersion2(appState.advertsByCity, appState.advertsBySalary, appState.advertsByTechnology);
    }, [appState.actions, appState.advertsByCity, appState.advertsBySalary, appState.advertsByTechnology]);

    const showAuthPage = () => {
        if (appState.loggedIn) {
            console.log("message from AuthPage OK");
            navigate('/');
            setAppState(state => ({...state, navigationItem: 'home'}));
            console.log("navigationItem " + appState.navigationItem);
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

            <Container>
                <Menu>

                    <Menu.Item name='home' active={appState.navigationItem === 'home'} onClick={handleItemClick}>
                        <A href="/">Home Page</A>
                    </Menu.Item>

                    <Menu.Item name='statistics' active={appState.navigationItem === 'statistics'}
                               onClick={handleItemClick}>
                        <A href="/statistics">Statistics</A>
                    </Menu.Item>

                    <Menu.Menu position='right'>

                        {!appState.loggedIn ?

                            <Menu.Item name='login' active={appState.navigationItem === 'login'}
                                       onClick={handleItemClick}>
                                <A href="/login">Log In</A>
                            </Menu.Item> :

                            <Menu.Item name='logout' active={appState.navigationItem === 'logout'}
                                       onClick={handleItemClick}>
                                <A href="/logout">Log Out</A>
                            </Menu.Item>}

                        <Menu.Item name='signup' active={appState.navigationItem === 'signup'}
                                   onClick={handleItemClick}>
                            <A href="/signup">Sign Up</A></Menu.Item>
                    </Menu.Menu>
                </Menu>

                {appState.loggedIn ? "Logged in" : "Not logged in"}

                {routeResult || <NotFound/>}

                {/*<Pagination defaultActivePage={5} totalPages={10}/>*/}
            </Container>

            {/*<PostsList textColor="red"/>*/}

        </div>
    );
}

export default App;


//TODO make rows of adverts clickable (add link to whole row)
//TODO pagination
