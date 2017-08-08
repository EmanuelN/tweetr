/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


// Escape text to make it safe
function escape(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

function createTweetElement(tweet){
  const safeText = escape(tweet.content.text);
  const days = function(ms){
    let days = Math.floor(ms/1000/60/60/24)
    return days
  }
  const html=`
        <article class="tweet">
          <header>
            <img src=${tweet.user.avatars.regular}>
            <div class="name">${tweet.user.name}</div>
            <div class="handle">${tweet.user.handle}</div>
          </header>
          <div>
            <p>${safeText}</p>
          </div>
          <footer>
            <p>${days(Date.now() - tweet.created_at)} days ago</p>
            <img src="images/flag.png">
            <img src="/images/retweet.jpg">
            <img src="images/heart.png">
          </footer>
        </article>
  `
    return html;
}

function renderTweets(data){
  data.forEach(function(element){
    $('#tweets').append(createTweetElement(element));
  })
}

function postTweet(){
  $('#new-tweet').submit(function(elm){
    elm.preventDefault();
    if ($(this).serializeArray()[0].value.length <= 140){
      console.log($(this).serializeArray()[0].value.length)
      $.post('/tweets', $(this).serialize());
      $("#new-tweet textarea").val('');
      alert('posted!');
    } else {
      alert('Post is too long!');
    }
  });
}

function loadTweets(){
  $.get('/tweets', function(res){
    renderTweets(res);
  });
}

$(function() {
  loadTweets();
  postTweet();
});