<script>
  import blogConfig from '../../blog.config.js';
  import Nav from '../components/Nav.svelte';

  export let segment;
</script>

<style>
  main {
    position: relative;
    max-width: 42em;
    background-color: white;
    padding: 2em;
    margin: 0 auto;
    box-sizing: border-box;
  }

  footer div {
    margin: 50px 0 0 0;
    padding: 10px;
    background-color: #eee;
    color: #666;
    font-size: 14px;
  }
</style>

<Nav {segment} />

<main>
  <slot />
</main>

<footer>
  <div>Copyright &copy; 2020, {blogConfig.site_name}.</div>
</footer>
