import Ember from 'ember';
import postRobot from 'post-robot';

const { Logger } = Ember;

export default Ember.Route.extend({
  model(/*params, transition*/) {
    return {
      terms: 'uno dos',
      ola: 'olaaaa'
    };
  },

  oldAppListener: null,

  listenToOldApp: Ember.on('activate', function() {
    let listener = this.get('oldAppListener');
    let currentRoute = this;

    if (!listener) {
      Logger.log("Connecting to the old-app messages here...");
      let listener = postRobot.on('com.icalialabs.demo.old-app.search', function(event) {
        Logger.log('[New App] receiving...', event.data);
        Logger.log('[New App] currentRoute.currentModel: ', currentRoute.currentModel);
        currentRoute.set('currentModel.terms', event.data.terms);
        return { someText: 'Some Text' };
      });

      this.set('oldAppListener', listener);
    }
  }),

  unlistenOldApp: Ember.on('deactivate', function(){
    let listener = this.get('oldAppListener');

    if (!!listener) {
      Logger.info('Cancelling and unsetting listener');
      listener.cancel();
      this.set('oldAppListener', null);
    }
  })
});
