import { useInvite } from '@mezon/core';
import {
	STORAGE_CHANNEL_CURRENT_CACHE,
	STORAGE_CLAN_ID,
	inviteLinkRegex,
	remove,
	save,
	setCurrentClanLoader,
	setDefaultChannelLoader,
	validLinkInviteRegex
} from '@mezon/mobile-components';
import { size, useTheme } from '@mezon/mobile-ui';
import { channelsActions, clansActions, getStoreAsync } from '@mezon/store-mobile';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Keyboard, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import MezonInput from '../../../../../componentUI/MezonInput';
import { MezonModal } from '../../../../../componentUI/MezonModal';
import { ErrorInput } from '../../../../../components/ErrorInput';
import { styles } from './JoinClanModal.styles';

type JoinClanModalProps = {
	visible: boolean;
	setVisible: (value: boolean) => void;
};
const JoinClanModal = ({ visible, setVisible }: JoinClanModalProps) => {
	const [inviteLink, setInviteLink] = useState<string>('');
	const { inviteUser } = useInvite();
	const [isValidInvite, setIsValidInvite] = useState<boolean>(true);
	const { t } = useTranslation(['userEmptyClan']);
	const { themeValue } = useTheme();

	const joinChannel = async () => {
		setIsValidInvite(validLinkInviteRegex.test(inviteLink));
		if (!validLinkInviteRegex.test(inviteLink)) return;
		const store = await getStoreAsync();
		const inviteId = extractIdFromUrl(inviteLink || '');
		inviteUser(inviteId || '').then(async (res) => {
			if (res && res?.clan_id) {
				await remove(STORAGE_CHANNEL_CURRENT_CACHE);
				store.dispatch(clansActions.joinClan({ clanId: res?.clan_id }));
				save(STORAGE_CLAN_ID, res?.clan_id);
				const clanResp: any = await store.dispatch(clansActions.fetchClans({ noCache: true }));
				await setCurrentClanLoader(clanResp?.payload?.clans || clanResp?.payload);
				store.dispatch(clansActions.changeCurrentClan({ clanId: res?.clan_id }));
				const respChannel = await store.dispatch(channelsActions.fetchChannels({ clanId: res?.clan_id }));
				await setDefaultChannelLoader(respChannel.payload, res?.clan_id);
				setVisible(false);
			}
		});
	};

	const extractIdFromUrl = (url: string): string | null => {
		const match = url?.match(inviteLinkRegex);
		return match ? match[1] : null;
	};

	return (
		<MezonModal
			visible={visible}
			visibleChange={(visible) => {
				setVisible(visible);
			}}
			headerStyles={styles.headerModal}
		>
			<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
				<View style={{ width: '100%', height: '100%', paddingHorizontal: size.s_10, paddingVertical: size.s_10, position: 'relative' }}>
					<View style={{ marginBottom: size.s_40 }}>
						<Text style={[styles.title, { color: themeValue.text }]}>{t('joinClan.joinExistClan')}</Text>
						<Text style={[styles.description, { color: themeValue.textDisabled }]}>{t('joinClan.enterInvite')}</Text>
					</View>
					<View>
						<MezonInput
							label={t('joinClan.labelInput')}
							onTextChange={setInviteLink}
							placeHolder={`https://mezon.ai/invite/1813407038846046912`}
							value={inviteLink}
						/>
						{!isValidInvite && <ErrorInput errorMessage={t('joinClan.errorMessage')} />}
						<Text style={[styles.textExample, { color: themeValue.textDisabled }]}>{t('joinClan.linkInviteEx')}</Text>
					</View>
					<TouchableOpacity onPress={() => joinChannel()} style={styles.btnInvite}>
						<Text style={styles.textInviteBtn}>{t('joinClan.joinInviteLink')}</Text>
					</TouchableOpacity>
				</View>
			</TouchableWithoutFeedback>
		</MezonModal>
	);
};

export default JoinClanModal;
