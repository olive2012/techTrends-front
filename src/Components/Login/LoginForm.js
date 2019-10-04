import React, {useContext, useState} from 'react';
import {Button, Form, Grid, Header, Image, Message, Segment} from 'semantic-ui-react'
import {AppContext} from "../AppContext/AppContext";
import {Redirect} from "react-router-dom";

export default function LoginForm() {

    const [appState, setAppState] = useContext(AppContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onChangeEmail = (event) => {
        setEmail(event.target.value);
        console.log("email: " + email);
    };

    const onChangePassword = (event) => {
        setPassword(event.target.value);
        console.log("password: " + password);
    };

    const login = () => {
        console.log("login");
        appState.actions.login(email, password);
        console.log("login status " + appState.loggedIn);
        appState.actions.authPage(appState.loggedIn);
        console.log("message from LoginForm login method");

    };


    return (
        <Grid textAlign='center' style={{height: '100vh', marginTop: '50px'}}>
            <Grid.Column style={{maxWidth: 450}}>
                <Header as='h2' color='teal' textAlign='center'>
                    Log-in to your account
                </Header>
                <Form size='large'>
                    <Segment stacked>
                        <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address'
                                    onChange={onChangeEmail}/>

                        <Form.Input
                            fluid icon='lock' iconPosition='left' placeholder='Password' type='password'
                            onChange={onChangePassword}/>

                        <Button color='teal' fluid size='large' onClick={login}>Login</Button>
                    </Segment>
                </Form>
                <Message>
                    New to us? <a href='#'>Sign Up</a>
                </Message>
            </Grid.Column>
        </Grid>
    )
};

// export default LoginForm