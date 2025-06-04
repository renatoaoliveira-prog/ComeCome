<script>
  import { onMount } from 'svelte';

  let saldo = 0;
  let caixas = [];

  // 1. Ao entrar na página, perguntar o valor a gastar
  //function iniciarSessao() {
  //  const input = prompt("Qual saldo deseja gastar?");
  //  saldo = input ? parseFloat(input) : 0;
  //}

  // 2. Cálculo reativo do valor gasto
  $: valorGasto = caixas.reduce(
    (total, caixa) => total + caixa.quantidade * caixa.valorUnitario,
    0
  );

  // 3. Valor restante
  $: restante = saldo - valorGasto;

  // 4. Adicionar nova caixa
  function adicionarCaixa() {
    caixas = [...caixas, { quantidade: 1, valorUnitario: "" }];
  }

  // 5. Remover caixa específica
  function removerCaixa(index) {
    caixas = caixas.filter((_, i) => i !== index);
  }

  // 6. Atualizar valores
  function atualizarCaixa(index, campo, valor) {
    caixas = caixas.map((caixa, i) =>
      i === index ? { ...caixa, [campo]: parseFloat(valor) } : caixa
    );
  }

  // Iniciar ao montar o componente
  onMount(() => {
   // iniciarSessao();
  });
</script>

<style>
  .topo {
    position: sticky;
    top: 0;
    /* background: #eee; */
    padding: 10px;
    font-weight: bold;
  }

  .caixa {
    display: flex;
    gap: 10px;
    margin-bottom: 10px;
    justify-content: center;
  }

  .caixas {
    margin-top: 20px;
  }

  .some {
    display: none;
  }
  .verde {
    color: green;
  }
  .red {
    color: red;
  }

</style>

<!-- 2. Exibir o saldo no topo -->
<div class="topo">
  <p>Qual saldo deseja gastar?</p>
  <div class="saldo">
    <input type="text" bind:value={saldo} placeholder="Saldo" on:change={() => saldo = parseFloat(document.querySelector('input').value) || 0} />
    
    <button on:click={() => saldo = parseFloat(document.querySelector('input').value) || 0}>
      Iniciar
    </button>

    <button aria-label="Limpar saldo" on:click={() => saldo = 0}>Limpar</button>
    
  </div>
  
  <p>Saldo: R$ {saldo.toFixed(2)}</p>
  <p>Valor Gasto: R$ {valorGasto.toFixed(2)}</p>
  <!-- 7. Exibir o saldo restante -->
  {#if saldo <= 0}
   <p class="some">Saldo Restante: R$ {restante.toFixed(2)}</p>
  {:else if restante < 0}
    <p class="red">Saldo Restante: R$ {restante.toFixed(2)}</p>
  {:else}
    <p class="verde">Saldo Restante: R$ {restante.toFixed(2)}</p>
  {/if}
  
  <!-- Exibir o saldo restante -->
  
  <!-- <p class={saldo < 0 ? 'some' : 'verde'} >Saldo Restante: R$ {restante.toFixed(2)}</p> -->
  
    
</div>

<!-- 8. Interface de cada caixa -->
<div class="caixas">
  {#each caixas as caixa, index}
    <div class="caixa">
      <select
        bind:value={caixa.quantidade}
        
      >
        {#each Array(10) as _, i}
          <option value={i + 1}>{i + 1}</option>
        {/each}
      </select>

      <input
        type="number"
        bind:value={caixa.valorUnitario}
        
        min="0"
        step="0.1"
      />

      <button on:click={() => removerCaixa(index)}>-</button>
    </div>
  {/each}

  <button on:click={adicionarCaixa}>Adicionar</button>
</div>
