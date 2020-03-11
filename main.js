songs = ["Here In The Skies","That Chip Tune","The Tune That Goes \"EEE\"","Trapeez","Yogi Berra's Chill Out Tune"];
gifKeyword = "synthwave";
gifTime = 5;

curSong = 0;
let curArtist = "Adam Neely";
curVolume = .5;

var sound = new Howl({
  src: ["songs/"+songs[0]]+".mp3",
  format: ['mp3'],
  loop: false,
  volume: curVolume
});

sound.on('end', function() {
  curSong += 1;
  curSong %= songs.length;
  changeSong();
});

document.getElementById("songName").textContent = songs[curSong] + " - " + curArtist;

function changeSong() {
  sound.stop();

  sound = new Howl({
    src: ["songs/"+songs[curSong]]+".mp3",
    format: ['mp3'],
    loop: false,
    volume: curVolume
  });
  document.getElementById("songName").textContent = songs[curSong] + " - " + curArtist;

  if (isPlaying) {
    sound.play();
  }

  sound.on('end', function() {
    curSong += 1;
    curSong %= songs.length;
    changeSong();
  });
}

//sound.play();

let curGif = 0;
let gifTotal = 100;

function getGifs() {
  let gifs;
  console.log(gifKeyword, gifTotal);
  fetch('https://api.giphy.com/v1/gifs/search?api_key=Y4rrTavmb3YXxa8cJYvXG4g6zGwzw3qD&q=' + gifKeyword + '&limit=' + gifTotal + '&offset=0&rating=G&lang=en')
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    gifs = data.data;
    document.getElementById("bodyId").style.backgroundImage = "url(" + gifs[0].images.downsized_large.url + ")";
  })
  .then(() => {
    console.log(gifs);
    let curKey = gifKeyword;
    gifLoop(gifs, curKey);
  });
}

function gifLoop(gifs, curKeyword) {
  if (curKeyword != gifKeyword)
  {
    return;
  }

  console.log("new gif with keyword: " + curKeyword);
  curGif = Math.floor(Math.random() * Math.floor(gifs.length));
  document.getElementById("bodyId").style.backgroundImage = "url(" + gifs[curGif].images.original.url + ")";

  setTimeout(gifLoop, gifTime*1000, gifs, curKeyword);
}

getGifs();

isPlaying = false;
function playToggle() {
  if (isPlaying) {
    isPlaying = false;
    sound.pause();
    document.getElementById("playToggle").textContent = "Play";
  }
  else {
    isPlaying = true;
    sound.play();
    document.getElementById("playToggle").textContent = "Pause";
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

let settings = false;
function myFunction(x) {
  x.classList.toggle("change");
  if (!x.classList.contains("change"))
  {
    document.getElementById("settings").style.height = "0rem";
  }
  else
  {
    //document.getElementById("settings").style.height = "auto";
    console.log(document.getElementById("settings").scrollHeight);
    document.getElementById("settings").style.height = document.getElementById("settings").scrollHeight+"px";
  }
  
}

window.addEventListener("resize", fixSettings);

function fixSettings()
{
  if (document.getElementById("container").classList.contains("change"))
  {
    console.log("WOW!");
    document.getElementById("settings").style.height = "auto";
    document.getElementById("settings").style.height = document.getElementById("settings").scrollHeight+"px";
    console.log(document.getElementById("settings").scrollHeight+"px");
  }
}

function updateGifs()
{
  gifKeyword = document.getElementById("giphyWord").value;
  getGifs();
}

function updateGifTime()
{
  gifTime = document.getElementById("gifDur").value;
}