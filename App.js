import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Router, Stack, Scene } from 'react-native-router-flux';

import Main from './src/components/main';
import NewRequest from './src/components/new-request';
import LocationMap from './src/components/location-map';

class App extends Component {
	render() {
		return (
			<Router>
				<Stack key="root" hideNavBar>
					<Stack key="main" titleStyle={styles.titleStyle}>
						<Scene key="reportIssue" component={Main} title="Reportar un problema" initial/>
						<Scene key="newRequest" component={NewRequest} title="Nueva Solicitud" titleStyle={styles.requestTitleStyle} />
						<Scene key="locationMap" component={LocationMap} title="Ubicación" rightTitle="Siguiente" onRight={() => console.log('Next')} />
					</Stack>
				</Stack>
			</Router>
		);
	}
}

const styles = StyleSheet.create({
    titleStyle: {
			flex: 1,
			textAlign: 'center'
		},
		requestTitleStyle: {
			position: 'relative',
			left: 70
		}
});

export default App;