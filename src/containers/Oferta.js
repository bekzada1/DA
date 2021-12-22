import React from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';

import localeStore from '../locale/localeStore'
import {Theme} from '../configs/theme'
import {scale} from '../configs/index'


const Oferta = () => (
    <View style={styles.container}>
        <ScrollView>
            <View style={styles.ofertaContainer}>
                <Text style={styles.ofertaTitle}>Договор публичной оферты</Text>
                <Text style={styles.ofertaText}>Настоящий договор адресован физическим лицам, (далее «Пользователь»).
                    {"\n"}
                    Мобильное приложение предоставляется ТОО «Automato» (далее «Digital Agent»). Пользователь и Digital Agent заключили настоящий договор (далее – Договор), о нижеследующем:  </Text>
                <Text style={styles.ofertaSubTitle}>1.ТЕРМИНЫ И ОПРЕДЕЛЕНИЯ:</Text>
                <Text style={styles.ofertaText}>1.1. Публичная Оферта – настоящее предложение использования мобильного приложения Digital Agent, обращенное Пользователям;
                    {"\n"}
                    {"\n"}
                    1.2. Сайт – https://digitalagent.kz</Text>
                <Text style={styles.ofertaSubTitle}>
                    2. ОСНОВНЫЕ ПОЛОЖЕНИЯ:
                </Text>
                <Text style={styles.ofertaText}>
                    2.1. Текст Договора является публичной офертой (в соответствии с пунктом 5 статьи 395 Гражданского кодекса Республики Казахстан публичная оферта – это содержащее все существенные условия договора предложение, из которого усматривается воля лица, делающего предложение, заключить договор на указанных в предложении условиях с любым, кто отзовется на это предложение). Акцепт оферты – использование мобильного приложения (в соответствии со статьёй 396 Гражданского кодекса Республики Казахстан). Акцепт – это ответ лица, которому адресована оферта, о ее принятии. Акцепт должен быть полным и безоговорочным. Совершая действия по акцепту настоящего публичного договора – оферты, Пользователь подтверждает свою правоспособность и дееспособность, а также свое законное право вступать в договорные отношения с Digital Agent . Полным и безоговорочным согласием заключить Договор (далее – Акцептом) является выраженное согласие с его условиями путем использования мобильное приложение Digital Agent и/или принятие условий предоставления сервиса;
                    {"\n"}
                    {"\n"}
                    2.2. Акцепт Договора означает, что Пользователь согласен со всеми положениями настоящего предложения, и равносилен заключению Договора и всех приложений к нему. В связи с вышеизложенным, внимательно прочитайте текст Договора. Если Вы не согласны с каким-либо пунктом Договора, Digital Agent предлагает Вам отказаться от Акцепта оферты.
                </Text>
            </View>
        </ScrollView>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignContent: 'center',
        alignItems: 'center'
    },
    ofertaContainer: {
        width: scale(343)
    },
    ofertaTitle: {
        color: 'rgb(255, 186, 0)',
        fontSize: Theme.fonts.sizes.h2,
        fontFamily: 'RobotoThin',
        marginVertical: 16
    },
    ofertaText: {
        color: 'rgb(255, 255, 255)',
        fontSize: Theme.fonts.sizes.p6,
        lineHeight: 21
    },
    ofertaSubTitle: {
        color: 'rgb(255, 186, 0)',
        fontSize: Theme.fonts.sizes.p6,
        marginVertical: 14
    }
});

export default Oferta
