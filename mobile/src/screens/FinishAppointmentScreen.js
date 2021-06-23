import { Label, View, Text } from 'native-base';
import React, { Component } from 'react';
import { TextInput } from 'react-native-paper';
import { Alert } from 'react-native';
import { Container, Button } from '../components';
import {setDone} from '../utils/endPoints';
import styled from 'styled-components';
import TextInputMask from 'react-native-text-input-mask';
import qs from 'qs';
import axios from 'axios';

class FinishAppointmentScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            appointmentId: null,
            tooth: '',
            description: '',
            price: ''
        };
    }

    componentDidMount()
    {
        this.setState({appointmentId: this.props.route.params.appointmentId});
    }

    onSubmit = (e) => {
        if(!this.validateFields())
        {
            Alert.alert("ERROR! All fields should be inputed.");
            return;
        }
        let data = qs.stringify({
            tooth: this.state.tooth,
            description: this.state.description,
            price: this.state.price
        });
        console.log("appointmentId: " + this.props.route.params.appointmentId)
        axios({
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            data: data,
            url: setDone + this.state.appointmentId
        })
        .then(() => {
            console.log("added");
            this.props.navigation.navigate('Home', { screen: "Appointments", params: {updated: true}});
        })
        .catch(e => {
            console.log(e);
        });
    };

    validateFields = (fields_to_ignore = ["appointmentId"]) =>
    {
        for(let key in this.state)
        {
            if(fields_to_ignore.includes(key))
                continue;

            if(!this.state[key])
                return false;
        }

        return true;
    }

    render() {
        return (
            <Container>
                <Label>Tooth number:</Label>
                <TextInput
                    value={this.state.tooth}
                    keyboardType='numeric'
                    render={props =>
                        <TextInputMask
                            {...props}
                            mask="[00]"
                            onChangeText={text => this.setState({tooth: text}) }
                        />
                    }
                />
                <Label>Price:</Label>
                <TextInput
                    value={this.state.price}
                    keyboardType='numeric'
                    render={props =>
                        <TextInputMask
                            {...props}
                            mask="[00000]"
                            onChangeText={text => this.setState({price: text}) }
                        />
                    }
                />
                <Label>Description:</Label>
                <TextInput
                    value={this.state.description}
                    multiline={true}
                    onChangeText={(text) => this.setState({ description: text })}
                />
                <ButtonView>
                    <Button onPress={this.onSubmit} color="#87CC6F">
                    <Text>Finish</Text>
                    </Button>
                </ButtonView>
            </Container>
        );
    }
}

const ButtonView = styled.View`
    flex: 1;
    margin-top: 30px;
`;

export default FinishAppointmentScreen;