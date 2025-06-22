(function () {
  var themeToggle = document.querySelector("#theme-toggle");
  if (!themeToggle) {
    return;
  }

  var currentTheme = localStorage.getItem("theme")
    ? localStorage.getItem("theme")
    : null;

  if (currentTheme) {
    document.documentElement.setAttribute("data-theme", currentTheme);

    if (currentTheme === "dark") {
      themeToggle.checked = true;
    }
  } else {
    // Always default to dark mode for new visitors
    document.documentElement.setAttribute("data-theme", "dark");
    themeToggle.checked = true;
  }

  function switchTheme(e) {
    if (e.target.checked) {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
    }
  }

  themeToggle.addEventListener("change", switchTheme, false);
})();
