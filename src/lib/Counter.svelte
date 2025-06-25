<style>
  .btn-custom:hover {
    background-color: #0056b3 !important;
    color: #fff;
    transform: scale(1.02);
    transition: all 0.2s ease-in-out;
  }

    .topo {
    position: sticky;
    top: 0;
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

<script>
  import EnviarEmail from "./EnviarEmail.svelte";
  import EnviarWhatsApp from "./EnviarWhatsApp.svelte";

  let saldo = "";
  $: saldo = saldo.replace(",", ".");

  $: saldoNumerico = parseFloat(saldo) || 0;

  let caixas = [];
  let ultimaCaixaInput;

  $: {
    if (ultimaCaixaInput) {
      ultimaCaixaInput.focus();
    }
  }

  // Cálculo reativo do valor gasto
  $: valorGasto = caixas.reduce(
    (total, caixa) => total + caixa.quantidade * caixa.valorUnitario,
    0
  );

  // Valor restante
  $: restante = saldoNumerico - valorGasto;

  function adicionarCaixa() {
    caixas = [...caixas, { quantidade: 1, valorUnitario: "" }];
  }

  function removerCaixa(index) {
    caixas = caixas.filter((_, i) => i !== index);
  }

  function atualizarCaixa(index, campo, valor) {
    caixas = caixas.map((caixa, i) =>
      i === index ? { ...caixa, [campo]: parseFloat(valor) || 0 } : caixa
    );
  }
</script>

<div class="topo">
  <p>Qual saldo deseja gastar?</p>
  <div class="saldo">
    <input
      type="text"
      inputmode="decimal"
      pattern="[0-9]*\\.?[0-9]*"
      placeholder="Valor Unitário"
      bind:value={saldo}
      class="form-control"
    />
    <button class="btn btn-primary px-4 py-2 rounded-3 shadow-sm btn-custom" aria-label="Limpar saldo" on:click={() => (saldo = "")}>Zerar</button>
  </div>

  <p>Saldo: R$ {saldoNumerico.toFixed(2)}</p>
  <p>Valor Gasto: R$ {valorGasto.toFixed(2)}</p>

  {#if saldoNumerico <= 0}
    <p class="some">Saldo Restante: R$ {restante.toFixed(2)}</p>
  {:else if restante < 0}
    <p class="red">Saldo Restante: R$ {restante.toFixed(2)}</p>
  {:else}
    <p class="verde">Saldo Restante: R$ {restante.toFixed(2)}</p>
  {/if}
</div>

<div class="caixas">
  {#each caixas as caixa, index}
    <div class="caixa">
      <select bind:value={caixa.quantidade}>
        {#each Array(10) as _, i}
          <option value={i + 1}>{i + 1}</option>
        {/each}
      </select>

      <input
        class="form-control"
        type="number"
        inputmode="numeric"
        pattern="[0-9]*"
        placeholder="Valor Unitário"
        bind:this={ultimaCaixaInput}
        bind:value={caixa.valorUnitario}
        min="0"
        step="0.1"
        on:keypress={(e) => {
          if (e.key === "Enter") {
            adicionarCaixa();
          }
        }}
        
      />

      <button class="btn btn-primary px-4 py-2 rounded-3 shadow-sm btn-custom" on:click={() => removerCaixa(index)} >-</button>
    </div>
  {/each}

  <button class="btn btn-primary px-4 py-2 rounded-3 shadow-sm btn-custom" on:click={adicionarCaixa}>Adicionar</button>
  <button class="btn btn-primary px-4 py-2 rounded-3 shadow-sm btn-custom" on:click={() => {
    if (confirm("Tem certeza que deseja limpar as caixas?")) {
      caixas = [];
    }
  }}>
    Limpar Caixas
  </button>

  <EnviarEmail valorGasto={valorGasto.toFixed(2)} />
  <EnviarWhatsApp valorGasto={valorGasto.toFixed(2)} />
</div>

