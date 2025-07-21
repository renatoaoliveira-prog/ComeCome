<script>
 
  export let name;
  let minhaDiv;

  function mostrarDiv() {
    minhaDiv = alert('Olá, esta é a minha div!');
  }

  
  function toggleButton() {
    let botao = document.querySelector('.btn');
    let botaotexto = botao.textContent;
    botao.textContent = botaotexto == 'Toggle Button' ? 'Button Toggled' : 'Toggle Button';
  }

</script>

<div bind:this={minhaDiv}>{name} Olá</div>

<!-- <button on:click={mostrarDiv}>Ver Div no Console</button> -->

<!-- <button class="btn" on:click={toggleButton}>Toggle Button</button> -->
