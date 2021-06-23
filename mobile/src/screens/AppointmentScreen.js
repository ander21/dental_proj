import React, { Component } from 'react';
import styled from "styled-components";
import { View, Text, Linking, ScrollView, ActivityIndicator } from "react-native";
import { Container, GrayText, Button } from "../components";
import axios from 'axios';
import {removeAppointment} from '../utils/endPoints';


class AppointmentScreen extends Component {
    constructor(props)
    {
        super(props);
    }

    componentDidMount()
    {

    }

    onDecline = () => {
        axios({
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            url: removeAppointment + this.props.route.params.appointment._id
        })
        .then(() => {
            console.log("removed");
            this.props.navigation.navigate('Home', { screen: "Appointments", params: { updated: true } });
        })
        .catch(e => {
            console.log(e);
        });
    }

    render() {
        const { patient, appointment } = this.props.route.params;
        console.log(appointment);
        return (
            <ScrollView style={{backgroundColor: "#FFFFFF"}}>
                <View>
                    <Avatar
                        source={{
                            uri: patient.picture,
                        }}
                    />
                </View>
                <AppointmentCard>
                        <AppointmentCardRow>
                            <AppointmentCardLabel style={{ color: 'gray'}}>Patient: <Text style={{ fontWeight: '800', fontSize: 18, color:"#000"}}>{patient.fullname}</Text></AppointmentCardLabel>
                        </AppointmentCardRow>
                    <AppointmentCardRow style={{marginTop: 10}}>
                        <AppointmentCardLabel style={{ color: 'gray'}}>Description: <Text style={{ fontWeight: '800', color:"#000" }}>{appointment.description}</Text></AppointmentCardLabel>
                    </AppointmentCardRow>
                    <AppointmentCardRow style={{marginTop: 10}}>
                        <AppointmentCardLabel  style={{ color: 'gray'}}>Date: <Text style={{ fontWeight: '800', color:"#000" }}>{appointment.date}</Text></AppointmentCardLabel>
                        <AppointmentCardLabel style={{marginLeft: 50, color: 'gray'}}>Time: <Text style={{ fontWeight: '800', color:"#000" }}>{appointment.time}</Text></AppointmentCardLabel>
                    </AppointmentCardRow>
                    {
                        (appointment.price && appointment.tooth) && (
                            <AppointmentCardRow style={{marginTop: 10}}>
                                <AppointmentCardLabel  style={{ color: 'gray'}}>Price: <Text style={{ fontWeight: '800', color:"#000" }}>{appointment.price}</Text></AppointmentCardLabel>
                                <AppointmentCardLabel style={{marginLeft: 50, color: 'gray'}}>Tooth: <Text style={{ fontWeight: '800', color:"#000" }}>{appointment.tooth}</Text></AppointmentCardLabel>
                            </AppointmentCardRow>
                        )
                    }
                </AppointmentCard>
                <ButtonView>
                    {
                        (appointment.status !== "done") && (
                            <Button style={{}} onPress={() => this.props.navigation.navigate({ name: 'FinishAppointment', params: { appointmentId: this.props.route.params.appointment._id }})} color="#87CC6F">
                                <Text>Done</Text>
                            </Button>
                        )
                    }
                        <Button style={{marginTop: 10}} onPress={this.onDecline} color="#D00000">
                            <Text>Remove</Text>
                        </Button>
                </ButtonView>
                    
            </ScrollView>
        );
    }
}

export default AppointmentScreen;

const Avatar = styled.Image`
    border-radius: 50px;
    width: 100px;
    height: 100px;
    align-self: center;
    margin-top: 10px;
`;

const ButtonView = styled.View`
    flex: 1;
    /* margin-top: 220px; */
    margin-left: 10px;
    margin-right: 10px;
`;

const AppointmentCardLabel = styled.Text`
    font-size: 16px;
    margin-left: 40px;
`;

const AppointmentCardRow = styled.View`
    flex-direction: row;
    align-items: center;
    margin-top: 3.5px;
    margin-bottom: 3.5px;
`;

const AppointmentCard = styled.View`
    padding: 20px 25px;
    background: white;
    margin-bottom: 20px;
`;
