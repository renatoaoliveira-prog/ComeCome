<script>
  import EnviarEmail from "./EnviarEmail.svelte";
  import EnviarWhatsApp from "./EnviarWhatsApp.svelte";

  let saldo = "";
  // Garante que o saldo sempre use ponto como separador decimal para parseFloat
  $: saldo = saldo.replace(",", ".");

  // Converte o saldo para um número, ou 0 se for inválido
  $: saldoNumerico = parseFloat(saldo) || 0;

  let caixas = [];
  let ultimaCaixaInput;

  // Foca no último input de valor unitário adicionado
  $: {
    if (ultimaCaixaInput) {
      ultimaCaixaInput.focus();
    }
  }

  let saldoIndefinido = false;

  // Cálculo reativo do valor gasto total
  $: valorGasto = caixas.reduce(
    (total, caixa) => total + caixa.quantidade * caixa.valorUnitario,
    0
  );

  // Valor restante do saldo após os gastos
  $: restante = saldoNumerico - valorGasto;

  // Adiciona uma nova caixa de item com valores padrão
  function adicionarCaixa() {
    caixas = [...caixas, { quantidade: 1, valorUnitario: "" }];
  }

  // Remove uma caixa de item pelo seu índice
  function removerCaixa(index) {
    caixas = caixas.filter((_, i) => i !== index);
  }

  // Atualiza um campo específico de uma caixa (não usado diretamente no template atual, mas boa prática)
  function atualizarCaixa(index, campo, valor) {
    caixas = caixas.map((caixa, i) =>
      i === index ? { ...caixa, [campo]: parseFloat(valor) || 0 } : caixa
    );
  }
</script>

