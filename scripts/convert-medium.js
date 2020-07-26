'use strict';

const _ = require('lodash');
const parse = require('./utils/medium-parser');
const fs = require('fs');
const path = require('path');
const url = require('url');
const download = require('image-downloader');
const spacetime = require('spacetime');
const blogConfig = require('../blog.config');

const SOURCE_DIR = path.resolve(__dirname, '../medium-orig');
const DEST_DIR = path.resolve(__dirname, '../posts');
const IMAGE_DIR = path.resolve(__dirname, '../static/blog-images');

const filenames = fs.readdirSync(SOURCE_DIR);
const images = [];

for (const filename of filenames) {
  const [date] = filename.split('_', 2);
  // console.log(`${date} : ${filename}`);
  const file = path.resolve(SOURCE_DIR, filename);
  const html = fs.readFileSync(file, { encoding: 'utf8', flag: 'r' });
  const parsed = parse(html);
  // solve a medium bug where large block of <pre> becomes multiple blocks
  parsed.markdown = parsed.markdown.replace(/```\n\n```\n/g, '\n');

  // find images
  const imageRegexp = /\!\[.*\]\((https\:\/\/.+)\)\n/g;
  let match = imageRegexp.exec(parsed.markdown);
  let markdownWithImagesReplaced = parsed.markdown;
  while (match !== null) {
    images.push(match[1]);
    const imageFilename = path.basename(url.parse(match[1]).pathname);
    markdownWithImagesReplaced = markdownWithImagesReplaced.replace(match[1], `/blog-images/${imageFilename}`);
    // find next
    match = imageRegexp.exec(parsed.markdown);
  }
  parsed.markdown = markdownWithImagesReplaced;
  parsed.headline = parsed.headline.trim().replace(/\n/g, '').replace(/:/g, '&#58;');

  // console.log(parsed);

  // Generate MD output
  let publishedDate = spacetime(parsed.publishedTime);
  if (blogConfig.timezone) {
    publishedDate = publishedDate.goto(blogConfig.timezone);
  }
  const writeFilename = _.kebabCase(parsed.title);
  const slug = `${publishedDate.format('{year}-{iso-month}-{date-pad}')}-${writeFilename}`;
  const writeContent = `---\nslug: ${slug}\ntitle: ${parsed.title}\nauthor: ${parsed.author}\ndate: ${parsed.publishedTime}\npreview: ${parsed.headline}\n---\n${parsed.markdown}`;
  const writeFile = path.resolve(DEST_DIR, `${writeFilename}.md`);
  fs.writeFileSync(writeFile, writeContent);
}

// downloadImages(images)
//   .then(() => console.log('All images downloaded'))
//   .catch((err) => console.error(err));

async function downloadImages(images) {
  for (const image of images) {
    console.log(image);
    const imageFilename = path.basename(url.parse(image).pathname);
    console.log(imageFilename);
    console.log(IMAGE_DIR);
    await download
      .image({ url: image, dest: `${IMAGE_DIR}/${imageFilename}` })
      .then(({ filename }) => {
        console.log('Image saved to', filename); // saved to /path/to/dest/image.jpg
      })
      .catch((err) => console.error(err));
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
}
