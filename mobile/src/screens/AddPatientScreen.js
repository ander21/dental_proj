import React, { Component, useState } from "react";
import { Alert, Text, TouchableOpacity, KeyboardAvoidingView, TouchableWithoutFeedback } from "react-native";
import { Item, Label } from "native-base";
import styled from "styled-components";
import TextInputMask from 'react-native-text-input-mask';
import { addPatient } from '../utils/endPoints';
import { Button, Container } from "../components";
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { TextInput } from "react-native-paper";
import Icon from 'react-native-vector-icons/Ionicons';
import qs from 'qs';
import axios from 'axios';

class AddPatientScreen extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            phone: '',
            fullname: '',
            fileUri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTd14Txv031zmnOdB79hQpF03Vih_bR3e3ccvgiRQWe-_UUkV1cBMychdcfU1602SpaDe4&usqp=CAU",
            fileBase64: '',
            fileName: ''
        };
    }

    cameraOptions = {
        title: 'Select Avatar',
        mediaType: "photo",
        maxWidth: 100,
        maxHeight: 100,
        includeBase64: true,
        storageOptions: {
            skipBackup: true,
            path: 'images',
        }
    }

    launchGalleryCallback = (e) =>
    {
        const image = e.assets ? e.assets[0] : null;
        if(!image)
            return;

        this.setState({fileBase64: image.base64, fileUri: image.uri, fileName: image.fileName});
    }

    onSubmit = (e) =>
    {
        if(!this.validateFields())
        {
            Alert.alert("ERROR! All fields should be inputed.");
            return;
        }
        let data = qs.stringify({
            fullname:       this.state.fullname,
            phone:          this.state.phone,
            file: {
                fileUri:    this.state.fileUri,
                fileBase64: this.state.fileBase64,
                fileName:   this.state.fileName
            }
        });
        axios({
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            data: data,
            url: addPatient
        })
        .then(() => {
            console.log("added");
            this.props.navigation.navigate("Home", {screen: "Patients", params: { updated: true }});
        })
        .catch(e => {
            console.log(e);
        });
    }

    validateFields = (fields_to_ignore = ["fileBase64", "fileName"]) =>
    {
        for(let key in this.state)
        {
            if(fields_to_ignore.includes(key))
                continue;

            if(!this.state[key].length)
                return false;
        }

        return true;
    }

    renderFileUri() {
        if (this.state.fileUri)
        {
            return <Avatar
                source={{ uri: this.state.fileUri }}
            />
        } else {
            return <Avatar
                source={{ uri: 'http://placehold.it/100x100' }}
            />
        }
    }

    render()
    {
        return (
            <Container>
                {this.renderFileUri()}
                <ImageGalleryOpacity onPress={() => launchImageLibrary(this.cameraOptions, this.launchGalleryCallback)}>
                    <Icon style={{alignSelf: 'center'}} name="ios-add" size={36} color="white" />
                </ImageGalleryOpacity>
            <Item style={{ marginLeft: 0 }}>
                <TextInput
                    onChangeText={text => this.setState({fullname: text})}
                    value={this.state.fullname}
                    style={{ marginTop: 12, flex: 1 }}
                    placeholder="Fullname"
                />
            </Item>
            <Item style={{ marginTop: 20, marginLeft: 0 }}>
                <TextInput
                    placeholder="Phone"
                    value={this.state.phone}
                    style={{ marginTop: 12, flex: 1 }}
                    render={props =>
                        <TextInputMask
                            {...props}
                            mask="+[00] ([000]) [000] [0000]"
                            onChangeText={text => this.setState({phone: text}) }
                        />
                    }
                    keyboardType="numeric"
                />
            </Item>
            <ButtonView>
                <Button onPress={this.onSubmit} color="#87CC6F">
                <Text>Add</Text>
                </Button>
            </ButtonView>
            </Container>
        );
    }
};

const ButtonView = styled.View`
    flex: 1;
    margin-top: 30px;
`;

const Avatar = styled.Image`
    border-radius: 50px;
    align-self: center;
    width: 100px;
    height: 100px;
`;

const ImageGalleryOpacity = styled.TouchableOpacity`
    border-radius: 15px;
    width: 40px;
    height: 40px;
    align-self: center;
    background-color: #3EA3D8;
    margin-top: 5px;
    opacity: 0.5;
`;

export default AddPatientScreen;
