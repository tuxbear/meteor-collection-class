Package.describe({
  name: 'tuxbear:collection-class',
  version: '1.0.0',

  // Brief, one-line summary of the package.
  summary: 'Meteor Collection Class returns ES6 class instances from Meteor Collections. ',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/tuxbear/meteor-collection-class',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.3.4.4');
  api.use('ecmascript');
  api.use('underscore');
  api.mainModule('collection-class.js');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('practicalmeteor:mocha');
  api.use('underscore');
  api.use('tuxbear:collection-class');
  api.mainModule('collection-class-tests.js');
});
