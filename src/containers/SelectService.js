import React from 'react';
import {StyleSheet, View, ScrollView, Text, FlatList, TouchableOpacity} from 'react-native';

import localeStore from '../locale/localeStore'
import {Theme} from "../configs/theme";
import {scale} from "../configs";

const SelectService = (props) => (

    <View style={styles.container}>
        <ScrollView>
            <View style={styles.listBg}>
                <View style={styles.containerList}>
                    <Text style={styles.listTitle}>Выберите вид услуги</Text>
                    {
                        props.services && props.services.length
                            ? <FlatList
                                data={props.services ? props.services : []}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        style={styles.listItem}
                                        onPress={() => props.update(item)}>
                                        <Text
                                            style={styles.listItemText}>
                                            {item.name_ru}
                                        </Text>
                                    </TouchableOpacity>
                                )}
                            />
                            : <View style={styles.listItem}>
                                <Text
                                    style={styles.emptyListItem}>
                                    Услуги не найдены.
                                </Text>
                            </View>

                    }

                </View>
            </View>
        </ScrollView>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%'
    },
    listBg: {
        alignItems: 'center',
        alignContent: 'center'
    },
    containerList: {
        width: scale(343)
    },
    listTitle: {
        color: 'rgb(255, 186, 0)',
        fontSize: Theme.fonts.sizes.h1,
        marginTop: scale(16),
        marginBottom: scale(16),
        fontFamily: 'RobotoThin'
    },
    listItem: {
        borderBottomColor: 'rgba(255, 255, 255, 0.12)',
        borderBottomWidth: 1,
        paddingVertical: scale(12),
        width: '100%'
    },
    listItemText: {
        color: 'rgb(255, 255, 255)',
        fontSize: Theme.fonts.sizes.p6
    },
    emptyListItem: {
        color: 'rgba(255, 255, 255, 0.37)',
        fontSize: Theme.fonts.sizes.p6
    }
});

export default SelectService
