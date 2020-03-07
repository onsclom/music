var sound = new Howl({
  src: ['song.mp3'],
  format: ['mp3'],
  loop: true
});

sound.play();

let curGif = 0;
let gifTotal = 100;

function getGifs() {
  let gifs;
  fetch('https://api.giphy.com/v1/gifs/search?api_key=Y4rrTavmb3YXxa8cJYvXG4g6zGwzw3qD&q=synthwave&limit=' + gifTotal + '&offset=0&rating=G&lang=en')
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    gifs = data.data;
    document.getElementById("bodyId").style.backgroundImage = "url(" + gifs[0].images.original.url + ")";
  })
  .then(() => {
    console.log(gifs);
    gifLoop(gifs);
  });
}

//setNewGif();

function gifLoop(gifs) {
  curGif += 1;
  curGif %= gifTotal;
  document.getElementById("bodyId").style.backgroundImage = "url(" + gifs[curGif].images.original.url + ")";
  setTimeout(gifLoop, 10000, gifs);
}

console.log(getGifs());
//gifLoop();

console.log(getGifs());