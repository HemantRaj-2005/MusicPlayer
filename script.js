const cover = document.getElementById('cover');
const disc = document.getElementById('disc');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const timer = document.getElementById('timer');
const duration = document.getElementById('duration');
const prev = document.getElementById('prev');
const play = document.getElementById('play');
const next = document.getElementById('next');
let songIndex = 0;

// Songs info
const songs = [
  {
    title: 'Choo lo',
    artist: 'The Local Train',
    coverPath: 'cover1.jpg',
    discPath: 'song1.mp3',
    duration: '3:54',
  },
  {
    title: 'Laari Chuti',
    artist: 'Kartik Chnadna',
    coverPath: 'cover2.jpg',
    discPath: 'song2.mp3',
    duration: '2:57',
  },
  {
    title: 'Strangers',
    artist: 'Kenya Grace',
    coverPath: 'cover3.jpg',
    discPath: 'song3.mp3',
    duration: '2:54',
  },
  {
    title: 'One Love',
    artist: 'Shubh',
    coverPath: 'cover4.jpg',
    discPath: 'song4.mp3',
    duration: '2:40',
  },
  {
    title: 'Noori',
    artist: 'Fukra Insaan',
    coverPath: 'cover5.jpg',
    discPath: 'song5.mp3',
    duration: '4:03',
  },
  {
    title: 'Tum Mere',
    artist: 'Fukra Insaan',
    coverPath: 'cover6.jpg',
    discPath: 'song6.mp3',
    duration: '5:02',
  },
  {
    title: 'Pyaar Hota kai baar',
    artist: 'Arijit Singh',
    coverPath: 'cover7.jpg',
    discPath: 'song7.mp3',
    duration: '3:04',
  },
  {
    title: 'Sawarey',
    artist: 'Arijit Singh',
    coverPath: 'cover8.jpg',
    discPath: 'song8.mp3',
    duration: '3:40',
  },
];

// Load song initially
loadSong(songs[songIndex]);

// Load the given song
function loadSong(song) {
  cover.src = song.coverPath;
  disc.src = song.discPath;
  title.textContent = song.title;
  artist.textContent = song.artist;
  duration.textContent = song.duration;
}

// Toggle play and pause
function playPauseMedia() {
  if (disc.paused) {
    disc.play();
  } else {
    disc.pause();
  }
}

// Update icon
function updatePlayPauseIcon() {
  if (disc.paused) {
    play.classList.remove('fa-pause');
    play.classList.add('fa-play');
  } else {
    play.classList.remove('fa-play');
    play.classList.add('fa-pause');
  }
}

// Update progress bar
function updateProgress() {
  progress.style.width = (disc.currentTime / disc.duration) * 100 + '%';

  let minutes = Math.floor(disc.currentTime / 60);
  let seconds = Math.floor(disc.currentTime % 60);
  if (seconds < 10) {
    seconds = '0' + seconds;
  }
  timer.textContent = `${minutes}:${seconds}`;
}

// Reset the progress
function resetProgress() {
  progress.style.width = 0 + '%';
  timer.textContent = '0:00';
}

// Go to previous song
function gotoPreviousSong() {
  if (songIndex === 0) {
    songIndex = songs.length - 1;
  } else {
    songIndex = songIndex - 1;
  }

  const isDiscPlayingNow = !disc.paused;
  loadSong(songs[songIndex]);
  resetProgress();
  if (isDiscPlayingNow) {
    playPauseMedia();
  }
}

// Go to next song
function gotoNextSong(playImmediately) {
  if (songIndex === songs.length - 1) {
    songIndex = 0;
  } else {
    songIndex = songIndex + 1;
  }

  const isDiscPlayingNow = !disc.paused;
  loadSong(songs[songIndex]);
  resetProgress();
  if (isDiscPlayingNow || playImmediately) {
    playPauseMedia();
  }
}

// Change song progress when clicked on progress bar
function setProgress(ev) {
  const totalWidth = this.clientWidth;
  const clickWidth = ev.offsetX;
  const clickWidthRatio = clickWidth / totalWidth;
  disc.currentTime = clickWidthRatio * disc.duration;
}

function loadAndPlaySong(index) {
  songIndex = index;
  loadSong(songs[songIndex]);
  resetProgress();
  playPauseMedia();
}

// Play/Pause when play button clicked
play.addEventListener('click', playPauseMedia);

// Various events on disc
disc.addEventListener('play', updatePlayPauseIcon);
disc.addEventListener('pause', updatePlayPauseIcon);
disc.addEventListener('timeupdate', updateProgress);
disc.addEventListener('ended', gotoNextSong.bind(null, true));

// Go to next song when next button clicked
prev.addEventListener('click', gotoPreviousSong);

// Go to previous song when previous button clicked
next.addEventListener('click', gotoNextSong.bind(null, false));

// Move to different place in the song
progressContainer.addEventListener('click', setProgress);
