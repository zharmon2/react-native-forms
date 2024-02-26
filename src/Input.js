import React, {useRef} from "react";

import { 
    TextInput, View, Text, Keyboard, TouchableOpacity, Platform
 } from "react-native";

import DatePicker from 'react-native-date-picker'
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Picker} from '@react-native-picker/picker';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import DocumentPicker, {
    DirectoryPickerResponse,
    DocumentPickerResponse,
    isCancel,
    isInProgress,
    types,
  } from 'react-native-document-picker'

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import RNFS from 'react-native-fs';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import PhoneInput from 'react-native-phone-input'
import { SelectList } from 'react-native-dropdown-select-list'

/*
    This is an Input component that will conditionally render an input based on the type prop.
    It will also have a style prop that will be passed to the input.
*/

class Input extends React.Component {

    state = {
        hasError: false,
        hasRequiredError: this.props.required && !this.props.value ? this.props.required : false,
        placeholder: this.props.value?this.props.value:this.props.placeholder?this.props.placeholder:"",
        checkboxChecked: this.props.value?this.props.value:this.props.checked?this.props.checked:false,
        radioSelection: this.props.value?this.props.value:-1,
        selectedValue: this.props.value?this.props.value:this.props.options?this.props.options[0]:"",
        listOptions: [],
        listValues: {},
        isRecording: false,
        recordingDuration: formatDuration(0),
        playTime: formatDuration(0),
        duration: formatDuration(0),
        isPlaying: false,
        recordPath: '',
        audioRecorderPlayer: this.props.type === "audio"?new AudioRecorderPlayer():null,
        phoneNumber: this.props.value?this.props.value:"",
        disabled: this.props.disabled?this.props.disabled:false,
    }

    render() {

        this.setParentFormHasErrors(this.state.hasError || this.state.hasRequiredError)

        if(this.props.labelPosition === "bottom") {
            return (
                <View
                    style={
                        this.props.disabled?
                        {
                            ...this.props.containerStyles,
                            opacity: 0.7,
                            borderColor: "lightgrey",
                            backgroundColor: "lightgrey",
                            borderWidth: 1,
                            borderRadius: 5
                        }:
                        this.props.containerStyles?
                        this.props.containerStyles:
                        {}}
                    pointerEvents={this.props.disabled?"none":"auto"}
                >
                    {this.getInput()}
                    <Text
                        style={this.props.labelStyles?this.props.labelStyles:{}}
                    >
                        {this.props.label?this.props.label:""}
                    </Text>
                </View>
            );
        }
        else if(this.props.labelPosition === "left") {
            return (
                <View
                    style={
                        this.props.containerStyles?
                        this.props.disabled?
                        {
                            ...this.props.containerStyles,
                            display: "flex",
                            flexDirection: "row",
                            opacity: 0.7,
                            borderColor: "lightgrey",
                            backgroundColor: "lightgrey",
                            borderWidth: 1,
                            borderRadius: 5
                        } :
                        {
                            ...this.props.containerStyles,
                            display: "flex",
                            flexDirection: "row",
                        } :
                        this.props.disabled?
                        {
                            ...this.props.containerStyles,
                            display: "flex",
                            flexDirection: "row",
                            opacity: 0.7,
                            borderColor: "lightgrey",
                            backgroundColor: "lightgrey",
                            borderWidth: 1,
                            borderRadius: 5
                        } :
                        {
                            display: "flex",
                            flexDirection: "row",
                        }
                    }
                    pointerEvents={this.props.disabled?"none":"auto"}
                >
                    <Text
                        style={this.props.labelStyles?this.props.labelStyles:{}}
                    >
                        {this.props.label?this.props.label:""}
                    </Text>
                    {this.getInput()}
                </View>
            );
        }
        else if(this.props.labelPosition === "right") {
            return (
                <View
                    style={
                        this.props.containerStyles?
                        this.props.disabled?
                        {
                            ...this.props.containerStyles,
                            display: "flex",
                            flexDirection: "row",
                            opacity: 0.7,
                            borderColor: "lightgrey",
                            backgroundColor: "lightgrey",
                            borderWidth: 1,
                            borderRadius: 5
                        } :
                        {
                            ...this.props.containerStyles,
                            display: "flex",
                            flexDirection: "row",
                        } :
                        this.props.disabled?
                        {
                            display: "flex",
                            flexDirection: "row",
                            opacity: 0.7,
                            borderColor: "lightgrey",
                            backgroundColor: "lightgrey",
                            borderWidth: 1,
                            borderRadius: 5
                        } :
                        {
                            display: "flex",
                            flexDirection: "row",
                        }
                    }
                    pointerEvents={this.props.disabled?"none":"auto"}
                >
                    {this.getInput()}
                    <Text
                        style={this.props.labelStyles?this.props.labelStyles:{}}
                    >
                        {this.props.label?this.props.label:""}
                    </Text>
                </View>
            );
        }
        else if(this.props.labelPosition === "none") {
            return (
                <View
                    style={
                        this.props.disabled?
                        {
                            ...this.props.containerStyles,
                            opacity: 0.7,
                            borderColor: "lightgrey",
                            backgroundColor: "lightgrey",
                            borderWidth: 1,
                            borderRadius: 5
                        }:
                        this.props.containerStyles?
                        this.props.containerStyles:
                        {}}
                    pointerEvents={this.props.disabled?"none":"auto"}
                >
                    {this.getInput()}
                </View>
            );
        }
        else {
            return (
                <View
                    style={
                        this.props.disabled?
                        {
                            ...this.props.containerStyles,
                            opacity: 0.7,
                            borderColor: "lightgrey",
                            backgroundColor: "lightgrey",
                            borderWidth: 1,
                            borderRadius: 5
                        }:
                        this.props.containerStyles?
                        this.props.containerStyles:
                        {}}
                    pointerEvents={this.props.disabled?"none":"auto"}
                >
                    <Text
                        style={this.props.labelStyles?this.props.labelStyles:{}}
                    >
                        {this.props.label?this.props.label:""}
                    </Text>
                    {this.getInput()}
                </View>
            );
        }
    }

