import { useRoles } from '@mezon/core';
import { baseColor, useTheme } from '@mezon/mobile-ui';
import { selectCurrentClanId } from '@mezon/store-mobile';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Platform, Pressable, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import Toast from 'react-native-toast-message';
import { useSelector } from 'react-redux';
import StatusBarHeight from '../../../components/StatusBarHeight/StatusBarHeight';
import MezonIconCDN from '../../../componentUI/MezonIconCDN';
import MezonInput from '../../../componentUI/MezonInput';
import { IconCDN } from '../../../constants/icon_cdn';
import { APP_SCREEN, MenuClanScreenProps } from '../../../navigation/ScreenTypes';
import { style } from './styles';
import { testProperties } from '../../../configs/testProperties';

type CreateNewRoleScreen = typeof APP_SCREEN.MENU_CLAN.CREATE_NEW_ROLE;
export const CreateNewRole = ({ navigation }: MenuClanScreenProps<CreateNewRoleScreen>) => {
	const { t } = useTranslation('clanRoles');
	const [roleName, setRoleName] = useState('');
	const currentClanId = useSelector(selectCurrentClanId);
	const { createRole } = useRoles();
	const { themeValue } = useTheme();
	const styles = style(themeValue);

	const onRoleNameChange = (roleName: string) => {
		setRoleName(roleName);
	};

	const createNewRole = async () => {
		const response = (await createRole(currentClanId, roleName, '', [], [])) as any;
		if (response?.id) {
			navigation.navigate(APP_SCREEN.MENU_CLAN.SETUP_PERMISSIONS);
			Toast.show({
				type: 'success',
				props: {
					text2: t('createNewRole.createSuccess', { roleName }),
					leadingIcon: <MezonIconCDN icon={IconCDN.checkmarkSmallIcon} color={baseColor.green} width={20} height={20} />
				}
			});
		} else {
			navigation.navigate(APP_SCREEN.MENU_CLAN.ROLE_SETTING);
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
		<KeyboardAvoidingView
			behavior={'padding'}
			keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : StatusBar.currentHeight + 5}
			style={styles.container}
			{...testProperties('createNewRole.container', true)}
		>
			<StatusBarHeight />
			<View style={styles.header} {...testProperties('createNewRole.header', true)}>
				<Pressable
					style={styles.backButton}
					onPress={() => navigation.navigate(APP_SCREEN.MENU_CLAN.ROLE_SETTING)}
					{...testProperties('createNewRole.backBtn')}
				>
					<MezonIconCDN icon={IconCDN.closeSmallBold} height={20} width={20} color={themeValue.textStrong} />
				</Pressable>
				<Text style={styles.title} {...testProperties('createNewRole.headerTitle')}>
					{t('createNewRole.title')}
				</Text>
			</View>

			<View style={styles.wrapper} {...testProperties('createNewRole.wrapper', true)}>
				<View>
					<View style={styles.desciptionWrapper} {...testProperties('createNewRole.descriptionWrapper', true)}>
						<Text style={styles.newRole} {...testProperties('createNewRole.newRoleTitle')}>
							{t('createNewRole.createANewRole')}
						</Text>
						<Text style={styles.description} {...testProperties('createNewRole.newRoleDescription')}>
							{t('createNewRole.description')}
						</Text>
					</View>
					<View style={styles.input} {...testProperties('createNewRole.inputWrapper', true)}>
						<MezonInput
							value={roleName}
							onTextChange={onRoleNameChange}
							placeHolder={t('createNewRole.newRole')}
							label={t('createNewRole.roleName')}
							{...testProperties('createNewRole.roleNameInput')}
						/>
					</View>
				</View>
				<View style={styles.bottom} {...testProperties('createNewRole.bottom', true)}>
					<TouchableOpacity
						onPress={() => {
							if (roleName?.trim()?.length === 0) return;
							createNewRole();
						}}
						{...testProperties('createNewRole.createBtn')}
					>
						<View
							style={[
								{
									backgroundColor: roleName?.trim()?.length === 0 ? '#676b73' : themeValue.bgViolet
								},
								styles.button
							]}
						>
							<Text style={styles.buttonText} {...testProperties('createNewRole.createBtn.text')}>
								{t('createNewRole.create')}
							</Text>
						</View>
					</TouchableOpacity>
				</View>
			</View>
		</KeyboardAvoidingView>
	);
};
