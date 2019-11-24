import React, {useContext, useState} from 'react';
import {Button, Form, Grid, Header, Segment} from 'semantic-ui-react'
import {AppContext} from "../AppContext/AppContext";

export default function SignUpForm() {

    const [appState, setAppState] = useContext(AppContext);

    const [inputs, setInputs] = useState({});

    const handleInputChange = (event) => {
        event.persist();
        setInputs(inputs => ({...inputs, [event.target.name]: event.target.value}));
        console.log("email: " + inputs.email + ", password: " + inputs.password + ", reentered value: " + inputs.reenteredPassword);
    };

    const handleSubmit = () => {
        if (inputs.password === inputs.reenteredPassword) {
            inputs.email && inputs.reenteredPassword && appState.actions.registerNewUser(inputs.email, inputs.reenteredPassword);
            setInputs(oldState => ({email: '', password: '', reenteredPassword: ''}));
            console.log(inputs.email + " " + inputs.password);
        } else {
            console.log("email: " + inputs.email + ", password: " + inputs.password + ", reentered value: " + inputs.reenteredPassword);
            window.alert("Your entered password does not match repeated value");
        }

    };

    return (

        <Grid textAlign='center' style={{height: '100vh', marginTop: '100px'}}>
            <Grid.Column style={{maxWidth: 450}}>
                <Header as='h2' color='teal' textAlign='center'>
                    Create your account
                </Header>
                <Form size='large' onSubmit={handleSubmit}>
                    <Segment stacked>
                        <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address' name='email'
                                    value={inputs.email}
                                    onChange={handleInputChange}/>

                        <Form.Input
                            fluid icon='lock' iconPosition='left' placeholder='Password' type='password' name='password'
                            value={inputs.password}
                            onChange={handleInputChange}/>

                        <Form.Input
                            fluid icon='lock' iconPosition='left' placeholder='Confirm Your Password' type='password'
                            value={inputs.reenteredPassword}
                            name='reenteredPassword'
                            onChange={handleInputChange}/>

                        <Button color='teal' fluid size='large' type="submit" content='Submit'/>

                    </Segment>
                </Form>
            </Grid.Column>
        </Grid>
    )
};