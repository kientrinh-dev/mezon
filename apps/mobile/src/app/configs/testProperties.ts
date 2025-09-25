import { Platform } from 'react-native';

export const IS_IOS = Platform.OS === 'ios';

function testProperties(id: string, disableAccessible = false): { accessible?: boolean; accessibilityLabel?: string; testID?: string } {
	const disableAccessibility = disableAccessible ? { accessible: false } : {};

	if (IS_IOS) return { ...disableAccessibility, testID: id };
	return { ...disableAccessibility, accessibilityLabel: id };
}

function testTabProperties(id: string) {
	return Platform.select({
		ios: { tabBarTestID: id, tabBarAccessibilityLabel: id },
		android: { tabBarAccessibilityLabel: id }
	});
}

export { testProperties, testTabProperties };
