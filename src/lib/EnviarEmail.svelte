<script>

  import { nomeMercado } from './store.js';
  import { get } from 'svelte/store';
  import { onMount } from 'svelte';

  export let valorGasto;
  
  let mercado = '';
  let datahora = new Date().toLocaleString();


  // Atualiza mercado ao montar
  onMount(() => {
    mercado = get(nomeMercado); // pega valor atual
    nomeMercado.subscribe((value) => mercado = value); // escuta futuras mudanças
  });



  $: valor = valorGasto;

  function compartilharPorEmail() {
    const assunto = encodeURIComponent(`Compras no ${mercado}`);
    const corpo = encodeURIComponent(
      `Data e Hora: ${datahora}\n\n
       Mercado: ${mercado}\n\n 
       Valor Gasto: ${valor}`
    );
    const url = `mailto:?subject=${assunto}&body=${corpo}`;
    window.open(url, '_blank');
  }
</script>

<button on:click={compartilharPorEmail}>
  Compartilhar por Email
</button>