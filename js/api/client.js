import Mappersmith from 'mappersmith/node';
import skeletorGateway from './skeletor-gateway';
import Manifest from './manifest';
import getLogger from '../utils/logging';

//var logger = getLogger('client');

Mappersmith.Env.USE_PROMISES = true;

var Client = Mappersmith.forge(Manifest, skeletorGateway);

Client.onError(function(request, err) {
    //logger.error(request.url) // 'http://my.api.com/v1/books/3.json'
    //logger.error(request.params) // {id: 3}
    //logger.error(request.status) // 503
});

export default Client;
