import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'div',
  classNames: ['ui','selection','fluid','dropdown'],
  classNameBindings: ['multiple','isSearchEnabled:search', 'disabled'],
  isSearchEnabled: Ember.computed.and('search','isComponentEnabled'),
  isComponentEnabled: Ember.computed.not('disabled'),
  allowAdditions: false,
  maxSelections: false,
  disabled: false,
  multiple: false,
  debug: false,
  search: true,
  selecting: 'selected',

  configure(){
    const options = Ember.getProperties(this, 'allowAdditions', 'maxSelections', 'debug', 'multiple' );
    const selectedElements = Ember.A([].concat(this.get('selected'))).compact();
    const $context = this.$();
    if (Ember.isPresent($context)){
      $context.dropdown(options);
      const model = this.get('model') || [];
      for (const element of selectedElements){
        $context.dropdown('set selected', model.indexOf(element));
      }
    }
  },

  didInsertElement() {
    this._super(...arguments);
    Ember.run.scheduleOnce('afterRender', this, this.configure);
  },

  actions: {
    updateSelection() {
      const selectedElements = this.$('input[name="hiddenSelection"]').val().split(',');
      if (selectedElements[0] ===  '-1'){
        this.$().dropdown('clear');
        return;
      }
      const model = Ember.A(this.get('model'));
      let answer = model.objectsAt(selectedElements);
      if (!this.get('multiple')) {
        answer = answer[0];
      }
      this.set('selected', answer);
    }
  }
});
