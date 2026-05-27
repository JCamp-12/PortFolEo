const buttons = document.querySelectorAll('[data-endpoint]');
const responseTitle = document.querySelector('#response-title');
const responseOutput = document.querySelector('#response-output');

async function loadEndpoint(endpoint) {
  responseTitle.textContent = `GET ${endpoint}`;
  responseOutput.textContent = 'Loading...';

  try {
    const response = await fetch(endpoint);
    const data = await response.json();
    responseOutput.textContent = JSON.stringify(data, null, 2);
  } catch (error) {
    responseOutput.textContent = JSON.stringify(
      {
        error: 'Unable to load endpoint.',
        detail: error.message,
      },
      null,
      2,
    );
  }
}

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    buttons.forEach((item) => item.removeAttribute('aria-current'));
    button.setAttribute('aria-current', 'true');
    loadEndpoint(button.dataset.endpoint);
  });
});

buttons[0]?.setAttribute('aria-current', 'true');
loadEndpoint('/api');
