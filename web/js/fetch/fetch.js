export const fetchData = async(url, method, body=undefined ) => {
  url = 'http://localhost:5000' + url;
  body = JSON.stringify(body);
  try {
    const res = await fetch(url, {
      method,
      body,
      headers: { 'content-type': 'application/json' },
    })
    return res.json();
  } catch (error) {
    throw(new Error(error))
  }
}
