<script>
  import { onMount } from 'svelte';
  import { nomeMercado } from './store.js';

  let mercadoSelecionado = '';
  let mercados = [];

  onMount(() => {
    mercados = ['Pingo Doce', 'Continente', 'Lidl', 'Auchan', 'Mercadona'];
    mercadoSelecionado = mercados[0];
    nomeMercado.set(mercadoSelecionado); // atualiza a store
  });

  function selecionarMercado() {
    nomeMercado.set(mercadoSelecionado); // atualiza a store ao mudar
  }
</script>

<div>
  <h2>Escolha o Mercado</h2>
  <select bind:value={mercadoSelecionado} on:change={selecionarMercado}>
    {#each mercados as mercado}
      <option value={mercado}>{mercado}</option>
    {/each}
  </select>
</div>