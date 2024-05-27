const setUsername = (() => {
  const textBar = document.querySelector('span.navbar-text>strong');

  if (!textBar) return null;

  textBar.textContent = Storage.get('username');
});

(() => {
  setUsername();
})();