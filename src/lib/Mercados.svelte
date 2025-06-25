<script>
  import { onMount } from 'svelte';
  import { nomeMercado } from './store.js';

  let mercadoSelecionado = '';
  let mercados = [];
  let outroMercado = '';

  onMount(() => {
    mercados = ['Pingo Doce', 'Continente', 'Lidl', 'Auchan', 'Mercadona', 'Carrefour', 'Extra', 'Leroy Merlin', 'FROIZ', 'Outro'];
    mercadoSelecionado = mercados[0];
    nomeMercado.set(mercadoSelecionado);
  });

  function selecionarMercado() {
    if (mercadoSelecionado === 'Outro') {
      nomeMercado.set(outroMercado.trim());
    } else {
      nomeMercado.set(mercadoSelecionado);
      outroMercado = '';
    }
  }

  function atualizarOutroMercado() {
    nomeMercado.set(outroMercado.trim());
  }
</script>

<div>
  <h2>Escolha o Mercado</h2>

  <label for="mercado" class="form-label">Mercado</label>
  <select
    id="mercado"
    class="form-select"
    bind:value={mercadoSelecionado}
    on:change={selecionarMercado}
  >
    {#each mercados as mercado}
      <option value={mercado}>{mercado}</option>
    {/each}
  </select>

  {#if mercadoSelecionado === 'Outro'}
    <div class="mt-3">
      <label for="outro" class="form-label">Digite o nome do outro estabelecimento</label>
      <input
        id="outro"
        type="text"
        class="form-control"
        placeholder="Qual o nome do lugar vai gastar dinheiro?"
        bind:value={outroMercado}
        on:input={atualizarOutroMercado}
      />
    </div>
  {/if}
</div>
