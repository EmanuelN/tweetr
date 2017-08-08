/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const tweetData = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
  ]

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

$(function() {
  renderTweets(tweetData);
  postTweet();
});