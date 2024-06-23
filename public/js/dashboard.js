const setUsername = (() => {
  const textBar = document.querySelector('span.navbar-text>strong');

  if (!textBar) return null;

  textBar.textContent = Storage.get('username');
});

const performSearch = () => {
  const searchInput = document.getElementById('searchInput').value.trim().toLowerCase();
  const listItems = document.querySelectorAll('.list-group-item');

  let found = false;

  listItems.forEach(item => {
    const text = item.textContent.trim().toLowerCase();
    if (text.includes(searchInput)) {
      item.style.display = ''; 
      found = true;
    } else {
      item.style.display = 'none'; 
    }
  });

  const noResultsMessage = document.getElementById('noResultsMessage');
  if (!found) {
    noResultsMessage.style.display = ''; 
  } else {
    noResultsMessage.style.display = 'none'; 
  }
};

const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', performSearch);

(() => {
  setUsername();
})();
