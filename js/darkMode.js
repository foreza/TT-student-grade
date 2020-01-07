var isDarkMode = false;         // Temporary value


// On document ready, set the dark mode theme
$(document).ready(function () {

  isDarkMode = getDarkModeState();      // Set initial state
  setDarkMode(isDarkMode);              

  // Bind event listener to the button
  $("#darkModeToggle").bind({
    click: function () {
      toggleDarkModeState();    // Toggle the value
      setDarkMode(isDarkMode);  // Update the style
    }
  });

});


// Function to retrieve the state (TODO: implement from local / remote)
function getDarkModeState() {
  return isDarkMode;
}


// Update DOM to use darkMode style or remove it
function setDarkMode(value) {

  if (value) {
    $('#body-content').attr('class', 'darkMode');
  } else {
    $('#body-content').removeAttr('class', 'darkMode');
  }


}


// Toggle (and TODO: save) from local / remote
function toggleDarkModeState(){
  isDarkMode = !isDarkMode;
}
