import React from "react";

import { 
    ScrollView, 
    TouchableOpacity,
    Text,
    Alert,
    View,
    RefreshControl
 } from "react-native";

/*
    This is a Form component that will be a shell for the form.
    It will take in children and render them in a ScrollView.
    It will also have an onSubmit prop that will be called when the form is submitted 
    as well as styles that will be passed to the ScrollView.
*/


class Form extends React.Component {

    state = {
        formHasErrors: {},
        refreshing: false
    }


    onSubmit = () => {
        
        // For each child, check if its state value of isValid is false.

        let formError = false;

        Object.keys(this.state.formHasErrors).forEach((key) => {
            if (this.state.formHasErrors[key] === true) {
                formError = true;
                return;
            }
        });

        if (formError) {
            console.log("Form has errors.");
            Alert.alert("Form Invalid", "Please fix the errors in the form before submitting. Fields with errors are highlighted in red and required fields are highlighted in yellow.");
            return;
        }


        this.props.onSubmit();

    }

    onRefresh = async () => {
        this.setState({ refreshing: true });

        if(this.props.onRefresh){
            await this.props.onRefresh();
        }

        this.setState({ refreshing: false });
    }

    render() {
        const childrenWithRef = React.Children.map(this.props.children, (child) => {
            return React.cloneElement(child, { parentFormRef: this });
        });

        if(this.props.scrollable === false) {
            if (this.props.submitBtnLocation === "bottom") {
                return (
                    <View style={this.props.styles ? this.props.styles : {}}>
                        {childrenWithRef}
                        <TouchableOpacity
                            style={this.props.submitBtnStyle ? this.props.submitBtnStyle : {}}
                            onPress={
                                this.props.onSubmit
                                    ? () => {
                                        this.onSubmit();
                                    }
                                    : () => {
                                        console.log("No submit function provided.");
                                    }
                            }
                        >
                            <Text style={this.props.submitBtnTextStyle ? this.props.submitBtnTextStyle : {}}>
                                {this.props.submitBtnText ? this.props.submitBtnText : "Submit"}
                            </Text>
                        </TouchableOpacity>
                    </View>
                );
            } 
            else if(this.props.submitBtnLocation === "none") {
                return (
                    <View style={this.props.styles ? this.props.styles : {}}>
                        {childrenWithRef}
                    </View>
                );
            }
            else {
                return (
                    <View style={this.props.styles ? this.props.styles : {}}>
                        <TouchableOpacity
                            style={this.props.submitBtnStyle ? this.props.submitBtnStyle : {}}
                            onPress={
                                this.props.onSubmit
                                    ? () => {
                                        this.onSubmit();
                                    }
                                    : () => {
                                        console.log("No submit function provided.");
                                    }
                            }
                        >
                            <Text style={this.props.submitBtnTextStyle ? this.props.submitBtnTextStyle : {}}>
                                {this.props.submitBtnText ? this.props.submitBtnText : "Submit"}
                            </Text>
                        </TouchableOpacity>
                        {childrenWithRef}
                    </View>
                );
            }
        }
        else{
            if (this.props.submitBtnLocation === "bottom") {
                return (
                    <ScrollView style={this.props.styles ? this.props.styles : {}}
                        refreshControl={
                            <RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh} />
                        }
                    >
                        {childrenWithRef}
                        <TouchableOpacity
                            style={this.props.submitBtnStyle ? this.props.submitBtnStyle : {}}
                            onPress={
                                this.props.onSubmit
                                    ? () => {
                                        this.onSubmit();
                                    }
                                    : () => {
                                        console.log("No submit function provided.");
                                    }
                            }
                        >
                            <Text style={this.props.submitBtnTextStyle ? this.props.submitBtnTextStyle : {}}>
                                {this.props.submitBtnText ? this.props.submitBtnText : "Submit"}
                            </Text>
                        </TouchableOpacity>
                    </ScrollView>
                );
            } 
            else if(this.props.submitBtnLocation === "none") {
                return (
                    <ScrollView style={this.props.styles ? this.props.styles : {}}
                        refreshControl={
                            <RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh} />
                        }
                    >
                        {childrenWithRef}
                    </ScrollView>
                );
            }
            else {
                return (
                    <ScrollView style={this.props.styles ? this.props.styles : {}}
                        refreshControl={
                            <RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh} />
                        }
                    >
                        <TouchableOpacity
                            style={this.props.submitBtnStyle ? this.props.submitBtnStyle : {}}
                            onPress={
                                this.props.onSubmit
                                    ? () => {
                                        this.onSubmit();
                                    }
                                    : () => {
                                        console.log("No submit function provided.");
                                    }
                            }
                        >
                            <Text style={this.props.submitBtnTextStyle ? this.props.submitBtnTextStyle : {}}>
                                {this.props.submitBtnText ? this.props.submitBtnText : "Submit"}
                            </Text>
                        </TouchableOpacity>
                        {childrenWithRef}
                    </ScrollView>
                );
            }
        }
    }
}

export default Form;

