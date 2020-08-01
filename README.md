[![Netlify Status](https://api.netlify.com/api/v1/badges/823dbb33-5999-44ae-a7cd-4c6c0b5d238e/deploy-status)](https://app.netlify.com/sites/miner-blog/deploys)

# Miner Blog Framework

Based on [Sapper](https://github.com/sveltejs/sapper), a web app framework based on [Svelte](https://github.com/sveltejs).

Sapper is **S**velte **App** Mak**er**, and is also named because "in war, the soldiers who build bridges, repair roads, clear minefields and conduct demolitions — all under combat conditions — are known as sappers."

Miners are a specific [type of sappers](https://en.wikipedia.org/wiki/Sapper#Miner) that attacked forts -- much like how the Miner Framework is a specific/sub-type of Sapper apps that are for generating your blog site.

## Batteries-included, ready to start in Markdown

I'm a fan of the Svelte UI framework, and Sapper is a great to start a web app with.

However, Sapper was created as a web app starter, and intentionally does not include some basic features one would want for a blog. These are the features Miner hopes to achieve and put in the framework, so one can start using it to blog right away without any additional code work (that would've been needed had they started with Sapper):

- Write posts in Markdown.
- One Markdown file per post for ease of maintenance and creating new posts.
- Homepage and Blog page contains list of blog posts, sorted by latest, automatically.
- YAML Frontmatter in each post will populate and display meta info on your blog pages including author, post date, page title, previews.
- OpenGraph Social tags are generated with each post with title, author, description (preview text), and thumbnail picture (if provided), to optimize posts for being shared on other sites.
- Social Sharing icons (configurable option) for Twitter, Facebook, LinkedIn, Hacker News, with future support for other social networks and Reddit planned.
- Comments widget (configurable option) with [utteranc.es](https://utteranc.es), with future support for Facebook Comments and Disqus planned.
- Blog pages include next article and previous article links.
- (Opinionated :) Usable default CSS that looks good enough to start using immediately.

I've also included a nodejs script I've used to import my Medium posts to my own blog. I plan to polish it up and add some documentation so it can be used if you desire.

## Example site

Generated from this repo, deployed on Netlify: [https://miner-blog.netlify.app/](https://miner-blog.netlify.app/)

## Getting started

### Using `degit`

[`degit`](https://github.com/Rich-Harris/degit) is a scaffolding tool that lets you create a directory from a branch in a repository:

```bash
npx degit "bigicoin/miner#master" my-blog
```

### Using GitHub

You can also simply fork this repo to get started.

### Running the project

However you get the code, you can install dependencies and run the project in development mode with:

```bash
cd my-blog
npm install # or yarn
npm run dev
```

Open up [localhost:3000](http://localhost:3000) and start clicking around.

(Consult [sapper.svelte.dev](https://sapper.svelte.dev) for help on editing Svelte components and pages.)

## Netlify Deploy Setup

If you want to deploy your site on Netlify, you can simply follow these steps:

1. Sign up for / Log in to Netlify
1. Connect to your repo via Github/Gitlab etc.
1. Under Build Settings, use this Build Command: `npm run export`
1. Use this Publish Directory: `__sapper__/export`
1. Deploy and done!

---

# Sapper

Below is the documentation from Sapper, which can also come in handy when you're making customization to the code and theme of your blog.

## Structure

Sapper expects to find two directories in the root of your project — `src` and `static`.

### src

The [src](src) directory contains the entry points for your app — `client.js`, `server.js` and (optionally) a `service-worker.js` — along with a `template.html` file and a `routes` directory.

#### src/routes

This is the heart of your Sapper app. There are two kinds of routes — _pages_, and _server routes_.

**Pages** are Svelte components written in `.svelte` files. When a user first visits the application, they will be served a server-rendered version of the route in question, plus some JavaScript that 'hydrates' the page and initialises a client-side router. From that point forward, navigating to other pages is handled entirely on the client for a fast, app-like feel. (Sapper will preload and cache the code for these subsequent pages, so that navigation is instantaneous.)

**Server routes** are modules written in `.js` files, that export functions corresponding to HTTP methods. Each function receives Express `request` and `response` objects as arguments, plus a `next` function. This is useful for creating a JSON API, for example.

There are three simple rules for naming the files that define your routes:

- A file called `src/routes/about.svelte` corresponds to the `/about` route. A file called `src/routes/blog/[slug].svelte` corresponds to the `/blog/:slug` route, in which case `params.slug` is available to the route
- The file `src/routes/index.svelte` (or `src/routes/index.js`) corresponds to the root of your app. `src/routes/about/index.svelte` is treated the same as `src/routes/about.svelte`.
- Files and directories with a leading underscore do _not_ create routes. This allows you to colocate helper modules and components with the routes that depend on them — for example you could have a file called `src/routes/_helpers/datetime.js` and it would _not_ create a `/_helpers/datetime` route

### static

The [static](static) directory contains any static assets that should be available. These are served using [sirv](https://github.com/lukeed/sirv).

In your [service-worker.js](src/service-worker.js) file, you can import these as `files` from the generated manifest...

```js
import { files } from '@sapper/service-worker';
```

...so that you can cache them (though you can choose not to, for example if you don't want to cache very large files).

## Bundler config

Sapper uses Rollup or webpack to provide code-splitting and dynamic imports, as well as compiling your Svelte components. With webpack, it also provides hot module reloading. As long as you don't do anything daft, you can edit the configuration files to add whatever plugins you'd like.

## Production mode and deployment

To start a production version of your app, run `npm run build && npm start`. This will disable live reloading, and activate the appropriate bundler plugins.

You can deploy your application to any environment that supports Node 8 or above. As an example, to deploy to [Now](https://zeit.co/now), run these commands:

```bash
npm install -g now
now
```

## Using external components

When using Svelte components installed from npm, such as [@sveltejs/svelte-virtual-list](https://github.com/sveltejs/svelte-virtual-list), Svelte needs the original component source (rather than any precompiled JavaScript that ships with the component). This allows the component to be rendered server-side, and also keeps your client-side app smaller.

Because of that, it's essential that the bundler doesn't treat the package as an _external dependency_. You can either modify the `external` option under `server` in [rollup.config.js](rollup.config.js) or the `externals` option in [webpack.config.js](webpack.config.js), or simply install the package to `devDependencies` rather than `dependencies`, which will cause it to get bundled (and therefore compiled) with your app:

```bash
npm install -D @sveltejs/svelte-virtual-list
```

## Bugs and feedback

Sapper is in early development, and may have the odd rough edge here and there. Please be vocal over on the [Sapper issue tracker](https://github.com/sveltejs/sapper/issues).
