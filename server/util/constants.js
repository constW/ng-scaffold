const envConstants = {
  dev: {
    ServerUrl: 'http://10.10.50.61:8080/api/cii'
  },
  product: {
    ServerUrl: 'http://172.20.128.11:8080/api/cii'
  }
};

const env = process.env.ENV_NAME || 'dev';
const envConstant = envConstants[env];

module.exports = Object.assign(module.exports, envConstant);
