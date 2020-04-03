const PLAY_ON = false;
let playingIndex = 0;

const $musicPlayer = document.getElementById('audio');

const musics = [
  { id: 0, title: 'Bongo Madness', fileName: 'Bongo_Madness', composer: 'Quincas Moreira', time: '3:09' },
  { id: 1, title: 'Morning Mandolin', fileName: 'Morning_Mandolin', composer: 'chris haugen', time: '3:29' },
  { id: 2, title: 'I Feel Like Partying', fileName: 'I_Feel_Like_Partying', composer: 'Nat Keefe & BeatMower', time: '2:59' }
];

// set music func
const $musicTitle = document.getElementById('musicTitle');
const $composer = document.getElementById('composer');
const $musicCover = document.querySelector('.player');
const setMusic = (music) => {
  $musicPlayer.src = `music/${music.fileName}.mp3`;
  $musicTitle.innerText = music.title;
  $composer.innerText = music.composer;

  $musicCover.style.backgroundImage = `url(img/${music.fileName}.jpg)`;
  $musicCover.style.backgroundSize = 'cover';
};
setMusic(musics[0]);

// list rendering func
const $playList = document.querySelector('.playList');
const listRender = () => {
  let playList = '';
  musics.forEach((music) => {
    playList += `<li id=${music.id} class="listContent"><strong>${music.title}</strong><span>${music.composer}</span>
    <span>${music.time}</span></li>`;
  });
  $playList.innerHTML = playList;
};
listRender();

const paintSelectedList = (index) => {
  [...$playList.children].forEach((li) => li.classList.remove('selected'));
  $playList.children[index].classList.add('selected');
};
paintSelectedList(playingIndex);


// play button
const $playBtn = document.getElementById('playBtn');
const isPlaying = () => ([...$playBtn.classList].includes('playing'));
const setPlayStatus = (boolean) => {
  if (boolean) {
    $playBtn.classList.remove('playing');
    $musicPlayer.pause();
  } else {
    $playBtn.classList.add('playing');
    $musicPlayer.play();
  }
};
$playBtn.addEventListener('click', () => setPlayStatus(isPlaying()));

const playSelectedList = (e) => {
  const index = e.target.matches('ul > li') ? +e.target.id : +e.target.parentNode.id;

  playingIndex = index;
  paintSelectedList(index);
  setMusic(musics[index]);
  setPlayStatus(PLAY_ON);
};
$playList.addEventListener('click', playSelectedList);


// next button
const $nextBtn = document.getElementById('nextBtn');
$nextBtn.addEventListener('click', () => {
  playingIndex++;

  if (playingIndex > musics.length - 1) playingIndex = 0;

  paintSelectedList(playingIndex);
  setMusic(musics[playingIndex]);
  setPlayStatus(PLAY_ON);
});


// prev button
const $prevBtn = document.getElementById('prevBtn');
$prevBtn.addEventListener('click', () => {
  playingIndex--;

  if (playingIndex < 0) playingIndex = musics.length - 1;

  paintSelectedList(playingIndex);
  setMusic(musics[playingIndex]);
  setPlayStatus(PLAY_ON);
});


// list button
const $listBtn = document.querySelector('.listBtn');
const $listContainer = document.querySelector('.listContainer');
const $container = document.querySelector('.container');
const isListOpen = () => ([...$playBtn.classList].includes('listOpen'));
const setListOpenStatus = (boolean) => {
  if (boolean) {
    $playBtn.classList.remove('listOpen');
    $container.style.width = '400px';
    $listContainer.style.display = 'none';
  } else {
    $playBtn.classList.add('listOpen');
    $container.style.width = '800px';
    $listContainer.style.display = 'block';
  }
};
$listBtn.addEventListener('click', () => setListOpenStatus(isListOpen()));


// mute button
const $muteBtn = document.querySelector('.soundBtn');
const isMuting = () => ([...$muteBtn.classList].includes('muting'));
$musicPlayer.volume = 0.5;

const setMuteStatus = (function() {
  let beforeVolume = $musicPlayer.volume;

  const setStatus = (boolean) => {
    if (boolean) {
      $muteBtn.classList.remove('muting');
      $musicPlayer.volume = beforeVolume;
    } else {
      $muteBtn.classList.add('muting');
      beforeVolume = $musicPlayer.volume;
      $musicPlayer.volume = 0;
    }
  };

  return setStatus;
}());
$muteBtn.addEventListener('click', () => setMuteStatus(isMuting()));


// progressbar
const $progressbar = document.getElementById('progressbar');
$progressbar.value = 0;

const setProgToRuntime = () => {
  const { duration } = $musicPlayer;
  // console.log(($musicPlayer.currentTime / duration) * 100);
  // console.log(duration);
  $progressbar.value = isNaN(duration) ? 0 : ($musicPlayer.currentTime / duration) * 100;
};

const setRuntimeToProg = () => {
  const duration = isNaN($musicPlayer.duration) ? 0 : $musicPlayer.duration;
  $musicPlayer.currentTime = ($progressbar.value / 100) * duration;
};

const removeSetProg = () => $musicPlayer.removeEventListener('timeupdate', setProgToRuntime);
const addSetProg = () => $musicPlayer.addEventListener('timeupdate', setProgToRuntime);

$musicPlayer.addEventListener('timeupdate', setProgToRuntime);
$progressbar.addEventListener('change', setRuntimeToProg);

$progressbar.addEventListener('mousedown', removeSetProg);
$progressbar.addEventListener('mouseup', addSetProg);
