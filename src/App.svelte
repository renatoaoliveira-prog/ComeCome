<script>
  import Counter from './lib/Counter.svelte'
  import HeadMeta from './lib/HeadMeta.svelte'; // opcional
  import Mercados from './lib/Mercados.svelte';
  
</script>

<HeadMeta /> <!-- se você quiser SEO dinâmico -->

 
<main>

  <h1 style="font-size: 3.2em;">PoupaPoupa</h1>

  <div class="card">
    <Mercados />
    <Counter />

    
  </div>

</main>


