import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { Theme } from '../configs/theme'
import {scale} from '../configs'
import localeStore from '../locale/localeStore'

import YellowButton from '../components/YellowButton'

const ExcelentFeedback = (props) => (

    <View style={styles.container}>
        <Image
            source={
                require('../../assets/icons/feedBack/thanksIcon.png')
            }
            width="220"
            height="193"
        />
        <Text
            style={styles.yellowTitleText}>Спасибо,
            что воспользовались приложением!</Text>
        <YellowButton
            width='100%'
            text="Вернуться"
            action={() => props.navigation.navigate('HomeViewScreen')}
        />
        {/*<Text style={styles.yellowSubTitleText}>Поделиться с друзьями</Text>*/}
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        paddingHorizontal: scale(16),
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        textAlign: 'center'
    },
    yellowTitleText: {
        color: 'rgb(255, 186, 0)',
        fontSize: Theme.fonts.sizes.h1,
        fontFamily: 'RobotoThin',
        textAlign: 'center',
        marginVertical: scale(30)
    },
    yellowSubTitleText: {
        color: 'rgb(254, 185, 0)',
        fontSize: Theme.fonts.sizes.p4,
        marginTop: scale(24)
    }
});

export default ExcelentFeedback
