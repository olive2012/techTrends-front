import React, {Component, useContext, useState} from 'react'
import {AppContext} from "../AppContext/AppContext";
import {Search, Grid, Header, Segment, Input, Button} from 'semantic-ui-react'
import AdvertList from "../AdvertList/AdvertList";
import axios from "axios";

export default function SearchField() {
    const [appState, setAppState] = useContext(AppContext);
    const [searchResults, setSearchResults] = useState([]);

    //const handleResultSelect = (e, {result}) => this.setState({value: result.title})

    // const handleSearchChange = (e, {value}) => {
    //     this.setState({isLoading: true, value});


    const [searchField, setSearchField] = useState('');

    const onChange = (event) => {
        setSearchField(event.target.value);
        console.log("searchField: " + searchField);
    }

    const showAllAdverts = () => {
        setAppState(state => ({...state, criteria: "*"}));
    };

    const getResultsByCriteria = () => {
        setAppState(state => ({...state, criteria: searchField}));
    };

    const getResultsByTechnology = () => {
       setAppState(state => ({...state, technology: searchField}));
    }

    const handleKeyPress = (event) => {
        //TODO show all results when criteria is empty and enter pressed
        if (event.key === 'Enter') {
            setSearchField(event.target.value);
            getResultsByCriteria();
        }
    };


    // return (
    //   <div>
    //     <h1>Hello React Function Component!</h1>
    //     <input value={value} type="text" onChange={onChange} />
    //     <p>{value}</p>
    //   </div>
    // );


    return (
        <div id="searchArea">
            <div class="ui icon input" id="searchFieldDiv">
                <input id="searchFieldInput"
                    type="text"
                       placeholder="Search..."
                       onChange={onChange}
                       value={searchField}
                       onKeyPress={handleKeyPress}/>
                <i aria-hidden="true" class="search icon"></i>
            </div>
            <br/>

            <button className="ui button teal" onClick={getResultsByCriteria}>Ieškoti pagal kriterijus</button>

            <button className="ui button teal" onClick={showAllAdverts}>Rodyti visus skelbimus</button>

            <button className="ui button teal" onClick={getResultsByTechnology}>Ieškoti pagal technologiją</button>

        </div>
    );
}
