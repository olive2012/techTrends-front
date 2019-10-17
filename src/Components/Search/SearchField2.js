import React, {useContext, useState} from 'react'
import {AppContext, SEARCHBY} from "../AppContext/AppContext";
import {Form, Grid} from 'semantic-ui-react'
import AdvertList from "../AdvertList/AdvertList";

export default function SearchField() {
    const [appState, setAppState] = useContext(AppContext);
    // const [searchResults, setSearchResults] = useState([]);

    // const [searchField, setSearchField] = useState('');

    const [searchByCity, setSearchByCity] = useState('');
    const [searchBySalary, setSearchBySalary] = useState('');
    const [searchByTechnology, setSearchByTechnology] = useState('');


    const onChangeCity = (event) => {
        setSearchByCity(event.target.value);
        console.log("searchByCity: " + searchByCity);
    };

    const onChangeSalary = (event) => {
        setSearchBySalary(event.target.value);
        console.log("searchBySalary: " + searchBySalary);
    };

    const onChangeTechnology = (event) => {
        setSearchByTechnology(event.target.value);
        console.log("searchByTechnology: " + searchByTechnology);
    };

    const showAllAdverts = () => {
        setAppState(state => ({...state,
            // searchBy: SEARCHBY.CRITERIA,
            advertsCriteria: '*'}));
    };

    const setCriteria = () => {
        setAppState(state => ({...state,
            // searchBy: SEARCHBY.CRITERIA, advertsCriteria: searchField,
            advertsByCity: searchByCity, advertsBySalary: searchBySalary, advertsByTechnology: searchByTechnology}));
    };

    const clearAllCriteria = () => {
       setAppState(state => ({...state,
            // searchBy: SEARCHBY.CRITERIA, advertsCriteria: searchField,
            advertsByCity: '', advertsBySalary: '', advertsByTechnology: '', adverts: []}));
       setSearchByCity('');
       setSearchBySalary('');
       setSearchByTechnology('');
    };

    // const setTechnology = () => {
    //     setAppState(state => ({...state, searchBy: SEARCHBY.TECHNOLOGY, advertsTechnology: searchField}));
    // };

    // const handleKeyPress = (event) => {
    //     //TODO show all results when criteria is empty and enter pressed
    //     if (event.key === 'Enter') {
    //         setSearchField(event.target.value);
    //         if (searchField === "") {
    //             setSearchField("*");
    //             showAllAdverts();
    //         } else {
    //             setCriteria();
    //         }
    //     }
    // };

    return (
        <Grid centered>
            <div id="searchArea">
                <div class="ui icon input" id="searchFieldDiv">
                    <input id="inputCity"
                           type="text"
                           placeholder="Miestas..."
                           onChange={onChangeCity}
                           name='city' value={searchByCity}
                        //onKeyPress={handleKeyPress}
                    />
                    <i aria-hidden="true" class="search icon"></i>
                </div>

                <div className="ui icon input" id="searchFieldDiv">
                    <input id="inputSalary"
                           type="text"
                           placeholder="Minimalus atlyginimas..."
                           onChange={onChangeSalary}
                           name='salary' value={searchBySalary}
                        //onKeyPress={handleKeyPress}
                    />
                    <i aria-hidden="true" className="search icon"></i>
                </div>

                <div className="ui icon input" id="searchFieldDiv">
                    <input id="inputTechnology"
                           type="text"
                           placeholder="Dominanti technologija..."
                           onChange={onChangeTechnology}
                           name='technology' value={searchByTechnology}
                    />
                    <i aria-hidden="true" className="search icon"></i>
                </div>
                <br/>

                <button className="ui button teal" onClick={setCriteria}>Ieškoti pagal kriterijus</button>

                <button className="ui button teal" onClick={clearAllCriteria}>Išvalyti filtrus</button>

            </div>

            {appState.adverts.length > 0 && <AdvertList/>}

        </Grid>
    );
}
