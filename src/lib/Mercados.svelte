<script>
  import { onMount } from 'svelte';
  import { nomeMercado } from './store.js';

  let mercadoSelecionado = '';
  // Lista de mercados mais comuns
  const mercadosComuns = ['Pingo Doce', 'Continente', 'Lidl', 'Auchan', 'Mercadona'];
  // Adiciona a opção 'Outro' para o input de texto
  const todasAsOpcoesDeMercado = [...mercadosComuns, 'Outro'];

  let outroMercadoDigitado = '';

  onMount(() => {
    // Define o primeiro mercado comum como selecionado por padrão ao carregar
    mercadoSelecionado = mercadosComuns[0];
    nomeMercado.set(mercadoSelecionado);
  });

  // Função reativa para atualizar o store 'nomeMercado' sempre que a seleção muda
  $: {
    if (mercadoSelecionado === 'Outro') {
      // Se 'Outro' for selecionado, usa o texto digitado (ou vazio se nada for digitado)
      nomeMercado.set(outroMercadoDigitado.trim());
    } else {
      // Caso contrário, usa o nome do mercado selecionado
      nomeMercado.set(mercadoSelecionado);
      // Limpa o input de "Outro" se um mercado predefinido for escolhido
      outroMercadoDigitado = '';
    }
  }
</script>

<div class="card shadow-sm p-4 mb-4">
  <h2 class="card-title text-center mb-4">Onde você vai gastar? 🛒</h2>

  <div class="mb-3">
    <p class="form-label fs-5 mb-3">Selecione o estabelecimento:</p>
    <div class="d-flex flex-wrap gap-2 justify-content-center">
      {#each todasAsOpcoesDeMercado as mercadoOpcao}
        <input
          type="radio"
          class="btn-check"
          name="mercado-opcao"
          id={`mercado-${mercadoOpcao.toLowerCase().replace(/\s/g, '-')}`}
          value={mercadoOpcao}
          bind:group={mercadoSelecionado}
          autocomplete="off"
        />
        <label
          class="btn btn-outline-primary btn-lg"
          for={`mercado-${mercadoOpcao.toLowerCase().replace(/\s/g, '-')}`}
        >
          {mercadoOpcao}
        </label>
      {/each}
    </div>
  </div>

  {#if mercadoSelecionado === 'Outro'}
    <div class="mt-4 animate__animated animate__fadeIn">
      <label for="outroMercadoInput" class="form-label">Qual o nome do outro estabelecimento?</label>
      <input
        id="outroMercadoInput"
        type="text"
        class="form-control form-control-lg"
        placeholder="Ex: Farmácia, Papelaria, etc."
        bind:value={outroMercadoDigitado}
      />
      <small class="form-text text-muted">O nome digitado será usado para salvar o local do gasto.</small>
    </div>
  {/if}
</div>

<style>
  /* Importa as animações do Animate.css (certifique-se de que está no seu index.html) */
  @import 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css';

  .btn-outline-primary {
    transition: all 0.2s ease-in-out;
    border-radius: 0.5rem; /* Bordas mais arredondadas */
    font-weight: 500;
  }

  .btn-outline-primary:hover {
    background-color: #e0f2fe; /* Um azul mais claro no hover */
    color: #0056b3;
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .btn-check:checked + .btn-outline-primary {
    background-color: #007bff; /* Cor de fundo quando selecionado */
    color: white;
    border-color: #007bff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    transform: scale(1.02); /* Levemente maior quando selecionado */
  }

  /* Estilos específicos para o card do mercado */
  .card {
    border-radius: 0.75rem;
    border: none;
    background-color: #ffffff;
  }

  .card-title {
    color: #007bff;
    font-weight: 600;
  }
</style>