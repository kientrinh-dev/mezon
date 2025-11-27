import { useTheme } from '@mezon/mobile-ui';
import { Text, View } from 'react-native';
import { Pressable } from 'react-native-gesture-handler';
import { testProperties } from '../../configs/testProperties';
import { style } from './styles';

interface IMezonButtonIconProps {
	onPress?: () => void;
	icon: any;
	title: string;
}

export default function MezonButtonIcon({ title, icon, onPress }: IMezonButtonIconProps) {
	const styles = style(useTheme().themeValue);
	return (
		<Pressable onPress={onPress} style={styles.container} {...testProperties('mezonButtonIcon.container')}>
			<View style={styles.iconWrapper} {...testProperties('mezonButtonIcon.iconWrapper')}>
				{icon}
			</View>
			<Text style={styles.title} {...testProperties('mezonButtonIcon.title')}>
				{title}
			</Text>
		</Pressable>
	);
}
