import { useTheme } from '@mezon/mobile-ui';
import React from 'react';
import { Text, View } from 'react-native';
import { style } from './styles';
import { testProperties } from '../../../configs/testProperties';

export const SettingFriendRequestScreen = () => {
	const { themeValue } = useTheme();
	const styles = style(themeValue);
	return (
		<View style={styles.settingFriendRequestContainer} {...testProperties('friends.settings.root', true)}>
			{/* TODO: update later */}
			<Text style={{ color: themeValue.textStrong }}>Setting Friend Request Screen</Text>
		</View>
	);
};
