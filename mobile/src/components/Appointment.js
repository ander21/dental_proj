import React from "react";
import { View, ActivityIndicator, ScrollView, Text } from "react-native";
import { GroupItem } from "./";
import styled from "styled-components/native";
import Badge from './Badge';
import axios from 'axios';
import {getPatient} from '../utils/endPoints';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Title, Card, Paragraph, Avatar } from 'react-native-paper';

class Appointment extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {
            patient: null,
            loading: true
        }
    }

    componentDidMount()
    {
        axios({
            method: 'GET',
            url: getPatient + this.props.item.patient_id,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        }).then(res => {
            this.setState({
                patient: res.data.patient,
                loading: false
            });
        }).catch(err => {
            console.log(err);
        });
    }

    render() {
        const {description, active, time, status, price, tooth} = this.props.item;
        // const LeftContent = props => <Avatar.Icon {...props} icon="folder" color="#2B86FF" backgroundColor="#fff" />
        if(this.state.patient)
        {

            return (
                <Card style={{margin: 5}} onPress={() => {this.props.navigation.navigate({name: "Appointment", params: {patient: this.state.patient, appointment:  this.props.item} })}}>
                    <Card.Content style={{ flexDirection:'row', alignItems: 'center', padding: 0 }}>
                        <View style={{ flex: 1 }}>
                            <Text style={{fontSize: 16}}>Patient: &nbsp;
                                <FullName style={{fontSize: 20,}}>{this.state.patient.fullname}</FullName>
                            </Text>
                            <GrayText>Description: {description}</GrayText>
                            <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                <GrayText style={{fontSize: 16, marginTop: 8}}>Status: </GrayText>
                                <Badge color={(status && status === "done") ? "green" : "default"} style={{marginTop: 3}}>{status ? status : "planned"}</Badge>
                                <GrayText style={{fontSize: 16, marginTop: 8, marginLeft: 20}}>Time: </GrayText>
                                <Badge active={active} style={{marginTop: 3}}>{time}</Badge>
                            </View>
                            <View style={{flexDirection: 'row'}}>
                            {
                                price && (
                                    <View  style={{flexDirection: 'row', alignItems: 'center', marginTop: 5}} >
                                        <GrayText style={{fontSize: 16}}>Price: </GrayText>
                                        <Badge color={"green"} style={{margin: 2}}>{price}$</Badge>
                                    </View>
                                )
                            }
                            {
                                tooth && (
                                <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 3 , marginTop: 5, alignItems: 'center'}}>
                                    <GrayText style={{ marginLeft: 1,  marginLeft: 20}}>Tooth: </GrayText>
                                    <Badge color={"green"} style={{margin: 2, padding: 2,}}>
                                        <FontAwesome5 name="tooth" size={16} color="white" />
                                        &nbsp;&nbsp;
                                        <Text style={{fontSize: 14, alignSelf: 'center', paddingBottom: 10}}>{tooth}</Text>
                                    </Badge>
                                </View>
                                )
                            }
                            </View>
                        </View>
                    </Card.Content>
                </Card>
            );
        }

        return (
            <View>
                <ActivityIndicator
                    style={{
                    position: 'absolute',
                    right: 0,
                    left: 0,
                    top: '50%',
                    zIndex: 1
                    }}
                    size="large"
                    color="#b60608"
                    animating={this.state.loading}
                />
            </View>
        );
    }
};

const GrayText = styled.Text`
    font-size: 16px;
    color: #a09fa6;
`;

const FullName = styled.Text`
    font-weight: 600;
    font-size: 16px;
`;

export default Appointment;
