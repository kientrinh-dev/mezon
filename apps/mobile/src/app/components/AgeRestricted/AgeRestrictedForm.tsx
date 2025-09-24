import { size, useTheme } from '@mezon/mobile-ui';
import { clansActions, selectAllAccount, useAppDispatch } from '@mezon/store-mobile';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import MezonDateTimePicker from '../../componentUI/MezonDateTimePicker';
import { style } from './styles';
import { testProperties } from '../../configs/testProperties';

const AgeRestrictedForm = ({ onClose }: { onClose: () => void }) => {
	const { themeValue } = useTheme();
	const [date, setDate] = useState<Date>();
	const dispatch = useAppDispatch();
	const styles = style(themeValue);
	const { t } = useTranslation('ageRestricted');
	const userProfile = useSelector(selectAllAccount);

	const handleDatePicked = (value) => {
		setDate(value);
	};
	const handleSubmit = async () => {
		if (!date) return;
		dispatch(
			clansActions.updateUser({
				user_name: userProfile?.user?.username || '',
				avatar_url: userProfile?.user?.avatar_url || '',
				display_name: userProfile?.user?.display_name || '',
				about_me: userProfile?.user?.about_me || '',
				dob: date as any,
				noCache: false,
				logo: userProfile?.logo || ''
			})
		);
		onClose();
	};
	return (
		<View style={{ backgroundColor: themeValue.secondary, borderRadius: size.s_10, padding: size.s_20 }} {...testProperties('ageRestrictedForm.container')}>
			<View {...testProperties('ageRestrictedForm.viewTitle')}>
				<Text style={styles.title} {...testProperties('ageRestrictedForm.title')}>{t('ageRestrictedForm.title')}</Text>
				<Text style={styles.description} {...testProperties('ageRestrictedForm.description')}>{t('ageRestrictedForm.description')}</Text>
			</View>
			<MezonDateTimePicker value={date} onChange={handleDatePicked} containerStyle={styles.datePicker} display={'inline'} />
			<View {...testProperties('ageRestrictedForm.viewButton')}>
				<TouchableOpacity style={styles.buttonSubmit} onPress={handleSubmit} {...testProperties('ageRestrictedForm.buttonSubmit')}>
					<Text style={styles.btnText} {...testProperties('ageRestrictedForm.btnText')}>{t('ageRestrictedForm.submit')}</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default React.memo(AgeRestrictedForm);
