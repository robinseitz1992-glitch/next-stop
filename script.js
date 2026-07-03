const input = document.getElementById('bar-input');
const addButton = document.getElementById('add-button');
const randomButton = document.getElementById('random-button');
const barList = document.getElementById('bar-list');
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
  barList.innerHTML = '';

  if (bars.length === 0) {
    const emptyItem = document.createElement('li');
    emptyItem.textContent = 'Keine Bars in der Liste.';
    emptyItem.className = 'bar-item';
    barList.appendChild(emptyItem);
  }

  bars.forEach((bar, index) => {
    const item = document.createElement('li');
    item.className = 'bar-item';

    const name = document.createElement('p');
    name.textContent = bar;
    name.className = 'bar-name';

    const removeButton = document.createElement('button');
    removeButton.type = 'button';
    removeButton.textContent = 'Entfernen';
    removeButton.className = 'remove-button';
    removeButton.addEventListener('click', () => removeBar(index));

    item.appendChild(name);
    item.appendChild(removeButton);
    barList.appendChild(item);
  });

  randomButton.disabled = bars.length === 0;
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

loadBars();
renderBars();
