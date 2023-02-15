const utils = require('./utils');

// how to get custom discord emote ids: https://stackoverflow.com/questions/63705166/how-to-make-the-bot-send-personalized-emojis

const eightBallAnswers = [
  'Without a doubt.',
  'Most likely.',
  'Outlook good.',
  'Yes.',
  'No.',
  'Reply hazy, try again.',
  'Ask again later.',
  'This is the way.',
  'It’s 5 o\'clock somewhere, am I right?',
  'Concentrate and ask again.',
  'Better not tell you now.',
  'I\'ve got a headache. Ask again later.',
  'U wot m8.',
  'It... wouldn\'t be inaccurate to assume that I couldn\'t exactly not say that it is or isn’t almost partially incorrect.',
  'Maybe someday.',
  'Don\'t count on it.',
  'My sources say no.',
  'Outlook not so good.',
  'It’s not my job.',
  'In your dreams.',
  '(Foppish) - I don’t think so!',
  // emotes
  ':100:',
  '<:kermitface:926033172997742642>', // custom discord emote
  '<:pacha:726260609473314826>' // custom discord emote
];

/**
 * A function return an answer after asking the magic eight-ball via the discord command.
 *
 * @return string
 */
const eightBall = function() {
  const num = utils.randomNumber(0, eightBallAnswers.length) - 1;
  return eightBallAnswers[num];
};


module.exports = {
  eightBall
};
