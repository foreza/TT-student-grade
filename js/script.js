let isDarkMode = false;         // T = dark mode, F = light mode.

function toggleDarkMode() {

  if (!isDarkMode) {
    document.getElementById("body-content")
      .classList.add('darkMode');
    isDarkMode = true;
  } else {
    document.getElementById("body-content")
      .classList.remove('darkMode');
    isDarkMode = false;
  }

}
