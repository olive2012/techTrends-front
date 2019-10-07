import React, {useContext, useState} from 'react';
import {Button, Form, Grid, Header, Message, Segment} from 'semantic-ui-react'
import {AppContext} from "../AppContext/AppContext";
import {navigate} from "hookrouter";

export default function SignUpForm() {

    const [appState, setAppState] = useContext(AppContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatedPassword, setRepeatedPassword] = useState('');

    const onChangeEmail = (event) => {
        setEmail(event.target.value);
        console.log("email: " + email);
    };

    const onChangePassword = (event) => {
        setPassword(event.target.value);
        console.log("password: " + password);
    };

    const onChangeRepeatedPassword = (event) => {
        if (password === event.target.value){
          setRepeatedPassword(event.target.value);
          console.log("repeated password: " + repeatedPassword);
        } else {
            console.log("password: " + password + ", repeated value: " + event.target.value);
            window.alert("Your entered password does not match with repeated value");
        }
    };

    const handleSubmit = () => {
        email && repeatedPassword && appState.actions.registerNewUser(email, repeatedPassword);
    };

    return (

        <Grid textAlign='center' style={{height: '100vh', marginTop: '100px'}}>
            <Grid.Column style={{maxWidth: 450}}>
                <Header as='h2' color='teal' textAlign='center'>
                    Create your account
                </Header>
                <Form size='large' onSubmit={handleSubmit}>
                    <Segment stacked>
                        <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address'
                                    onChange={onChangeEmail}/>

                        <Form.Input
                            fluid icon='lock' iconPosition='left' placeholder='Password' type='password'
                            onChange={onChangePassword}/>

                        <Form.Input
                            fluid icon='lock' iconPosition='left' placeholder='Repeat Your Password' type='password'
                            onChange={onChangeRepeatedPassword}/>

                        <Button color='teal' fluid size='large' onClick={handleSubmit} content='Submit'/>

                    </Segment>
                </Form>
            </Grid.Column>
        </Grid>
    )
};