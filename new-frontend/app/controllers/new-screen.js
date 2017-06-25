import Ember from 'ember';

const { Logger } = Ember;

export default Ember.Controller.extend({
  actions: {
    doSearch(searchTerms) {
      // We will just set the displayed search terms - the route's template just displays it:
      this.set('model.displayedTerms', searchTerms);
    }
  }
});
