import { size } from '@mezon/mobile-ui';
import { useFocusEffect } from '@react-navigation/native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { BackHandler, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import useTabletLandscape from '../../hooks/useTabletLandscape';
import { testProperties } from '../../configs/testProperties';

const UpdateGateScreen = ({ route }) => {
	const { t } = useTranslation(['setting']);
	const storeUrl = route?.params?.storeUrl;
	const isTabletLandscape = useTabletLandscape();

	useFocusEffect(() => {
		const backAction = () => true;
		const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

		return () => backHandler.remove();
	});

	const onPress = () => Linking.openURL(storeUrl);

	return (
		<View style={styles.container} {...testProperties('updateGate.screen', true)}>
			<View />
			<View
				style={{
					alignSelf: 'center',
					maxHeight: '70%',
					marginBottom: size.s_50
				}}
				{...testProperties('updateGate.content', true)}
			>
				<FastImage
					source={require('../../../assets/images/bgRocket.png')}
					style={{ width: size.s_300, height: size.s_300, maxHeight: '80%' }}
					resizeMode={'cover'}
					{...testProperties('updateGate.image')}
				/>
				<View>
					<Text style={styles.title} {...testProperties('updateGate.title')}>
						{t('updateGate.outOfDateVersion')}
					</Text>
					<Text style={styles.subTitle} {...testProperties('updateGate.subtitle')}>
						{t('updateGate.updateExperience')}
					</Text>
				</View>
			</View>
			<TouchableOpacity onPress={onPress} {...testProperties('updateGate.updateButton')}>
				<View
					style={{
						backgroundColor: 'white',
						flexDirection: 'row',
						justifyContent: 'space-between',
						paddingHorizontal: size.s_10,
						height: size.s_50,
						width: isTabletLandscape ? '50%' : '100%',
						borderRadius: size.s_50,
						alignItems: 'center',
						alignSelf: 'center'
					}}
				>
					<Text style={styles.titleBtn} {...testProperties('updateGate.updateButton.text')}>
						{t('updateGate.updateNow')}
					</Text>
				</View>
			</TouchableOpacity>
		</View>
	);
};

export default UpdateGateScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: size.s_40,
		backgroundColor: '#242427',
		justifyContent: 'space-between'
	},
	title: {
		fontSize: size.s_20,
		fontWeight: 'bold',
		color: 'white',
		textAlign: 'center'
	},
	subTitle: {
		textAlign: 'center',
		marginTop: size.s_10,
		fontSize: size.s_16,
		lineHeight: size.s_24,
		color: '#ccc'
	},
	titleBtn: {
		flex: 1,
		textAlign: 'center',
		fontSize: size.s_16,
		fontWeight: 'bold',
		color: '#000000'
	}
});
