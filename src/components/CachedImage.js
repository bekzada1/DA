import React from 'react';
import {Image} from 'react-native';
import { connect } from "react-redux";

const CachedImage = (props) => (
    <Image
        source={{
            uri: props.uri,
            cache: props.cache
        }}
        style={props.style}>
    </Image>
);

const mapStateToProps = (state) => {
    const { version } = state
    return {
        cache: version.cache
    }
};

export default connect(mapStateToProps)(CachedImage);
