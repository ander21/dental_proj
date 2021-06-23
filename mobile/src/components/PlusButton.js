import React from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Ionicons';

const PlusButton = ({onPress}) => {
    return (
        <Circle onPress={onPress}>
            <Icon name="ios-add" size={36} color="white" />
        </Circle>
    );
};

const Circle = styled.TouchableOpacity`
    align-items: center;
    justify-content: center;
    border-radius: 50px;
    width: 64px;
    height: 64px;
    background: #2a86ff;
    position: absolute;
    right: 25px;
    bottom: 25px;
`;

export default PlusButton;