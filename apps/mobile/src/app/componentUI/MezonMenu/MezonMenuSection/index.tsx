import { useTheme } from '@mezon/mobile-ui';
import { Text, View } from 'react-native';
import MezonMenuItem, { IMezonMenuItemProps } from '../MezonMenuItem';
import { style } from './styles';
import { testProperties } from '../../../configs/testProperties';

export interface IMezonMenuSectionProps {
	title?: string;
	bottomDescription?: string;
	items: IMezonMenuItemProps[];
}

export default function MezonMenuSection({ title, items, bottomDescription }: IMezonMenuSectionProps) {
	const styles = style(useTheme().themeValue);

	return (
		<View>
			{title && <Text style={styles.sectionTitle} {...testProperties(`mezonMenuSection.sectionTitle.${title}`)}>{title}</Text>}

			<View style={styles.section}>
				{items.map((item, index) => (
					<MezonMenuItem isLast={index === items?.length - 1} key={index.toString()} {...item}/>
				))}
			</View>

			{bottomDescription && <Text style={styles.sectionDescription} {...testProperties(`mezonMenuSection.sectionDescription.${title}`)}>{bottomDescription}</Text>}
		</View>
	);
}
