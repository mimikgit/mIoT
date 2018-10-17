import Router from 'router';
import Action from 'action-js';
import ApiError from './helper/api-error';
import mimikInject from './helper/mimik-injector';
import sepRequest from './helper/sep-helper';
import toJson from './helper/json-helper';

const app = Router({ mergeParams: true });

// Initialize mimik serverless api
mimikModule.exports = (context, req, res) => {
  req.mimikContext = mimikInject(context, req);
  res.writeError = (apiError) => {
    res.statusCode = apiError.code;
    const json = JSON.stringify({
      code: apiError.code,
      message: apiError.message,
    });
    res.end(json);
  };

  app(req, res, (e) => {
    const err = (e && new ApiError(400, e.message)) ||
      new ApiError(404, 'not found');
    res.writeError(err);
  });
};

//
app.post('/notification', (req, res) => {
  const { http } = req.mimikContext;
  http.request(({
    type: 'POST',
    url: 'http://127.0.0.1:8891/webhook/v1', // specify your endpoint to receive the notification
    data: req.body,
    success: () => {
      res.end(req.body);
    },
    error: (err) => {
      res.writeError(new ApiError(err.message));
    },
  }));
});

//
app.post('/mqtt', (req, res) => {
  if (!req.body) {
    res.writeError(new ApiError(400, 'missing JSON body'));
    return;
  }

  const mqtt = JSON.parse(req.body);
  const tempCelsius = parseFloat(mqtt.payload);
  const tempFarenheit = ((tempCelsius * 9.0) / 5.0) + 32.0;
  const { getMyDrives, http, PUB_URI, PUB_TOPIC } = req.mimikContext;
  const mqttPacket = {
    topic: PUB_TOPIC,
    payload: tempFarenheit.toString(),
  };

  getMyDrives.buildAction()
    .next((data) => {
      const devices = data.slice(0, 5);
      const mqttJson = toJson(mqttPacket);
      const SERVICE_URI = PUB_URI;
      const notificationActions = devices.map((d) => {
        if (d.url) {
          return new Action((cb) => {
            http.request(({
              type: 'POST',
              url: `${d.url}/${SERVICE_URI}`, // specify your endpoint where the data will be sent
              data: mqttJson,
              success: (result) => {
                const status = JSON.parse(result.data);
                status.status = `data sent successfully to ${d.name}`;
                cb(status);
              },
              error: (err) => {
                cb(new Error(err.message));
              },
            }));
          });
        }
        return sepRequest(d, http, SERVICE_URI, {
          type: 'POST',
          data: mqttJson,
        });
      });

      return Action.parallel(notificationActions, false)
        .next(results => toJson({ data: results }));
    })
    .next(json => res.end(json))
    .guard((err) => {
      res.writeError(new ApiError(err.code || 400, err.message));
    })
    .go();
});
