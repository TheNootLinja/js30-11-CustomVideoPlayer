const playerParent = document.querySelector('.player');
const videoPlayer = playerParent.querySelector('.viewer');
const playButton = playerParent.querySelector('.toggle');
const progressBar = playerParent.querySelector('.progress');
const progressFill = playerParent.querySelector('.progress__filled');
const skipButtons = playerParent.querySelectorAll('[data-skip]');
const rangeInputs = playerParent.querySelectorAll('.player__slider');

videoPlayer.onloadedmetadata = () => {
  console.log(videoPlayer.duration)
}

const handlePlayButtonClick = () => {
  if(videoPlayer.paused) {
    videoPlayer.play()
  } else {
    videoPlayer.pause()
  }
}

const updateButtonText = () => {
  if(videoPlayer.paused) {
    playButton.innerHTML = '►'
  } else {
    playButton.innerHTML = '||'
  }
}

videoPlayer.addEventListener('click', handlePlayButtonClick);
videoPlayer.addEventListener('play', updateButtonText);
videoPlayer.addEventListener('pause', updateButtonText);
playButton.addEventListener('click', handlePlayButtonClick);