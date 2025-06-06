const { TextEncoder, TextDecoder } = require('util');

// Provide encoders for jsdom environment used by Jest
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

require('../js/app.js');

const { updateProgress } = window.adTechApp;

describe('updateProgress', () => {
  let progressBar;
  let progressStatus;

  beforeEach(() => {
    progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    progressBar.style.width = '0%';
    progressBar.setAttribute('aria-valuenow', '0');
    progressBar.textContent = '0%';

    progressStatus = document.createElement('div');
    progressStatus.id = 'progressStatus';
    progressStatus.textContent = 'Just started';

    document.body.appendChild(progressBar);
    document.body.appendChild(progressStatus);
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  test('updates width and status text', () => {
    updateProgress(30, progressBar, progressStatus);

    expect(progressBar.style.width).toBe('30%');
    expect(progressBar.getAttribute('aria-valuenow')).toBe('30');
    expect(progressBar.textContent).toBe('30%');
    expect(progressStatus.textContent).toBe('Making good progress');
  });
});
