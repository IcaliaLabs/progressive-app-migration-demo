import Ember  from 'ember';
const { Logger } = Ember;

export default Ember.Component.extend({
  tagName: 'nav',
  classNames: ['top-bar'],

  debounceTime: 500,

  // init() {
  //   this._super(...arguments);
  // },

  // Default implementation - you can override this by setting the "onSearchTermsChange" property:
  onSearchTermsChange: function(searchTerms) {
    Logger.log('TopBar Component - onSearchTermsChange (Default) - searchTerms:', searchTerms);
  },

  actions: {
    emitTerms: function() {
      // the target method has to be defined in the component object, not in the actions object:
      Ember.run.debounce(this, this.get('doEmitTerms'), this.get('debounceTime'));
    }
  },

  doEmitTerms: function() {
    let onSearchTermsChange = this.get('onSearchTermsChange');
    // perform the save logic here
    Logger.log('TopBar Component - doEmitTerms - this.terms:', this.terms);
    return onSearchTermsChange(this.terms);
  }
});
