import { acitvitiesActions, directActions, selectDirectsOpenlistOrder, useAppDispatch } from '@mezon/store-mobile';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import MessagesScreenRender from './MessagesScreenRender';
import { View } from 'react-native';
import { testProperties } from '../../configs/testProperties';

const MessagesScreen = () => {
	const dmGroupChatList = useSelector(selectDirectsOpenlistOrder);
	const dispatch = useAppDispatch();
	useFocusEffect(
		useCallback(() => {
			dispatch(directActions.fetchDirectMessage({ noCache: true }));
			dispatch(acitvitiesActions.listActivities({ noCache: true }));
		}, [dispatch])
	);
	return (
		<View {...testProperties('messages', true)}>
			<MessagesScreenRender chatList={JSON.stringify(dmGroupChatList)} />
		</View>
	);
};

export default MessagesScreen;
