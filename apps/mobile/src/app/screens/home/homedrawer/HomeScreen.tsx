import { selectCurrentChannel, selectDmGroupCurrentId } from '@mezon/store-mobile';
import { checkIsThread, isPublicChannel } from '@mezon/utils';
import React from 'react';
import { useSelector } from 'react-redux';
import { View } from 'react-native';
import { testProperties } from '../../../configs/testProperties';
import HomeDefault from './HomeDefault';
import NoChannelSelected from './NoChannelSelected';

const HomeScreen = React.memo((props: any) => {
	const currentChannel = useSelector(selectCurrentChannel);
	const currentDirectId = useSelector(selectDmGroupCurrentId);
	if (!currentChannel && !currentDirectId) {
		return (
			<View style={{ flex: 1 }} {...testProperties('homeScreen.noChannel', true)}>
				<NoChannelSelected />
			</View>
		);
	}

	const isPublic = isPublicChannel(currentChannel);
	const isThread = checkIsThread(currentChannel);
	return (
		<View style={{ flex: 1 }} {...testProperties('homeScreen', true)}>
			<HomeDefault
				{...props}
				channelId={currentChannel?.channel_id}
				clanId={currentChannel?.clan_id}
				isPublicChannel={isPublic}
				isThread={isThread}
				channelType={currentChannel?.type}
			/>
		</View>
	);
});

HomeScreen.displayName = 'HomeScreen';

export default HomeScreen;
