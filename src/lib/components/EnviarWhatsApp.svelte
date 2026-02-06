<script>
  import { nomeMercado } from '../stores/store.js';

  export let valorGasto;

  // Reatividade automática ao valor da store
  $: mercado = $nomeMercado;

  function compartilharViaWhatsApp() {
    // Captura a data e hora exata no momento do clique, para maior precisão
    const datahoraAtual = new Date().toLocaleString('pt-PT', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
      // second: '2-digit' // Descomente se quiser segundos
    });

    const telefone = ''; // Deixar vazio para abrir a lista de contatos do WhatsApp

    const texto = encodeURIComponent(
      `🎉 Detalhes do Gasto 🎉\n\n` +
      `Data: ${datahoraAtual}\n` +
      `Valor Gasto: R$ ${valorGasto}\n` +
      `Local: ${mercado || 'Não especificado'}\n\n` +
      `Economize com PoupaPoupa do Renatinho! 💸`
    );

    const url = `https://wa.me/${telefone}?text=${texto}`;
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
  class="btn btn-success px-4 py-2 rounded-3 shadow-sm"
  on:click={compartilharViaWhatsApp}
  aria-label="Compartilhar detalhes do gasto no WhatsApp"
>
  Compartilhar no WhatsApp
</button>

<style>
  /* Adicionando um estilo para o botão de WhatsApp, talvez um verde mais icônico */
  .btn-success {
    background-color: #25d366; /* Verde icônico do WhatsApp */
    border-color: #25d366;
    color: white;
    font-weight: 600;
    transition: all 0.2s ease-in-out;
  }

  .btn-success:hover {
    background-color: #1da851; /* Tom mais escuro no hover */
    border-color: #1da851;
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
</style>