import { valueStorage } from '../services/value-storage.js'

class ThemeController {
  constructor() {
    this.themeButton = document.querySelector('#theme-button')
    const isDark = valueStorage.getItem('isDark')
    if (isDark) {
      document.body.classList.toggle('dark-theme')
      this.themeButton.querySelector('i').classList.add('fa-sun')
    }
  }

  initializeThemeButton() {
    this.themeButton.addEventListener('click', () => {
      const isLight = this.themeButton
        .querySelector('i')
        .classList.contains('fa-sun')
      document.body.classList.toggle('dark-theme')
      this.themeButton
        .querySelector('i')
        .classList.add(isLight ? 'fa-moon' : 'fa-sun')
      this.themeButton
        .querySelector('i')
        .classList.remove(isLight ? 'fa-sun' : 'fa-moon')
      valueStorage.setItem('isDark', !isLight)
    })
  }
}

new ThemeController().initializeThemeButton()
