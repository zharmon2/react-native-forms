/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useRef, useState, useEffect} from 'react';

import {
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Dimensions,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import Form from "./RNForms/Form";
import Input from "./RNForms/Input";
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

const defaultInputs = {
  "0": "John",
  "1": "Doe",
  "2": "john_doe@fake_email.com",
  "3": "password",
  "4": 4,
  "5": 604951200000,
  "6": 1633219080000,
  "7": true,
  "8": "12706543210",
  "9": 2,
  "10": "Medium",
  "11": "",
  "12": "",
  "13": "",
  "14": "",
  "15": "No additional notes.",
  "16": 2
}

function App() {

  const [values, setValues] = useState(defaultInputs);
  const [key, setKey] = useState(0);
  

  const [deviceWidth, setDeviceWidth] = useState(Dimensions.get('window').width);

  useEffect(() => {
      const handleOrientationChange = () => {
          setDeviceWidth(Dimensions.get('window').width);
      };
  
      // Store the subscription object in a variable
      const subscription = Dimensions.addEventListener('change', handleOrientationChange);
  
      return () => {
          // Use the remove method on the subscription object to remove the event listener
          subscription.remove();
      };
  }, []);    

  return (    
    <Form
      onSubmit={() => {
        console.log(values);
        Alert.alert("Form Submitted", "Form has been submitted.");
      }}
      styles={{backgroundColor: "#f2f2f2", minHeight: "100%", paddingLeft: 5, paddingRight: 5}}
      submitBtnText="Submit Form"
      submitBtnStyle={{backgroundColor: "#2196F3", padding: 10, margin: 10, borderRadius: 5, width: "50%", alignSelf: "center"}}
      submitBtnTextStyle={{color: "white", textAlign: "center"}}
      submitBtnLocation="bottom"

      onRefresh={() => {
        // Unmount and remount the form.
        console.log("Refreshing form.");

        setValues(defaultInputs);
        setKey(key + 1);

      }}

      key={key}
    >

      <Text style={{textAlign: "center", fontSize: 20, fontWeight: "bold", margin: 10, color: "black"}}>Reservation Form</Text>

      <Text style={{textAlign: "center", fontSize: 15, fontWeight: "bold", margin: 10, color: "black"}}>General Information</Text>

      <Input 
        id={0}
        type="text" 
        placeholder="Enter..." 
        required={true} 
        maxLength={15} 

        label="First Name"
        labelStyles={{color: "black", flex: 1, textAlign: "left", padding: 5}}
        labelPosition="left"

        containerStyles={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}

        inputStyles={{flex:1, borderColor: "black", borderWidth: 1, borderRadius: 5, padding: 5, margin: 5, backgroundColor: "white"}}
        onEdit={(value) => {setValues({...values, 0: value})}}
        value={values[0]}
      />

      <Input id={1} type="text" placeholder="Enter..." 
        
        label="Last Name"
        labelStyles={{color: "black", flex: 1, textAlign: "left", padding: 5}}
        labelPosition="left"

        containerStyles={{alignItems: "center", justifyContent: "center"}}

        inputStyles={{flex:1, borderColor: "black", borderWidth: 1, borderRadius: 5, padding: 5, margin: 5, backgroundColor: "white"}}
        onEdit={(value) => {setValues({...values, 1: value})}}
        required={true}
        value={values[1]}
      />

      <Input 
        id={2}
        type="email" 
        placeholder="Enter..." 
        required={true} 

        label="Email"
        labelStyles={{color: "black", flex: 1, textAlign: "left", padding: 5}}
        labelPosition="left"

        containerStyles={{alignItems: "center", justifyContent: "center"}}

        inputStyles={{flex:1, borderColor: "black", borderWidth: 1, borderRadius: 5, padding: 5, margin: 5, backgroundColor: "white"}}
        onEdit={(value) => {setValues({...values, 2: value})}}
        value={values[2]}
      />

      <Input
        id={3}
        type="password"
        placeholder="Enter..."
        required={true}

        label="Password"
        labelStyles={{color: "black", flex: 1,  textAlign: "left", padding: 5}}
        labelPosition="left"

        containerStyles={{alignItems: "center", justifyContent: "center"}}

        inputStyles={{flex:1, borderColor: "black", borderWidth: 1, borderRadius: 5, padding: 5, margin: 5, backgroundColor: "white"}}
        onEdit={(value) => {setValues({...values, 3: value})}}
        value={values[3]}
      />

      <Input
        id={4}
        type="number"
        placeholder="Enter..."
        required={true}
        min={1}
        max={15}
        step={1}

        label="Number in party."
        labelStyles={{color: "black", flex: 1,  textAlign: "left", padding: 5}}
        labelPosition="left"

        containerStyles={{alignItems: "center", justifyContent: "center"}}

        inputStyles={{flex:1, borderColor: "black", borderWidth: 1, borderRadius: 5, padding: 5, margin: 5, backgroundColor: "white"}}
        onEdit={(value) => {setValues({...values, 4: value})}}
        value={values[4]}
      />

      <Input
        id={5}
        type="date"
        placeholder="Select..."
        required={false}

        label="Date of Birth"
        labelStyles={{color: "black", flex: 1,  textAlign: "left", padding: 5}}
        labelPosition="left"

        value={values[5]}
        containerStyles={{alignItems: "center", justifyContent: "center"}}

        inputStyles={{flex:1, borderColor: "black", borderWidth: 1, borderRadius: 5, padding: 5, margin: 5, backgroundColor: "white"}}
        onEdit={(value) => {setValues({...values, 5: value.getTime()})}}
      />

      <Input
        id={6}
        type="datetime"
        placeholder="Select..."
        required={true}
        value={values[6]}
        label="Reservation Date and Time"
        labelStyles={{color: "black", flex: 1,  textAlign: "left", padding: 5}}
        labelPosition="left"

        containerStyles={{alignItems: "center", justifyContent: "center"}}

        inputStyles={{flex:1, borderColor: "black", borderWidth: 1, borderRadius: 5, padding: 5, margin: 5, backgroundColor: "white"}}
        onEdit={(value) => {setValues({...values, 6: value.getTime()})}}
      />

      <Text style={{textAlign: "center", fontSize: 15, fontWeight: "bold", margin: 10, marginTop:20, color: "black"}}>Reminders Sign Up</Text>

      <Input
        id={7}
        type="checkbox"
        placeholder="Select..."
        required={false}

        label="Would you like to receive text reminders?"
        labelStyles={{color: "black", flex: 1,  textAlign: "left", padding: 5}}
        labelPosition="left"

        containerStyles={{alignItems: "center", justifyContent: "center"}}

        inputStyles={{height: 30, width:30, borderColor: "black", borderWidth: 1, borderRadius: 5, padding: 5, margin: 5, backgroundColor: "white"}}
        iconSize={20}
        onEdit={(value) => {setValues({...values, 7: value})}}
        value={values[7]}
      />

      <Input
        id={8}
        type="phone"
        placeholder="Select..."
        disabled={
          !Object.keys(values).includes("7") || values["7"] == false
        } 
        required={Object.keys(values).includes("7") && values["7"] == true}
        options={["option 1", "option 2", "option 3"]}

        label="Select an option"
        labelStyles={{color: "black", flex: 1,  textAlign: "left", padding: 5}}
        labelPosition="left"

        containerStyles={{alignItems: "center", justifyContent: "center"}}

        inputStyles={{flex:1, borderColor: "black", borderWidth: 1, borderRadius: 5, padding: 5, margin: 5, backgroundColor: "white"}}
        onEdit={(value) => {setValues({...values, 8: value})}}
        value={values[8]}
      />

      <Text style={{textAlign: "center", fontSize: 15, fontWeight: "bold", margin: 10, marginTop:20}}>Reservation Details</Text>

      <Input
        id={9}
        type="select"
        placeholder="Select..."
        options={[
          {value: 1, label: "Sirloin"}, 
          {value: 2, label: "Ribeye"}, 
          {value: 3, label: "Filet"},
        ]} 
        onEdit={(value) => {setValues({...values, 9: value})}}
        label="Select a steak"
        labelPosition="left"
        labelStyles={{color: "black", flex: 1,  textAlign: "left", padding: 5}}
        containerStyles={{alignItems: "center", justifyContent: "center"}}
        inputStyles={{flex:1, borderColor: "black", borderWidth: 1, borderRadius: 5, margin: 5, backgroundColor: "white", height: 55}}
        required={false}
        value = {values[9]}
      />

      <Input
        id={10}
        type="radio"
        placeholder="Select..."
        options={["Rare", "Medium Rare", "Medium", "Medium Well", "Well Done"]}
        onEdit={(value) => {setValues({...values, 10: value})}}
        label="Select a temperature"
        labelPosition="left"
        labelStyles={{color: "black", flex: 1,  textAlign: "left", padding: 5}}
        containerStyles={{alignItems: "center", justifyContent: "center"}}
        required={false}
        inputStyles={{flex:1, borderColor: "black", borderWidth: 1, borderRadius: 5, padding: 5, margin: 5, backgroundColor: "white", gap: 5}}
        radioOptionStyles={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderWidth: 0}}
        radioSize={20}
        value = {values[10]}
      />

      <Input
        id={11}
        type="file"
        placeholder="Select a file..."
        onEdit={(value) => {setValues({...values, 11: value})}}
        allowMultiSelection={false}
        required={false}
        labelPosition="left"
        label="Upload your reseravation confirmation."
        labelStyles={{color: "black", flex: 1,  textAlign: "left", padding: 5}}
        containerStyles={{alignItems: "center", justifyContent: "center"}}
        inputStyles={{flex:1, borderColor: "black", borderWidth: 1, borderRadius: 5, padding: 5, margin: 5, backgroundColor: "white"}}
      />

      <Input
        id={12}
        type="image"
        placeholder="Select an image..."
        onEdit={(value) => {setValues({...values, 12: value})}}
        allowMultiSelection={false}
        required={false}
        labelPosition="left"
        label="Upload a photo of your ID."
        labelStyles={{color: "black", flex: 1,  textAlign: "left", padding: 5}}
        containerStyles={{alignItems: "center", justifyContent: "center"}}
        inputStyles={{flex:1, borderColor: "black", borderWidth: 1, borderRadius: 5, padding: 5, margin: 5, backgroundColor: "white"}}
      />

      <Input
        id={13}
        type="video"
        placeholder="Select a video..."
        onEdit={(value) => {setValues({...values, 13: value})}}
        allowMultiSelection={false}
        required={false}
        labelPosition="left"
        label="Upload a video of your ID."
        labelStyles={{color: "black", flex: 1,  textAlign: "left", padding: 5}}
        containerStyles={{alignItems: "center", justifyContent: "center"}}
        inputStyles={{flex:1, borderColor: "black", borderWidth: 1, borderRadius: 5, padding: 5, margin: 5, backgroundColor: "white"}}
      />

      <Text style={{textAlign: "center", fontSize: 15, fontWeight: "bold", margin: 10, marginTop:20, color: "black"}}>Confirmation</Text>

      <Input
        id={14}
        type="audio"
        placeholder="Select an audio..."
        onEdit={(value) => {setValues({...values, 14: value})}}
        allowMultiSelection={false}
        required={false}
        labelPosition="left"
        label="Record youself saying the following phrase: 'I <insert name> am requesting a reservation at <insert restaurant> on <insert date> at <insert time>.'"
        labelStyles={{color: "black", flex: 1,  textAlign: "left", padding: 5}}
        containerStyles={{alignItems: "center", justifyContent: "center"}}
        inputStyles={{flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', backgroundColor: "white", borderWidth: 1, borderColor: "black", borderRadius: 5, padding: 5, margin: 5}}
      />

      <Input
        id={15}
        type="textarea"
        placeholder="Enter any additional information here..."
        required={false}
        maxLength={300}
        labelPosition="none"
        onEdit={(value) => {setValues({...values, 15: value})}}
        containerStyles={{marginTop: 10, marginBottom: 10}}
        inputStyles={{flex:1, borderColor: "black", borderWidth: 1, borderRadius: 5, padding: 5, margin: 5, backgroundColor: "white", maxHeight: 200}}
        value={values[15]}
      />

      <Input
        id={16}
        type="dropdown"
        placeholder="Select..."
        label="What state is the restaurant located in?"
        labelStyles={{color: "black", flex: 1,  textAlign: "left", padding: 5}}
        labelPosition="left"
        required={true}
        options={[
          {key: 1, value: "Kentucky"}, 
          {key: 2, value: "Tennessee"}, 
          {key: 3, value: "Indiana"},
        ]}
        onEdit={(value) => {
          setValues({...values, 16: value})
        }}
        inputStyles={{width:(deviceWidth/2-10), borderColor: "black", borderWidth: 1, borderRadius: 5, padding: 5, margin: 5, backgroundColor: "white"}}
        dropdownStyles={{flex:1, borderColor: "black", borderWidth: 1, borderRadius: 5, padding: 5, margin: 5, backgroundColor: "white"}}
        dropdownTextStyles={{flex:1, color: "black"}}
        value={values[16]}
      />
      
    </Form>
  );
}

export default App;
