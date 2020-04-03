// play status
const PLAY_ON = false;

// play control buttons
const $musicPlayer = document.getElementById('audio');
const $playBtn = document.getElementById('playBtn');
const $nextBtn = document.getElementById('nextBtn');
const $prevBtn = document.getElementById('prevBtn');

// album info
const $musicTitle = document.getElementById('musicTitle');
const $composer = document.getElementById('composer');
const $musicCover = document.querySelector('.player');

// list buttons
const $playList = document.querySelector('.playList');
const $listBtn = document.querySelector('.listBtn');
const $listContainer = document.querySelector('.listContainer');
const $container = document.querySelector('.container');

// progressbar
const $progressbar = document.getElementById('progressbar');
const $audioCurrentTime = document.getElementById('audioCurrentTime');
const $audioDuration = document.getElementById('audioDuration');

// menu button
const $muteBtn = document.querySelector('.soundBtn');

// music list
const musics = [
  { id: 0, title: 'Bongo Madness', fileName: 'Bongo_Madness', composer: 'Quincas Moreira', time: '3:09' },
  { id: 1, title: 'Morning Mandolin', fileName: 'Morning_Mandolin', composer: 'chris haugen', time: '3:39' },
  { id: 2, title: 'I Feel Like Partying', fileName: 'I_Feel_Like_Partying', composer: 'Nat Keefe & BeatMower', time: '2:59' }
];

// set music func
const setMusic = (music) => {
  $musicPlayer.src = `music/${music.fileName}.mp3`;
  $musicTitle.innerText = music.title;
  $composer.innerText = music.composer;

  $musicCover.style.backgroundImage = `url(img/${music.fileName}.jpg)`;
  $musicCover.style.backgroundSize = 'cover';
};

// list rendering func
const listRender = () => {
  let playList = '';
  musics.forEach((music) => {
    playList += `<li id=${music.id} class="listContent"><strong>${music.title}</strong><span>${music.composer}</span>
    <span>${music.time}</span></li>`;
  });
  $playList.innerHTML = playList;
};

const paintSelectedList = (index) => {
  [...$playList.children].forEach((li) => li.classList.remove('selected'));
  $playList.children[index].classList.add('selected');
};


// control player to button
const isPlaying = () => ([...$playBtn.classList].includes('playing'));

const playControler = (function() {
  let playingIndex = 0;

  const setPlayStatus = (boolean) => {
    if (boolean) {
      $playBtn.classList.remove('playing');
      $musicPlayer.pause();
    } else {
      $playBtn.classList.add('playing');
      $musicPlayer.play();
    }
  };

  const playSelectedList = (e) => {
    const index = e.target.matches('ul > li') ? +e.target.id : +e.target.parentNode.id;

    playingIndex = index;
    paintSelectedList(index);
    setMusic(musics[index]);
    setPlayStatus(PLAY_ON);
  };

  const playNext = () => {
    playingIndex++;

    if (playingIndex > musics.length - 1) playingIndex = 0;

    paintSelectedList(playingIndex);
    setMusic(musics[playingIndex]);
    setPlayStatus(PLAY_ON);
  };

  const playPrev = () => {
    playingIndex--;

    if (playingIndex < 0) playingIndex = musics.length - 1;

    paintSelectedList(playingIndex);
    setMusic(musics[playingIndex]);
    setPlayStatus(PLAY_ON);
  };

  return {
    setPlayStatus, playSelectedList, playNext, playPrev
  };
}());


// list button func
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


// mute button func
const isMuting = () => ([...$muteBtn.classList].includes('muting'));

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


// progressbar funcs
const calcTime = (time) => {
  const min = Math.floor(time / 60);
  let sec = Math.floor(time - (min * 60));
  sec = sec >= 10 ? sec : `0${sec}`;

  return `${min}:${sec}`;
};

const setProgToRuntime = () => {
  const isNaNDuration = isNaN($musicPlayer.duration);
  $progressbar.value = isNaNDuration ? 0 : ($musicPlayer.currentTime / $musicPlayer.duration) * 100;
  $audioDuration.innerText = isNaNDuration ? '0:00' : calcTime($musicPlayer.duration);
  $audioCurrentTime.innerText = calcTime($musicPlayer.currentTime);
};

const setRuntimeToProg = () => {
  const duration = isNaN($musicPlayer.duration) ? 0 : $musicPlayer.duration;
  $musicPlayer.currentTime = ($progressbar.value / 100) * duration;
};

const removeSetProg = () => $musicPlayer.removeEventListener('timeupdate', setProgToRuntime);
const addSetProg = () => $musicPlayer.addEventListener('timeupdate', setProgToRuntime);


// init config
setMusic(musics[0]);
listRender();
paintSelectedList(0);

// add Event Listener
// play control buttons
$playBtn.addEventListener('click', () => playControler.setPlayStatus(isPlaying())); // play button
$playList.addEventListener('click', playControler.playSelectedList); // play selected playlist
$nextBtn.addEventListener('click', playControler.playNext); // next button
$prevBtn.addEventListener('click', playControler.playPrev); // prev button

// menu bottons
$listBtn.addEventListener('click', () => setListOpenStatus(isListOpen()));
$muteBtn.addEventListener('click', () => setMuteStatus(isMuting()));

// progressbar
$musicPlayer.addEventListener('timeupdate', setProgToRuntime);
$progressbar.addEventListener('change', setRuntimeToProg);
$progressbar.addEventListener('mousedown', removeSetProg);
$progressbar.addEventListener('mouseup', addSetProg);