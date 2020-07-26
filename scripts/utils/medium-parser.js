'use strict';

/**
 * The following lib is from: https://github.com/gunar/medium-parser
 * With minor clean-ups to work with modern node.js code.
 * MIT http://gunar.mit-license.org
 */

const cheerio = require('cheerio');

const processElement = function (element) {
  const orderedList = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  const pre = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  const $ = cheerio.load(element);
  const el = $(element).get(0);

  if (el.type === 'text') {
    let text = $(el).text();
    let firstChar = text.substr(0, 1);
    if (['*', '-'].indexOf(firstChar) > -1) {
      return '\\' + text;
    }
    return text;
  }

  if (el.type === 'tag') {
    if (el.name === 'figure') {
      let caption = $(el).find('figcaption').text();
      // last() because the first img is low res
      let src = $('div > img').last().attr('src');
      return '\n![' + caption + '](' + src + ')';
    }

    // Can't use .map() because it mutates the element
    let p = [];
    $(el)
      .contents()
      .each(function (i, e) {
        p.push(processElement(e, el.name === 'ol', el.name === 'pre'));
      });
    let processed = p.join('');

    // const processed = children.each((i, el) => processElement(el)).join('');

    if (el.name === 'em' || el.name === 'i') {
      return '*' + processed + '*';
    }

    if (el.name === 'strong' || el.name === 'b') {
      return '**' + processed + '**';
    }

    if (el.name === 'a') {
      let href = $(el).attr('href');
      return '[' + processed + '](' + href + ')';
    }

    if (el.name === 'blockquote') {
      return '\n> ' + processed;
    }

    // TODO Finish refactoring

    if (el.name === 'h4') return '\n## ' + processed;
    if (el.name === 'h3') return '\n# ' + processed;
    if (el.name === 'ul') {
      return '\n' + processed;
    }
    if (el.name === 'ol') {
      return '\n' + processed;
    }
    if (el.name === 'li') {
      if (orderedList) {
        return '\n1. ' + processed;
      } else {
        return '\n- ' + processed;
      }
    }
    if (el.name === 'p') {
      return '\n\n' + processed;
    }
    if (el.name === 'img') {
      let alt = $(el).attr('alt') || '';
      let _src = $(el).attr('src');
      return '![' + alt + '](' + _src + ')';
    }
    if (el.name === 'div') return '\n' + processed;
    if (['figure', 'div', 'figcaption'].indexOf(el.name) > -1) {
      return '\n' + processed;
    }
    if (el.name === 'pre') {
      return '\n```\n' + processed + '\n```\n';
    }

    if (el.name === 'hr') {
      return '\n\n---\n';
    }

    if (el.name === 'code' && $(el).hasClass('markup--p-code')) {
      return '`' + processed + '`';
    }

    if (el.name === 'br') {
      if (pre) {
        return '\n';
      } else {
        return '  \n';
      }
    }

    console.log('parse-medium: unprocessed tag <' + el.name + '>');
    return '\n' + processed;
  }
  return el;
};

const parseMedium = function parseMedium(html) {
  const $ = cheerio.load(html);
  const title = $('h1').first().text();
  const headline = $('.p-summary').text();
  const author = $('.p-author').text();
  const publishedTime = $('.dt-published').attr('datetime');
  const markdown = $('.section-inner, div.section-divider')
    .contents()
    .toArray()
    .slice(1)
    .map(processElement)
    .join('\n')
    .replace(/\n\n\n/g, '\n\n');

  return {
    title: title,
    headline: headline,
    author: author,
    publishedTime: publishedTime,
    markdown: markdown,
  };
};

module.exports = parseMedium;
