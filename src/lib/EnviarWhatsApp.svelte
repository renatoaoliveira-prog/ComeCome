<script>
  import { onMount } from 'svelte';
  import { nomeMercado } from './store.js';
  import { get } from 'svelte/store';

  export let valorGasto;



  let mercado = '';

  // Atualiza mercado ao montar
  onMount(() => {
    mercado = get(nomeMercado); // pega valor atual
    nomeMercado.subscribe((value) => mercado = value); // escuta futuras mudanças
  });

	$: valor = valorGasto;
  
  let datahora = new Date().toLocaleString();
  
	function compartilharViaWhatsApp() {
		const telefone = ''; // opcional: você pode deixar em branco e deixar o usuário escolher o contato
		const texto = encodeURIComponent(
      `Data e Hora: ${datahora} foi gasto o valor de ${valor} no ${mercado}`
    );
		const url = `https://wa.me/${telefone}?text=Compras no mercado ${mercado}`;
		window.open(url, '_blank');
	}
</script>
<button on:click={compartilharViaWhatsApp}>
  Compartilhar no WhatsApp
</button>