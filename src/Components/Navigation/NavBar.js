import React, {Component, useContext, useState} from 'react'
import {Menu, Segment} from 'semantic-ui-react'
import {AppContext} from "../AppContext/AppContext";
import {Link} from "react-router-dom";

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
        if (name === 'home'){
            setAppState(oldState => ({...oldState, adverts: []}));
        }
        if (name === 'logout'){
            appState.actions.logout();
        }

    };

    return (
        <Menu>
            <Menu.Item as={Link} to='/search-field'
                name='home'
                active={appState.navigationItem === 'home'}
                onClick={handleItemClick}
            >Home
            </Menu.Item>

            <Menu.Item
                name='statistics'
                active={appState.navigationItem === 'statistics'}
                onClick={handleItemClick}
            >Statistics
            </Menu.Item>

            <Menu.Menu position='right'>

                {!appState.loggedIn?

                < Menu.Item as = {Link} to='/login'
                    name='login'
                    active={appState.navigationItem === 'login'}
                    onClick={handleItemClick}
                    >Log In
                    </Menu.Item> :

                  < Menu.Item
                    name='logout'
                    active={appState.navigationItem === 'logout'}
                    onClick={handleItemClick}
                    >Log Out
                    </Menu.Item>

                }
                <Menu.Item as={Link} to='/signup'
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