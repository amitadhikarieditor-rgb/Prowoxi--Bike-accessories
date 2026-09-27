import {cacheGet,cacheSet,cacheDel} from '../config/redis.js';
export const cache={get:cacheGet,set:cacheSet,del:cacheDel};
