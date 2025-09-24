import { useRoles } from '@mezon/core';
import { baseColor, size, useTheme } from '@mezon/mobile-ui';
import { selectAllRolesClan } from '@mezon/store-mobile';
import { MAX_FILE_SIZE_256KB } from '@mezon/utils';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { useSelector } from 'react-redux';
import MezonIconCDN from '../../../componentUI/MezonIconCDN';
import MezonImagePicker from '../../../componentUI/MezonImagePicker';
import { IconCDN } from '../../../constants/icon_cdn';
import { style } from './styles';
import { testProperties } from '../../../configs/testProperties';

function RoleImagePicker({ roleId, disable = false }: { roleId: string; disable?: boolean }) {
	const { themeValue } = useTheme();
	const styles = style(themeValue);
	const rolesClan = useSelector(selectAllRolesClan);
	const activeRole = useMemo(() => rolesClan?.find((role) => role?.id === roleId), [roleId, rolesClan]);
	const { updateRole } = useRoles();
	const { t } = useTranslation('clanRoles');

	const handleOnLoad = async (url) => {
		if (url) {
			const response = await updateRole(activeRole?.clan_id, activeRole?.id, activeRole?.title, activeRole?.color || '', [], [], [], [], url);
			if (response) {
				return;
			} else {
				Toast.show({
					type: 'success',
					props: {
						text2: t('failed'),
						leadingIcon: <MezonIconCDN icon={IconCDN.closeIcon} color={baseColor.redStrong} width={20} height={20} />
					}
				});
			}
		}
	};

	const handleRemoveIcon = async () => {
		const response = await updateRole(activeRole?.clan_id, activeRole?.id, activeRole?.title, activeRole?.color || '', [], [], [], [], '');
		if (response) {
			return;
		} else {
			Toast.show({
				type: 'success',
				props: {
					text2: t('failed'),
					leadingIcon: <MezonIconCDN icon={IconCDN.closeIcon} color={baseColor.redStrong} width={20} height={20} />
				}
			});
		}
	};

	return (
		<View {...testProperties('roleImagePicker.container', true)}>
			<View style={styles.roleButton} {...testProperties('roleImagePicker.row', true)}>
				<Text style={styles.textBtn} {...testProperties('roleImagePicker.title')}>{t('roleImagePicker')}</Text>
				<View style={styles.tailButton} {...testProperties('roleImagePicker.tail', true)}>
					{!!activeRole?.role_icon && !disable && (
						<TouchableOpacity style={styles.deleteButton} onPress={handleRemoveIcon} {...testProperties('roleImagePicker.removeBtn')}>
							<Text style={styles.deleteText} {...testProperties('roleImagePicker.removeBtn.text')}>{t('removeImage')}</Text>
						</TouchableOpacity>
					)}
					<MezonImagePicker
						defaultValue={activeRole?.role_icon}
						height={size.s_50}
						width={size.s_50}
						onLoad={handleOnLoad}
						autoUpload
						disabled={disable}
						imageSizeLimit={MAX_FILE_SIZE_256KB}
						{...testProperties('roleImagePicker.picker')}
					/>
				</View>
			</View>
		</View>
	);
}
export default React.memo(RoleImagePicker);
