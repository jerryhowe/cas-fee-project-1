// eslint-disable-next-line no-unused-vars
function openMenu() {
  const x = document.getElementById('top-navigation-bar')
  if (x.className === 'topnav') {
    x.className += ' responsive'
  } else {
    x.className = 'topnav'
  }
}

// eslint-disable-next-line no-unused-vars
function openTab(evt, tabName) {
  // console.log(evt)
  // console.log(tabName)
  const tabContent = document.getElementsByClassName('tabcontent')
  for (let i = 0; i < tabContent.length; i++) {
    tabContent[i].style.display = 'none'
  }
  const tabLinks = document.getElementsByClassName('tablinks')
  for (let i = 0; i < tabLinks.length; i++) {
    tabLinks[i].className = tabLinks[i].className.replace(' active', '')
  }
  document.getElementById(tabName).style.display = 'block'
  // eslint-disable-next-line no-param-reassign
  evt.currentTarget.className += ' active'
}

// eslint-disable-next-line no-unused-vars
function toggleLightModeDarkMode(turnDark) {
  console.log(`turning ${turnDark ? 'dark' : 'light'}...`)
  console.log('to be implemented...')
}

// const themeButton = document.getElementById('theme-button')
// themeButton.addEventListener('click', () => {
//   console.log('turning dark...')
//   document.body.classList.toggle('dark-theme')
// })
