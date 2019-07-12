import bunyan from 'bunyan';

export const logger = bunyan.createLogger({
  name: 'app-logger',
  streams: [
    {
      type: 'rotating-file',
      level: 'info',
      period: '1d',
      path: './logs/info.log'
    },
    {
      type: 'file',
      level: 'error',
      path: './logs/error.log'
    }
  ]
});

export default logger;
