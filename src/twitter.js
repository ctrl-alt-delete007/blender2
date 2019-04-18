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

async function getTweets(hashtag) {
  const client = new Twit(opts);

  let resultsExist, maxid, isEqualsToLocation, andLocation;
  let result = { totalCount: 0, tweets: [] };
  let counter = 0;

  do {
    let tweets = await client.get("search/tweets", {
      q: "#" + hashtag,
      count: 100
    });

    console.log(tweets.data.search_metadata);

    result.totalCount += tweets.data.statuses.length;

    result.tweets = [...tweets.data.statuses, ...result.tweets];

    console.log("next results", tweets.data.search_metadata.next_results);
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

  return result;
}

exports.getTweets = getTweets;
