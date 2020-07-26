import posts from './_posts.js';
import spacetime from 'spacetime';
import blogConfig from '../../../blog.config';

const omit = (key, { [key]: _, ...obj }) => obj;
const convDate = (date) => {
  let s = spacetime(date);
  if (blogConfig.timezone) {
    s = s.goto(blogConfig.timezone);
  }
  return s.format('{year}-{iso-month}-{date-pad}');
};

const lookup = new Map();
for (let i = 0; i < posts.length; i++) {
  const post = posts[i];
  const prev = i === posts.length - 1 ? null : omit('html', posts[i + 1]);
  const next = i === 0 ? null : omit('html', posts[i - 1]);

  post.date = convDate(post.date);
  if (prev) prev.date = convDate(prev.date);
  if (next) next.date = convDate(next.date);

  post.min_read = Math.round(post.html.length / 800);

  lookup.set(post.slug, JSON.stringify({ post, prev, next }));
}

export function get(req, res, next) {
  // the `slug` parameter is available because
  // this file is called [slug].json.js
  const { slug } = req.params;

  if (lookup.has(slug)) {
    res.writeHead(200, {
      'Content-Type': 'application/json',
    });

    res.end(lookup.get(slug));
  } else {
    res.writeHead(404, {
      'Content-Type': 'application/json',
    });

    res.end(
      JSON.stringify({
        message: `Blog post not found`,
      })
    );
  }
}
