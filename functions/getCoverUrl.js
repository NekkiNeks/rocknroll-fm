async function getCoverUrl(artist, title) {
  const url = `http://10.0.2.2:6666/covers?artist=${encodeURIComponent(
    artist,
  )}&title=${encodeURIComponent(title)}`;
  return fetch(url, {method: 'get'})
    .then(res => res.json())
    .then(res => res)
    .catch(err => console.log('cant connect to covers server: ', err.message));
}

export default getCoverUrl;
