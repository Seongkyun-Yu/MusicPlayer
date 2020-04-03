const musics = [
  { title: 'Bongo Madness', fileName: 'Bongo_Madness', composer: 'Quincas Moreira', time: '3:09' },
  { title: 'Morning Mandolin', fileName: 'Morning_Mandolin', composer: 'chris haugen', time: '3:29' },
  { title: 'I Feel Like Partying', fileName: 'I_Feel_Like_Partying', composer: 'Nat Keefe & BeatMower', time: '2:59' }
];

const $playList = document.getElementById('playList');

const listRender = function () {
  let playList = '';
  musics.forEach((music, i) =>{
    playList += `<li id=${i} class="listContent"><strong>${music.title}</strong><span>${music.composer}</span>
    <span>${music.time}</span></li>`;
  });
  $playList.innerHTML = playList;
};
listRender();