    setParentFormHasErrors = (val) => {
        if(this.props.parentFormRef) {
            let currentFormHasErrors = this.props.parentFormRef.state.formHasErrors;
            if(val) {
                currentFormHasErrors[this.props.id] = true; 
            }
            else {
                currentFormHasErrors[this.props.id] = false;
            }
        }
    }

    submitParentForm = () => {
        //console.log("Submitting parent form.");
        if(this.props.parentFormRef) {
            this.props.parentFormRef.onSubmit();
        }
    }

    clearErrors = () => {
        this.setState({hasError: false, hasRequiredError: false});
        this.setParentFormHasErrors(false);
    }

    getValues = () => {
        return this.state.listValues;
    }

    onStartRecord = async () => {
        let fileName = this.props.fileName?this.props.fileName:"audio-"+this.props.id+".m4a";

        const path = `${RNFS.DocumentDirectoryPath}/${fileName}`;

        const result = await this.state.audioRecorderPlayer.startRecorder(path);
        this.state.audioRecorderPlayer.addRecordBackListener((e) => {
            // Update state or UI with recording progress
            const duration = formatDuration(Math.floor(e.currentPosition));
            this.setState({recordingDuration: duration});
            return;
        });

        this.setState({recordPath: path, isRecording: true});
    }

    onStopRecord = async () => {
        const result = await this.state.audioRecorderPlayer.stopRecorder();
        this.state.audioRecorderPlayer.removeRecordBackListener();
        this.setState({isRecording: false});

        this.props.onEdit?this.props.onEdit(this.state.recordPath):null;
        this.setState({hasRequiredError: false});
        this.setParentFormHasErrors(false);
    }

    onStartPlay = async () => {
        if(this.state.isPlaying || this.state.isRecording) {
            return;
        }
        const msg = await this.state.audioRecorderPlayer.startPlayer(this.state.recordPath);
        this.state.audioRecorderPlayer.addPlayBackListener((e) => {
            const duration = formatDuration(Math.floor(e.duration));
            const playTime = formatDuration(Math.floor(e.currentPosition));
            this.setState({duration: duration, playTime: playTime});

            if(Math.abs(e.currentPosition - e.duration) < 100) {
                this.onStopPlay();
            }

            return;
        });
        this.setState({isPlaying: true});
    }

    onStopPlay = async () => {
        const result = await this.state.audioRecorderPlayer.stopPlayer();
        this.state.audioRecorderPlayer.removePlayBackListener();
        this.setState({isPlaying: false, playTime: formatDuration(0)});
    }

    deleteRecording = async () => {
        await this.onStopPlay();
        await this.onStopRecord();
        await RNFS.unlink(this.state.recordPath);
        this.setState({recordPath: ''});
    }

    componentDidMount() {
        if(this.props.type === "audio") {
            checkAndRequestMicrophonePermission();
        }
    }

    componentWillUnmount() {
        if(this.props.type === "audio" && this.state.recordPath !== ''){
            this.onStopRecord();
            this.onStopPlay();
            this.deleteRecording();
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.props.disabled !== prevProps.disabled) {
            this.setState({disabled: this.props.disabled});
            this.setState({hasError: false, hasRequiredError: false});
            this.setParentFormHasErrors(false);
        }
    }

