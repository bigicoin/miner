'use strict';

module.exports = {
  /**
   * The name of the site, used in html titles and copyright.
   */
  site_name: 'Miner',

  /**
   * The host part, to be used by <link rel="canonical" href="..."> meta tags,
   * to define a canonical url for SEO purposes.
   */
  canon_host: 'https://miner.github.io',

  /**
   * Options: date, order_num, or really any field in yaml front matter metadata.
   * date should be in format of YYYY-MM-DD as it is used directly in sort fn.
   */
  order_by: 'date',

  /**
   * Options: asc, desc. Works with the field above.
   */
  order: 'desc',

  /**
   * Prefix slug by date like /blog/2020-01-25-hello-world
   * Only works if date is defined and can be parsed.
   * Note that explicitly defined `slug` in any post will override any
   * auto-generated slug by filename and date.
   *
   * Warning: If this setting is changed and you autogenerate url slugs,
   * your url slugs will all change. This can affect SEO, etc.
   */
  prefix_slug_by_date: true,

  /**
   * When generating slugs off of `date` field value (ISO string), use a local
   * timezone of your residence so it's the correct date.
   */
  timezone: 'America/Los_Angeles',

  /**
   * Author meta info for displaying on each blog post.
   * Multiple authors are supported.
   * The full name must match the key of the object here.
   * The bio is default for each author and can be overwritten per post.
   */
  authors: {
    'Jane Dev': {
      thumbnail: '/author-avatar.jpg',
      bio:
        'Senior Software Engineer @HipPayments. Previously, Software Engineer @RaiseBag, and Computer Science @UCDavis.',
    },
  },

  /**
   * Comments widget. Leave as null or false if not desired.
   * Currently supports:
   * - utterances
   * Future:
   * - facebook
   * - disqus
   */
  comments: 'utterances',

  /**
   * Utterances widget config. See https://utteranc.es for details.
   */
  utterances: {
    repo: 'your-github-name/your-github-comments-repo',
    'issue-term': 'pathname',
    theme: 'github-light',
  },

  /**
   * Social share buttons.
   * Currently supports:
   * - tw (twitter)
   * - fb (facebook)
   * - li (linkedin)
   * - hn (hacker news)
   * Array order is the order the icons are shown left to right.
   */
  social_share: ['tw', 'fb', 'li', 'hn'],
};
