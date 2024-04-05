# React Native Simple Forms

A form builder for react-native with 16 different input types. It was designed  to be relatively modular to make dynamic form rendering simpler to code as well as abstracting the form's validation. Below is the example code running on an Android emulator.

<img src="./example/example.gif" alt="Example Code Running on Android Device" height="700">

## Table of Contents
- [Installation](#installation)
- [Dependencies](#peer-dependencies)
- [Usage](#usage)
  - [Form](#form)
  - [Input](#input)
- Examples
  - [Basic Usage](#basic-usage)
  - [Simple Example](#simple-example)
  - [Large Example](#large-example)

## Installation 
Run the following command to install the package:
```
npm install react-native-simple-forms
```

Then, ensure you install and setup each of the [peer dependencies](#peer-dependencies) below.

## Peer Dependencies
The following is a list of dependencies that must be installed before React Native Forms will work. Each item in the list links to the project's repository.
Yes, this is a lot of dependencies, but this package is meant to be a wrapper that simplifies the coding experience for a form with these inputs.

- [react-native-vector-icons](https://github.com/oblador/react-native-vector-icons)
- [react-native-date-picker](https://github.com/henninghall/react-native-date-picker)
- [react-native-picker/picker](https://github.com/react-native-picker/picker)
- [react-native-permissions](https://github.com/zoontek/react-native-permissions)
- [react-native-document-picker](https://github.com/rnmods/react-native-document-picker)
- [react-native-image-picker](https://github.com/react-native-image-picker/react-native-image-picker)
- [react-native-fs](https://github.com/itinance/react-native-fs)
- [react-native-audio-recorder-player](https://github.com/hyochan/react-native-audio-recorder-player)
- [react-native-phone-input](https://github.com/rili-live/react-native-phone-input)
- [react-native-dropdown-select-list](https://github.com/danish1658/react-native-dropdown-select-list)

## Usage

### Form
The `<Form />` element is the main container for this project. A form can contain any children since it is just an abstraction of a scrollview/view with a button and the input validation functionality.

#### Props
| Prop | Description | Type | Default |
|-------|-------------|-----|-------|
| onSubmit | A function that handles the form's submit action after validation. | function | none |
| onRefresh | A function that is called when a scrollable form is pulled down/refreshed. | function | none |
| scrollable | Whether the form should be a scrollable view or not. | bool | true |
| submitBtnLocation | The location of the submit button (top, bottom, or none) | string | top |
| submitBtnStyle | The style of the submit button. | object | |
| submitBtnTextStyle | The style of the submit button text. | object | |
| submitBtnText | The text for the submit button. | string |Submit |
| styles | The style for the form. | object | |

### Input

The `<Input />` element is the main abstraction for an input field on a form. There are 16 different input types, each with their own behaviors and special props. Some props have multiple uses depending on the input type. See the full example [below](#large-example) or in the `example` folder to see how some of these props work. An input field is given a `yellow` border if the input is marked as required and contains no value and a `red` border if the input's value does not meet the validation requirements (Ex: a number input with a value of 2.3 when the step is set to 1). 

#### Inputs
| type | description |
|-------|---------------|
| checkbox | A check box |
| date | A date picker |
| datetime | A datetime picker |
| email | An email input |
| file | A file picker |
| number | A number input |
| password | A password input |
| radio | A radio button input field |
| phone | A phone number |
| text | A text input |
| textarea | A multiline text input |
| select | A modal select list |
| dropdown | A dropdown select list |
| audio | An audio recorder |
| image | An image picker |
| video | A video picker |
| signature | A signature input |

#### Props
| prop | description | type |
| ---- | ------------ | ---- |
| type | The input type | string |
| id | The id of the input | any |
| value | The default value of an input | any |
| required | Whether or not the field is required | bool |
| disabled | Whether or not the input is disabled | bool |
| containerStyles | The styles for the overall input container | object |
| labelPosition | Where the label for the input should be (top, bottom, left, right) | string |
| label | The label for an input field | string |
| labelStyles | The styles for a label | object |
| onEdit | The function called upon the change in an input | function |
| placeholder | The placeholder for an input | string |
| inputStyles | The styles for an input field | object |
| maxLength | The maximum length for an input | int |
| step | The step up for numerical inputs | number |
| min | The min for a numerical input | number |
| max | The max for a numerical input | number |
| iconSize | The size of an input icon | int |
| checkedColor | The color of a checked box or filled radio button | string |
| options | The list of values (radio) or key-value pairs (select) for an input | list or object |
| radioOptionStyles | The styles for a radio option | object |
| radioSize | The size of a radio button | int |
| radioStyles | The styles for a radio button | object |
| allowMultiSelection | Whether or not multiple files/images/videos can be selected | bool |
| maxHeight | The max height of an imported image/video for resizing | int |
| maxWidth | The max width of an imported image/video for resizing | int |
| playColor | The color of the play audio button | string |
| recordingColor | The color of the record audio button | string |
| recordingLayoutStyles | The styles for the buttons and texts for audio inputs | object |
| recordingTextLayoutStyles | The styles for the container for text on audio inputs | object |
| recordingTextStyles | The styles for the text on audio inputs | object |
| inputTextStyles | The text style for inputs on the phone input | object |
| dropdownStyles | The style for the dropdown box input | object |
| dropdownItemStyles | The style for the items in the drowpdown input | object |
| dropdownTextStyles | The style for the text of a dropdown input | object | 
| sigStyles | The webview styles for a signature | css string |
| sigContainStyles | The styles for the signature element | object |

## Basic Usage

```
import {Form, Input} from 'react-native-simple-forms';

render(){
  return(
    <Form>
      <Input type="text" />
    </Form>
  )
}

```

## Simple Example

```
<Form
  onSubmit={() => {
    console.log(values);
    Alert.alert("Form Submitted", "Form has been submitted.");
  }}

  submitBtnLocation="bottom"
>
  <Text>Example Form Title</Text>

  <Input 
    id={0}
    type="text" 
    placeholder="Username" 
    required={true} 

    labelPosition="none"

    onEdit={(value) => {console.log(value)}}
  />

  <Input 
    id={1}
    type="password" 
    placeholder="Password" 
    required={true} 

    labelPosition="none"

    onEdit={(value) => {console.log(value)}}
  />

  <Input
    id={2}
    type="checkbox"
    required={false}

    label="Remember Me"
    labelPosition="left"

    onEdit={(value) => {console.log(value)}}

    value={true}
  />

</Form>

```

## Large Example

Here is a large example that uses each input type, some styles and props, requires some fields, and has a dependent question. It also has a Form title and section headers. This example can be found in full in the `examples` folder.

```
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
      styles={{backgroundColor: "grey", minHeight: "100%", paddingLeft: 5, paddingRight: 5}}
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

      <Text style={{textAlign: "center", fontSize: 20, fontWeight: "bold", margin: 10}}>Reservation Form</Text>

      <Text style={{textAlign: "center", fontSize: 15, fontWeight: "bold", margin: 10}}>General Information</Text>

      <Input 
        id={0}
        type="text" 
        placeholder="Enter..." 
        required={true} 
        maxLength={15} 

        label="First Name"
        labelStyles={{color: "black", flex: 1, textAlign: "center"}}
        labelPosition="left"

        containerStyles={{alignItems: "center", justifyContent: "center"}}

        inputStyles={{flex:1, borderColor: "black", borderWidth: 1, borderRadius: 5, padding: 5, margin: 5, backgroundColor: "white"}}
        onEdit={(value) => {setValues({...values, 0: value})}}
        value={values[0]}
      />

      <Input id={1} type="text" placeholder="Enter..." 
        
        label="Last Name"
        labelStyles={{color: "black", flex: 1, textAlign: "center"}}
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
        labelStyles={{color: "black", flex: 1, textAlign: "center"}}
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
        labelStyles={{color: "black", flex: 1, textAlign: "center"}}
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
        labelStyles={{color: "black", flex: 1, textAlign: "center"}}
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
        labelStyles={{color: "black", flex: 1, textAlign: "center"}}
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
        labelStyles={{color: "black", flex: 1, textAlign: "center"}}
        labelPosition="left"

        containerStyles={{alignItems: "center", justifyContent: "center"}}

        inputStyles={{flex:1, borderColor: "black", borderWidth: 1, borderRadius: 5, padding: 5, margin: 5, backgroundColor: "white"}}
        onEdit={(value) => {setValues({...values, 6: value.getTime()})}}
      />

      <Text style={{textAlign: "center", fontSize: 15, fontWeight: "bold", margin: 10, marginTop:20}}>Reminders Sign Up</Text>

      <Input
        id={7}
        type="checkbox"
        placeholder="Select..."
        required={false}

        label="Would you like to receive text reminders?"
        labelStyles={{color: "black", flex: 1, textAlign: "center"}}
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
        labelStyles={{color: "black", flex: 1, textAlign: "center"}}
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
        labelStyles={{color: "black", flex: 1, textAlign: "center"}}
        containerStyles={{alignItems: "center", justifyContent: "center"}}
        pickerStyles={{flex:1, borderColor: "black", borderWidth: 1, borderRadius: 5, padding: 5, margin: 5, backgroundColor: "white", height: 30}}
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
        labelStyles={{color: "black", flex: 1, textAlign: "center"}}
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
        labelStyles={{color: "black", flex: 1, textAlign: "center"}}
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
        labelStyles={{color: "black", flex: 1, textAlign: "center"}}
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
        labelStyles={{color: "black", flex: 1, textAlign: "center"}}
        containerStyles={{alignItems: "center", justifyContent: "center"}}
        inputStyles={{flex:1, borderColor: "black", borderWidth: 1, borderRadius: 5, padding: 5, margin: 5, backgroundColor: "white"}}
      />

      <Text style={{textAlign: "center", fontSize: 15, fontWeight: "bold", margin: 10, marginTop:20}}>Confirmation</Text>

      <Input
        id={14}
        type="audio"
        placeholder="Select an audio..."
        onEdit={(value) => {setValues({...values, 14: value})}}
        allowMultiSelection={false}
        required={false}
        labelPosition="left"
        label="Record youself saying the following phrase: 'I <insert name> am requesting a reservation at <insert restaurant> on <insert date> at <insert time>.'"
        labelStyles={{color: "black", flex: 1, textAlign: "center"}}
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
        inputStyles={{flex:1, borderColor: "black", borderWidth: 1, borderRadius: 5, padding: 5, margin: 5, backgroundColor: "white", maxHeight: 200}}
        value={values[15]}
      />

      <Input
        id={16}
        type="dropdown"
        placeholder="Select..."
        label="What state is the restaurant located in?"
        labelStyles={{color: "black", flex: 1, textAlign: "center"}}
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
```