<div class="">
  <div class="card shadow-sm p-4 mb-4 topo-card">
    <h1 class="card-title text-center mb-3">Calculadora de Gastos 💰</h1>
    <p class="lead text-center text-muted">Gerencie seus gastos de forma simples e rápida.</p>
    <hr />

    {#if !saldoIndefinido}
    <div class="mb-3" id="saldoSection">
      <label for="saldoInput" class="form-label fs-5">Qual saldo você tem para gastar?</label>
      <div class="input-group">
        <span class="input-group-text">€</span>
        <input
          id="saldoInput"
          type="text"
          inputmode="decimal"
          pattern="[0-9]*\\.?[0-9]*"
          placeholder="Ex: 100.50"
          bind:value={saldo}
          class="form-control form-control-lg"
        />
        <button
          class="btn btn-outline-danger"
          aria-label="Limpar saldo"
          on:click={() => (saldo = "")}
        >
          Zerar Saldo
        </button>
        <button
          class="btn btn-outline-danger"
          aria-label="Não sei o saldo"
          on:click={() => {
            saldoIndefinido = true;
            saldo = "";
          }}
        >
          Não sei
        </button>
      </div>
    </div>
    {/if}

    <div class="d-flex justify-content-around mt-4 text-center resumo-valores">
      {#if !saldoIndefinido}
      <div>
        <p class="mb-1 text-muted">Saldo Atual:</p>
        <p class="fs-4 fw-bold">R$ {saldoNumerico.toFixed(2)}</p>
      </div>
      {/if}
      <div>
        <p class="mb-1 text-muted">Valor Gasto:</p>
        <p class="fs-4 fw-bold">R$ {valorGasto.toFixed(2)}</p>
      </div>
      
      {#if !saldoIndefinido}
        <div id="saldoSection">
          <p class="mb-1 text-muted">Restante:</p>
          {#if saldoNumerico <= 0}
            <p class="fs-4 fw-bold text-muted">R$ {restante.toFixed(2)}</p>
          {:else if restante < 0}
            <p class="fs-4 fw-bold text-danger animate__animated animate__shakeX">R$ {restante.toFixed(2)}</p>
          {:else}
            <p class="fs-4 fw-bold text-success animate__animated animate__pulse">R$ {restante.toFixed(2)}</p>
          {/if}
        </div>
      {/if}
    </div>
  </div>

  <div class="card shadow-sm p-4 caixas-section">
    <h2 class="card-title text-center mb-4">Itens a Comprar</h2>

    {#each caixas as caixa, index (index)}
      <div class="input-group mb-3 caixa-item animate__animated animate__fadeIn">
        <select bind:value={caixa.quantidade} class="form-select">
          {#each Array(10) as _, i}
            <option value={i + 1}>{i + 1}</option>
          {/each}
        </select>

        <input
          class="form-control"
          type="number"
          inputmode="decimal"
          placeholder="Valor Unitário"
          bind:this={ultimaCaixaInput}
          bind:value={caixa.valorUnitario}
          min="0"
          step="0.01"
          on:keypress={(e) => {
            if (e.key === "Enter") {
              adicionarCaixa();
            }
          }}
        />

        <button
          class="btn btn-outline-danger"
          aria-label="Remover caixa"
          on:click={() => removerCaixa(index)}
        >
          Remover
        </button>
      </div>
    {/each}

    <div class="d-grid gap-2 d-md-flex justify-content-md-center mt-4">
      <button
        class="btn btn-primary btn-lg"
        on:click={adicionarCaixa}
      >
        ➕ Adicionar Item
      </button>
      <button
        class="btn btn-outline-secondary btn-lg"
        on:click={() => {
          if (confirm("Tem certeza que deseja limpar todos os itens?")) {
            caixas = [];
          }
        }}
      >
        Limpar Itens
      </button>
    </div>

    <hr class="my-4" />

    <div class="d-flex justify-content-center gap-3">
      <EnviarEmail valorGasto={valorGasto.toFixed(2)} />
      <EnviarWhatsApp valorGasto={valorGasto.toFixed(2)} />
    </div>
  </div>
</div>

<style>
  /* Importa as animações do Animate.css para efeitos visuais */
  @import 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css';

  /* Estilos Globais e de Layout */
  :global(body) {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: #f8f9fa; /* Um cinza claro para o fundo */
    color: #343a40; /* Cor de texto padrão */
  }

  .container {
    max-width: 768px; /* Largura máxima para centralizar o conteúdo */
  }

  /* Estilos para os Cards */
  .card {
    border-radius: 0.75rem; /* Bordas mais arredondadas */
    border: none; /* Remove a borda padrão do Bootstrap */
  }

  .topo-card {
    background: linear-gradient(135deg, #e3f2fd, #bbdefb); /* Gradiente suave */
    color: #212529;
  }

  .caixas-section {
    background-color: #ffffff;
  }

  /* Títulos */
  h1, h2 {
    color: #007bff; /* Azul primário */
    font-weight: 600;
  }

  /* Input de Saldo */
  .input-group-text {
    background-color: #007bff;
    color: white;
    border-color: #007bff;
    border-radius: 0.5rem 0 0 0.5rem;
  }

  .form-control-lg {
    font-size: 1.25rem;
    padding: 0.75rem 1rem;
    border-radius: 0 0.5rem 0.5rem 0;
  }

  /* Botões */
  .btn-primary {
    background-color: #28a745; /* Um verde vibrante */
    border-color: #28a745;
    transition: all 0.3s ease-in-out;
  }

  .btn-primary:hover {
    background-color: #218838;
    border-color: #1e7e34;
    transform: translateY(-2px); /* Pequeno efeito de elevação */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  .btn-outline-danger {
    transition: all 0.3s ease-in-out;
  }

  .btn-outline-danger:hover {
    background-color: #dc3545;
    color: white;
  }

  .btn-outline-secondary {
    transition: all 0.3s ease-in-out;
  }

  .btn-outline-secondary:hover {
    background-color: #6c757d;
    color: white;
  }

  /* Resumo de Valores (Saldo, Gasto, Restante) */
  .resumo-valores div {
    flex: 1;
    padding: 0.5rem;
    border-radius: 0.5rem;
    background-color: #f0f8ff; /* Fundo suave para os valores */
    margin: 0 5px;
  }

  .resumo-valores p {
    margin-bottom: 0.25rem;
  }

  /* Estilos específicos para o restante */
  .text-success {
    color: #28a745 !important;
  }

  .text-danger {
    color: #dc3545 !important;
  }

  /* Itens da Caixa */
  .caixa-item .form-select,
  .caixa-item .form-control {
    border-radius: 0.375rem; /* Bordas arredondadas para inputs e selects */
  }

  .caixa-item .btn {
    border-radius: 0.375rem;
  }

  /* Estilos responsivos */
  @media (max-width: 576px) {
    .d-md-flex {
      flex-direction: column;
    }
    .d-grid {
      display: flex;
      flex-direction: column;
    }
    .btn-lg {
      width: 100%;
    }
    .input-group > .form-control, .input-group > .form-select {
        flex: 1 1 auto;
        min-width: 0;
    }
    .input-group > :not(:first-child):not(.dropdown-menu):not(.form-floating) {
        margin-left: 0.5rem; /* Espaçamento entre o input e o botão "Zerar Saldo" */
    }
  }

  /* Classes auxiliares (manter se quiser esconder completamente) */
  .some {
    display: none;
  }
</style>