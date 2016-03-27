import {App, IonicApp, Platform, NavController, Component} from 'ionic-angular';
import {CardBoardData} from './models/cardboarddata';
import {IntroPage} from './pages/intro/intro';
import {SettingsModal} from './pages/settings/settings';


@App({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
  config: {} // http://ionicframework.com/docs/v2/api/config/Config/
})
export class BoilerVR {

  static get parameters() {
    return [[IonicApp], [Platform]];
  }

  constructor(app, platform) {
    this.Data = new CardBoardData();
    this.app = app;
    this.isNative = false;
    this.pages = [
      { title: 'CardboardVR', component: IntroPage }
    ];
    this.rootPage = IntroPage;
    platform.ready().then(() => {
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);
      }
      platform.fullScreen();
      if (window.StatusBar) {
        return StatusBar.hide();
      }
    });
  }
}
