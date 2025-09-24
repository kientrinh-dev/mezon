import { size } from '@mezon/mobile-ui';
import { View, ViewProps } from 'react-native';
import { IMezonMenuItemProps } from './MezonMenuItem';
import MezonMenuSection, { IMezonMenuSectionProps } from './MezonMenuSection';
import { testProperties } from '../../configs/testProperties';

interface IMezonMenu extends ViewProps {
	menu: IMezonMenuSectionProps[];
	marginVertical?: number | null;
}

export default function MezonMenu({ menu, marginVertical = size.s_18, ...rest }: IMezonMenu) {
	return (
		<View style={{ gap: size.s_12, paddingBottom: size.s_18, marginVertical }} {...testProperties('mezonMenu.container')} {...rest}>
			{menu.map((item, index) => (
				<MezonMenuSection key={index.toString()} {...item} />
			))}
		</View>
	);
}

export const reserve = () => {
	// Toast.show({
	// 	type: 'info',
	// 	text1: 'Coming soon'
	// });
};

export { IMezonMenuItemProps, IMezonMenuSectionProps };
