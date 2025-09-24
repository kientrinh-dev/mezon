import { useEffect, useMemo, useState } from 'react';
import { View } from 'react-native';
import MezonMenu, { IMezonMenuItemProps, IMezonMenuSectionProps } from '../MezonMenu';
import MezonRadioButton from '../MezonRadioButton';
import { testProperties } from '../../configs/testProperties';

export type IMezonOptionData = (Omit<IMezonMenuItemProps, 'onPress'> & {
	value: number | string | boolean;
})[];

interface IMezonOptionProps extends Omit<IMezonMenuSectionProps, 'items'> {
	onChange?: (value: number | string | boolean) => void;
	data: IMezonOptionData;
	value?: number | string | boolean;
}

export default function MezonOption({ data, onChange, value, ...menuProps }: IMezonOptionProps) {
	const [currentValue, setCurrentValue] = useState<number | string | boolean>(value || 0);
	useEffect(() => {
		setCurrentValue(value);
	}, [value]);

	function handleChange(value: number | string | boolean) {
		setCurrentValue(value);
		onChange && onChange(value);
	}
	const menu = useMemo(
		() =>
			[
				{
					items: data.map(({ value, disabled, ...props }) => ({
						...props,
						component: (
							<MezonRadioButton
								checked={value === currentValue}
								onChange={() => handleChange(value)}
								noSwitchFalse
								disabled={disabled}
								{...testProperties(`mezonOption.radioButton.${value}`)}
							/>
						),
						disabled,
						onPress: () => !disabled && handleChange(value),
						...testProperties(`mezonOption.item.${value}`)
					})),
					...menuProps
				}
			] satisfies IMezonMenuSectionProps[],
		[data, currentValue]
	);

	return (
		<View {...testProperties('mezonOption.container')}>
			<MezonMenu menu={menu} />
		</View>
	);
}
