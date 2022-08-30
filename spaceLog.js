

const webConsole = document.querySelector('.console');
const aliensContainer = document.querySelector('.alien-container');

const spacelog = (message) => {
  console.log(message);
  webConsole.innerHTML += `${message}<br>`;
}

export default spacelog;

