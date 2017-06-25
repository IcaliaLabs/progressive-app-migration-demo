import Ember from 'ember';
import postRobot from 'post-robot';

const { Logger } = Ember;

export default Ember.Controller.extend({
  notifySuccess(event) {
    // Logger.log(event.source, event.origin, 'Event Data:', event.data);
  },

  notifyFailure(err) {
    // Handle any errors that stopped our call from going through
    Logger.error(err);
  },

  actions: {
    doSearch(searchTerms) {
      let oldAppFrame = window.document.getElementById('old-app-frame');

      // Since old-screen loads the remote app's UI, we'll send a message to it using postRobot:
      let notifySuccess = this.get('notifySuccess');
      let notifyFailure = this.get('notifyFailure');
      postRobot.send(oldAppFrame, 'com.icalialabs.demo.new-app.search', { terms: searchTerms })
               .then(notifySuccess)
               .catch(notifyFailure);
    }
  }
});
