const routes =[
  {
    method: `GET`,
    path: `/`,
    handler: (request, h) => {
     return h.response({ status: 'server running status 200' }).code(200);
  }
  }
]

module.exports = routes;
