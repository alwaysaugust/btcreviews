(function() {
  const spinner = document.querySelector('.list-spinner'),
    postsContainer = document.querySelector('.post-list'),
    sortButton = document.querySelector('.bottom-header .sort');

  let perPage = 10,
    current = 10;

  // get JSON of all posts
  fetch('/all-posts.json', {method: 'GET', headers: {}}).then(function (response) {
    return response.json();
  })
  .then(function (body) {
    let options = {
      rootMargin: '0px',
      threshold: 1.0
    };

    let observer = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          // load posts when spinner is visible
          loadPosts(body.posts);
        }
      });
    }, options);

    // filter category
    const category = postsContainer.getAttribute('data-category');
    if (category) {
      body.posts = body.posts.filter(function(post) {
        return post.categories.includes(category);
      });
    }

    // console.log(body.posts);

    if (body.posts.length <= postsContainer.querySelectorAll('li > a').length) {
      spinner.style.display = 'none';
    }
    else {
      observer.observe(spinner);
    }

    // sorting
    sortButton.addEventListener('click', function(e) {
      e.preventDefault();
      current = 0;
      body.posts.reverse();
      let currentPosts = postsContainer.querySelectorAll('li > a');
      currentPosts.forEach(function(post) { post.parentNode.remove() });
      loadPosts(body.posts);

      sortButton.classList.toggle('old');
    });
  });

  function loadPosts(postsList) {
    postsList.slice(current, current + perPage).forEach(function(item) {
      // create list items
      let listItem = document.createElement("li");
      let listItemA = document.createElement("a");
      listItemA.setAttribute('href', item.url);
      let title = document.createElement("h3");
      title.innerHTML = `<span>${item.title}</span>`;
      listItemA.append(title);
      if (item.author) {
        let author = document.createElement("span");
        author.classList.add("author");
        author.innerHTML = `By: ${item.author}`;
        listItemA.append(author);
      }
      let date = document.createElement("span");
      date.classList.add("date");
      let dateObj = new Date(item.date);
      date.innerHTML = dateObj.toLocaleDateString(undefined, {year: 'numeric', month: 'long', day: 'numeric'});
      listItemA.append(date);
      let audio = document.createElement("span");
      audio.classList.add("audio");
      if (item.audio) {
        audio.innerHTML = `<span><img src="/assets/images/audio.svg" /></span>`;
      }
      listItemA.append(audio);
      listItem.append(listItemA);
      spinner.before(listItem);
    });

    // increment current index
    current += perPage;

    // hide spinner if reached end of posts
    if (current >= postsList.length) {
      spinner.style.display = 'none';
    }
  }
})();
