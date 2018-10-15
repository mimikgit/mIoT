import Action from 'action-js';

export default function sepRequest(drive, http, serviceUri, options) {
  return new Action((cb) => {
    const sepHeader = `\r\nx-mimik-port: ${drive.routing.port}\r\nx-mimik-routing: ${drive.routing.id}`;

    const requestOptions = {
      url: `${drive.routing.url}/${serviceUri}`,
      authorization: sepHeader,
      success: (result) => {
        cb(result.data);
      },
      error: (err) => {
        cb(new Error(err.message));
      },
    };

    if (options) {
      const { type, data } = options;
      requestOptions.type = type;
      requestOptions.data = data;
    }

    http.request(requestOptions);
  });
}
