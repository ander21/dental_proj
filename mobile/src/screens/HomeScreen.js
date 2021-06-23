import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PatientsScreen from './PatientsScreen';
import AppointmentsScreen from "./AppointmentsScreen";
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
const Tab = createBottomTabNavigator();

class HomeScreen extends React.Component {
    constructor(props)
    {
        super(props);
    }

    componentDidMount() {
    }
    render()
    {
        return (
            <Tab.Navigator
                swipeEnabled={false}
                initialRouteName='Appointments'
                tabBarOptions={{
                activeTintColor: '#2B86FF',
                inactiveTintColor: '#6b6b6b',
                labelStyle: {
                    textTransform: 'capitalize',
                    width: 120,
                    fontSize: 12,
                    // margin: 0,
                    marginBottom: 2,
                    marginTop: 0
                },
                style: {
                    backgroundColor: '#ffff',
                },
            }}>
                <Tab.Screen
                    name="Appointments"
                    component={AppointmentsScreen}
                    options={{
                        tabBarLabel: 'Appointments',
                        tabBarIcon: ({focused, size}) => {
                            let color;
                            if(focused)
                                color = '#2B86FF';
                            else
                                color = '#6b6b6b';

                            return <MaterialCommunityIcon name="clipboard-list-outline" color={color} size={20}/>
                        },
                    }}
                    initialParams={(route) => updated = route.params.updated}
                />
                <Tab.Screen
                    name="Patients"
                    component={PatientsScreen}
                    options={{
                        tabBarLabel: 'Patients',
                        tabBarIcon: ({focused, size}) => {
                            let color;
                            if(focused)
                                color = '#2B86FF';
                            else
                                color = '#6b6b6b';

                            return <MaterialCommunityIcon name="account-group-outline" color={color} size={20}/>
                        },
                    }}
                    initialParams={(route) => updated = route.params.updated}
                />
            </Tab.Navigator>
        );
    }
};

export default HomeScreen;