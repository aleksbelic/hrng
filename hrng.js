let pressedKeys = [];
let keyTimings = [];
let pastNumbers = [];
let startTime = performance.now();

const userTextInput = document.getElementById('user-text-input');
const randomNumberContainer = document.getElementById('random-number-container');
const pressedKeysContainer = document.getElementById('pressed-keys-container');
const keyTimingsContainer = document.getElementById('key-timings-container');
const pastNumbersContainer = document.getElementById('past-numbers-container');

userTextInput.addEventListener('keydown', event => {
  keyTimings.push(Math.floor(performance.now() - startTime));
  pressedKeys.push(event.key);
  startTime = performance.now();
  pressedKeysContainer.textContent = `${pressedKeys.join(', ')}`;
  keyTimingsContainer.textContent = `${keyTimings.join(', ')}`;
});

function generateRandomNumber() {
  const len = Math.min(pressedKeys.length, keyTimings.length);
  if (len === 0) {
    alert('No keys pressed or timings recorded.');
    return 0;
  }

  const keyXorTimingArr = [];

  for (let i = 0; i < len; i++) {
    const currentKey = pressedKeys[i];
    const currentKeyCode = currentKey.length === 1
      ? currentKey.charCodeAt(0)
      : currentKey.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0); // adds up the char codes of each letter (e.g. "Enter", "Shift", etc.)

    const keyXorTiming = currentKeyCode ^ keyTimings[i];
    keyXorTimingArr.push(keyXorTiming);
  }

  const saltedKeyXorTimingString = userTextInput.value + keyXorTimingArr.join(',');

  const hash = hashFnv1a(saltedKeyXorTimingString);
  const randomNumber = Math.floor((hash / 0xFFFFFFFF) * 100); // range 0-99

  return randomNumber;
}

function printRandomNumber() {
  if (pressedKeys.length === 0) {
    alert('Please type some text first.');
    userTextInput.focus();
    return;
  }
  const randomNumber = generateRandomNumber();
  pastNumbers.push(randomNumber);
  randomNumberContainer.textContent = `Generated number: ${randomNumber}`;
  pastNumbersContainer.textContent = `${pastNumbers.join(', ')}`;
  reset();
}

function hashFnv1a(str) {
  let hash = 0x811c9dc5; // FNV-1a offset basis
  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i);
    hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
  }
  return hash >>> 0;
}

function reset() {
  pressedKeys = [];
  keyTimings = [];
  userTextInput.value = '';
  userTextInput.focus();
}