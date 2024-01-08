// ./api/resume/config/router.js

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::resume.resume', {
  config: {
    find: {
      middlewares: [
        'ilterResumes',
      ],
    },
    create: {
      middlewares: [
        'ilterResumes',
        // Add other middlewares specific to the create action if needed
      ],
    },
    update: {
      middlewares: [
        'ilterResumes',
        // Add other middlewares specific to the update action if needed
      ],
    },
    delete: {
      middlewares: [
        'filterResumes',
        // Add other middlewares specific to the delete action if needed
      ],
    },
  },
});
