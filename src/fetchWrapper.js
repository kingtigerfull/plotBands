let options = {
  method: 'GET',
  mode: 'same-origin', // no-cors, *cors, same-origin
  cache: 'no-cache', // reload
  credentials: 'omit', // include, *same-origin, omit
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  referrerPolicy: 'no-referrer',
};

function handleResponse(response) {
  if (response.ok) {
    return response.json();
  } else {
    throw new Error(response.statusText);
  }
}

export default async function fetchWrapper(url) {
  const response = await fetch(url, options);
  return handleResponse(response);
}
