'use strict';

module.exports = function(/* environment, appConfig */) {
  return {
    contentSecurityPolicy: {
        'default-src': "'unsafe-inline'",
        'script-src': "'self' 'unsafe-eval' 'unsafe-inline'",
        'style-src': "'self' 'unsafe-inline' https://fonts.googleapis.com https://fonts.gstatic.com",
        'connect-src': "'self' ",
        'img-src': "'self' data:",
        'font-src': "'self' https://fonts.googleapis.com https://fonts.gstatic.com data:",
        'media-src': "'self'"
      }
    };
};
