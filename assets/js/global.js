(function(){
  // theme switch
  const toggle = document.querySelector('.bottom-header .theme-toggle input');
  if (toggle) {
    toggle.addEventListener('change', function(e) {
      document.querySelector('body').classList.toggle('dark');
      localStorage.setItem('theme', this.checked ? 'dark' : 'light');
    });
  }

  // default theme
  if (document.querySelector('body').classList.contains("dark")) {
    toggle.checked = true;
  }

  // scroll
  const postListHeader = document.querySelector('.post-list-header');
  if (postListHeader) {
    document.addEventListener('scroll', function() {
      if (window.scrollY >= 100) {
        postListHeader.classList.add('scroll');
      }
      else {
        postListHeader.classList.remove('scroll'); 
      }
    }, {passive: true});
  }

  // mobile
  const menuToggle = document.querySelector('.hamburger'),
    mobileMenu = document.querySelector('header.header .right'),
    searchToggle = document.querySelector('.bottom-header .toggle'),
    searchMenu = document.querySelector('.bottom-header .form');
  menuToggle.addEventListener('click', function(e) {
    e.preventDefault();
    menuToggle.classList.toggle('is-active');
    mobileMenu.classList.toggle('open');
  });

  searchToggle.addEventListener('click', function(e) {
    e.preventDefault();
    searchToggle.classList.toggle('open');
    searchMenu.classList.toggle('open');
  });
})();
