module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'c9aea03e1fd74795074a79f0a6f42a51'),
  },
});
