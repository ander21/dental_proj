import React, { Component } from "react";
import styled from "styled-components";
import { View, SectionList, Text, Linking, ScrollView, ActivityIndicator } from "react-native";

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Container, GrayText, Button } from "../components";
import Foundation from "react-native-vector-icons/Foundation";
import {Badge} from '../components';

import axios from "axios";
import { getAppointmentsByPatientId } from "../utils/endPoints";
import { Label } from "native-base";

class PatientScreen extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            user_appointments: [],
            loading: true,
            error: ''
        };
    }

    fetchAppointmentsByPatient = () =>
    {
        axios({
            method: 'GET',
            url: getAppointmentsByPatientId + this.props.route.params.patient._id,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        })
        .then(res => {
            if(res.status === 200)
            {
                console.log(res.data.appointments);
                const data = res.data.appointments.filter(appointment => appointment.status && appointment.status === "done")
                this.setState({ loading: false, user_appointments: data })
            }
        })
        .catch(err => this.setState({ loading: false, error: err }))
    }

    componentDidMount()
    {
        this.fetchAppointmentsByPatient();
    }

    getDate = (date_ms) => {
        let appointment_date = new Date(+date_ms);
        let appointment_date_str = appointment_date.getFullYear().toString() + "." + (1 + appointment_date.getMonth()) + "." + appointment_date.getDate().toString();
        let appointment_time_str = appointment_date.getHours() + ":" + appointment_date.getMinutes();

        return appointment_date_str + " - " + appointment_time_str;
    }

    render()
    {
        console.log("route params: " + this.props.route.params);
        const { patient } = this.props.route.params;

        return (
            <ScrollView style={{ flex: 1}}>
                <PatientDetails>
                    <View style={{flex: 1}}>
                        <Avatar
                            source={{
                                uri: patient.picture,
                            }}
                        />
                    <PatientFullname>{patient.fullname}</PatientFullname>
                    <GrayText style={{alignSelf: 'center'}}>{patient.phone}</GrayText>
                    </View>

                    <PatientButtons>
                        <ToothFormulaView>
                            <Button>Tooth Formula</Button>
                        </ToothFormulaView>
                        <PhoneButtonView>
                            <Button
                                onPress={() => Linking.openURL("tel:" + patient.phone)}
                                color="#84D269"
                            >
                                <Foundation name="telephone" size={22} color="white" />
                            </Button>
                        </PhoneButtonView>
                    </PatientButtons>
            </PatientDetails>

            {this.state.loading && (
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
            {this.state.user_appointments.length === 0 && (
                <View style={{alignItems: "center"}}>
                    <Text>No any appointments...</Text>
                </View>
            )}
            <Label style={{alignSelf: 'center', color: "#A3A3A3", marginBottom: 10}}>Appointments history:</Label>
            <PatientAppointments>
                <Container>
                {
                    this.state.user_appointments.map((appointment, index) => {
                        return(
                            <AppointmentCard key={index}>
                                {appointment.tooth && (
                                    <AppointmentCardRow>
                                        <FontAwesome5 name="tooth" size={16} color="#A3A3A3"/>
                                        <AppointmentCardLabel>Tooth: <Text style={{ fontWeight: '800' }}>{appointment.tooth}</Text></AppointmentCardLabel>
                                    </AppointmentCardRow>
                                )}
                                <AppointmentCardRow>
                                    <Foundation name="clipboard-notes" size={16} color="#A3A3A3"/>
                                    <AppointmentCardLabel>Description: <Text style={{ fontWeight: '800' }}>{appointment.description}</Text></AppointmentCardLabel>
                                </AppointmentCardRow>
                                <AppointmentCardRow style={{ marginTop: 20, justifyContent: 'space-between' }}>
                                    <Badge style={{ width: 155 }} active>{this.getDate(appointment.date)}</Badge>
                                    <Badge color={"green"} style={{ width: 80, textAlign: 'center', }}>{appointment.price}$</Badge>
                                </AppointmentCardRow>
                            </AppointmentCard>
                        )
                    })
                }
                </Container>
            </PatientAppointments>
            </ScrollView>
        );
    }

};

export default PatientScreen;

const Avatar = styled.Image`
    border-radius: 50px;
    width: 100px;
    height: 100px;
    align-self: center;
`;

const AppointmentCardLabel = styled.Text`
    font-size: 16px;
    margin-left: 10px;
`;

const AppointmentCardRow = styled.View`
    flex-direction: row;
    align-items: center;
    margin-top: 3.5px;
    margin-bottom: 3.5px;
`;

const AppointmentCard = styled.View`
    padding: 20px 25px;
    border-radius: 10px;
    background: white;
    margin-bottom: 20px;
`;

const PatientAppointments = styled.View`
    flex: 1;
    background: #f8fafd;
`;

const PatientDetails = styled(Container)`
    flex: 0.3;
`;

const PatientFullname = styled.Text`
    font-weight: 800;
    font-size: 24px;
    line-height: 30px;
    margin-bottom: 3px;
    margin-top: 3px;
    align-self: center;
`;

const ToothFormulaView = styled.View`
    flex: 1;
`;

const PhoneButtonView = styled.View`
    margin-left: 10px;
    width: 50px;
    align-self: center;
`;

const PatientButtons = styled.View`
    flex: 1;
    margin-top: 20px;
    flex-direction: row;
`;
