<script context="module">
  import blogConfig from '../../../blog.config.js';

  export function preload({ params, query }) {
    return this.fetch(`blog.json`)
      .then(r => r.json())
      .then(posts => {
        return { posts };
      });
  }
</script>

<script>
  export let posts;
</script>

<style>
  ul {
    margin: 0 0 1em 0;
    line-height: 1.5;
  }

  ul li {
    margin: 20px 0;
  }

  ul li span.date {
    font-size: 70%;
    color: #666;
  }

  ul li a.preview_image {
    display: block;
    padding: 5px 20px;
  }

  ul li img.preview_image {
    display: block;
    max-width: 100%;
    max-height: 250px;
    border: 0;
    margin: 10px auto;
  }

  ul li div.preview {
    padding: 5px 20px 20px 20px;
    color: #666;
    font-size: 16px;
  }
</style>

<svelte:head>
  <link rel="canonical" href="{blogConfig.canon_host}/blog/" />
  <meta property="og:title" content="Blog posts on {blogConfig.site_name}" />
  <meta property="og:url" content="{blogConfig.canon_host}/blog/" />
  <meta property="og:type" content="website" />
  <meta property="og:description" content="A list of my blog entries." />
  <title>blog posts - {blogConfig.site_name}</title>
</svelte:head>

<h1>blog posts</h1>

<ul>
  {#each posts as post}
    <li>
      <a rel="prefetch" href="/blog/{post.slug}">{post.title}</a>
      <span class="date">{post.date}</span>
      {#if post.preview_image}
        <a rel="prefetch" class="preview_image" href="/blog/{post.slug}">
          <img src={post.preview_image} class="preview_image" alt="" />
        </a>
      {/if}
      {#if post.preview}
        <div class="preview">{post.preview}</div>
      {/if}
    </li>
  {/each}
</ul>
