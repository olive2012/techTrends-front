import React, {Component, useContext, useState} from 'react'
import {Menu} from 'semantic-ui-react'
import {AppContext} from "../AppContext/AppContext";

export default function NavBar() {

    const [appState, setAppState] = useContext(AppContext);
    const [activeItem, setActiveItem] = useState('');

    // const handleItemClick = (event, {name}) => {
    //     setActiveItem(name);
    //     console.log("activeItem " + activeItem);
    // };

    const handleItemClick = (event, {name}) => {
        setAppState(oldState => ({...oldState, navigationItem: name}));
        console.log("active NavigationItem " + appState.navigationItem);
    };

    return (
        <Menu>
            <Menu.Item
                name='browse'
                active={appState.navigationItem === 'browse'}
                onClick={handleItemClick}
            >Home
            </Menu.Item>

            <Menu.Item
                name='submit'
                active={appState.navigationItem === 'submit'}
                onClick={handleItemClick}
            >Statistics
            </Menu.Item>

            <Menu.Menu position='right'>
                <Menu.Item
                    name='login'
                    active={appState.navigationItem === 'login'}
                    onClick={handleItemClick}

                >Log In
                </Menu.Item>
                <Menu.Item
                    name='signup'
                    active={appState.navigationItem === 'signup'}
                    onClick={handleItemClick}
                >Sign Up
                </Menu.Item>
            </Menu.Menu>
        </Menu>
    )
    // }
}