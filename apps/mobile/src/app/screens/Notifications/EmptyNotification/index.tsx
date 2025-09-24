import { size, useTheme } from '@mezon/mobile-ui';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import MezonIconCDN from '../../../componentUI/MezonIconCDN';
import { testProperties } from '../../../configs/testProperties';
import { IconCDN } from '../../../constants/icon_cdn';
import { style } from './EmptyNotification.styles';

const EmptyNotification = () => {
	const { themeValue } = useTheme();
	const styles = style(themeValue);
	const { t } = useTranslation(['notification']);

	return (
		<View style={{ position: 'relative', width: '100%', height: '100%' }} {...testProperties('notifications.empty')}>
			<View
				style={{
					position: 'absolute',
					left: size.s_10,
					right: size.s_10,
					top: '20%',
					flexDirection: 'column',
					alignItems: 'center',
					gap: size.s_10
				}}
				{...testProperties('notifications.empty.content')}
			>
				<MezonIconCDN icon={IconCDN.bellIcon} width={size.s_100} height={size.s_100} color={themeValue.text} {...testProperties('notifications.empty.content.icon')} />
				<Text style={styles.title} {...testProperties('notifications.empty.content.title')}>{t('nothingHere')}</Text>
				<Text style={styles.description} {...testProperties('notifications.empty.content.description')}>{t('comeBackNotify')}</Text>
			</View>
		</View>
	);
};

export default EmptyNotification;
