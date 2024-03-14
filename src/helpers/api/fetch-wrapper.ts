import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

export const fetchWrapper = {
  get: request("GET"),
  post: request("POST"),
  put: request("PUT"),
  delete: request("DELETE"),
};

function request(method: any) {
  return (url: any, body: any) => {
    const requestOptions = {
      method,
      headers: authHeader(url),
    };

    if (body) {
      //@ts-ignore
      requestOptions.headers["Content-Type"] = "application/json";
      //@ts-ignore
      requestOptions.body = JSON.stringify(body);
    }
    //@ts-ignore
    return fetch(url, requestOptions).then(handleResponse);
  };
}

// helper functions
//@ts-ignore
function authHeader(url) {
  // return auth header with jwt if user is logged in and request is to the api url
  //@ts-ignore
  const user = userService.userValue;
  const isLoggedIn = user?.token;
  const isApiUrl = url.startsWith(publicRuntimeConfig.apiUrl);
  if (isLoggedIn && isApiUrl) {
    return { Authorization: `Bearer ${user.token}` };
  } else {
    return {};
  }
}
//@ts-ignore
async function handleResponse(response) {
  const isJson = response.headers
    ?.get("content-type")
    ?.includes("application/json");
  const data = isJson ? await response.json() : null;

  // check for error response
  if (!response.ok) {
    //@ts-ignore
    if ([401, 403].includes(response.status) && userService.userValue) {
      // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
      //@ts-ignore
      userService.logout();
    }

    // get error message from body or default to response status
    const error = (data && data.message) || response.statusText;
    return Promise.reject(error);
  }

  return data;
}
