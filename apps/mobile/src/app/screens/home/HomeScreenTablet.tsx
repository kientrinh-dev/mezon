import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import useTabletLandscape from '../../hooks/useTabletLandscape';
import HomeScreen from './homedrawer/HomeScreen';
import ServerAndChannelList from './homedrawer/ServerAndChannelList';
import { styles } from './styles';
import { testProperties } from '../../configs/testProperties';

const HomeScreenTablet = React.memo(() => {
	const isTabletLandscape = useTabletLandscape();
	const navigation = useNavigation<any>();
	if (isTabletLandscape) {
		return (
			<View style={styles.container} {...testProperties('home.tablet', true)}>
				<View style={styles.containerDrawerContent} {...testProperties('home.tablet.leftPane', true)}>
					<ServerAndChannelList isTablet={true} />
				</View>
				<View style={styles.containerHomeDefault} {...testProperties('home.tablet.rightPane', true)}>
					<HomeScreen navigation={navigation} />
				</View>
			</View>
		);
	}

	return <ServerAndChannelList />;
});

export default HomeScreenTablet;
