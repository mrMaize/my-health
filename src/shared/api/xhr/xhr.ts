import { ERequestTypes } from './requestConfig';

export const sendGet = (type: ERequestTypes, req: string) => {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.open(type, req, true);
    request.setRequestHeader('Content-Type', 'application/json');

    request.onload = () => {
      if (request.status === 200) {
        resolve(request.response);
      } else {
        const error = new Error(request.statusText);
        // error.code = request.status;

        reject({ ...error, code: request.status });
      }
    };

    request.onerror = (e) => {
      reject(e);
    };

    request.send();
  });
};

const sendPost = (type: ERequestTypes, URL: string, params?: any) => {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.open(type, URL);
    request.setRequestHeader('Content-Type', 'application/json');
    request.setRequestHeader('Access-Control-Allow-Origin', '*');

    request.onreadystatechange = () => {
      if (request.readyState === 4) {
        if (request.status === 200 || request.status === 201) {
          resolve(JSON.parse(request.response));
        } else {
          const error = new Error(request.statusText);
          // error.code = request.status;
          reject({ ...error, code: request.status });
        }
      }
    };

    request.onerror = () => {
      reject(new Error('Network Error'));
    };

    if (params) {
      request.send(JSON.stringify(params));
    } else {
      request.send();
    }
  });
};

export const sendRequest = (
  type: ERequestTypes,
  params: { url: string; payload?: any }
) => {
  switch (type) {
    case ERequestTypes.DELETE:
    case ERequestTypes.GET:
      return sendGet(type, params.url);

    case ERequestTypes.PUT:
    case ERequestTypes.POST:
      return sendPost(type, params.url, params.payload);

    default:
      return new Error('Reject, request type not set!');
  }
};
