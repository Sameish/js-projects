function renderPosts(posts) {
  var templateSource = getTemplate('post-template');
  var template = Handlebars.compile(templateSource);
  var html = template({ posts: posts });
  $('.posts').html(html);
}

function renderException(exceptionPost) {
  var templateSource = getTemplate('exception-template');
  var template = Handlebars.compile(templateSource);
  var html = template({ exceptionPost });
  $('.posts').html(html);
}

function handleResponse(response) {
  var posts = response.data.children.map((postData) => {
    var post = postData.data;
    post.hasThumbnail = post.thumbnail !== "self";
    post.hasSelfText = post.selftext !== "";
    return post;
  })
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

function handleException() {
  var exceptionMessage = [{message:"Not a real SubReddit!"}];
  renderException(exceptionMessage);
}

function getTemplate(name) {
  return $('script#' + name).html();
}

function getPosts() {
  var subreddit = $('#subreddit').val();
  $.getJSON('https://www.reddit.com/r/' + subreddit + '/top.json?sort=top&t=day').done(handleResponse).fail(handleException);
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
