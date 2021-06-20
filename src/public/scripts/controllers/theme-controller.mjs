class ThemeController {
  constructor() {
    this.themeButton = document.querySelector('#theme-button')
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
    })
  }
}

new ThemeController().initializeThemeButton()