    getInput() {

        if(this.props.type === "text") {
            return (
                <TextInput
                    style={
                        this.state.hasError ? 
                        {
                            ...this.props.inputStyles,
                            borderColor: "red",
                            borderStyle: "solid",
                            borderWidth: 1
                        } :
                        this.state.hasRequiredError ?
                        {
                            ...this.props.inputStyles,
                            borderColor: "yellow",
                            borderStyle: "solid",
                            borderWidth: 1
                        } :
                        this.props.inputStyles
                    }
                    placeholder={this.props.placeholder?this.props.placeholder:""}
                    onChangeText={(val)=>{

                        let error = false;

                        let required = this.props.required ? this.props.required : false;

                        if(required && val === "") {
                            this.setState({hasRequiredError: true});
                            this.setParentFormHasErrors(true);
                            error = true;
                        }

                        let maxLength = this.props.maxLength ? this.props.maxLength : Infinity;

                        if(val.length > maxLength) {
                            this.setState({hasError: true});
                            this.setParentFormHasErrors(true);
                            error = true;
                        }

                        if(!error) {

                            this.setState({hasError: false, hasRequiredError: false});
                            this.setParentFormHasErrors(false);
                        }

                        this.props.onEdit?this.props.onEdit(val):null;
                    }}
                    value={this.props.value?this.props.value:""}
                />
            );
        }
        else if(this.props.type === "password") {
            return (
                <TextInput
                    style={
                        this.state.hasError ? 
                        {
                            ...this.props.inputStyles,
                            borderColor: "red",
                            borderStyle: "solid",
                            borderWidth: 1
                        } :
                        this.state.hasRequiredError ?
                        {
                            ...this.props.inputStyles,
                            borderColor: "yellow",
                            borderStyle: "solid",
                            borderWidth: 1
                        } :
                        this.props.inputStyles
                    }
                    placeholder={this.props.placeholder?this.props.placeholder:""}
                    onChangeText={(val)=>{

                        let error = false;
                        let required = this.props.required ? this.props.required : false;

                        if(required && val === "") {
                            this.setState({hasRequiredError: true});
                            this.setParentFormHasErrors(true);
                            error = true;
                        }

                        if(!error) {
                            this.setState({hasError: false, hasRequiredError: false});
                            this.setParentFormHasErrors(false);
                        }

                        this.props.onEdit?this.props.onEdit(val):null;
                    }}
                    secureTextEntry={true}
                    value={this.props.value?this.props.value:""}
                />
            );
        }
        else if(this.props.type === "email") {
            return (
                <TextInput
                    style={
                        this.state.hasError ? 
                        {
                            ...this.props.inputStyles,
                            borderColor: "red",
                            borderStyle: "solid",
                            borderWidth: 1
                        } :
                        this.state.hasRequiredError ?
                        {
                            ...this.props.inputStyles,
                            borderColor: "yellow",
                            borderStyle: "solid",
                            borderWidth: 1
                        } :
                        this.props.inputStyles
                    }
                    placeholder={this.props.placeholder?this.props.placeholder:""}
                    onChangeText={(val)=>{

                        let error = false;
                        let required = this.props.required ? this.props.required : false;

                        if(required && val === "") {
                            this.setState({hasRequiredError: true});
                            this.setParentFormHasErrors(true);
                            error = true;
                        }

                        if(!val.includes("@") || !val.includes(".")) {
                            this.setState({hasError: true});
                            this.setParentFormHasErrors(true);
                           error = true;
                        }

                        if(!error) {
                            this.setState({hasError: false, hasRequiredError: false});
                            this.setParentFormHasErrors(false);
                        }

                        this.props.onEdit?this.props.onEdit(val):null;
                    }}
                    keyboardType="email-address"
                    value={this.props.value?this.props.value:""}
                />
            );
        }
        else if(this.props.type === "textarea") {
            return (
                <TextInput
                    style={
                        this.state.hasError ? 
                        {
                            ...this.props.inputStyles,
                            borderColor: "red",
                            borderStyle: "solid",
                            borderWidth: 1
                        } :
                        this.state.hasRequiredError ?
                        {
                            ...this.props.inputStyles,
                            borderColor: "yellow",
                            borderStyle: "solid",
                            borderWidth: 1
                        } :
                        this.props.inputStyles
                    }
                    placeholder={this.props.placeholder?this.props.placeholder:""}
                    onChangeText={(val)=>{

                        let error = false;

                        let required = this.props.required ? this.props.required : false;

                        if(required && val === "") {
                            this.setState({hasRequiredError: true});
                            this.setParentFormHasErrors(true);
                            error = true;
                        }

                        let maxLength = this.props.maxLength ? this.props.maxLength : Infinity;

                        if(val.length > maxLength) {
                            this.setState({hasError: true});
                            this.setParentFormHasErrors(true);
                            error = true;
                        }

                        if(!error) {
                            this.setState({hasError: false, hasRequiredError: false});
                            this.setParentFormHasErrors(false);
                        }   

                        this.props.onEdit?this.props.onEdit(val):null;
                    }}
                    multiline={true}
                    value={this.props.value?this.props.value:""}
                />
            );
        }
        else if(this.props.type === "number") {
            return (
                <TextInput
                    style={
                        this.state.hasError ? 
                        {
                            ...this.props.inputStyles,
                            borderColor: "red",
                            borderStyle: "solid",
                            borderWidth: 1
                        } :
                        this.state.hasRequiredError ?
                        {
                            ...this.props.inputStyles,
                            borderColor: "yellow",
                            borderStyle: "solid",
                            borderWidth: 1
                        } :
                        this.props.inputStyles
                    }
                    placeholder={this.props.placeholder?this.props.placeholder:""}
                    onChangeText={(val)=>{

                        let required = this.props.required ? this.props.required : false;

                        let error = false;

                        if(required && val === "") {
                            this.setState({hasRequiredError: true});
                            this.setParentFormHasErrors(true);
                            error = true;
                        }

                        val = parseFloat(val);

                        let step = this.props.step ? this.props.step : 0;

                        if(val % step !== 0) {
                            this.setState({hasError: true});
                            this.setParentFormHasErrors(true);
                            error = true;
                        }

                        let min = this.props.min ? this.props.min : -Infinity;
                        let max = this.props.max ? this.props.max : Infinity;

                        if(val < min || val > max) {
                            this.setState({hasError: true});
                            this.setParentFormHasErrors(true);
                            error = true;
                        }

                        if(!error) {
                            this.setState({hasError: false, hasRequiredError: false});
                            this.setParentFormHasErrors(false);
                        }

                        this.props.onEdit?this.props.onEdit(val):null;
            
                    }}
                    keyboardType="numeric"
                    value={this.props.value?this.props.value.toString():""}
                />
            );
        }
        else if(this.props.type === "datetime") {

            return (
                <TouchableOpacity
                    style={
                        this.state.hasError ? 
                        {
                            ...this.props.inputStyles,
                            borderColor: "red",
                            borderStyle: "solid",
                            borderWidth: 1
                        } :
                        this.state.hasRequiredError ?
                        {
                            ...this.props.inputStyles,
                            borderColor: "yellow",
                            borderStyle: "solid",
                            borderWidth: 1
                        } :
                        this.props.inputStyles
                    }

                    onPress={() => {
                        this.setState({ isOpen: true });
                    }}
                >
                    <Text>{this.state.placeholder?dateOrUnixToString(this.state.placeholder, true):this.props.placeholder?dateOrUnixToString(this.props.placeholder, true):""}</Text>
                    {this.state.isOpen && (
                        <DatePicker
                            modal
                            open={this.state.isOpen}
                            date={this.props.value?new Date(this.props.value):new Date()}
                            mode="datetime"
                            onConfirm={(date) => {
                                    this.setState({ isOpen: false });
                                    this.props.onEdit?this.props.onEdit(date):null;

                                    let dateStr = dateOrUnixToString(date, true);

                                    this.props.placeholder?this.setState({placeholder: dateStr}):null;

                                    this.setParentFormHasErrors(false);
                                    this.setState({hasError: false, hasRequiredError: false, value: null});
                                }
                            }
                            onCancel={() => {
                                this.setState({ isOpen: false });
                            }}
                        />
                    )}
                </TouchableOpacity>
            );
        }
        else if(this.props.type === "date") {
            return (
                <TouchableOpacity
                    style={
                        this.state.hasError ? 
                        {
                            ...this.props.inputStyles,
                            borderColor: "red",
                            borderStyle: "solid",
                            borderWidth: 1
                        } :
                        this.state.hasRequiredError ?
                        {
                            ...this.props.inputStyles,
                            borderColor: "yellow",
                            borderStyle: "solid",
                            borderWidth: 1
                        } :
                        this.props.inputStyles
                    }

                    onPress={() => {
                        this.setState({ isOpen: true });
                    }}
                >
                    <Text>{this.state.placeholder?dateOrUnixToString(this.state.placeholder, false):this.props.placeholder?dateOrUnixToString(this.props.placeholder, false):""}</Text>
                    {this.state.isOpen && (
                        <DatePicker
                            modal
                            open={this.state.isOpen}
                            date={this.props.value?new Date(this.props.value):new Date()}
                            mode="date"
                            onConfirm={(date) => {
                                    this.setState({ isOpen: false });
                                    this.props.onEdit?this.props.onEdit(date):null;

                                    let dateStr = dateOrUnixToString(date, false);

                                    this.props.placeholder?this.setState({placeholder: dateStr}):null;

                                    this.setState({hasError: false, hasRequiredError: false, value: dateStr});
                                    this.setParentFormHasErrors(false);
                                }
                            }
                            onCancel={() => {
                                this.setState({ isOpen: false });
                            }}
                        />
                    )}
                </TouchableOpacity>
            );
        }
        else if(this.props.type === "checkbox"){
            return (
                <TouchableOpacity
                    style={
                        this.state.hasError ? 
                        {
                            ...this.props.inputStyles,
                            borderColor: "red",
                            borderStyle: "solid",
                            borderWidth: 1
                        } :
                        this.state.hasRequiredError ?
                        {
                            ...this.props.inputStyles,
                            borderColor: "yellow",
                            borderStyle: "solid",
                            borderWidth: 1
                        } :
                        this.props.inputStyles ? this.props.inputStyles : {
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: this.props.iconSize?this.props.iconSize+4:34,
                            height: this.props.iconSize?this.props.iconSize+4:34,
                            backgroundColor: "none",
                            borderColor: this.props.checkedColor?this.props.checkedColor:"blue",
                            borderWidth: 2,
                        }
                    }
                    onPress={()=>{
                        const nextCheckboxChecked = !this.state.checkboxChecked;
                        const required = this.props.required || false; // Simplified default assignment

                        this.setState({ checkboxChecked: nextCheckboxChecked }, () => {
                            // This callback function runs after the state has been updated.
                            if (required && !nextCheckboxChecked) {
                                this.setState({ hasRequiredError: true });
                                this.setParentFormHasErrors(true);
                            } else {
                                this.setState({ hasRequiredError: false });
                                // Call the onEdit prop function with the new state of checkboxChecked
                                if (this.props.onEdit) {
                                    this.props.onEdit(nextCheckboxChecked);
                                }
                            }
                        });
                    }}
                >
                    {this.state.checkboxChecked?<Icon name="check" size={this.props.iconSize?this.props.iconSize:30} color={this.props.checkedColor?this.props.checkedColor:"blue"} />:null}
                </TouchableOpacity>
            );
        }
        else if(this.props.type === "radio"){
            return (
                <View
                    style={
                        this.state.hasError ? 
                        {
                            ...this.props.inputStyles,
                            borderColor: "red",
                            borderStyle: "solid",
                            borderWidth: 1
                        } :
                        this.state.hasRequiredError ?
                        {
                            ...this.props.inputStyles,
                            borderColor: "yellow",
                            borderStyle: "solid",
                            borderWidth: 1
                        } :
                        this.props.inputStyles
                    }
                >
                    {this.props.options.map((option) => {
                        return (
                            <TouchableOpacity key={option}

                                style={
                                    this.props.radioOptionStyles?
                                    this.props.radioOptionStyles:
                                    {
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        borderWidth: 1,
                                        height: this.props.radioSize?this.props.radioSize:40
                                    }
                                }

                                onPress={()=>{
                                    const optionSelected = option; // Assuming 'option' is available in this scope
                                    const required = this.props.required || false; // Simplified assignment

                                    // Set the radio selection state and then perform logic checks in the callback
                                    this.setState({ radioSelection: optionSelected }, () => {
                                        // Now that the state is guaranteed to be updated, perform your checks
                                        if (required && this.state.radioSelection === -1) {
                                            this.setState({ hasRequiredError: true });
                                            this.setParentFormHasErrors(true);
                                        } else {
                                            // If not required or the selection is not -1, then clear any error state
                                            this.setState({ hasRequiredError: false }, () => {
                                                // Optionally, notify the parent component or perform other actions
                                                if (this.props.onEdit) {
                                                    this.props.onEdit(optionSelected);
                                                }
                                            });
                                            // If the form has errors were previously set by this component, clear them
                                            this.setParentFormHasErrors(false);
                                        }
                                    });
                                }}

                            >
                                <Text
                                    style={{fontSize: this.props.radioSize?this.props.radioSize-4:30, color: "black"}}
                                >{option}</Text>
                                <View
                                
                                    style={
                                        this.state.radioSelection === option ? 
                                        {
                                            ...this.props.radioStyles,
                                            backgroundColor: this.props.checkedColor?this.props.checkedColor:"blue",
                                            width: this.props.radioSize?this.props.radioSize:30,
                                            height: this.props.radioSize?this.props.radioSize:30,
                                            borderRadius: this.props.radioSize?this.props.radioSize/2:15
                                        } :
                                        {
                                            ...this.props.radioStyles,
                                            backgroundColor: "white",
                                            borderColor: this.props.checkedColor?this.props.checkedColor:"blue",
                                            borderWidth: 1,
                                            width: this.props.radioSize?this.props.radioSize:30,
                                            height: this.props.radioSize?this.props.radioSize:30,
                                            borderRadius: this.props.radioSize?this.props.radioSize/2:15
                                        }
                                    }

                                ></View>
                            </TouchableOpacity>
                        );
                    })}

                </View>
            );
        }
        else if(this.props.type === "select"){
            return (
                <View
                    style={
                        this.props.inputStyles?
                        {
                            ...this.props.inputStyles,
                            padding: 0,
                            overflow: "hidden",
                            minHeight: Platform.OS === "ios"?"auto":55,
                        }:
                        {
                            height: 50,
                            flex: 1,
                        }
                    }
                >
                    <Picker
                        selectedValue={this.state.selectedValue}
                        style={{
                            height: "100%"
                        }}
            
                        prompt="Select an option"
                        onValueChange={(itemValue, itemIndex) => {
                            this.setState({selectedValue: itemValue});
                            this.props.onEdit?this.props.onEdit(itemValue):null;
                            this.setState({hasError: false, hasRequiredError: false});
                            this.setParentFormHasErrors(false);
                        }}
                        mode="dialog"
                    >
                        {this.props.options.map((option) => {
                            return (
                                <Picker.Item label={option["label"]} value={option["value"]} key={option["label"]} />
                            );
                        })}
                    </Picker>
                </View>
                
            );
        }
        else if(this.props.type === "file"){
            return (
                <TouchableOpacity
                    style={
                        this.state.hasError ? 
                        {
                            ...this.props.inputStyles,
                            borderColor: "red",
                            borderStyle: "solid",
                            borderWidth: 1
                        } :
                        this.state.hasRequiredError ?
                        {
                            ...this.props.inputStyles,
                            borderColor: "yellow",
                            borderStyle: "solid",
                            borderWidth: 1
                        } :
                        this.props.inputStyles
                    }
                    onPress={async () => {
                        try {
                            var res = await DocumentPicker.pick({
                                type: [DocumentPicker.types.allFiles],
                                allowMultiSelection: this.props.allowMultiSelection?this.props.allowMultiSelection:false,
                            });
                            if(!this.props.allowMultiSelection || this.props.allowMultiSelection === undefined) {
                                res = Array.isArray(res)?res[0]:res;
                                // console.log(
                                //     res.uri,
                                //     res.type, // mime type
                                //     res.name,
                                //     res.size
                                // );
                                this.props.onEdit?this.props.onEdit(res.uri):null;
                                this.setState({placeholder: res.name});
                            }
                            else{
                                let uris = [];
                                res.forEach((file) => {
                                    uris.push(file.uri);
                                });
                                this.props.onEdit?this.props.onEdit(uris):null;
                                this.setState({placeholder: `${uris.length} file${uris.length==1?"":"s"} selected.`});
                                this.setParentFormHasErrors(false);
                                this.setState({hasError: false, hasRequiredError: false});
                            }
                        } catch (err) {
                            if (DocumentPicker.isCancel(err)) {
                                // User cancelled the picker, exit any dialogs or menus and move on
                                var required = this.props.required ? this.props.required : false;
                                if(required && this.state.placeholder === this.props.placeholder) {
                                    this.setState({hasRequiredError: true});
                                    this.setParentFormHasErrors(true);
                                }
                            } else {
                                throw err;
                            }
                        }
                    }}
                >
                    <Text>{this.state.placeholder?this.state.placeholder:this.props.placeholder?this.props.placeholder:""}</Text>
                </TouchableOpacity>
            );
        }
        else if(this.props.type === "image"){
            return (
                <TouchableOpacity
                    style={
                        this.state.hasError ? 
                        {
                            ...this.props.inputStyles,
                            borderColor: "red",
                            borderStyle: "solid",
                            borderWidth: 1
                        } :
                        this.state.hasRequiredError ?
                        {
                            ...this.props.inputStyles,
                            borderColor: "yellow",
                            borderStyle: "solid",
                            borderWidth: 1
                        } :
                        this.props.inputStyles
                    }
                    onPress={() => {
                        launchImageLibrary({
                            mediaType: 'photo',
                            selectionLimit: this.props.allowMultiSelection?20:1,
                            includeBase64: true,
                            maxHeight: this.props.maxHeight?this.props.maxHeight:500,
                            maxWidth: this.props.maxWidth?this.props.maxWidth:500,
                        }, (res) => {
                            if(res.didCancel) {
                                var required = this.props.required ? this.props.required : false;
                                if(required && this.state.placeholder === this.props.placeholder) {
                                    this.setState({hasRequiredError: true});
                                    this.setParentFormHasErrors(true);
                                }
                            }
                            else if(res.error) {
                                console.log(res.error);
                            }
                            else {
                                if(this.props.allowMultiSelection) {
                                    let uris = [];
                                    res.assets.forEach((file) => {
                                        uris.push(file.uri);
                                    });
                                    this.props.onEdit?this.props.onEdit(uris):null;
                                    this.setState({placeholder: `${uris.length} file${uris.length==1?"":"s"} selected.`});
                                    this.setParentFormHasErrors(false);
                                    this.setState({hasError: false, hasRequiredError: false});
                                }
                                else {
                                    this.props.onEdit?this.props.onEdit(res.assets[0].uri):null;
                                    this.setState({placeholder: res.assets[0].fileName});
                                    this.setParentFormHasErrors(false);
                                    this.setState({hasError: false, hasRequiredError: false});
                                }
                            }
                        });
                    }}
                >
                    <Text>{this.state.placeholder?this.state.placeholder:this.props.placeholder?this.props.placeholder:""}</Text>
                </TouchableOpacity>
            );
        }
        else if(this.props.type === "video"){
            return (
                <TouchableOpacity
                    style={
                        this.state.hasError ? 
                        {
                            ...this.props.inputStyles,
                            borderColor: "red",
                            borderStyle: "solid",
                            borderWidth: 1
                        } :
                        this.state.hasRequiredError ?
                        {
                            ...this.props.inputStyles,
                            borderColor: "yellow",
                            borderStyle: "solid",
                            borderWidth: 1
                        } :
                        this.props.inputStyles
                    }
                    onPress={() => {
                        launchImageLibrary({
                            mediaType: 'video',
                            selectionLimit: this.props.allowMultiSelection?20:1,
                            includeBase64: true,
                            maxHeight: this.props.maxHeight?this.props.maxHeight:500,
                            maxWidth: this.props.maxWidth?this.props.maxWidth:500,
                        }, (res) => {
                            if(res.didCancel) {
                                var required = this.props.required ? this.props.required : false;
                                if(required && this.state.placeholder === this.props.placeholder) {
                                    this.setState({hasRequiredError: true});
                                    this.setParentFormHasErrors(true);
                                }
                            }
                            else if(res.error) {
                                console.log(res.error);
                            }
                            else {
                                if(this.props.allowMultiSelection) {
                                    let uris = [];
                                    res.assets.forEach((file) => {
                                        uris.push(file.uri);
                                    });
                                    this.props.onEdit?this.props.onEdit(uris):null;
                                    this.setState({placeholder: `${uris.length} file${uris.length==1?"":"s"} selected.`});
                                    this.setParentFormHasErrors(false);
                                    this.setState({hasError: false, hasRequiredError: false});
                                }
                                else {
                                    this.props.onEdit?this.props.onEdit(res.assets[0].uri):null;
                                    this.setState({placeholder: res.assets[0].fileName});
                                    this.setParentFormHasErrors(false);
                                    this.setState({hasError: false, hasRequiredError: false});
                                }
                            }
                        });
                    }}
                >
                    <Text>{this.state.placeholder?this.state.placeholder:this.props.placeholder?this.props.placeholder:""}</Text>
                </TouchableOpacity>
            );
        }
        else if(this.props.type === "audio"){
            return (
                <View
                    style={
                        this.state.hasError ?
                        {
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'row',
                            ...this.props.inputStyles,
                            borderColor: "red",
                            borderStyle: "solid",
                            borderWidth: 1
                        } :
                        this.state.hasRequiredError ?
                        {
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'row',
                            ...this.props.inputStyles,
                            borderColor: "yellow",
                            borderStyle: "solid",
                            borderWidth: 1
                        } :
                        this.props.inputStyles?this.props.inputStyles:{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'row',
                        }
                    }
                >

                    <View
                        style={
                            this.props.recordingLayoutStyles?
                            this.props.recordingLayoutStyles:
                            {
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'column',
                                gap: 10,
                            }
                        }
                    >
                        <TouchableOpacity
                            onPress={() => {this.state.isRecording?this.onStopRecord():this.onStartRecord()}}
                            disabled={this.state.isPlaying}
                            style={
                                !this.state.isPlaying ? {
                                    height: this.props.iconSize?this.props.iconSize+15:40,
                                    width: this.props.iconSize?this.props.iconSize+15:40,
                                    borderWidth: 1,
                                    borderColor: 'black',
                                    justifyContent: 'center',
                                    backgroundColor: this.props.recordingColor?this.props.recordingColor:"#2196F3",
                                    borderRadius: 10,
                                } : {
                                    height: this.props.iconSize?this.props.iconSize+15:40,
                                    width: this.props.iconSize?this.props.iconSize+15:40,
                                    borderWidth: 1,
                                    borderColor: 'black',
                                    justifyContent: 'center',
                                    backgroundColor: "gray",
                                    borderRadius: 10,
                                    opacity: 0.5,
                                }
                            }
                        >
                            {this.state.isRecording ? <MaterialIcon name="stop-circle" size={this.state.iconSize?this.state.iconSize:25} color={this.state.iconColor?this.state.iconColor:"white"} style={{textAlign:"center"}} /> : 
                            <MaterialIcon name="record-circle-outline" size={this.state.iconSize?this.state.iconSize:25} color={this.state.iconColor?this.state.iconColor:"white"} style={{textAlign:"center"}} />}
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={this.state.isPlaying ? this.onStopPlay : this.onStartPlay}
                            disabled={this.state.isRecording || this.state.recordPath === ''}
                            style={
                                !this.state.isRecording && this.state.recordPath !== '' ? {
                                    height: this.props.iconSize?this.props.iconSize+15:40,
                                    width: this.props.iconSize?this.props.iconSize+15:40,
                                    borderWidth: 1,
                                    borderColor: 'black',
                                    justifyContent: 'center',
                                    backgroundColor: this.props.playColor?this.props.playColor:"#2196F3",
                                    borderRadius: 10,
                                } : {
                                    height: this.props.iconSize?this.props.iconSize+15:40,
                                    width: this.props.iconSize?this.props.iconSize+15:40,
                                    borderWidth: 1,
                                    borderColor: 'black',
                                    justifyContent: 'center',
                                    backgroundColor: "gray",
                                    borderRadius: 10,
                                    opacity: 0.5,
                                }
                            }
                        >
                            {this.state.isPlaying ? <MaterialIcon name="stop" size={this.state.iconSize?this.state.iconSize:25} color={this.state.iconColor?this.state.iconColor:"white"} style={{textAlign:"center"}} /> : 
                                <MaterialIcon name="play" size={this.state.iconSize?this.state.iconSize:25} color={this.state.iconColor?this.state.iconColor:"white"} style={{textAlign:"center"}} /> }
                        </TouchableOpacity>

                    </View>

                    <View
                        style={
                            this.props.recordingLayoutStyles?
                            this.props.recordingLayoutStyles:
                            {
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'column',
                                alignContent: 'center',
                                gap: 10,
                            }
                        }
                    >

                        <View
                            style={
                                this.props.recordingTextLayoutStyles?
                                this.props.recordingTextLayoutStyles:
                                {
                                    height: 40,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                }
                            }
                        >

                            <Text
                                style={
                                    this.props.recordingTextStyles?
                                    this.props.recordingTextStyles:
                                    {
                                        flex: 1,
                                        borderWidth: 0,
                                        borderColor: 'black',
                                        width: "100%",
                                        textAlign: 'center',
                                        color: 'black',
                                    }
                                }
                            >
                                Rec: {this.state.recordingDuration}
                            </Text>

                        </View>

                        <View
                            style={
                                this.props.recordingTextLayoutStyles?
                                this.props.recordingTextLayoutStyles:
                                {
                                    height: 40,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                }
                            }
                        >

                            <Text
                                style={
                                    this.props.recordingTextStyles?
                                    this.props.recordingTextStyles:
                                    {
                                        flex: 1,
                                        borderWidth: 0,
                                        borderColor: 'black',
                                        width: "100%",
                                        textAlign: 'center',
                                        color: 'black',
                                    }
                                }
                            >
                                {this.state.playTime} / {this.state.duration}
                            </Text>

                        </View>

                    </View>

                </View>
            );
        }
        else if(this.props.type === "phone"){
            return (
                <PhoneInput
                    initialCountry="us"
                    initialValue={this.state.phoneNumber?this.state.phoneNumber:""}
                    ref={ref => {this.phone = ref}}
                    autoFormat={false}
                    onChangePhoneNumber={(val)=>{

                        if (this.phone.getCountryCode() == null) {
                            val = this.state.phoneNumber;
                            this.phone.setValue(val);
                        }
                    
                        // Update state only when necessary
                        if (val !== this.state.phoneNumber) {
                            this.setState({ phoneNumber: val }, () => {
                                // Call props.onEdit if it exists
                                if (this.props.onEdit) {
                                    this.props.onEdit(val);
                                }   

                                //console.log("Phone number: ", val);
                                //console.log("Country code: ", this.phone.getCountryCode());
                    
                                // Validate the phone number
                                const isValid = this.phone.isValidNumber();
                                const isEmpty = val === this.phone.getCountryCode() || val === "";
                    
                                //console.log("isValid: ", isValid);

                                this.setState({
                                    hasError: !isValid,
                                    hasRequiredError: this.props.required && isEmpty,
                                }, () => {
                                    // Use a method to inform parent form about the error state
                                    this.setParentFormHasErrors(!isValid || isEmpty);
                                });
                            });
                        }
                    }}
                    style={
                        this.state.hasError ?
                        {
                            ...this.props.inputStyles,
                            borderColor: "red",
                            borderStyle: "solid",
                            borderWidth: 1
                        } :
                        this.state.hasRequiredError ?
                        {
                            ...this.props.inputStyles,
                            borderColor: "yellow",
                            borderStyle: "solid",
                            borderWidth: 1
                        } :
                        this.props.inputStyles?
                        this.props.inputStyles:
                        {
                            height: 50
                        }
                    }
                    textStyle={
                        this.props.inputTextStyles?
                        this.props.inputTextStyles:
                        {
                            height: 50,
                            color: 'black',
                        }
                    }
                />
            );
        }
        else if(this.props.type === "dropdown"){
            return(
                <SelectList 
                    data={this.props.options?this.props.options:[]}
                    setSelected={(val)=>{
                        this.props.onEdit?this.props.onEdit(val):null;
                        this.setState({hasError: false, hasRequiredError: false});
                        this.setParentFormHasErrors(false);
                    }}
                    placeholder={this.props.value?this.props.value:this.props.placeholder?this.props.placeholder:""}
                    save="key"
                    defaultOption={this.props.value?this.props.options.find((option) => option.key === this.props.value):null}
                    boxStyles={
                        this.state.hasError ?
                        {
                            ...this.props.inputStyles,
                            borderColor: "red",
                            borderStyle: "solid",
                            borderWidth: 1
                        } :
                        this.state.hasRequiredError ?
                        {
                            ...this.props.inputStyles,
                            borderColor: "yellow",
                            borderStyle: "solid",
                            borderWidth: 1
                        } :
                        this.props.inputStyles?
                        this.props.inputStyles:
                        {}
                    }
                    dropdownItemStyles={
                        this.props.dropdownItemStyles?
                        this.props.dropdownItemStyles:
                        {}
                    }
                    dropdownStyles={
                        this.props.dropdownStyles?
                        this.props.dropdownStyles:
                        {}
                    }
                    dropdownTextStyles={
                        this.props.dropdownTextStyles?
                        this.props.dropdownTextStyles:
                        {}
                    }
                    inputStyles={
                        this.props.dropdownTextStyles?
                        this.props.dropdownTextStyles:
                        {}
                    }
                />
            );
        }
    }
}

const formatDuration = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    // Format minutes and seconds to have leading zeros if necessary
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
};

const checkAndRequestMicrophonePermission = async () => {
    const permission = Platform.OS === 'ios' ? PERMISSIONS.IOS.MICROPHONE : PERMISSIONS.ANDROID.RECORD_AUDIO;
  
    const status = await check(permission);
    if (status !== RESULTS.GRANTED) {
      // Permission not granted, request it
      const requestStatus = await request(permission);
      if (requestStatus === RESULTS.GRANTED) {
        console.log('Microphone permission granted');
      } else {
        console.log('Microphone permission denied');
      }
    } else {
      console.log('Microphone permission already granted');
    }
  };

const dateOrUnixToString = (dateOrUnix, hasTime) => {
    //Format: MM/DD/YYYY HH:MM:SS AM/PM

    if (typeof dateOrUnix === 'number') {
        dateOrUnix = new Date(dateOrUnix);
    }
    
    let string = dateOrUnix.toLocaleString();

    if(!hasTime) {
        string = string.split(" ")[0];
        string = string.replace(",", "")
    }

    
    return string;
  }

export default Input;