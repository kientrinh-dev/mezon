import { useTheme } from '@mezon/mobile-ui';
import { ReactNode } from 'react';
import { StyleProp, Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import { style } from './styles';
import { testProperties } from '../../configs/testProperties';

export interface IMezonFakeBoxProps {
	title?: string;
	titleStyle?: StyleProp<TextStyle>;
	titleUppercase?: boolean;
	prefixIcon?: ReactNode;
	postfixIcon?: ReactNode;
	value: string;
	containerStyle?: StyleProp<ViewStyle>;
	onPress?: () => void;
}

export default function MezonFakeInputBox({
	title,
	titleStyle,
	titleUppercase,
	prefixIcon,
	postfixIcon,
	value,
	containerStyle,
	onPress
}: IMezonFakeBoxProps) {
	const { themeValue } = useTheme();
	const styles = style(themeValue);

	return (
		<View {...testProperties('mezonFakeBox.container')}>
			{title && <Text style={[styles.sectionTitle, titleUppercase ? styles.titleUppercase : {}, titleStyle]} {...testProperties('mezonFakeBox.sectionTitle')}>{title}</Text>}

			<TouchableOpacity onPress={onPress} {...testProperties('mezonFakeBox.fakeInputBox')}>
				<View style={[styles.box, containerStyle]} {...testProperties('mezonFakeBox.box')}>
					{prefixIcon}
					<Text style={styles.textBox} {...testProperties('mezonFakeBox.textBox')}>{value}</Text>
					{postfixIcon}
				</View>
			</TouchableOpacity>
		</View>
	);
}
