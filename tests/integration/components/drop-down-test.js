import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('drop-down', 'Integration | Component | drop down', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{drop-down}}`);
  assert.equal(this.$().text().trim(), '');
});

test('it renders the inner content through yielding', function(assert) {
  const prompt = 'my prompt for this test';
  this.set('promptText', prompt);

  // Template block usage:
  this.render(hbs`
    {{#drop-down}}
      <div class='item'>{{promptText}}</div>
    {{/drop-down}}
  `);
  assert.equal(this.$().text().trim(), prompt);
});
test('it accepts a prompt', function(assert) {
  assert.expect(4);
  const prompt = 'my prompt for this test';
  this.set('promptText', prompt);

  this.render(hbs`{{drop-down prompt="promptText"}}`);

  assert.equal(this.$('.ui.dropdown .default.text.item').text().trim(), "promptText");
  assert.equal(this.$('.ui.dropdown .default.text.prompt').text().trim(), "promptText");

  this.render(hbs`{{#drop-down prompt="promptText"}}{{/drop-down}}`);

  assert.equal(this.$('.ui.dropdown .default.text.item').text().trim(), "promptText");
  assert.equal(this.$('.ui.dropdown .default.text.prompt').text().trim(), "promptText");
});

test('it has a selected property', function(assert) {
  assert.expect(1);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });
  this.set('model', ['dog', 'cat', 'cow']);

  // Template block usage:
  this.render(hbs`
    {{#drop-down model=model selected='cow'}}
      {{#each model as |animal|}} <div class='text item'> {{animal}} </div> {{/each}}
    {{/drop-down}}
  `);

  assert.equal(this.$().text().trim(), 'cow');
});
