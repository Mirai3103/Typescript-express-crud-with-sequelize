import './pre-start'; // Must be the first import
import logger from 'jet-logger';
import server from './server';
import sequelize from '@models/init';

// Constants
const serverStartMsg = 'Express server started on port: ',
    port = (process.env.PORT || 3000);

// Start server
server.listen(port, () => {
    (async () => {
        await sequelize.sync();
    }
    )();
    logger.info(serverStartMsg + port);
});
