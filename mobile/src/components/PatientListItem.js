import React from "react";
import { View, ActivityIndicator, ScrollView } from "react-native";
import { GroupItem } from "./";
import styled from "styled-components/native";

class PatientListItem extends React.Component {
    constructor(props)
    {
        super(props);
    }

    render() {
        return (
            <GroupItem onPress={() => {this.props.navigation.navigate({name: "Patient", params: {patient: this.props.patient} })}}>
                <Avatar
                    source={{
                        uri: this.props.patient.picture,
                    }}
                />
                <View style={{ flex: 1 }}>
                    <FullName>{this.props.patient.fullname}</FullName>
                    <GrayText>{this.props.patient.phone}</GrayText>
                </View>
            </GroupItem>
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

const Avatar = styled.Image`
    border-radius: 50px;
    width: 40px;
    height: 40px;
    margin-right: 15px;
`;

export default PatientListItem;
