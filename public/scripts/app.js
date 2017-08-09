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

// how long ago was the tweet created?



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
            <p>${time(tweet)}</p>
            <img src="images/flag.png">
            <img src="/images/retweet.jpg">
            <img src="images/heart.png">
          </footer>
        </article>
  `
    return html;
}

function renderTweets(data){
  //empties tweets container
  $('#tweets').html('');
  data.forEach(function(element){
    $('#tweets').prepend(createTweetElement(element));
  })
}

function postTweet(){
  $('#new-tweet').submit(function(elm){
    elm.preventDefault();
    if ($(this).serializeArray()[0].value.length === 0){
      alert('Post is empty!');
    } else if ($(this).serializeArray()[0].value.length <= 140){
      $.post('/tweets', $(this).serialize(), loadTweets);
      $("#new-tweet textarea").val('');
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

function compose(){
  $('#nav-bar .compose').on('click', function(){
    $('.new-tweet').addClass('transparent');
    $('.new-tweet').slideToggle(400, function(){
      $('.new-tweet textarea').focus();
      $('.new-tweet').removeClass('transparent');
    });
  });
}

$(function() {
  loadTweets();
  postTweet();
  compose();
});