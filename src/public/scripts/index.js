const form = document.getElementById('form');
const title = document.getElementById('title');
const description = document.getElementById('description');
const importance = document.getElementById('importance');
const duedate = document.getElementById('duedate');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const message = `
    Title: ${title.value}
    Description: ${description.value}
    Importance: ${importance.value}
    Duedate: ${duedate.value}
  `;

  console.debug(message);
});

let today = new Date();
let dd = today.getDate();
let mm = today.getMonth() + 1; // January is 0!
const yyyy = today.getFullYear();
if (dd < 10) {
  dd = `0${dd}`;
}
if (mm < 10) {
  mm = `0${mm}`;
}

today = `${yyyy}-${mm}-${dd}`;
document.getElementById('duedate').setAttribute('min', today);

const themeButton = document.getElementById('theme-button');
themeButton.addEventListener('click', () => {
  document.body.classList.toggle('dark-theme');
});
