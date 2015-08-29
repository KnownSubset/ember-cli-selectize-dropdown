/* jshint node: true */
'use strict';

module.exports = {
  name: 'selectize-dropdown',
  included: function (app) {
    this._super.included(app);
    app.import({
      development: 'bower_components/semantic-ui/dist/semantic.js',
      production: 'bower_components/semantic-ui/dist/semantic.min.js'
    });
    app.import({
      development: 'bower_components/semantic-ui/dist/semantic.css',
      production: 'bower_components/semantic-ui/dist/semantic.min.css'
    });
    
  },
  afterInstall: function() {
    return this.addBowerPackageToProject('semantic-ui');
  }
};
