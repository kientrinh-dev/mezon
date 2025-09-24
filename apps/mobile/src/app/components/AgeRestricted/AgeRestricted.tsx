import { load, save, STORAGE_AGE_RESTRICTED_CHANNEL_IDS } from '@mezon/mobile-components';
import { size, useTheme } from '@mezon/mobile-ui';
import { selectCurrentChannelId } from '@mezon/store-mobile';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import MezonIconCDN from '../../componentUI/MezonIconCDN';
import { IconCDN } from '../../constants/icon_cdn';
import { style } from './styles';
import { testProperties } from '../../configs/testProperties';

const AgeRestricted = ({ onClose }: { onClose: () => void }) => {
	const { themeValue } = useTheme();
	const currentChannelId = useSelector(selectCurrentChannelId);
	const navigation = useNavigation<any>();
	const { t } = useTranslation('ageRestricted');

	const styles = style(themeValue);
	const handleSaveChannel = () => {
		const storedData = load(STORAGE_AGE_RESTRICTED_CHANNEL_IDS) || '[]';
		const channelIds = JSON.parse(storedData);

		if (currentChannelId && !channelIds.includes(currentChannelId)) {
			channelIds.push(currentChannelId);
			save(STORAGE_AGE_RESTRICTED_CHANNEL_IDS, JSON.stringify(channelIds));
		}

		onClose();
	};

	const handleNode = useCallback(() => {
		navigation.goBack();
	}, [navigation]);

	return (
		<View style={{ backgroundColor: themeValue.secondary, borderRadius: size.s_10, padding: size.s_20 }} {...testProperties('ageRestricted.container')}>
			<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} {...testProperties('ageRestricted.viewIcon')}>
				<MezonIconCDN icon={IconCDN.ageRestrictedIcon} width={size.s_100} height={size.s_100} useOriginalColor={true} />
			</View>
			<View {...testProperties('ageRestricted.viewTitle')}>
				<Text style={styles.title} {...testProperties('ageRestricted.title')}>{t('title')}</Text>
				<Text style={styles.description} {...testProperties('ageRestricted.description')}>{t('des')}</Text>
			</View>
			<View style={{ marginTop: size.s_20, flexDirection: 'row', justifyContent: 'center', gap: size.s_30 }} {...testProperties('ageRestricted.viewButton')}>
				<TouchableOpacity style={styles.buttonNope} onPress={handleNode} {...testProperties('ageRestricted.buttonNope')}>
					<Text style={styles.btnText} {...testProperties('ageRestricted.btnText')}>{t('nope')}</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.buttonContinue} onPress={handleSaveChannel} {...testProperties('ageRestricted.buttonContinue')}>
					<Text style={styles.btnText} {...testProperties('ageRestricted.btnText')}>{t('continue')}</Text>
				</TouchableOpacity>	
			</View>
		</View>
	);
};

export default React.memo(AgeRestricted);
