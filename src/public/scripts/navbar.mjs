function openMenu() {
  const x = document.getElementById('top-navigation-bar')
  if (x.className === 'topnav') {
    x.className += ' responsive'
  } else {
    x.className = 'topnav'
  }
}

function openTab(evt, tabName) {
  console.log(evt)
  console.log(tabName)
  const tabContent = document.getElementsByClassName('tabcontent')
  for (let i = 0; i < tabContent.length; i++) {
    tabContent[i].style.display = 'none'
  }
  const tabLinks = document.getElementsByClassName('tablinks')
  for (let i = 0; i < tabLinks.length; i++) {
    tabLinks[i].className = tabLinks[i].className.replace(' active', '')
  }
  document.getElementById(tabName).style.display = 'block'
  evt.currentTarget.className += ' active'
}

function toggleLightModeDarkMode(turnDark) {
  console.log(`turning ${turnDark ? 'dark' : 'light'}...`)
  console.log('to be implemented...')
}
