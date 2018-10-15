import NodesMapper from './nodes-mapper';
import GetNearbyDrives from '../usecase/get-nearby-drives';
import GetMyDrives from '../usecase/get-my-drives';
import GetProximityDrives from '../usecase/get-proximity-drives';

export default function mimikInject(context, req) {
  const { uMDS, PUB_TOPIC, PUB_URI, MATCH } = context.env;
  const edge = context.edge;
  const http = context.http;
  const authorization = req.authorization;

  NodesMapper.matchServiceType = MATCH;

  const getNearByDrives = new GetNearbyDrives(uMDS, http, authorization, edge);
  const getProximityDrives = new GetProximityDrives(uMDS, http, authorization, edge);
  const getMyDrives = new GetMyDrives(getNearByDrives, uMDS, http,
    edge, authorization);

  return ({
    ...context,
    PUB_TOPIC,
    PUB_URI,
    getNearByDrives,
    getProximityDrives,
    getMyDrives,
  });
}
