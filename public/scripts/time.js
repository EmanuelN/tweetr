
const days = function(ms){
  const days = Math.floor(ms/1000/60/60/24);
  return days;
}
const hours = function(ms){
  const hours = Math.floor(ms/1000/60/60);
  return hours;
}
const minutes = function(ms){
  let x = ms/1000
  //console.log(x)
  const minutes = Math.floor(x/60);
  //console.log(minutes);
  return minutes
}

const time = function(tweet) {
  let now = Date.now();
  const tweetAge = (now - tweet.created_at);
  console.log("created: ",tweet.created_at)
  console.log("now:" , now)
  console.log("age:", tweetAge);
  if (tweetAge > 86400000){
    const output = days(tweetAge) + " days ago";
    return output;
  } else if (tweetAge >= 3600000) {
    const output = hours(tweetAge) + " hours ago";
    return output;
  } else if (tweetAge >= 60000 && minutes(tweetAge) !== 0){
    const output = minutes(tweetAge) + " minutes ago";
    return output;
  } else {
    const output = "less than a minute ago"
    return output;
  }
}