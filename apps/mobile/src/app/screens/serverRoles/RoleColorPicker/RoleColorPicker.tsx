import { useBottomSheetModal } from '@gorhom/bottom-sheet';
import { size, useTheme } from '@mezon/mobile-ui';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, Text, TouchableOpacity, View } from 'react-native';
import { style } from './styles';
import { testProperties } from '../../../configs/testProperties';

export const RoleColorPicker = function RoleColorPicker({ onPickColor }: { onPickColor: (color: string) => void }) {
	const [colorSelected, setColorSelected] = useState<string>('');
	const { themeValue } = useTheme();
	const styles = style(themeValue);
	const { dismiss } = useBottomSheetModal();
	const { t } = useTranslation('clanRoles');

	const colorArray = [
		'#1abc9c',
		'#2ecc71',
		'#3498db',
		'#9b59b6',
		'#e91e63',
		'#f1c40f',
		'#e67e22',
		'#e74c3c',
		'#95a5a6',
		'#607d8b',
		'#11806a',
		'#1f8b4c',
		'#206694',
		'#71368a',
		'#ad1457',
		'#c27c0e',
		'#e84300',
		'#992d22',
		'#979c9f',
		'#546e7a'
	];
	const handlePickColor = (color: string) => {
		setColorSelected(color);
	};

	const handleResetColor = () => {
		setColorSelected('');
	};

	const handleSaveColor = () => {
		onPickColor(colorSelected);
		dismiss();
	};
	return (
		<View style={{ paddingHorizontal: size.s_20 }} {...testProperties('roleColorPicker.container', true)}>
			<View style={{ width: '100%', flexDirection: 'row', marginBottom: size.s_20 }}>
				<View style={{ width: size.s_60 }} />
				<Text style={styles.title} {...testProperties('roleColorPicker.title')}>{t('roleColorPicker.titleBS')}</Text>
				<TouchableOpacity onPress={handleSaveColor} style={styles.headerRightBtn} {...testProperties('roleColorPicker.saveBtn')}>
					<Text style={styles.textBtn} {...testProperties('roleColorPicker.saveBtn.text')}>{t('roleColorPicker.save')}</Text>
				</TouchableOpacity>
			</View>
			<View
				style={{
					flexDirection: 'row',
					flexWrap: 'wrap',
					paddingVertical: size.s_10,
					paddingHorizontal: size.s_20,
					alignItems: 'center',
					justifyContent: 'center',
					gap: size.s_20
				}}
				{...testProperties('roleColorPicker.palette', true)}
			>
				{colorArray?.map((color) => (
					<Pressable onPress={() => handlePickColor(color)} {...testProperties(`roleColorPicker.color.${color}`)}>
						<View
							style={{
								alignItems: 'center',
								justifyContent: 'center',
								height: size.s_40,
								width: size.s_40,
								backgroundColor: color,
								borderRadius: size.s_20
							}}
						>
							{!!colorSelected && colorSelected === color && <Text style={styles.checkedIcon}>✓</Text>}
						</View>
					</Pressable>
				))}
			</View>
			<View style={{ width: '100%', alignItems: 'center', marginVertical: size.s_20 }} {...testProperties('roleColorPicker.footer', true)}>
				<TouchableOpacity onPress={handleResetColor} style={styles.footerBtn} {...testProperties('roleColorPicker.resetBtn')}>
					<Text style={styles.textBtn} {...testProperties('roleColorPicker.resetBtn.text')}>{t('roleColorPicker.reset')}</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default React.memo(RoleColorPicker);
