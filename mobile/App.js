import React from 'react';
import { HomeScreen, AppointmentsScreen, PatientScreen, AddPatientScreen, AddAppointmentScreen, AppointmentScreen, FinishAppointmentScreen } from './src/screens';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PatientsScreen from './src/screens/PatientsScreen';

const Stack = createStackNavigator();

const HeaderColor = '#E2E2E4';
const headerStyle = {
  elevation: 0.8,
  shadowOpacity: 0.8,
  backgroundColor: '#53585F'
};

const App = () => {
  return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{headerTintColor: HeaderColor, headerStyle: headerStyle, title: 'Dental administration'}}
        />
        <Stack.Screen
          name="Patient"
          component={PatientScreen}
          options={({ route }) => ({
            title: 'Patient card',
            headerTintColor: HeaderColor,
            headerStyle: headerStyle,
          })}
        />
        <Stack.Screen
          name="AddPatient"
          component={AddPatientScreen}
          options={{headerTintColor: HeaderColor, headerStyle: headerStyle, title: 'Add Patient'}}
        />
        <Stack.Screen
          name="AddAppointment"
          component={AddAppointmentScreen}
          options={{headerTintColor: HeaderColor, headerStyle: headerStyle, title: 'Add Appointment'}}
        />
          <Stack.Screen
          name="FinishAppointment"
          component={FinishAppointmentScreen}
          options={{headerTintColor: HeaderColor, headerStyle: headerStyle, title: 'Finish Appointment'}}
        />
      <Stack.Screen
          name="Appointment"
          component={AppointmentScreen}
          options={{headerTintColor: HeaderColor, headerStyle: headerStyle, title: 'Appointment'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;