import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import { SectionList, ActivityIndicator, View, Text, ScrollView } from 'react-native';
import axios from 'axios';
import { PlusButton, PatientListItem } from '../components';
import { SectionTitle } from '../components';
import {getPatients} from '../utils/endPoints';

const PatientsScreen = (props) =>
{
    const { navigation } = props;
    const [patients, setPatients] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errors, setErrors] = useState('');

    const fetchPatients = () =>
    {
        console.log("fetch");
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
                setPatients(res.data.patients);
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

    useEffect(fetchPatients, []);
    useEffect(fetchPatients, [props.route.params]);

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
            {patients.length == 0 && (
                <View style={{alignItems: "center"}}>
                    <Text>{errors}</Text>
                </View>
            )}
            <ScrollView>
                {
                    patients.map((patient, index) => <PatientListItem key={index} patient={patient} navigation={navigation}/>)
                }
            </ScrollView>

            <PlusButton onPress={() => navigation.navigate('AddPatient')} />
        </Container>
    );
}

const Container = styled.View`
    flex: 1;
    margin-top: 2%;
`;

export default PatientsScreen;