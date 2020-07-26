export default {
  renderer: {
    // Override image to render <figure> with <figcaption> text
    image(href, title, text) {
      if (!href) {
        return text;
      }
      return '<figure><img src="' + href + '" alt="' + text + '"><figcaption>' + text + '</figcaption></figure>';
    },

    // Override link to render a special link widget
    link(href, title, text) {
      if (!href) {
        return text;
      }
      let out = '<a href="' + href + '"';
      if (title) {
        out += ' title="' + title + '"';
      }
      // Check to see if we should render widget
      // This is a rather hacky detection, but works for medium-exported posts' links widgets
      if (text.indexOf('</strong><br><em>') > 0) {
        // Widget
        out += ' class="linkWidget">' + text + '</a>';
      } else {
        // Regular text link
        out += '>' + text + '</a>';
      }
      return out;
    },
  },
};
