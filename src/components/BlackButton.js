import React from 'react';
import {StyleSheet, Text, ActivityIndicator} from 'react-native';
import { Theme } from '../configs/theme';
import { scale } from '../configs/index';
import {Button} from "native-base";
// import * as Button from 'native-base-button'

const BlackButton = (props) => (
    <Button
        onPress={props.action}
        style={[styles.button, {width: props.width}]}
        width={props.width}
        disabled={props.loader ? true : false}>

    {
            props.loader
                ? <ActivityIndicator size="small" color='rgb(254, 185, 0)'/>
                : <Text style={styles.buttonText} numberOfLines={1}>{props.text}</Text>
    }

    </Button>
);

const styles = StyleSheet.create({
    button: {
        height: scale(52),
        backgroundColor: "rgb(37, 44, 50)",
        flexDirection: "row",
        justifyContent: "center",
        paddingHorizontal: scale(5),
        borderRadius: scale(8),
        width: scale(112)
    },
    buttonText: {
        fontSize: Theme.fonts.sizes.p6,
        color: "#fff",
        fontFamily: "PTRootUIBold",
        borderRadius: 0
    }
});

export default BlackButton
