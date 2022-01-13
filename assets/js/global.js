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
})();
