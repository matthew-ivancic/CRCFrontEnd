function toggleTheme() {
  const html = document.documentElement;
  const currentTheme = html.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  html.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  
  updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
  const lightIcon = document.querySelector('.light-icon');
  const darkIcon = document.querySelector('.dark-icon');
  
  if (theme === 'dark') {
    lightIcon.style.display = 'none';
    darkIcon.style.display = 'inline';
  } else {
    lightIcon.style.display = 'inline';
    darkIcon.style.display = 'none';
  }
}

// Load saved theme on page load
document.addEventListener('DOMContentLoaded', () => {
  // Check for saved theme preference or default to dark
  const savedTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);
  
  // Only respect system preference if user has explicitly set it before
  // Otherwise, always default to dark mode
});

// Listen for system theme changes (only if user has explicitly set a preference)
if (window.matchMedia) {
  window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', e => {
    // Only auto-switch if user has manually set a preference before
    if (localStorage.getItem('theme')) {
      const newTheme = e.matches ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateThemeIcon(newTheme);
    }
  });
}
