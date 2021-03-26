(function (window) {
  window.__env = window.__env || {};

  // Server url - this will be replaced from the server.js file's code to get the Beanstalk NODE_ENV which has the actual server url
  // window.__env.server_URL = 'http://localhost:3000';
  
  window.__env.server_URL = 'https://mathsworld.herokuapp.com';
}(this));