let paused = false;

function togglePause() {
  if (!paused) {
    paused = true;
  } else if (paused) {
    paused = false;
  }
}

function degreesToRadians(degrees) {
  return degrees * (Math.PI / 180);
}

export { paused, togglePause, degreesToRadians };
