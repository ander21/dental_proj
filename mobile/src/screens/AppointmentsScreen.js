import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import { SectionList, ActivityIndicator, View, Text } from 'react-native';
import axios from 'axios';
import { PlusButton } from '../components';
import { Appointment, SectionTitle } from '../components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {getAppointments} from '../utils/endPoints';
import Swipeable from 'react-native-swipeable-row';
import { SwipeListView } from 'react-native-swipe-list-view';
import {Picker} from '@react-native-picker/picker';

const AppointmentsScreen = (props) =>
{
    const { navigation } = props;
    const [appointments, setAppointments] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState('');

    fetchAppointments = () =>
    {
        console.log("fetch"); 
        axios({
            method: 'GET',
            url: getAppointments,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        })
        .then(res => {
            if (res.status === 200) {
                const sorted = res.data.appointments.sort((item_1, item_2) => {
                    const date_now = new Date().getTime();
                    if((item_1.data[0].date_ms - date_now) > (item_2.data[0].date_ms - date_now))
                        return 1;
                    else if((item_2.data[0].date_ms - date_now) > (item_1.data[0].date_ms - date_now))
                        return -1;
                    else
                        return 0;
                });
                setAppointments(sorted);
            }
        })
        .catch(err => {
            console.log("error: ", err);
            setErrors(err);
        })
        .finally(e => {
            setIsLoading(false);
        });
    }

    useEffect(fetchAppointments, []);
    useEffect(fetchAppointments, [props.route.params]);

    return (
        <Container>
            {isLoading && (
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
                    animating={isLoading}
                />
            )}
            {appointments.length == 0 && (
                <View style={{alignItems: "center"}}>
                    <Text>{errors}</Text>
                </View>
            )}
                <SectionList
                    sections={appointments}
                    keyExtractor={(item, index) => index}
                    renderItem={ ({ item }) => (
                        <Appointment key={item._id} item={item} navigation={navigation}/>
                    )}
                    renderSectionHeader={({ section: { title } }) => (
                        <SectionTitle>{title}</SectionTitle>
                )}
                />
            <PlusButton onPress={() => navigation.navigate('AddAppointment')} />
        </Container>
    );
}

const Container = styled.View`
    flex: 1;
    margin-top: 2%;
`;

const SwipeViewButton = styled.TouchableOpacity`
    width: 75px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export default AppointmentsScreen;