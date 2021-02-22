/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import Api from './src/Api';

Api.setOnReceveMensagerBackground()
Api.onTokenRefresh()

AppRegistry.registerComponent(appName, () => App);
