async function getImageFromRadioHeart(artist, title) {
  let responce = await fetch(
    `https://image-fetcher.radioheart.ru/api/get-image?artist=${encodeURIComponent(
      artist,
    )}&title=${encodeURIComponent(title)}`,
  );
  responce = await responce.json();
  if (responce.status === 'ok') {
    return responce.image;
  }
  return null;
}

export default getImageFromRadioHeart;
