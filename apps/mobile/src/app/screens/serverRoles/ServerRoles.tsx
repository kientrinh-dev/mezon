import { usePermissionChecker } from '@mezon/core';
import { baseColor, size, useTheme } from '@mezon/mobile-ui';
import { RolesClanEntity, selectAllRolesClan } from '@mezon/store-mobile';
import { EPermission } from '@mezon/utils';
import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, Platform, Pressable, Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import MezonIconCDN from '../../componentUI/MezonIconCDN';
import { SeparatorWithLine } from '../../components/Common';
import ImageNative from '../../components/ImageNative';
import { IconCDN } from '../../constants/icon_cdn';
import { APP_SCREEN, MenuClanScreenProps } from '../../navigation/ScreenTypes';
import { style } from './styles';
import { testProperties } from '../../configs/testProperties';

type ClanSettingsScreen = typeof APP_SCREEN.MENU_CLAN.ROLE_SETTING;
export const ServerRoles = ({ navigation }: MenuClanScreenProps<ClanSettingsScreen>) => {
	const { t } = useTranslation('clanRoles');
	const rolesClan = useSelector(selectAllRolesClan);
	const { themeValue } = useTheme();
	const styles = style(themeValue);
	const [hasAdminPermission, hasManageClanPermission, isClanOwner] = usePermissionChecker([
		EPermission.administrator,
		EPermission.manageClan,
		EPermission.clanOwner
	]);
	const allClanRoles = useMemo(() => {
		if (!rolesClan || rolesClan?.length === 0) return [];
		return (rolesClan || []).map((role) => ({ ...role, isView: !(hasAdminPermission || hasManageClanPermission || isClanOwner) }));
	}, [rolesClan, hasAdminPermission, hasManageClanPermission, isClanOwner]);

	const everyoneRole = useMemo(() => {
		return rolesClan?.find((role) => role?.slug === `everyone-${role?.clan_id}`);
	}, [rolesClan]);

	useEffect(() => {
		navigation.setOptions({
			headerStatusBarHeight: Platform.OS === 'android' ? 0 : undefined,
			headerRight: () => (
				<Pressable style={styles.addRole} onPress={() => navigation.navigate(APP_SCREEN.MENU_CLAN.CREATE_NEW_ROLE)}>
					<MezonIconCDN icon={IconCDN.plusLargeIcon} height={size.s_20} width={size.s_20} color={themeValue.textStrong} />
				</Pressable>
			)
		});
	}, [navigation, t, themeValue.textStrong]);

	const navigateToRoleEveryone = () => {
		navigation.navigate(APP_SCREEN.MENU_CLAN.SETUP_PERMISSIONS, { roleId: everyoneRole?.id });
	};

	const navigateToRoleDetail = (clanRole: RolesClanEntity) => {
		navigation.navigate(APP_SCREEN.MENU_CLAN.ROLE_DETAIL, { role: clanRole });
	};
	return (
		<View style={styles.container} {...testProperties('serverRoles.container', true)}>
			<View style={styles.header} {...testProperties('serverRoles.header', true)}>
				<Text style={styles.description}>{t('roleDescription')}</Text>
			</View>

			<TouchableOpacity onPress={navigateToRoleEveryone} {...testProperties('serverRoles.everyone.btn')}>
				<View style={styles.everyOneRole} {...testProperties('serverRoles.everyone.container', true)}>
					<View style={styles.editButton}>
						<View style={styles.leadIcon} {...testProperties('serverRoles.everyone.iconWrapper', true)}>
							<MezonIconCDN icon={IconCDN.groupIcon} color={themeValue.text} />
						</View>
						<View style={styles.flex} {...testProperties('serverRoles.everyone.textWrapper', true)}>
							<Text style={styles.text} {...testProperties('serverRoles.everyone.title')}>@everyone</Text>
							<Text style={styles.normalText} numberOfLines={1} {...testProperties('serverRoles.everyone.subtitle')}>
								{t('defaultRole')}
							</Text>
						</View>
					</View>
					<MezonIconCDN icon={IconCDN.chevronSmallRightIcon} color={themeValue.text} />
				</View>
			</TouchableOpacity>

			<View style={styles.roles} {...testProperties('serverRoles.roles', true)}>
				<Text style={styles.normalText} {...testProperties('serverRoles.roles.count')}>
					{t('roles')} - {allClanRoles?.length - 1 || '0'}
				</Text>
				{allClanRoles.length ? (
					<View style={styles.listRolePanel} {...testProperties('serverRoles.roleListPanel', true)}>
						<View style={styles.roleList} {...testProperties('serverRoles.roleList', true)}>
							<FlatList
								data={allClanRoles}
								scrollEnabled
								showsVerticalScrollIndicator={false}
								keyExtractor={(item) => item.id}
								initialNumToRender={1}
								maxToRenderPerBatch={1}
								windowSize={2}
								{...testProperties('serverRoles.roleList.flatList', true)}
								renderItem={({ item, index }) => {
									return (
										<TouchableOpacity onPress={() => navigateToRoleDetail(item)} {...testProperties(`serverRoles.roleItem.btn.${item.id}`)}>
											<View style={styles.roleItem} {...testProperties(`serverRoles.roleItem.container.${item.id}`)}>
												<MezonIconCDN
													icon={IconCDN.shieldUserIcon}
													color={item?.color || baseColor.gray}
													height={size.s_32}
													width={size.s_32}
												/>
												{!!item?.role_icon && (
													<ImageNative url={item?.role_icon} style={{ height: size.s_32, width: size.s_32 }} />
												)}
												<View style={styles.flex} {...testProperties(`serverRoles.roleItem.textArea.${item.id}`, true)}>
													<View style={styles.itemTitle} {...testProperties(`serverRoles.roleItem.titleRow.${item.id}`, true)}>
														<Text style={styles.text} {...testProperties(`serverRoles.roleItem.title.${item.id}`)}>{item.title}</Text>
														{item?.isView && (
															<MezonIconCDN
																icon={IconCDN.lockIcon}
																color={themeValue.textDisabled}
																height={size.s_16}
																width={size.s_16}
															/>
														)}
													</View>
													<Text style={styles.normalText} {...testProperties(`serverRoles.roleItem.memberCount.${item.id}`)}>
														{item?.id === everyoneRole?.id
															? t('allMembers')
															: `${item?.role_user_list?.role_users?.length || '0'} - ${t('members')}`}
													</Text>
												</View>
												<View>
													<MezonIconCDN icon={IconCDN.chevronSmallRightIcon} color={themeValue.text} />
												</View>
											</View>
											{index !== allClanRoles.length - 1 && <SeparatorWithLine />}
										</TouchableOpacity>
									);
								}}
							/>
						</View>
					</View>
				) : (
					<View style={styles.emptyRole} {...testProperties('serverRoles.empty', true)}>
						<Text style={styles.emptyText} {...testProperties('serverRoles.empty.text')}>{t('noRole')}</Text>
					</View>
				)}
			</View>
		</View>
	);
};
