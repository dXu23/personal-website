
/*
favouriteMovieGenre("regular")

// watermelon, tomato, banana, orange, avocado, blueberry
favouriteFruit("regular")

// sharp, soft, round
favouriteEdgeStyle("sharp")
*/

let settingsDiv = document.getElementById('settings');
settingsDiv.style.setProperty('--originalHeight', '600px');

const settingsExpander = document.getElementById('settings-expander');

settingsExpander.addEventListener('click', () => {
    settingsDiv.classList.toggle('expand');
});

/**
 * @param prop CSS property of document to change
 * @param value CSS value to set prop to
 */

const storageKey = 'mode-preference';

function setProp(prop, value) {
  document.documentElement.style.setProperty(prop, value)
}

function favouriteEdgeStyle(style) {
  setProp("--image", "var(--" + style + ")");
}

const mode = {
  value: getColorPreference(),
};

function getColorPreference() {
  const colorPreference = localStorage.getItem(storageKey);
  if (colorPreference) {
    return colorPreference;
  } else {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
}

function reflectPreference() {
  if (mode.value === 'light' || !mode.value) {
    setProp('--background', "var(--light)");
    setProp('--text', "var(--dark)");
  } else if (mode.value === 'dark') {
    setProp('--background', "var(--dark)");
    setProp('--text', "var(--light)");
  }

  document.getElementById('mode-switch')?.setAttribute('aria-label', mode.value);
}

function setPreference() {
  localStorage.setItem(storageKey, mode.value);
  reflectPreference();
}

function onClick() {
  mode.value = mode.value === 'light' ? 'dark' : 'light';

  setPreference();
}

const themeLight = new Map([['avocado', '#6b8c21'], ['banana', '#fbec5d'], ['blueberry', '#41a8f9'],
                            ['default', '#f5f5f5'], ['orange', '#ffca16'], ['tomato',    '#d62e2e'], 
                            ['watermelon', '#75b855']]);

const themeDark = new Map([['avocado', '#704012'], ['banana', '#6b3e26'], ['blueberry', '#064490'],
                           ['default', '#222222'], ['orange', '#f97300'], ['tomato',    '#600000'], 
                           ['watermelon', '#ad3838']]);

const fruitRadios = document.getElementsByName('fruit');

for (let i = 0; i < fruitRadios.length; i++) {
  fruitRadios[i].onclick = function () {
    setProp('--light', themeLight.get(this.value));
    setProp('--dark', themeDark.get(this.value));
  }
};

const genreRadios = document.getElementsByName('genre');

for (let i = 0; i < genreRadios.length; i++) {
  genreRadios[i].onclick = function () {
    console.log(`this.value: ${this.value}`);
    setProp('--font', 'var(--' + (this.value === 'default' ? 'regular' : this.value) + ')');
  }
}

const edgeRadios = document.getElementsByName('edge');
for (let i = 0; i < edgeRadios.length; i++) {
  edgeRadios[i].onclick = function () {
    setProp('--image', 'var(--' + this.value + ')');
  }
}

function favouriteFruit(theme) {
  switch (theme) {
    case "forrest":
      setProp('--light', "#91B247")
      setProp('--dark', "#597C2B")
      break;
    case "love":
      setProp('--light', "#f06836")
      setProp('--dark', "#ba0001")
      break;
    case "muted":
      setProp('--light', "#4c5b64")
      setProp('--dark', "#45241c")
      break;
    case "pastel":
      setProp('--light', "#f2f6c3")
      setProp('--dark', "#68c4af")
      break;
    case "shiny":
      setProp('--light', "#2e9afe")
      setProp('--dark', "#02197c")
      break;
    case "sky":
      setProp('--light', "#99ccff")
      setProp('--dark', "#3366ff")
      break;
    default:
      setProp('--light', "#f5f5f5")
      setProp('--dark', "#222222")
      break;
    } 
}

favouriteFruit('regular');

reflectPreference();

window.onload = () => {
  reflectPreference();

  document.getElementById('mode-switch').addEventListener('click', onClick);
}

window.matchMedia('(prefers-color-scheme: dark)')
.addEventListener('change', ({ matches: isDark }) => {
  mode.value = isDark ? 'dark' : 'light';
  setPreference();
});

