var sound = new Howl({
  src: ['song.mp3'],
  format: ['mp3'],
  loop: true
});

sound.play();

fetch('https://api.giphy.com/v1/gifs/search?api_key=Y4rrTavmb3YXxa8cJYvXG4g6zGwzw3qD&q=synthwave&limit=1&offset=0&rating=G&lang=en')
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data.data);
    document.getElementById("gifSpot").src = data.data[0].images.original.url;
  });