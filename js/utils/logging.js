import Logger from 'js-logger';
//import Logger from './custom-remote-logger'; // Use custom remote logger if you so desire.

/**
 * Helper function for handling the set up of the logger.
 *
 * @param name - Name to which the logger will set
 */
var getLogger = function (name) {
    Logger.useDefaults();
    var logger = Logger.get(name);
    logger.setLevel('debug');
    return logger;
};

export default getLogger;