<script context="module">
  import blogConfig from '../../blog.config.js';

  export function preload({ params, query }) {
    return this.fetch(`blog.json`)
      .then(r => r.json())
      .then(posts => {
        return { posts: posts.slice(0, 7), total: posts.length };
      });
  }
</script>

<script>
  export let posts;
  export let total;
</script>

<style>
  div.post {
    margin: 80px 0;
  }

  div.post div.date {
    font-size: 70%;
    color: #666;
  }

  div.post h2 {
    margin: 10px 0;
  }

  div.post h2 a {
    color: #111;
    text-decoration: none;
  }

  div.post a.preview_image {
    display: block;
  }

  div.post img.preview_image {
    display: block;
    max-width: 100%;
    max-height: 250px;
    border: 0;
    margin: 10px auto;
  }

  div.post div.preview {
    margin: 15px 0;
    color: #444;
  }

  div.post div.continue a {
    color: #558;
    text-decoration: none;
  }

  h4 {
    margin: 25px 0;
    font-size: 25px;
  }

  h4 a {
    color: #558;
    text-decoration: none;
  }
</style>

<svelte:head>
  <link rel="canonical" href={blogConfig.canon_host} />
  <meta property="og:title" content={blogConfig.site_name} />
  <meta property="og:url" content={blogConfig.canon_host} />
  <meta property="og:type" content="website" />
  <meta property="og:description" content="Miner blog and web site." />
  <title>{blogConfig.site_name}</title>
</svelte:head>

<h1>{blogConfig.site_name}</h1>

{#each posts as post}
  <div class="post">
    <div class="date">{post.date}</div>
    <h2>
      <a rel="prefetch" href="/blog/{post.slug}">{post.title}</a>
    </h2>
    {#if post.preview_image}
      <a rel="prefetch" class="preview_image" href="/blog/{post.slug}">
        <img src={post.preview_image} class="preview_image" alt="" />
      </a>
    {/if}
    {#if post.preview}
      <div class="preview">{post.preview}</div>
    {/if}
    <div class="continue">
      <a rel="prefetch" href="/blog/{post.slug}">Continue reading...</a>
    </div>
  </div>
{/each}

{#if total > 7}
  <h4>
    <a rel="prefetch" href="/blog">[Read more...]</a>
  </h4>
{/if}
