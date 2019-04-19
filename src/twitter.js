require("dotenv").config();
// const Twitter = require("twitter");
const Twit = require("twit");

// const opts = {
//   consumer_key: process.env.TWITTER_CONSUMER_KEY,
//   consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
//   bearer_token: process.env.TWITTER_BEARER_TOKEN
// };

const opts = {
  consumer_key: process.env.TWITTER_CONSUMER_KEY3,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET3,
  app_only_auth: true
};

async function getTweets(req, resp) {
  const client = new Twit(opts);
  const event = {};
  const users = [];

  let resultsExist, maxid, isEqualsToLocation, andLocation;
  let result = { totalCount: 0, tweets: [] };
  let counter = 0;

  do {
    let tweets = await client.get("search/tweets", {
      q: "#" + req.body.hashtag,
      count: 100
    });

    result.totalCount += tweets.data.statuses.length;

    result.tweets = [...tweets.data.statuses, ...result.tweets];

    if (tweets.data.search_metadata.next_results !== undefined) {
      resultsExist = tweets.data.search_metadata.next_results;
      isEqualsToLocation = resultsExist.indexOf("=");
      andLocation = resultsExist.indexOf("&");
      maxid = resultsExist.substring(isEqualsToLocation + 1, andLocation);
    } else {
      resultsExist = tweets.data.search_metadata.next_results;
    }
    counter += 1;
  } while (resultsExist !== undefined && counter < 3);

  event["id"] = req.body.id;
  event["name"] = req.body.name;
  event["hashtag"] = req.body.hashtag;
  event["posts"] = result.tweets.length;
  event["gallery"] = [];

  for (tweet of result.tweets) {
    users.push(tweet.user.id);
    if (tweet.extended_entities !== undefined) {
      const userGallery = {};
      userGallery["media_url"] = tweet.extended_entities.media[0].media_url;
      userGallery["screen_name"] = tweet.user.screen_name;
      userGallery["url"] = tweet.extended_entities.media[0].url;
      userGallery["created_at"] = tweet.created_at;
      userGallery["profile_image_url"] = tweet.user.profile_image_url;
      event["gallery"].push(userGallery);
    }
  }

  const usersDistinct = [...new Set(users)];
  event["users"] = usersDistinct.length;

  resp.send(event);
}

exports.getTweets = getTweets;
