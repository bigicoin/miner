<script context="module">
  import blogConfig from '../../../blog.config.js';

  export async function preload({ params, query }) {
    // the `slug` parameter is available because
    // this file is called [slug].svelte
    const res = await this.fetch(`blog/${params.slug}.json`);
    const data = await res.json();

    if (res.status === 200) {
      return data;
    } else {
      this.error(res.status, data.message);
    }
  }
</script>

<script>
  export let post;
  export let prev;
  export let next;

  export let url;
  $: url = `${blogConfig.canon_host}/blog/${post.slug}/`;

  export let socials;
  $: socials = {
    tw: {
      link: `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(url)}`,
      name: 'Twitter'
    },
    fb: {
      link: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      name: 'Facebook'
    },
    li: {
      link: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}`,
      name: 'LinkedIn'
    },
    hn: {
      link: `https://news.ycombinator.com/submitlink?u=${encodeURIComponent(url)}&t=${encodeURIComponent(post.title)}`,
      name: 'Hacker News'
    }
  };
</script>

<style>
  /*
		By default, CSS is locally scoped to the component,
		and any unused styles are dead-code-eliminated.
		In this page, Svelte can't know which elements are
		going to appear inside the {{{post.html}}} block,
		so we have to use the :global(...) modifier to target
		all elements inside .content
	*/
  .content :global(h2) {
    font-size: 1.4em;
    font-weight: 500;
  }

  .content :global(pre) {
    background-color: #f9f9f9;
    box-shadow: inset 1px 1px 5px rgba(0, 0, 0, 0.05);
    padding: 0.5em;
    border-radius: 2px;
    overflow-x: auto;
  }

  .content :global(pre) :global(code) {
    background-color: transparent;
    padding: 0;
  }

  .content :global(ul) {
    line-height: 1.5;
  }

  .content :global(li) {
    margin: 0 0 0.5em 0;
  }

  /**
   * Metainfo blocks
   */
  div.metainfo.header {
    font-size: 16px;
    margin: 0 0 20px 0;
  }

  div.metainfo.footer {
    font-size: 18px;
    margin: 60px 0 0 0;
  }

  div.metainfo div.social {
    float: right;
    margin-left: 15px;
  }

  div.metainfo div.social a {
    text-decoration: none;
  }

  div.metainfo div.social img {
    border: 0;
    width: 24px;
    height: 24px;
    opacity: 0.5;
  }

  div.metainfo div.social img:hover {
    opacity: 1;
  }

  div.metainfo div.thumbnail {
    float: left;
    margin-right: 15px;
  }

  div.metainfo.header div.thumbnail {
    width: 48px;
    height: 48px;
  }

  div.metainfo.footer div.thumbnail {
    width: 80px;
    height: 80px;
  }

  div.metainfo div.thumbnail img {
    border-radius: 50%;
  }

  div.metainfo.header div.thumbnail img {
    width: 48px;
    height: 48px;
  }

  div.metainfo.footer div.thumbnail img {
    width: 80px;
    height: 80px;
  }

  div.metainfo.header div.info {
    line-height: 1.4;
  }

  div.metainfo.footer div.info {
    line-height: 1.6;
  }

  div.metainfo div.info span.name {
    color: #111;
    font-weight: bold;
  }

  div.metainfo.header div.info span.name {
    font-size: 18px;
  }

  div.metainfo.footer div.info span.name {
    font-size: 22px;
  }

  div.metainfo.header div.info span.date {
    color: #666;
  }

  div.metainfo.footer div.info span.bio {
    color: #666;
  }

  div.clear {
    clear: both;
  }

  /**
   * Prev Next posts block
   */

  hr {
    margin: 60px auto;
    width: 90%;
    border-top: 1px solid #ddd;
    color: transparent;
  }

  .prevNextBlock {
    display: flex;
  }

  .prevNextPost {
    flex: 50%;
  }

  .prevNextPost:nth-of-type(1) {
    padding-right: 25px;
  }

  .prevNextPost:nth-of-type(2) {
    padding-left: 25px;
  }

  .prevNextPost a {
    text-decoration: none;
  }

  .prevNextPost h4 {
    text-align: center;
    font-size: 16px;
    font-weight: normal;
    color: #666;
  }

  .prevNextPost h5 {
    font-size: 14px;
    font-weight: normal;
    font-weight: #999;
  }

  .prevNextPost h3 {
    font-size: 20px;
    font-weight: bold;
    font-weight: #333;
  }

  .comments {
    margin-top: 10px;
  }
