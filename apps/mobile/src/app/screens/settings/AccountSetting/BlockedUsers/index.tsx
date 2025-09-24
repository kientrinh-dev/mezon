import { useFriends } from '@mezon/core';
import { baseColor, useTheme } from '@mezon/mobile-ui';
import { FriendsEntity, selectBlockedUsers } from '@mezon/store-mobile';
import { createImgproxyUrl } from '@mezon/utils';
import { useTranslation } from 'react-i18next';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { useSelector } from 'react-redux';
import MezonIconCDN from '../../../../componentUI/MezonIconCDN';
import { IconCDN } from '../../../../constants/icon_cdn';
import { APP_SCREEN, SettingScreenProps } from '../../../../navigation/ScreenTypes';
import { style } from './styles';
import { testProperties } from '../../../../configs/testProperties';

type BlockedUsersScreen = typeof APP_SCREEN.SETTINGS.BLOCKED_USERS;
export const BlockedUsers = ({ navigation }: SettingScreenProps<BlockedUsersScreen>) => {
	const { themeValue } = useTheme();
	const styles = style(themeValue);
	const { t } = useTranslation(['accountSetting', 'userProfile']);
	const blockedUsers = useSelector(selectBlockedUsers);
	const { unBlockFriend } = useFriends();

	const handleUnblockFriend = async (user: FriendsEntity) => {
		try {
			const isUnblocked = await unBlockFriend(user?.user?.username, user?.user?.id);
			if (isUnblocked) {
				Toast.show({
					type: 'success',
					props: {
						text2: t('notification.unblockUser.success', { ns: 'userProfile' }),
						leadingIcon: <MezonIconCDN icon={IconCDN.checkmarkSmallIcon} color={baseColor.green} width={20} height={20} />
					}
				});
			}
		} catch (error) {
			Toast.show({
				type: 'error',
				props: {
					text2: t('notification.unblockUser.error', { ns: 'userProfile' }),
					leadingIcon: <MezonIconCDN icon={IconCDN.closeIcon} color={baseColor.redStrong} width={20} height={20} />
				}
			});
		}
	};

	const renderBlockedUser = ({ item }: { item: FriendsEntity }) => (
		<View style={styles.userItem} {...testProperties(`settings.blockedUsers.item.${item?.id}`)}>
			<View style={styles.userInfo} {...testProperties(`settings.blockedUsers.item.${item?.id}.info`, true)}>
				{item?.user?.avatar_url ? (
					<Image source={{ uri: createImgproxyUrl(item?.user?.avatar_url) }} style={styles.avatar} />
				) : (
					<View style={styles.avatarPlaceholder} {...testProperties(`settings.blockedUsers.item.${item?.id}.avatarPlaceholder`, true)}>
						<Text style={styles.avatarText} {...testProperties(`settings.blockedUsers.item.${item?.id}.avatarText`)}>{(item?.user?.username?.[0] || '').toUpperCase()}</Text>
					</View>
				)}
				<Text style={styles.username} {...testProperties(`settings.blockedUsers.item.${item?.id}.username`)}>{item?.user?.username}</Text>
			</View>

			<TouchableOpacity style={styles.unblockButton} onPress={() => handleUnblockFriend(item)} {...testProperties(`settings.blockedUsers.item.${item?.id}.unblock`)}>
				<Text style={styles.unblockText} {...testProperties(`settings.blockedUsers.item.${item?.id}.unblock.text`)}>{t('pendingContent.unblock', { ns: 'userProfile' })}</Text>
			</TouchableOpacity>
		</View>
	);

	return (
		<View style={styles.container} {...testProperties('settings.blockedUsers.screen', true)}>
			{blockedUsers?.length > 0 ? (
				<FlatList
					data={blockedUsers}
					renderItem={renderBlockedUser}
					keyExtractor={(item) => item?.id}
					showsVerticalScrollIndicator={false}
					contentContainerStyle={styles.listContent}
					initialNumToRender={1}
					maxToRenderPerBatch={1}
					windowSize={2}
					{...testProperties('settings.blockedUsers.list', true)}
				/>
			) : (
				<View style={styles.emptyContainer} {...testProperties('settings.blockedUsers.empty', true)}>
					<Text style={styles.emptyText} {...testProperties('settings.blockedUsers.empty.text')}>{t('doNotHaveBlockedUser')}</Text>
				</View>
			)}
		</View>
	);
};
