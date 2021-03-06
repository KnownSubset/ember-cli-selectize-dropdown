import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

moduleForComponent('drop-down', 'Integration | Component | drop down', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{drop-down}}`);
  assert.equal(this.$('.default.text.dropdown-prompt').text().trim(), '--Select One--');
  assert.equal(this.$('.default.text.item').text().trim(), '--Select One--');
});

test('it renders the inner content through yielding', function(assert) {
  const prompt = 'my prompt for this test';
  this.set('someText', prompt);

  this.render(hbs`
    {{#drop-down}}
      <div class='test item'>{{someText}}</div>
    {{/drop-down}}
  `);
  assert.equal(this.$('.test.item').text().trim(), prompt);
});

test('it accepts a prompt', function(assert) {
  assert.expect(4);
  const prompt = 'my prompt for this test';
  this.set('prompt', prompt);

  this.render(hbs`{{drop-down prompt="promptText"}}`);

  assert.equal(this.$('.ui.dropdown .default.text.item').text().trim(), "promptText");
  assert.equal(this.$('.ui.dropdown .default.text.dropdown-prompt').text().trim(), "promptText");

  this.render(hbs`{{#drop-down prompt=prompt}}{{/drop-down}}`);

  assert.equal(this.$('.ui.dropdown .default.text.item').text().trim(), prompt);
  assert.equal(this.$('.ui.dropdown .default.text.dropdown-prompt').text().trim(), prompt);
});


test('the prompts can be different per instance', function(assert) {
  assert.expect(2);
  const prompt1 = "here is some text", prompt2 = "here is different text";
  this.set('prompt1', prompt1);
  this.set('prompt2', prompt2);

  this.render(hbs`{{drop-down class='prompt1' prompt=prompt1}} {{drop-down class='prompt2' prompt=prompt2}}`);

  assert.equal(this.$('.ui.dropdown.prompt1 .default.text.item').text().trim(), prompt1);
  assert.equal(this.$('.ui.dropdown.prompt2 .default.text.item').text().trim(), prompt2);
});

test('it can set the selected item', function(assert) {
  assert.expect(1);
  this.set('model', ['dog', 'cat', 'cow']);

  this.render(hbs`
    {{#drop-down model=model selected='cow'}}
      {{#each model as |animal index|}} <div class='text item' data-value={{index}}> {{animal}} </div> {{/each}}
    {{/drop-down}}
  `);

  assert.equal(this.$('.dropdown-prompt.text').text().trim(), 'cow');
});

test('it can handle an invalid selected item that is not in the model', function(assert) {
  assert.expect(1);
  this.set('model', ['dog', 'cat', 'cow']);

  this.render(hbs`
    {{#drop-down model=model selected='bird'}}
      {{#each model as |animal index|}} <div class='text item' data-value={{index}}> {{animal}} </div> {{/each}}
    {{/drop-down}}
  `);

  assert.equal(this.$('.dropdown-prompt.text').text().trim(), '--Select One--');
});

test('it can set the selected item', function(assert) {
  assert.expect(1);
  this.set('model', ['dog', 'cat', 'cow']);

  this.render(hbs`
    {{#drop-down model=model}}
      {{#each model as |animal index|}} <div class='text item' data-value={{index}}> {{animal}} </div> {{/each}}
    {{/drop-down}}
  `);
  Ember.run(() => {
    this.$('.ui.dropdown').trigger('click');
    this.$('.ui.dropdown div.text.item:eq(3)').trigger('click');
  });

  assert.equal(this.$('.dropdown-prompt.text').text().trim(), 'cow');
});

test('it supports multiple selection', function(assert) {
  assert.expect(1);
  this.set('model', ['dog', 'cat', 'cow']);

  this.render(hbs`
    {{#drop-down model=model multiple=true}}
      {{#each model as |animal index|}} <div class='text item' data-value={{index}}> {{animal}} </div> {{/each}}
    {{/drop-down}}
  `);
  Ember.run(() => {
    this.$('.ui.dropdown input.search').trigger('click');
    this.$('.ui.dropdown div.text.item:eq(2)').trigger('click');
    this.$('.ui.dropdown div.text.item:eq(1)').trigger('click');
  });

  assert.equal(this.$('.ui.label').text().trim(), 'cowcat');
});

test('it tells you what elements are selected', function(assert) {
  assert.expect(1);
  this.set('selectedElements', []);
  this.set('model', ['dog', 'cat', 'cow']);

  this.render(hbs`
    {{#drop-down model=model multiple=true selected=selectedElements}}
      {{#each model as |animal index|}} <div class='text item' data-value={{index}}> {{animal}} </div> {{/each}}
    {{/drop-down}}
  `);
  Ember.run(() => {
    this.$('.ui.dropdown input.search').trigger('click');
    this.$('.ui.dropdown div.text.item:eq(2)').trigger('click');
    this.$('.ui.dropdown div.text.item:eq(1)').trigger('click');
  });

  assert.deepEqual(this.get('selectedElements'), ['cow', 'cat']);
});

test('it can handle an invalid selected item that is not in the model', function(assert) {
  assert.expect(1);
  this.set('model', ['dog', 'cat', 'cow']);

  this.render(hbs`
    {{#drop-down model=model selected='bird'}}
      {{#each model as |animal index|}} <div class='text item' data-value={{index}}> {{animal}} </div> {{/each}}
    {{/drop-down}}
  `);

  assert.equal(this.$('.dropdown-prompt.text').text().trim(), '--Select One--');
});

test('it can handle an un-initalized array for syncing the selected elements', function(assert) {
  assert.expect(1);
  this.set('model', ['dog', 'cat', 'cow']);

  this.render(hbs`
    {{#drop-down model=model multiple=true selected=selectedElements}}
      {{#each model as |animal index|}} <div class='text item' data-value={{index}}> {{animal}} </div> {{/each}}
    {{/drop-down}}
  `);
  Ember.run(() => {
    this.$('.ui.dropdown input.search').trigger('click');
    this.$('.ui.dropdown div.text.item:eq(2)').trigger('click');
    this.$('.ui.dropdown div.text.item:eq(1)').trigger('click');
  });

  assert.deepEqual(this.get('selectedElements'), ['cow', 'cat']);
});