</style>

<svelte:head>
  <link rel="canonical" href={url} />
  <meta property="og:title" content={post.title} />
  <meta property="og:url" content={url} />
  <meta property="og:type" content="article" />
  <meta property="og:description" content={post.preview} />
  {#if post.preview_image}
    <meta property="og:image" content="{blogConfig.canon_host}{post.preview_image}" />
  {/if}
  <title>{post.title} - {blogConfig.site_name}</title>
</svelte:head>

<div class="metainfo header">
  {#if blogConfig.social_share && blogConfig.social_share.length > 0}
    <div class="social">
      {#each blogConfig.social_share as site}
        <a href={socials[site].link} target="_blank">
          <img src="/share-{site}.png" alt="Share on {socials[site].name}" />
        </a>
      {/each}
    </div>
  {/if}
  {#if blogConfig.authors && blogConfig.authors[post.author] && blogConfig.authors[post.author].thumbnail}
    <div class="thumbnail">
      <img src={blogConfig.authors[post.author].thumbnail} alt="" />
    </div>
  {/if}
  <div class="info">
    {#if post.author}
      <span class="name">{post.author}</span>
      <br />
    {/if}
    <span class="date">
      {#if post.date}{post.date} &sdot;{/if}
      {post.min_read} min read
    </span>
  </div>
  <div class="clear" />
</div>

<div class="content">
  {@html post.html}
</div>

<div class="metainfo footer">
  {#if blogConfig.social_share && blogConfig.social_share.length > 0}
    <div class="social">
      {#each blogConfig.social_share as site}
        <a href={socials[site].link} target="_blank">
          <img src="/share-{site}.png" alt="Share on {socials[site].name}" />
        </a>
      {/each}
    </div>
  {/if}
  {#if blogConfig.authors && blogConfig.authors[post.author] && blogConfig.authors[post.author].thumbnail}
    <div class="thumbnail">
      <img src={blogConfig.authors[post.author].thumbnail} alt="" />
    </div>
  {/if}
  <div class="info">
    {#if post.author}
      <span class="name">{post.author}</span>
      <br />
    {/if}
    <span class="bio">
      {#if post.bio}
        {post.bio}
      {:else if blogConfig.authors && blogConfig.authors[post.author] && blogConfig.authors[post.author].bio}
        {blogConfig.authors[post.author].bio}
      {/if}
    </span>
  </div>
  <div class="clear" />
</div>

{#if prev || next}
  <hr />
  <div class="prevNextBlock">
    <div class="prevNextPost">
      {#if prev}
        <a rel="prefetch" href="/blog/{prev.slug}">
          <h4>&laquo; Previous</h4>
          <h5>{prev.date}</h5>
          <h3>{prev.title}</h3>
        </a>
      {/if}
    </div>

    <div class="prevNextPost">
      {#if next}
        <a rel="prefetch" href="/blog/{next.slug}">
          <h4>Next &raquo;</h4>
          <h5>{next.date}</h5>
          <h3>{next.title}</h3>
        </a>
      {/if}
    </div>
  </div>
{/if}

{#if blogConfig.comments}
  <hr />
  <div class="comments">
    {#if blogConfig.comments === 'utterances'}
      <script src="https://utteranc.es/client.js" {...blogConfig.utterances} crossorigin="anonymous" async>

      </script>
    {/if}
  </div>
{/if}
