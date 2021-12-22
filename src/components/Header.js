import React from 'react';
import { StyleSheet, View, Image, SafeAreaView } from 'react-native';
import { scale } from '../configs/index'


const Header = (props) => (
        <Image
            source={
                require('../../assets/icons/logo/logo.png')
            }
            style={styles.imageLogo}
        />
)

const styles = StyleSheet.create({
    imageLogo: {
        marginVertical: scale(16),
        width: 72,
        height: scale(22),
        alignSelf: "center",
        marginLeft: "auto",
        marginRight: "auto"
    }
});

export default Header
