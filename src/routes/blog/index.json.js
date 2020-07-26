import posts from './_posts.js';
import spacetime from 'spacetime';
import blogConfig from '../../../blog.config';

const contents = JSON.stringify(
  posts.map((post) => {
    let s = spacetime(post.date);
    if (blogConfig.timezone) {
      s = s.goto(blogConfig.timezone);
    }
    return {
      title: post.title,
      slug: post.slug,
      preview: post.preview,
      preview_image: post.preview_image,
      date: s.format('{year}-{iso-month}-{date-pad}'),
    };
  })
);

export function get(req, res) {
  res.writeHead(200, {
    'Content-Type': 'application/json',
  });

  res.end(contents);
}
