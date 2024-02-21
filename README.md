# React Native Forms

A form builder for react-native with 15 different types of inputs. It was desined to be relatively modular to allow for dynamic form rendering.

### Dependencies
The following is a list of dependencies that must be installed before React Native Forms will work. Each item in the list links to the project's repository.

- [react-native-vector-icons](https://github.com/oblador/react-native-vector-icons)
- [react-native-date-picker](https://github.com/henninghall/react-native-date-picker)
- [react-native-picker/picker](https://github.com/react-native-picker/picker)
- [react-native-permissions](https://github.com/zoontek/react-native-permissions)
- [react-native-document-picker](https://github.com/rnmods/react-native-document-picker)
- [react-native-image-picker](https://github.com/react-native-image-picker/react-native-image-picker)
- [react-native-fs](https://github.com/itinance/react-native-fs)
- [react-native-audio-recorder-player](https://github.com/hyochan/react-native-audio-recorder-player)
- [react-native-phone-input](https://github.com/rili-live/react-native-phone-input)

## Usage

### Form
The `<Form />` element is the main container for this project. A form can contain any children since it is just an abstraction of a scrollview with a button and the input validation functionality.

#### Props
| Prop | Description | Type | Default |
|-------|-------------|-----|-------|
| onSubmit | A function that handles the form's submit action after validation. | function | none |
| scrollable | Whether the form should be a scrollable view or not. | bool | true |
| submitBtnLocation | The location of the submit button (top, bottom, or none) | string | top |
| submitBtnStyle | The style of the submit button. | object | |
| submitBtnTextStyle | The style of the submit button text. | object | |
| submitBtnText | The text for the submit button. | string |Submit |
| styles | The style for the form. | object | |

### Input

The `<Input />` element is the main abstraction for an input field on a form. There are 15 different types of inputs, each with their own behaviors and special props.

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
| select | A dropdown select list |
| audio | An audio recorder |
| image | An image picker |
| video | A video picker |

#### Props
| prop | description | type |
| ---- | ------------ | ---- |
| type | The input type | string |
| id | The id of the input | any |
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

## Example

Here is an example that uses each input type, some styles and props, requires some fields, and has a dependent question. It also has a Form title and section headers.

```
function App() {

  const [values, setValues] = useState({});

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
      />

      <Input id={1} type="text" placeholder="Enter..." 
         
         label="Last Name"
         labelStyles={{color: "black", flex: 1, textAlign: "center"}}
         labelPosition="left"

         containerStyles={{alignItems: "center", justifyContent: "center"}}

         inputStyles={{flex:1, borderColor: "black", borderWidth: 1, borderRadius: 5, padding: 5, margin: 5, backgroundColor: "white"}}
         onEdit={(value) => {setValues({...values, 1: value})}}
         required={true}
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
      />

      <Input
         id={5}
         type="date"
         placeholder="Select..."
         required={false}

         label="Date of Birth"
         labelStyles={{color: "black", flex: 1, textAlign: "center"}}
         labelPosition="left"

         containerStyles={{alignItems: "center", justifyContent: "center"}}

         inputStyles={{flex:1, borderColor: "black", borderWidth: 1, borderRadius: 5, padding: 5, margin: 5, backgroundColor: "white"}}
         onEdit={(value) => {setValues({...values, 5: value})}}
      />

      <Input
         id={6}
         type="datetime"
         placeholder="Select..."
         required={true}

         label="Reservation Date and Time"
         labelStyles={{color: "black", flex: 1, textAlign: "center"}}
         labelPosition="left"

         containerStyles={{alignItems: "center", justifyContent: "center"}}

         inputStyles={{flex:1, borderColor: "black", borderWidth: 1, borderRadius: 5, padding: 5, margin: 5, backgroundColor: "white"}}
         onEdit={(value) => {setValues({...values, 6: value})}}
      />

      <Text style={{textAlign: "center", fontSize: 15, fontWeight: "bold", margin: 10, marginTop:20}}>Reminders Sign Up</Text>

      <Input
         id={7}
         type="checkbox"
         placeholder="Select..."
         required={false}

         label="Would you like to recieve text reminders?"
         labelStyles={{color: "black", flex: 1, textAlign: "center"}}
         labelPosition="left"

         containerStyles={{alignItems: "center", justifyContent: "center"}}

         inputStyles={{height: 30, width:30, borderColor: "black", borderWidth: 1, borderRadius: 5, padding: 5, margin: 5, backgroundColor: "white"}}
         iconSize={20}
         onEdit={(value) => {setValues({...values, 7: value})}}
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
      />
      
   </Form>
  );
}
```