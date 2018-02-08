let page = {
  startBtn: document.querySelector('.header-start button'),
  notification: {
    close: document.querySelectorAll('[meta-aim=close-notification]'),
    transparentBox: document.querySelector('.transparent-box'),
    body: document.querySelector('.notification'),
    title: document.querySelector('.notification-header'),
    message: document.querySelector('.notification-text')
  },

  init: () => {
    document.addEventListener('DOMContentLoaded', () => {
      page.listeners();
    });
  },

  listeners: () => {
    window.addEventListener('load', () => {
      page.notify();
    });

    page.startBtn.addEventListener('click', game.init);

    page.notification.close.forEach((item) => {
      item.addEventListener('click', () => {
        page.notification.body.className = 'notification';
        page.notification.transparentBox.className = 'transparent-box';
      });
    });
  },

  notify: (title = `Let's play!`, message = 'Input your name and choose difficulty!') => {
    page.notification.transparentBox.className += ' show';
    page.notification.body.className += ' show';
    page.notification.title.innerHTML = title;
    page.notification.message.innerHTML = message;
  },
}

page.init();