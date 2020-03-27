songAmount = 21
songs = []
for (let x = 1; x<=songAmount; x++)
{
  songs.push("song"+x+".mp3")
}

curSong = 0
curVolume = .5;

var sound = new Howl({
  src: ["songs/"+songs[0]],
  format: ['mp3'],
  loop: false,
  volume: curVolume
});

sound.on('end', function() {
  curSong += 1;
  curSong %= songs.length;
  changeSong();
})

function changeSong() {
  sound.stop();

  sound = new Howl({
    src: ["songs/"+songs[curSong]],
    format: ['mp3'],
    loop: false,
    volume: curVolume
  });

  if (isPlaying) {
    sound.play();
  }

  sound.on('end', function() {
    changeSong();
  });
}

//sound.play();

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
  curGif = Math.floor(Math.random() * Math.floor(gifTotal));
  document.getElementById("bodyId").style.backgroundImage = "url(" + gifs[curGif].images.original.url + ")";
  setTimeout(gifLoop, 10000, gifs);
}

getGifs();

isPlaying = false;
function playToggle() {
  if (isPlaying) {
    isPlaying = false;
    sound.pause();
    document.getElementById("playToggle").textContent = "►";
  }
  else {
    isPlaying = true;
    sound.play();
    document.getElementById("playToggle").textContent = "	■";
  }
}

function forwardButton() {
  curSong += 1;
  curSong %= songs.length;
  changeSong();
}

function backButton() {
  curSong += songs.length - 1;
  curSong %= songs.length;
  changeSong();
}

function navbarTransparent() {
  document.getElementById("navbar").style.opacity = 0;
}

function navbarShow() {
  document.getElementById("navbar").style.opacity = 1;
}

document.getElementById("myRange").addEventListener('input', updateVolume);

function updateVolume() {
  sound.volume(document.getElementById("myRange").value/100);
  curVolume = document.getElementById("myRange").value/100;
}
