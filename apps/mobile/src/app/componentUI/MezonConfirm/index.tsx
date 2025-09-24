import { ActionEmitEvent } from '@mezon/mobile-components';
import { baseColor, useTheme } from '@mezon/mobile-ui';
import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { DeviceEventEmitter, Text, TouchableOpacity, View } from 'react-native';
import useTabletLandscape from '../../hooks/useTabletLandscape';
import { style } from './styles';
import { testProperties } from '../../configs/testProperties';

interface IMezonConfirmProps {
	title: string;
	children?: ReactNode;
	confirmText: string;
	content?: string;
	isDanger?: boolean;
	onConfirm?: () => void;
	onCancel?: () => void;
}
export default function MezonConfirm({ children, title, confirmText, content, isDanger, onConfirm, onCancel }: IMezonConfirmProps) {
	const isTabletLandscape = useTabletLandscape();
	const { themeValue } = useTheme();
	const styles = style(themeValue, isTabletLandscape);
	const { t } = useTranslation(['message']);

	function handleClose() {
		DeviceEventEmitter.emit(ActionEmitEvent.ON_TRIGGER_MODAL, { isDismiss: true });
		onCancel && onCancel();
	}

	function handleConfirm() {
		onConfirm && onConfirm();
	}

	return (
		<View style={styles.main} {...testProperties('mezonConfirm.main')}>
			<View style={styles.container}>
				<View style={styles.header}>
					<Text style={styles.title} {...testProperties('mezonConfirm.title')}>{title}</Text>
				</View>

				{children ? children : <Text style={styles.contentText} {...testProperties('mezonConfirm.contentText')}>{content || ''}</Text>}

				<View style={styles.btnWrapper} {...testProperties('mezonConfirm.btnWrapper')}>
					<TouchableOpacity style={[styles.btn, styles.btnDefault, isDanger && styles.btnDanger]} onPress={() => handleConfirm()}>
						<Text style={[styles.btnText, { color: baseColor.white }]} {...testProperties('mezonConfirm.btnText')}>{confirmText}</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.btn} onPress={() => handleClose()} {...testProperties('mezonConfirm.btn')}>
						<Text style={styles.btnText}>{t('buzz.cancel')}</Text>
					</TouchableOpacity>
				</View>
			</View>
			<TouchableOpacity style={styles.backdrop} onPress={handleClose} {...testProperties('mezonConfirm.backdrop')} />
		</View>
	);
}
