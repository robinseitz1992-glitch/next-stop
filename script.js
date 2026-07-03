const input = document.getElementById('bar-input');
const addButton = document.getElementById('add-button');
const randomButton = document.getElementById('random-button');
const removeSelectedButton = document.getElementById('remove-selected-button');
const barSelect = document.getElementById('bar-select');
const resultText = document.getElementById('result-text');
const STORAGE_KEY = 'bar-zufallsliste';

let bars = [];

function loadBars() {
  const saved = localStorage.getItem(STORAGE_KEY);
  bars = saved ? JSON.parse(saved) : [];
}

function saveBars() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(bars));
}

function renderBars() {
  barSelect.innerHTML = '';

  if (bars.length === 0) {
    const emptyOption = document.createElement('option');
    emptyOption.textContent = 'Keine Bars in der Liste.';
    emptyOption.disabled = true;
    emptyOption.selected = true;
    barSelect.appendChild(emptyOption);
  } else {
    bars.forEach((bar) => {
      const option = document.createElement('option');
      option.value = bar;
      option.textContent = bar;
      barSelect.appendChild(option);
    });
  }

  randomButton.disabled = bars.length === 0;
  removeSelectedButton.disabled = bars.length === 0;
}

function addBar() {
  const value = input.value.trim();
  if (!value) {
    alert('Bitte gib einen Bar-Namen ein.');
    return;
  }

  bars.push(value);
  saveBars();
  renderBars();
  input.value = '';
  input.focus();
}

function removeBar(index) {
  bars.splice(index, 1);
  saveBars();
  renderBars();
}
function removeSelectedBar() {
  if (bars.length === 0) return;
  const selectedIndex = barSelect.selectedIndex;
  if (selectedIndex < 0 || selectedIndex >= bars.length) return;
  removeBar(selectedIndex);
}

function chooseRandomBar() {
  if (bars.length === 0) return;

  const randomIndex = Math.floor(Math.random() * bars.length);
  const chosen = bars[randomIndex];
  bars.splice(randomIndex, 1);
  saveBars();
  renderBars();
  resultText.textContent = chosen;
}

addButton.addEventListener('click', addBar);
input.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    addBar();
  }
});
randomButton.addEventListener('click', chooseRandomBar);
removeSelectedButton.addEventListener('click', removeSelectedBar);

loadBars();
renderBars();
