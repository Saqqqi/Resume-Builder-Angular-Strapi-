'use strict';

/**
 * `filterResumes` middleware
 */

module.exports = (config, { strapi }) => {
  // Add your own logic here.
  return async (ctx, next) => {
    strapi.log.info('In filterResumes middleware.');

    await next();
  };
};
