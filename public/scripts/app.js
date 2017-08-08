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
    const days = Math.floor(ms/1000/60/60/24);
    return days;
  }
  const hours = function(ms){
    const hours = Math.floor(ms/1000/60/60);
    return hours;
  }
  const minutes = function(ms){
    const minutes = Math.floor(ms/1000/60);
    return minutes
  }

  const time = function() {
    let now = Date.now()
    const tweetAge = (now - tweet.created_at);
    if (tweetAge > 86400000){
      const output = days(tweetAge) + " days ago";
      return output;
    } else if (tweetAge >= 3600000) {
      const output = hours(tweetAge) + " hours ago";
      return output;
    } else if (tweetAge >= 60000 && minutes(tweetAge)-16 !== 0){
      const output = minutes(tweetAge)-16 + "minutes ago";
      return output;
    } else {
      const output = "less than a minute ago"
      return output;
    }
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
            <p>${time()}</p>
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

$(function() {
  loadTweets();
  postTweet();
});