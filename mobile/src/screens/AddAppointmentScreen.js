import React, { Component } from 'react';
import { Text, View, ActivityIndicator, ScrollView, Alert } from 'react-native';
import { Item, Input, Label } from 'native-base';
import { TextInput } from 'react-native-paper';
import styled from 'styled-components';
import {Picker} from '@react-native-picker/picker';
import { Container, Button } from '../components';
import DatePicker from 'react-native-date-picker';

import qs from 'qs';
import axios from 'axios';
import { addAppointment, getPatients } from '../utils/endPoints';

class AddAppointmentScreen extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            patients: [],
            patient_id: "",
            date: new Date().getTime(),
            description: "",
            loading: true
        };
    }

    onSubmit = (e) => {
        if(!this.validateFields())
        {
            Alert.alert("ERROR! All fields should be inputed.");
            return;
        }
        let data = qs.stringify({
            date: this.state.date,
            description: this.state.description,
            patient_id: this.state.patient_id
        });
        axios({
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            data: data,
            url: addAppointment
        })
        .then(() => {
            console.log("added");
            this.props.navigation.navigate('Home', { screen: "Appointments", params: {updated: true}});
        })
        .catch(e => {
            console.log(e);
        });
    };

    validateFields = (fields_to_ignore = ["patients", "loading"]) =>
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

    componentDidMount()
    {
        axios({
            method: 'GET',
            url: getPatients,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        })
        .then(res => {
            if (res.status === 200) {
                this.setState({patients: res.data.patients, loading: false});
            }
        })
        .catch(err => {
            console.log("error: ", err);
            this.setState({loading: false, error: err});
        });
    }

    render()
    {
        return (
            <ScrollView>
                <Container>
                    { this.state.loading && (
                        <ActivityIndicator
                            style={{
                            position: 'absolute',
                            right: 0,
                            left: 0,
                            top: '50%',
                            zIndex: 1,
                            }}
                            size="large"
                            color="#b60608"
                            animating={this.state.loading}
                        />
                    )}
                    <Label style={{ marginTop: 5}}>Patient:</Label>
                    <Item style={{ marginTop: 5, marginLeft: 0}}>
                        <Picker
                            placeholderStyle={{ color: '#bfc6ea' }}
                            placeholderIconColor="#007aff"
                            style={{ width: '100%' }}
                            onValueChange={value => this.setState({patient_id: value})}
                        >
                        {
                            this.state.patients.map((patient, index) => {
                                return <Picker.Item key={index} label={patient.fullname} value={patient._id} />
                            })
                        }
                        </Picker>
                    </Item>
                    <Label style={{ marginTop: 10 }}>Date of appointment:</Label>
                    <Item style={{ marginTop: 5, alignSelf: 'center' }}>
                        <DatePicker
                            mode="datetime"
                            minimumDate={new Date(Date.now())}
                            date={new Date(this.state.date)}
                            onDateChange={val => {
                                const date = new Date(val).getTime();
                                this.setState({date: date})
                            }}
                        />
                    </Item>
                    <Label style={{ marginTop: 10 }}>Description:</Label>
                    <Item style={{ marginTop: 5, alignSelf: 'center' }}>
                    <TextInput
                        style={{flex:1}}
                        value={this.state.description}
                        onChangeText={text => this.setState({description: text})}
                        keyboardType="default"
                        multiline={true}
                    />
                    </Item>
                    <ButtonView>
                        <Button style={{alignSelf: 'flex-end'}} onPress={this.onSubmit} color="#87CC6F">
                        <Text>Add</Text>
                        </Button>
                    </ButtonView>
                </Container>
            </ScrollView>
        );
    }
};

const ButtonView = styled.View`
    flex: 1;
    margin-top: 30px;
`;

const TimeRow = styled.View`
    flex-direction: row;
`;

export default AddAppointmentScreen;
