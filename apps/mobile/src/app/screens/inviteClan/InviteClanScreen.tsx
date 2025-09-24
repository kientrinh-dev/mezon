import { useInvite } from '@mezon/core';
import { STORAGE_CHANNEL_CURRENT_CACHE, STORAGE_CLAN_ID, remove, save } from '@mezon/mobile-components';
import { size, useTheme } from '@mezon/mobile-ui';
import { appActions, clansActions, getStoreAsync, inviteActions, selectInviteById, useAppDispatch, useAppSelector } from '@mezon/store-mobile';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';
import MezonIconCDN from '../../componentUI/MezonIconCDN';
import ImageNative from '../../components/ImageNative';
import { IconCDN } from '../../constants/icon_cdn';
import useCheckClanLimit from '../../hooks/useCheckClanLimit';
import { APP_SCREEN } from '../../navigation/ScreenTypes';
import { style } from './styles';
import { testProperties } from '../../configs/testProperties';

const InviteClanScreen = ({ route }: { route: any }) => {
	const code = route?.params?.code;
	const { themeValue } = useTheme();
	const styles = style(themeValue);
	const { inviteUser } = useInvite();
	const dispatch = useAppDispatch();
	const navigation = useNavigation<any>();
	const { t } = useTranslation('linkMessageInvite');
	const selectInvite = useAppSelector(selectInviteById(code || ''));
	const { checkClanLimit } = useCheckClanLimit();

	const fetchInviteData = useCallback(() => {
		if (code && !selectInvite) {
			dispatch(inviteActions.getLinkInvite({ inviteId: code }));
		}
	}, [code]);

	useEffect(() => {
		fetchInviteData();
	}, [fetchInviteData]);

	const handleJoinClanInvite = async () => {
		const store = await getStoreAsync();
		try {
			store.dispatch(appActions.setLoadingMainMobile(true));
			const isClanLimit = checkClanLimit();
			if (isClanLimit) {
				onDismiss();
				store.dispatch(appActions.setLoadingMainMobile(false));
				return;
			}
			const res = await inviteUser(code || '');
			if (res?.clan_id) {
				requestAnimationFrame(async () => {
					navigation.navigate(APP_SCREEN.HOME);
					await remove(STORAGE_CHANNEL_CURRENT_CACHE);
					await store.dispatch(clansActions.fetchClans({ noCache: true }));
					store.dispatch(clansActions.joinClan({ clanId: res?.clan_id }));
					store.dispatch(clansActions.changeCurrentClan({ clanId: res?.clan_id }));
					save(STORAGE_CLAN_ID, res?.clan_id);
					store.dispatch(appActions.setLoadingMainMobile(false));
					navigation.navigate(APP_SCREEN.BOTTOM_BAR);
				});
			} else {
				Toast.show({
					type: 'error',
					text1: 'Something went wrong',
					text2: res?.statusText || 'Please try again later'
				});
				store.dispatch(appActions.setLoadingMainMobile(false));
			}
		} catch (e) {
			store.dispatch(appActions.setLoadingMainMobile(false));
		}
	};

	const onDismiss = async () => {
		navigation.navigate(APP_SCREEN.BOTTOM_BAR);
	};
	return (
		<View style={styles.container} {...testProperties('inviteClan_screen', true)}>
			<View style={styles.inviteContainer} {...testProperties('inviteClan_inviteContainer', true)}>
				<Text style={styles.inviteTitle} {...testProperties('inviteClan_title')}>{t('title')}</Text>

				{selectInvite && (
					<View style={styles.clanInfo} {...testProperties('inviteClan_clanInfo', true)}>
						{selectInvite?.clan_logo ? (
							<View style={styles.clanAvatar} {...testProperties('inviteClan_clanAvatar', true)}>
								<ImageNative style={styles.clanAvatar} resizeMode={'contain'} url={selectInvite.clan_logo} />
							</View>
						) : (
							<View style={styles.defaultAvatar} {...testProperties('inviteClan_defaultAvatar', true)}>
								<Text style={styles.defaultAvatarText} {...testProperties('inviteClan_defaultAvatarText')}>
									{selectInvite?.clan_name?.charAt(0)?.toUpperCase()}
								</Text>
							</View>
						)}

						<View style={styles.clanNameRow} {...testProperties('inviteClan_clanNameRow', true)}>
							<Text style={styles.clanName} numberOfLines={1} {...testProperties('inviteClan_clanName')}>
								{selectInvite?.clan_name}
							</Text>
							{selectInvite?.clan_name && (
								<View {...testProperties('inviteClan_verifyIcon')}>
									<MezonIconCDN icon={IconCDN.verifyIcon} width={size.s_16} height={size.s_16} color={themeValue.textStrong} />
								</View>
							)}
						</View>
						{selectInvite?.channel_label && (
							<Text style={styles.channelName} numberOfLines={1} {...testProperties('inviteClan_channelName')}>
								# {selectInvite?.channel_label}
							</Text>
						)}
					</View>
				)}

				<TouchableOpacity style={styles.joinButton} onPress={handleJoinClanInvite} activeOpacity={0.8} {...testProperties('inviteClan_joinButton')}>
					<Text style={styles.joinButtonText}>{t('join')}</Text>
				</TouchableOpacity>
				<TouchableOpacity style={[styles.joinButton, styles.disMissButton]} onPress={onDismiss} activeOpacity={0.8} {...testProperties('inviteClan_dismissButton')}>
					<Text style={styles.joinButtonText}>{t('noThanks')}</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default InviteClanScreen;
