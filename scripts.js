const playerParent = document.querySelector('.player');
const videoPlayer = playerParent.querySelector('.viewer');
const playButton = playerParent.querySelector('.toggle');
const progressBar = playerParent.querySelector('.progress');
const progressFill = playerParent.querySelector('.progress__filled');
const skipButtons = playerParent.querySelectorAll('[data-skip]');
const rangeInputs = playerParent.querySelectorAll('.player__slider');
const fullscreenButton = playerParent.querySelector('.fullscreen');

const handlePlayButtonClick = () => {
  if (videoPlayer.paused) {
    videoPlayer.play();
  } else {
    videoPlayer.pause();
  }
};

const updateButtonText = () => {
  const buttonIcon = videoPlayer.paused ? '►' : '❚ ❚';
  playButton.textContent = buttonIcon;
};

const skipVideo = (e) => {
  const skipValue = parseInt(e.target.getAttribute('data-skip'));
  const videoCurrentTime = videoPlayer.currentTime;
  const videoNewTime = videoCurrentTime + skipValue;
  videoPlayer.currentTime = videoNewTime;
};

const adjustVideoProperties = (e) => {
  const videoProperty = e.target.name;
  const adjustedValue = e.target.value;
  videoPlayer[videoProperty] = adjustedValue;
};

const handleVideoProgress = () => {
  const progressPercent =
    (videoPlayer.currentTime / videoPlayer.duration) * 100;
  progressFill.style.flexBasis = `${progressPercent}%`;
};

const handleVideoScrub = (e) => {
  const scrubDecimal = e.offsetX / progressBar.offsetWidth;
  const scrubPercent = (e.offsetX / progressBar.offsetWidth) * 100;
  const scrubTime = videoPlayer.duration * scrubDecimal;
  videoPlayer.currentTime = scrubTime;
  progressFill.style.flexBasis = `${scrubPercent}%`;
};

const handleFullscreenClick = () => {
  if (document.fullscreenElement) {
    document.exitFullscreen();
    return;
  }
  playerParent.requestFullscreen();
};

videoPlayer.addEventListener('click', handlePlayButtonClick);
videoPlayer.addEventListener('play', updateButtonText);
videoPlayer.addEventListener('pause', updateButtonText);
videoPlayer.addEventListener('timeupdate', handleVideoProgress);
fullscreenButton.addEventListener('click', handleFullscreenClick);
playButton.addEventListener('click', handlePlayButtonClick);
skipButtons.forEach((button) => {
  button.addEventListener('click', skipVideo);
});
rangeInputs.forEach((input) => {
  input.addEventListener('change', adjustVideoProperties);
});
rangeInputs.forEach((input) => {
  input.addEventListener('mousemove', adjustVideoProperties);
});
let isClicked = false;
progressBar.addEventListener('click', handleVideoScrub);
progressBar.addEventListener(
  'mousemove',
  (e) => isClicked && handleVideoScrub(e)
);
progressBar.addEventListener('mousedown', () => (isClicked = true));
progressBar.addEventListener('mouseup', () => (isClicked = false));
