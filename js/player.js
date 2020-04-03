const PLAY_ON = false;
const PLAY_OFF = true;

const $musicPlayer = document.getElementById('audio');

const musics = [
  { title: 'Bongo Madness', fileName: 'Bongo_Madness', composer: 'Quincas Moreira', time: '3:09' },
  { title: 'Morning Mandolin', fileName: 'Morning_Mandolin', composer: 'chris haugen', time: '3:29' },
  { title: 'I Feel Like Partying', fileName: 'I_Feel_Like_Partying', composer: 'Nat Keefe & BeatMower', time: '2:59' }
];

// 뮤직 세팅
const $musicTitle = document.getElementById('musicTitle');
const $composer = document.getElementById('composer');
const setMusic = (music) => {
  $musicPlayer.src = `music/${music.fileName}.mp3`;
  $musicTitle.innerText = music.title;
  $composer.innerText = music.composer;
};
setMusic(musics[0]);


// 플레이 상태 조정
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
