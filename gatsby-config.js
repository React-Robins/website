module.exports = {
  plugins: [
    {
      resolve: '@matthieuauger/gatsby-theme-meetup',
      options: {
        meetupName: 'React Ladies',
        meetupHomepageHeadline:
          'a community of women + non-binary React enthusiasts',
        meetupDotComGroupUrlName: 'React-Ladies',
        displayVideosLink: false,
        //meetupVideosUrl = 'https://www.youtube.com/channel/UC66eQOycjMnaqzpbRUhEK2w'
        talkProposalUrl: 'https://airtable.com/shrphJUHyS1h6UK0Y',
        textBlocksPath: `${__dirname}/src/text-blocks`,
        dateFormat: `dddd DD MMMM YYYY`,
        translations: {
          PROPOSE_A_TALK: 'Propose a talk',
          FETCH_VIDEOS: 'See videos →',
          LAST_MEETUPS: 'Previous events',
          REGISTER_ON_MEETUP: 'Register on Meetup →',
          DONATE: 'Donate',
        },
      },
    },
  ],
};
