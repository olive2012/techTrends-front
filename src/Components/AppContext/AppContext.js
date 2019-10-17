import React, {useState} from 'react';
import TechTrendsApi from "../../Api/TechTrendsApi";
import {navigate} from "hookrouter";

const api = new TechTrendsApi();

const AppContext = React.createContext([{}, () => {
}]);

export const SEARCHBY = {
    CRITERIA: 1,
    TECHNOLOGY: 2,
};

const AppProvider = (props) => {

    const getAdverts = (searchBy, criteria, technology) => {
        switch (searchBy) {
            case SEARCHBY.CRITERIA:
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
                    });
                break;
            case SEARCHBY.TECHNOLOGY:
                if (!technology) {
                    setState(oldState => ({...oldState, adverts: []}));
                    return;
                }
                api.getAdvertsByTechnology(technology)
                    .then(response => {
                        console.log(response);
                        setState(oldState => ({...oldState, adverts: response.data}));
                    });
                break;
            default:
                break;
        }
    };

    const getAdvertsByTechnology = (technology) => {
        if (!technology) {
            setState(oldState => ({...oldState, adverts: []}));
            return;
        }
        api.getAdvertsByTechnology(technology)
            .then(response => {
                console.log(response);
                setState(oldState => ({...oldState, adverts: response.data}));
            })
    };

    const getAdvertsVersion2 = (city, salary, technology) => {
           // if (!criteria && criteria !== "*") {
           //          setState(oldState => ({...oldState, adverts: []}));
           //          return;
           //      };
           if (technology) {
                   api.getAdvertsVersion2(city, salary, technology)
                    .then(response => {
                        console.log(response);
                        let filtered = response.data;

                        if (city){
                            console.log("city: " + city);
                            filtered = response.data.filter(advert => advert.city === city);
                            console.log("filtered: " + filtered);
                            if (salary){
                                console.log("salary: " + salary);
                                filtered = filtered.filter(advert => advert.minSalary >= salary);
                                console.log("filtered: " + filtered);
                            }
                        }
                        setState(oldState => ({...oldState, adverts: filtered}));
                    });
           } else {
               console.log( "from apiContext else");
           }
    };

    //method for checking if user is logged in. If no - returns false
    const checkLoginState = () => {
        console.log("message from checkLoginState");
        let tokenToCheck = window.localStorage.getItem('token');

        if (!tokenToCheck) {
            console.log("There is no token. Setting loggedIn: false");
            setState(state => ({...state, loggedIn: false}));
            return false;
        }

        if (api.checkToken(tokenToCheck)) {
            console.log(tokenToCheck);
            console.log("Setting loggedIn");
            setState(state => ({...state, loggedIn: true}));
            return true;
        }
        setState(state => ({...state, loggedIn: false}));
        return false;
    };

    // const showAuthPage = () => {
    //     if (state.loggedIn) {
    //         console.log("message from AuthPage OK");
    //         return <Redirect to='/search-field'/>;
    //     } else {
    //         console.log("message from AuthPage NOT OK");
    //         return <h3>User not loggedIn</h3>;
    //     }
    // };

    const login = (username, password) => {
        api.login(username, password)
            .then(response => {
                window.localStorage.setItem('token', response.data);
                console.log("message from login, login token -" + response.data);
                checkLoginState();
            })
            .catch(error => {
                window.alert("The e-mail address and/or password you specified are not correct.")
            })
    };

    const logout = () => {
        window.localStorage.clear();
        setState(state => ({
            ...state,
            adverts: [],
            filteredAdverts: [],
            navigationItem: 'home',
            advertsCriteria: '',
            advertsTechnology: '',
            loggedIn: false,
            advertsByCity: '',
            advertsByTechnology: '',
            advertsBySalary: ''
        }));
        return navigate('/');
    };

    const registerNewUser = (username, password) => {
        api.registerNewUser(username, password)
            .then(response => {
                window.alert(response.data)
            })
            .catch(error => {
                console.log("registerNewUser error: ");
                console.log(error.data);
                window.alert(error.data);
            })
    };

    const defaultState = {
        //adverts: [{title:"Programuotojas", id:1},{title:"Testuotojas", id:2}],
        adverts: [],
        navigationItem: null,
        advertsCriteria: null,
        advertsTechnology: null,

        advertsByCity: null,
        advertsBySalary: null,
        advertsByTechnology: null,

        //posts: [],
        // api: api,
        loggedIn: false,
        searchBy: SEARCHBY.CRITERIA,
        actions: {
            getAdverts: getAdverts,
            getAdvertsByTechnology: getAdvertsByTechnology,
            getAdvertsVersion2: getAdvertsVersion2,
            checkLoginState: checkLoginState,
            login: login,
            logout: logout,
            registerNewUser: registerNewUser
            // showAuthPage: showAuthPage
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