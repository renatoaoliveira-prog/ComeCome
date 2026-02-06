<script>
  import { nomeMercado } from '../stores/store.js';
  import { get } from 'svelte/store';
  import { onMount } from 'svelte';

  export let valorGasto; // Propriedade passada para o componente

  let mercado = ''; // Estado local para o nome do mercado

  // Atualiza mercado ao montar o componente
  onMount(() => {
    mercado = get(nomeMercado); // Pega o valor atual do store na montagem
    // Se o valor do store `nomeMercado` mudar no futuro, o `mercado` local será atualizado
    nomeMercado.subscribe((value) => (mercado = value));
  });

  function compartilharPorEmail() {
    // Captura a data e hora exata no momento do clique, para garantir precisão
    const datahoraAtual = new Date().toLocaleString('pt-PT', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
      // second: '2-digit' // Descomente se quiser segundos
    });

    // Assunto do email
    const assunto = encodeURIComponent(`Detalhes do Gasto no ${mercado || 'Estabelecimento'}`);

    // Corpo do email, formatado para melhor leitura
    const corpo = encodeURIComponent(
      `🎉 Resumo do Gasto 🎉\n\n` +
      `Data: ${datahoraAtual}\n` +
      `Local: ${mercado || 'Não especificado'}\n` + // Use o fallback aqui também
      `Valor Gasto: R$ ${valorGasto}\n\n` + // Usando valorGasto diretamente
      `Gerado por PoupaPoupa do Renatinho. 💸`
    );

    const url = `mailto:?subject=${assunto}&body=${corpo}`;
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer'; // Para segurança
    link.style.display = 'none'; // Esconder o link
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
</script>

<button
  class="btn btn-info px-4 py-2 rounded-3 shadow-sm"
  on:click={compartilharPorEmail}
  aria-label="Compartilhar detalhes do gasto por Email"
>
  Compartilhar por Email
</button>

<style>
  /* Estilo customizado para o botão de Email, usando um azul mais claro */
  .btn-info {
    background-color: #17a2b8; /* Azul claro do Bootstrap */
    border-color: #17a2b8;
    color: white;
    font-weight: 600;
    transition: all 0.2s ease-in-out;
  }

  .btn-info:hover {
    background-color: #138496; /* Tom mais escuro no hover */
    border-color: #138496;
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
</style>