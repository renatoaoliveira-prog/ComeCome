<script>
  import { nomeMercado } from './store.js';

  export let valorGasto;

  // Reatividade automática ao valor da store
  $: mercado = $nomeMercado;

  let datahora = new Date().toLocaleString();

  function compartilharViaWhatsApp() {
    const telefone = ''; // pode deixar vazio para abrir o app com lista de contatos
    const texto = encodeURIComponent(
      `Data e Hora: ${datahora} foi gasto o valor de ${valorGasto} no ${mercado}`
    );
    const url = `https://wa.me/${telefone}?text=${texto}`;
    window.open(url, '_blank');
  }
</script>

<button
  class="btn btn-primary px-4 py-2 rounded-3 shadow-sm btn-custom"
  on:click={compartilharViaWhatsApp}
>
  Compartilhar no WhatsApp
</button>
