//this is the sever-router config-file for HapiJS (via hapi-router package)
module.exports = [
  {
      path: '/js/{files*}',
      method: 'GET',
      handler: {
        directory: {
            path: 'static/js',
            listing: false
        }
    }
  },
  {
      path: '/js/vendor/{files*}',
      method: 'GET',
      handler: {
        directory: {
            path: 'static/js/vendor',
            listing: false
        }
    }
  },
  {
      path: '/css/{files*}',
      method: 'GET',
      handler: {
        directory: {
            path: 'static/css',
            listing: false
        }
    }
  },
   {
      path: '/img/{files*}',
      method: 'GET',
      handler: {
        directory: {
            path: 'static/img',
            listing: false
        }
    }
  },
     {
      path: '/icons/{files*}',
      method: 'GET',
      handler: {
        directory: {
            path: 'static/icons',
            listing: false
        }
    }
  },
     {
      path: '/fonts/{files*}',
      method: 'GET',
      handler: {
        directory: {
            path: 'static/fonts',
            listing: false
        }
    }
  },
  {
      path: '/release/{files*}',
      method: 'GET',
      handler: {
        directory: {
            path: 'static/release',
            listing: false
        }
    }
  },
  {
      path: '/{p*}',
      method: 'GET',
      handler: function(request, reply) {
          reply.file('static/pages/index.html');
      }
  }
];