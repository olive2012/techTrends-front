import React, {useContext, useState} from 'react'
import {AppContext, SEARCHBY} from "../AppContext/AppContext";
import {Grid} from 'semantic-ui-react'
import AdvertList from "../AdvertList/AdvertList";

export default function SearchField() {
    const [appState, setAppState] = useContext(AppContext);
    const [searchResults, setSearchResults] = useState([]);

    const [searchField, setSearchField] = useState('');

    const onChange = (event) => {
        setSearchField(event.target.value);
        console.log("searchField: " + searchField);
    };

    const showAllAdverts = () => {
        setAppState(state => ({...state, searchBy: SEARCHBY.CRITERIA, advertsCriteria: '*'}));
    };

    const setCriteria = () => {
        setAppState(state => ({...state, searchBy: SEARCHBY.CRITERIA, advertsCriteria: searchField}));
    };

    const setTechnology = () => {
        setAppState(state => ({...state, searchBy: SEARCHBY.TECHNOLOGY, advertsTechnology: searchField}));
    };

    const handleKeyPress = (event) => {
        //TODO show all results when criteria is empty and enter pressed
        if (event.key === 'Enter') {
            setSearchField(event.target.value);
            if (searchField === "") {
                setSearchField("*");
                showAllAdverts();
            } else {
                setCriteria();
            }
        }
    };

    return (
        <Grid centered>
            <div id="searchArea1">
                <div class="ui icon input" id="searchFieldDiv1">
                    <input id="searchFieldInput"
                           type="text"
                           placeholder="Search..."
                           onChange={onChange}
                           value={searchField}
                           onKeyPress={handleKeyPress}/>
                    <i aria-hidden="true" class="search icon"></i>
                </div>
                <br/>

                <button className="ui button teal" onClick={setCriteria}>Ieškoti pagal kriterijus</button>

                <button className="ui button teal" onClick={showAllAdverts}>Rodyti visus skelbimus</button>

                <button className="ui button teal" onClick={setTechnology}>Ieškoti pagal technologiją</button>
            </div>

            {appState.adverts.length > 0 && <AdvertList/>}

        </Grid>
    );
}
