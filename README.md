# ember-cli-selectize-dropdown / {{drop-down}}

An ember-cli addon replacement for the select component using [Semantic-UI](http://semantic-ui.com/modules/dropdown.html) dropdown module.


Why use this library instead of another select component? Because you need custom styling that is just not capable
using a regular select element.

## Installation

```
ember install ember-cli-selectize-dropdown
```

By allowing arbitrary html to appear in the template of the select
element, you can use it just like you would normally. This means
things like having `<optgroup>` tags inside your select, or even plain
old `<option>` elements to represent things like empty values.

XSelect thinly wraps a native `<select>` element so that it can be object
and binding aware. It is used in conjuction with the `x-option`
component to construct select boxes. E.g.

```handlebars
{{#drop-down prompt="Select your favorite animal" model=animals selected=selectedItem}}
  {{#each animals as |animal index|}} <div class='text item' data-value={{index}}> {{animal}} </div> {{/each}}
{{/drop-down}}
```

the options are always up to date, so that when the object bound to
`value` changes, the corresponding option becomes selected.

Whenever the select tag receives a change event, it will fire
`action`.


### Multiselect

With the first release, `drop-down` supports the `multiple`
option. This means you can pass an array as its value, and it will set
its selections directly on that array.

```handlebars
{{#drop-down prompt="Select your favorite animal" model=animals multiple=true selected=selectedElements}}
  {{#each animals as |animal index|}} <div class='text item' data-value={{index}}> {{animal}} </div> {{/each}}
{{/drop-down}}
```

The selected elements array will be initialized to an empty array if not present.

## Action and Action Arguments

The action that is dispatched by x-select whenever the selected value or values
change has a function signature of:

```js
/**
* @param value {Object} the value selected by the user.
* @param component {Ember.Component} the x-select component itself
*/
function (value, component) {
  // action body...
}
```

Most of the time all you need is the value that has been selected, but
sometimes your action requires more context than just that. In those
cases, you can associate arbitrary attributes with the component
itself and use them later inside your action handler.  For example:

```handlebars
{{#x-select action="didMakeSelection" default=anything}}
  <option>Nothing</option>
  {{#x-option value=something}}Something{{/x-option}}
{{/x-select}}
```
then, inside your action handler:

```js
export default Ember.Route.extend({
  actions: {
    didMakeSelection: function(selection, component) {
      if (selection) {
        this.set('selection', selection)
      } else {
        this.set('selection', component.get('default'))
      }
    }
  }
});
```

## Running Tests

* `ember test`
* `ember test --server`
