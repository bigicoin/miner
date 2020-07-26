---
title: Sapper different from Next.js?
date: 2020-02-17
author: Jane Dev
preview: 'Next.js is a React framework from Zeit, and is the inspiration for Sapper. There are a few notable differences, however.'
---

# Sapper different from Next.js?

<a href='https://github.com/zeit/next.js'>Next.js</a> is a React framework from <a href='https://zeit.co'>Zeit</a>, and is the inspiration for Sapper. There are a few notable differences, however:

- It's powered by <a href='https://svelte.dev'>Svelte</a> instead of React, so it's faster and your apps are smaller
- Instead of route masking, we encode route parameters in filenames. For example, the page you're looking at right now is `src/routes/blog/[slug].html`
- As well as pages (Svelte components, which render on server or client), you can create _server routes_ in your `routes` directory. These are just `.js` files that export functions corresponding to HTTP methods, and receive Express `request` and `response` objects as arguments. This makes it very easy to, for example, add a JSON API such as the one <a href='blog/how-is-sapper-different-from-next.json'>powering this very page</a>
- Links are just `&lt;a&gt;` elements, rather than framework-specific `&lt;Link&gt;` components. That means, for example, that <a href='blog/how-can-i-get-involved'>this link right here</a>, despite being inside a blob of HTML, works with the router as you'd expect.
