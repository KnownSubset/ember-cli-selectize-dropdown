/* jshint node: true */
'use strict';

module.exports = {
  name: 'selectize-dropdown',
  included: function (app) {
    app.import({
      development: 'bower_components/semantic-ui-dropdown/dropdown.js',
      production: 'bower_components/semantic-ui-dropdown/dropdown.min.js'
    });
    app.import({
      development: 'bower_components/semantic-ui-dropdown/dropdown.css',
      production: 'bower_components/semantic-ui-dropdown/dropdown.min.css'
    });
    app.import({
      development: 'bower_components/semantic-ui-transition/transition.js',
      production: 'bower_components/semantic-ui-transition/transition.min.js'
    });
    app.import({
      development: 'bower_components/semantic-ui-transition/transition.css',
      production: 'bower_components/semantic-ui-transition/transition.min.css'
    });
    app.import({
      development: 'bower_components/semantic-ui-label/label.css',
      production: 'bower_components/semantic-ui-label/label.min.css'
    });
    app.import({
      development: 'bower_components/semantic-ui-icon/icon.css',
      production: 'bower_components/semantic-ui-icon/icon.min.css'
    });

    app.import('bower_components/semantic-ui-label/label.css');
    app.import('bower_components/semantic-ui-icon/icon.css');
    var fontExtensions = ['.eot','.svg','.ttf','.woff','.woff2'];
    for (var i = fontExtensions.length - 1; i >= 0; i--) {
      app.import('bower_components/semantic-ui-icon/assets/fonts/icons'+fontExtensions[i], { destDir: 'assets/assets/fonts' });
    }
  }
};
