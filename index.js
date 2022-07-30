const http = require('http');
const app = require('./app');
const config = require('./utils/config');
const logger = require('./utils/logger');

const server = http.createServer(app);

server.get('*', (_req, res) => {
  let url = path.join(__dirname, '../client/build', 'index.html');
  if (!url.startsWith('/app/'))
    // since we're on local windows
    url = url.substring(1);
  res.sendFile(url);
});

server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
});
