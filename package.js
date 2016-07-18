Package.describe({
  name: 'tuxbear:collection-class',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: '',
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
