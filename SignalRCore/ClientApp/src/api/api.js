export const getData = (url) =>
  fetch(url).then(response => response.json());

export const postData = async (url = '', data = {}, ContentType = "application/json; charset=utf-8") => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        "Content-Type": ContentType,
      },
      body: JSON.stringify(data)
    });
    return await response.json();
  }
  catch (error) {
    return console.error(`Error posting to ${url}. Error: ${error}`);
  }
};