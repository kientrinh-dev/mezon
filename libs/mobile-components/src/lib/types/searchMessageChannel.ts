import { SearchMessageEntity } from '@mezon/store-mobile';
import React from 'react';

export interface IOption {
	title: string;
	content: string;
	value: string;
	icon?: React.ReactElement;
}
export interface IOptionSearchProps {
	option: IOption;
	onSelect: (option: IOption) => void;
}

export enum ACTIVE_TAB {
	MEMBER = 0,
	CHANNEL = 1,
	MESSAGES = 2
}

export interface ITabList {
	title: string;
	quantitySearch: number;
	display: boolean;
	index?: number;
}

export interface IUserMention {
	id: string | number;
	display: string;
	avatarUrl: string;
	subDisplay: string;
}

export enum ITypeOptionSearch {
	FROM = '>',
	MENTIONS = '~',
	HAS = '&',
	BEFORE = 'before',
	DURING = 'during',
	AFTER = 'after',
	PINED = 'pinned'
}

export type GroupedMessages = {
	label: string;
	messages: SearchMessageEntity[];
}[];

export const ChannelTypeHeader = 'HEADER';

export interface IUerMention {
	avatarUrl: string;
	display: string;
	id: string;
	subDisplay: string;
}
