import React, {useContext, useState} from 'react';
import {Button, Form, Grid, Header, Message, Segment} from 'semantic-ui-react'
import {AppContext} from "../AppContext/AppContext";

export default function LoginForm() {

    const [appState, setAppState] = useContext(AppContext);

    // const [email, setEmail] = useState('');

    const [inputs, setInputs] = useState({});

    const handleInputChange = (event) => {
        event.persist();
        setInputs(inputs => ({...inputs, [event.target.name]: event.target.value}));
        console.log("email: " + inputs.email + ", password: " + inputs.password);
    };

    // const onChangeEmail = (event) => {
    //     setEmail(event.target.value);
    //     console.log("email: " + email);
    // };

    const login = () => {
        appState.actions.login(inputs.email, inputs.password);
        setInputs(oldState => ({email: '', password: ''}));
    };

    return (

        <Grid textAlign='center' style={{height: '100vh', marginTop: '50px'}}>
            <Grid.Column style={{maxWidth: 450}}>
                <Header as='h2' color='teal' textAlign='center'>
                    Log-in to your account
                </Header>
                <Form size='large' onSubmit={login}>
                    <Segment stacked>
                        <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address'
                                    name='email' value={inputs.email}
                                    onChange={handleInputChange}/>

                        <Form.Input
                            fluid icon='lock' iconPosition='left' placeholder='Password' type='password'
                            name='password' value={inputs.password}
                            onChange={handleInputChange}/>

                        <Button color='teal' fluid size='large' type="submit">Login</Button>

                    </Segment>
                </Form>
                <Message>
                    New to us? <a href='#'>Sign Up</a>
                </Message>
            </Grid.Column>
        </Grid>
    )
};
