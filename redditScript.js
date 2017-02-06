function renderPosts(posts) {
  var templateSource = getTemplate('post-template');
  var template = Handlebars.compile(templateSource);
  var html = template({ posts: posts });
  $('.posts').html(html);
}

function handleResponse(response) {
  var responsePosts = response.data.children;
  var posts = [];
  for (var i = 0; i < responsePosts.length; i++) {
    posts[i] = responsePosts[i].data;
  }
  posts.forEach((posts) => {
  posts.hasThumbnail = posts.thumbnail !== "self";
  });

  posts.forEach((posts) => {
  posts.hasSelfText = posts.selftext !== "";
  });
  renderPosts(posts);
}

function handleJokeResponse(response) {
  var responsePosts = response.data.children;
  var posts = [];
  for (var i = 0; i < responsePosts.length; i++) {
    posts[i] = responsePosts[i].data;
  }
  posts.forEach((posts) => {
  posts.hasThumbnail = posts.thumbnail !== "self";
  });

  posts.forEach((posts) => {
  posts.hasSelfText = posts.selftext !== "";
  });

  var randomDadJoke = [posts[(Math.floor(Math.random() * i))]];

  renderPosts(randomDadJoke);
}

function getTemplate(name) {
  return $('script#' + name).html();
}

function getPosts() {
  var subreddit = $('#subreddit').val();
  $.getJSON('https://www.reddit.com/r/' + subreddit + '/top.json?sort=top&t=day').done(handleResponse);
}

function getDadJokes() {
  var subreddit = $('#subreddit').val();
  $.getJSON('https://www.reddit.com/r/dadjokes/top.json?sort=top&t=day').done(handleJokeResponse);
}

$(function () {
  $('#subButton').on('click', getPosts);
});

$(function () {
  $('#dadJokes').on('click', getDadJokes);
});
