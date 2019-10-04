import React, {useState} from 'react';
import TechTrendsApi from "../../Api/TechTrendsApi";
import {Redirect} from "react-router-dom";

const api = new TechTrendsApi();

const AppContext = React.createContext([{}, () => {
}]);

const AppProvider = (props) => {

    const getAdverts = (criteria) => {
        // criteria === '*' is a special case which means
        // show all
        if (!criteria && criteria !== "*") {
            setState(oldState => ({...oldState, adverts: []}));
            return;
        }

        api.getAdverts(criteria)
            .then(response => {
                console.log(response);
                setState(oldState => ({...oldState, adverts: response.data}));
            })
    };

    const getAdvertsByTechnology = (technology) => {
        if (!technology && technology !== "*") {
            setState(oldState => ({...oldState, adverts: []}));
            return;
        }
        api.getAdvertsByTechnology(technology)
            .then(response => {
                console.log(response);
                setState(oldState => ({...oldState, adverts: response.data}));
            })
    };

    //method for checking if user is logged in. If no - returns false
    const checkLoginState = () => {
        let tokenToCheck = window.localStorage.getItem('token');

        if (!tokenToCheck) {
            console.log("There is no token. Setting loggedIn: false");
            setState(state => ({...state, loggedIn: false}));
            return false;
        }

        if (api.checkToken(tokenToCheck)) {
            console.log("Setting loggedIn");
            setState(state => ({...state, loggedIn: true}));
            return true;
        }
        setState(state => ({...state, loggedIn: false}));
        return false;
    };

    const authPage = (loggedIn) => {
        if (loggedIn) {
            console.log("message from AuthPage OK");
            return <Redirect to='/search-field'/>;
        } else {
            console.log("message from AuthPage NOT OK");
            return <h3>User not loggedin</h3>;
        }
    };

    const login = (username, password) => {
        api.login(username, password)
            .then(response => {
                window.localStorage.setItem('token', response.data);
                checkLoginState();
            })

    };


    const defaultState = {
        //adverts: [{title:"Programuotojas", id:1},{title:"Testuotojas", id:2}],
        adverts: [],
        navigationItem: null,
        advertsCriteria: null,
        technology: null,
        posts: [],
        // api: api,
        loggedIn: false,
        actions: {
            // updatePosts: updatePosts,
            // renewPosts: renewPosts,
            getAdverts: getAdverts,
            getAdvertsByTechnology: getAdvertsByTechnology,
            checkLoginState: checkLoginState,
            login: login,
            authPage: authPage
        }
    };

    const [state, setState] = useState(defaultState);

    return (
        <AppContext.Provider value={[state, setState]}>
            {props.children}
        </AppContext.Provider>
    );

};

export {AppContext, AppProvider};