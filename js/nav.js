import { initThemeToggle } from './modeSwitch.js';

document.addEventListener('DOMContentLoaded', () => {
  const placeholder = document.querySelector('.nav-placeholder');

  if (placeholder) {
    fetch('nav.html')
      .then(res => res.text())
      .then(html => {
        placeholder.innerHTML = html;

        const toggleBtn = placeholder.querySelector('[data-theme-toggle]');
        if (toggleBtn) {
          initThemeToggle(toggleBtn); 
        }
      });
  }
});
