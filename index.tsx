import {AppRegistry} from 'react-native';
import App from './App';
import {expo as appConfig} from './app.json'; 

AppRegistry.registerComponent(appConfig.name, () => App);
