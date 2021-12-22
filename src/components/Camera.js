import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { scale } from '../configs/index';
import Icon from "react-native-vector-icons/Entypo";
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';

export default class CameraView extends React.Component {
    async componentDidMount() {
        this.props.handleChange('type', Camera.Constants.Type.back)
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.props.handleChange('hasCameraPermission', status === 'granted');
    }
    snap = async () => {
        if (this.camera) {
            let photo = await this.camera.takePictureAsync()
            this.props.handleChange('photo', photo.uri);
            this.props.update('photos', [photo.uri]);
            this.props.handleChange('camera', false);
        }
    };
    render () {
        const { hasCameraPermission } = this.props;
        if (hasCameraPermission === null) {
            return <View />;
        } else if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>;
        } else {
            return (
                <View style={{flex: 1}}>
                    <Camera
                        style={{flex: 1}}
                        type={this.props.type}
                        // captureTarget={() => this.handle(Camera.constants.CaptureTarget.disk)}
                        ref={ref => {
                            this.camera = ref;
                        }}>
                        <View
                            style={{
                                flex: 1,
                                backgroundColor: 'transparent',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                            <TouchableOpacity
                                style={{
                                    alignSelf: 'flex-end',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                                onPress={() => this.snap()}>
                                <Icon
                                    name={"circle"}
                                    size={scale(50)}
                                    color={'#fff'}
                                    style={{marginBottom: scale(30)}}
                                />

                            </TouchableOpacity>
                        </View>
                    </Camera>
                </View>
            )
        }

    }
}

const styles = StyleSheet.create({
});

