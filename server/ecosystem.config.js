const execMode = process.env.CLUSTER ? 'cluster' : 'fork';
const instances = process.env.INSTANCES || 1;

module.exports = {
  apps: [{
    name: 'cii-console-middle',
    script: 'bin/www',
    exec_mode: execMode,
    instances: instances,
    exec_mode: 'cluster',
    instances: 1,
    env: {
      NODE_ENV: 'production',
      ENV_NAME: 'dev'
    },
    env_dockerStage: {
      NODE_ENV: 'production',
      ENV_NAME: 'product'
    }
  }]
};
