// This file is called `_posts.js` rather than `posts.js`, because
// we don't want to create an `/blog/posts` route — the leading
// underscore tells Sapper not to do that.

import fs from 'fs';
import yamlFront from 'yaml-front-matter';
import marked from 'marked';
import blogConfig from '../../../blog.config';
import markedConfig from '../../../marked.config';
import spacetime from 'spacetime';

const postsDir = `${__dirname}/../../../posts`;

marked.use(markedConfig);

function datePrefix(isoDate) {
  let date = spacetime(isoDate);
  if (!date.epoch) {
    return ''; // invalid date
  }
  if (blogConfig.timezone) {
    date = date.goto(blogConfig.timezone); // change timezone if given
  }
  return date.format('{year}-{iso-month}-{date-pad}-');
}

let posts = [];

fs.readdirSync(postsDir)
  .filter((file) => file.endsWith('.md'))
  .forEach((file) => {
    const content = fs.readFileSync(`${postsDir}/${file}`, 'utf8');
    const pageData = yamlFront.safeLoadFront(content);
    if (!pageData.slug) {
      // only autogenerate slug if not explicitly defined
      pageData.slug = `${datePrefix(pageData.date)}${file.slice(0, -3)}`; // slug from filename
    }
    pageData.html = marked(pageData.__content); // parse markdown
    // TODO: Consider using DOMPurify to sanitize html
    delete pageData.__content; // remove original markdown
    posts.push(pageData);
  });

if (blogConfig.order === 'asc') {
  posts.sort((a, b) =>
    a[blogConfig.order_by] < b[blogConfig.order_by] ? -1 : a[blogConfig.order_by] == b[blogConfig.order_by] ? 0 : 1
  );
} else {
  posts.sort((a, b) =>
    a[blogConfig.order_by] > b[blogConfig.order_by] ? -1 : a[blogConfig.order_by] == b[blogConfig.order_by] ? 0 : 1
  );
}

export default posts;
