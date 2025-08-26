import { mentionRegex, mentionRegexSplit } from '@mezon/mobile-components';
import { selectEmojiObjSuggestion } from '@mezon/store-mobile';
import React from 'react';
import { Text } from 'react-native';
import { useSelector } from 'react-redux';
import { highlightEmojiRegex } from '../../../../../utils/helpers';
import { styles } from './RenderTextContent.styles';

interface RenderTextContentProps {
	text: string;
}

export const RenderTextContent = ({ text }: RenderTextContentProps) => {
	const emojiObjPicked = useSelector(selectEmojiObjSuggestion);

	const renderChannelMention = (channelLabel: string) => {
		return (
			<Text>
				<Text style={styles.contentMessageMention}>{channelLabel.slice(1, -1) || ''}</Text>
			</Text>
		);
	};

	const renderUserMention = (id: string) => {
		return (
			<Text>
				<Text style={styles.contentMessageMention}>{`@${id?.slice(2, -1)}`}</Text>
			</Text>
		);
	};

	const renderMention = (id: string) => {
		return id.startsWith('@') ? <Text>{renderUserMention(id)}</Text> : id.startsWith('<#') ? renderChannelMention(id) : <Text />;
	};

	const renderTextWithMention = (text: string, matchesMention: RegExpMatchArray) => {
		const parts = text?.split(mentionRegexSplit)?.filter(Boolean);
		return parts?.map?.((part, index) => (
			<Text key={`${index}-${part}-renderTextWithMention'}`}>
				{!part ? (
					<Text />
				) : matchesMention.includes(part) ? (
					renderMention(part)
				) : highlightEmojiRegex.test(part) ? (
					<Text style={styles.contentMessageBox}>{renderTextWithEmoji(part)}</Text>
				) : (
					<Text>{part}</Text>
				)}
			</Text>
		));
	};

	const renderTextWithEmoji = (text: string) => {
		const parts = text?.split?.(highlightEmojiRegex);
		return parts?.map?.((part, index) => {
			const isEmojiPattern = highlightEmojiRegex.test(part);
			const isHighlighted = isEmojiPattern ? !!emojiObjPicked[part] : false;
			return (
				<Text key={`${index}-${part}-renderTextWithMention`} style={isHighlighted && { fontWeight: 'bold', color: '#5a62f4' }}>
					{part}
				</Text>
			);
		});
	};

	const matchesMention = text?.match(mentionRegex);
	if (matchesMention?.length) {
		return <Text>{renderTextWithMention(text, matchesMention)}</Text>;
	} else {
		return <Text>{renderTextWithEmoji(text)}</Text>;
	}
};
