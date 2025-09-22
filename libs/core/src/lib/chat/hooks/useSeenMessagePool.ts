// Last seen message update mechanism
// Every time message component is rendered
// component triggers updateLastSeenMessage action
// action contains channelId, messageId, message create time
// push action into cache, keep the payload with the latest create time
// set timeout to 1 second, if no new action comes in, send the latest action to clan

import { channelMetaActions, directMetaActions, messagesActions, MessagesEntity, useAppDispatch } from '@mezon/store';
import { TIME_OFFSET } from '@mezon/utils';
import { ChannelStreamMode } from 'mezon-js';
import { useCallback, useMemo } from 'react';

export function useSeenMessagePool() {
	const dispatch = useAppDispatch();

	const markAsReadSeen = useCallback((message: MessagesEntity, mode: number, badge_count: number) => {
		dispatch(
			messagesActions.updateLastSeenMessage({
				clanId: message?.clan_id || '',
				channelId: message?.channel_id,
				messageId: message?.id,
				mode,
				badge_count
			})
		);
		const timestamp = Date.now() / 1000;
		if (mode === ChannelStreamMode.STREAM_MODE_CHANNEL || mode === ChannelStreamMode.STREAM_MODE_THREAD) {
			dispatch(
				channelMetaActions.setChannelLastSeenTimestamp({
					channelId: message?.channel_id,
					timestamp: timestamp + TIME_OFFSET
				})
			);
		}
		if (mode === ChannelStreamMode.STREAM_MODE_GROUP || mode === ChannelStreamMode.STREAM_MODE_DM) {
			dispatch(directMetaActions.updateLastSeenTime(message));
		}
	}, []);

	return useMemo(
		() => ({
			markAsReadSeen
		}),
		[markAsReadSeen]
	);
}
