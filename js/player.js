const PLAY_ON = false;
const PLAY_OFF = true;

const $musicPlayer = document.getElementById('audio');
let playingIndex = 0;

const musics = [
  { title: 'Bongo Madness', fileName: 'Bongo_Madness', composer: 'Quincas Moreira', time: '3:09' },
  { title: 'Morning Mandolin', fileName: 'Morning_Mandolin', composer: 'chris haugen', time: '3:29' },
  { title: 'I Feel Like Partying', fileName: 'I_Feel_Like_Partying', composer: 'Nat Keefe & BeatMower', time: '2:59' }
];

// set music func
const $musicTitle = document.getElementById('musicTitle');
const $composer = document.getElementById('composer');
const setMusic = (music) => {
  $musicPlayer.src = `music/${music.fileName}.mp3`;
  $musicTitle.innerText = music.title;
  $composer.innerText = music.composer;
};
setMusic(musics[0]);


// play button
const $playBtn = document.getElementById('playBtn');
const isPlaying = () => ([...$playBtn.classList].includes('playing') ? true : false);
const setPlayStatus = (boolean) => {
  if (boolean) {
    $playBtn.classList.remove('playing');
    $playBtn.classList.add('pauseing');
    $musicPlayer.pause();
  } else {
    $playBtn.classList.remove('pauseing');
    $playBtn.classList.add('playing');
    $musicPlayer.play();
  }
};
$playBtn.addEventListener('click', () => (isPlaying() ? setPlayStatus(PLAY_OFF) : setPlayStatus(PLAY_ON)));


// next button
const $nextBtn = document.getElementById('nextBtn');
console.log($nextBtn);

$nextBtn.addEventListener('click', () => {
  playingIndex++;

  if (playingIndex > musics.length - 1) playingIndex = 0;

  setMusic(musics[playingIndex]);
  setPlayStatus(PLAY_ON);
});
