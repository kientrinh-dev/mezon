import { size, useTheme } from '@mezon/mobile-ui';
import { selectChannelById, selectMemberClanByUserId, useAppSelector } from '@mezon/store-mobile';
import { ActionLog, convertTimeString, getAvatarForPrioritize } from '@mezon/utils';
import { ApiAuditLog } from 'mezon-js/api.gen';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import MezonAvatar from '../../../componentUI/MezonAvatar';
import { style } from './styles';
import { testProperties } from '../../../configs/testProperties';

type AuditLogItemProps = {
	data: ApiAuditLog;
};
//
export const AuditLogItem = memo(({ data }: AuditLogItemProps) => {
	const auditLogTime = convertTimeString(data?.time_log as string);
	const userAuditLogItem = useAppSelector((state) => selectMemberClanByUserId(state, data?.user_id ?? ''));
	const username = userAuditLogItem?.user?.username;
	const avatar = getAvatarForPrioritize(userAuditLogItem?.clan_avatar, userAuditLogItem?.user?.avatar_url);
	const { themeValue } = useTheme();
	const styles = style(themeValue);
	const userMention = useAppSelector((state) => selectMemberClanByUserId(state, data?.entity_id ?? ''));
	const usernameMention = userMention?.user?.username;
	const channel = useAppSelector((state) => selectChannelById(state, data?.channel_id || ''));
	const { t } = useTranslation('auditLog');
	const isAddAction =
		data?.action_log === ActionLog.ADD_MEMBER_CHANNEL_ACTION_AUDIT || data?.action_log === ActionLog.ADD_ROLE_CHANNEL_ACTION_AUDIT;

	const isRemoveAction =
		data?.action_log === ActionLog.REMOVE_MEMBER_CHANNEL_ACTION_AUDIT || data?.action_log === ActionLog.REMOVE_ROLE_CHANNEL_ACTION_AUDIT;

	const isChannelAction = isAddAction || isRemoveAction;

	const actionText = isAddAction ? t('auditLogItem.add') : t('auditLogItem.remove');
	const targetEntity =
		data?.action_log === ActionLog.ADD_MEMBER_CHANNEL_ACTION_AUDIT || data?.action_log === ActionLog.REMOVE_MEMBER_CHANNEL_ACTION_AUDIT
			? usernameMention
			: '';

	return (
		<View
			style={{
				flexDirection: 'row',
				padding: size.s_10,
				backgroundColor: themeValue.secondary,
				borderRadius: size.s_10,
				gap: size.s_10,
				alignItems: 'center',
				borderWidth: 1,
				borderColor: themeValue.tertiary,
				marginVertical: size.s_6
			}}
			{...testProperties(`auditLogItem.container.${data?.id}`)}
		>
			<MezonAvatar avatarUrl={avatar} username={username} height={size.s_36} width={size.s_36} />
			<View style={{ flex: 1 }} {...testProperties(`auditLogItem.view.${data?.id}`)}>
				<View>
					{isChannelAction && data?.channel_id !== '0' ? (
						<Text style={styles.actionText} {...testProperties(`auditLogItem.actionText.${data?.id}`)}>
							<Text style={styles.username} {...testProperties(`auditLogItem.actionText.username.${data?.id}`)}>{username}</Text>{' '}
							<Text {...testProperties(`auditLogItem.actionText.toChannel.${data?.id}`)}>
								{actionText} {targetEntity} ({data?.entity_id}) {t('auditLogItem.toChannel')}
							</Text>
							<Text {...testProperties(`auditLogItem.actionText.toChannel.channelLabel.${data?.id}`)}>
								{' '}
								#{channel?.channel_label} ({channel?.channel_id})
							</Text>
						</Text>
					) : (
						<Text style={styles.actionText} {...testProperties(`auditLogItem.actionText.${data?.id}`)}>
							<Text style={styles.username} {...testProperties(`auditLogItem.actionText.username.${data?.id}`)}>{username}</Text> <Text style={styles.lowercase} {...testProperties(`auditLogItem.actionText.actionLog.${data?.id}`)}>{data?.action_log}</Text>
							<Text {...testProperties(`auditLogItem.actionText.toChannel.entityName.${data?.id}`)}>
								{' '}
								#{data?.entity_name || data?.entity_id} {data?.entity_name && `(${data?.entity_id})`}
							</Text>
						</Text>
					)}
				</View>
				<Text style={styles.textTime} {...testProperties(`auditLogItem.textTime.${data?.id}`)}>{auditLogTime}</Text>
			</View>
		</View>
	);
});
