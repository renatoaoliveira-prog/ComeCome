<script>
  //import HeadMeta from './lib/HeadMeta.svelte'; // Opcional para SEO
  import Mercados from './lib/Mercados.svelte';
  import Counter from './lib/Counter.svelte';
  //import SwiperComponent from './lib/SwiperComponent.svelte';
  import Teste from './lib/Teste.svelte';

  // let options = {
  //   slidesPerView: 1,
  //   spaceBetween: 10,
  //   pagination: {
  //     el: '.swiper-pagination',
  //     clickable: true,
  //   },
  //   navigation: {
  //     nextEl: '.swiper-button-next',
  //     prevEl: '.swiper-button-prev',
  //   },
  // };

  

  
</script>

<!-- <Teste name="ola" /> -->

<!-- <SwiperComponent {options}>
  <div class="swiper-slide">Slide 1</div>
  <div class="swiper-slide">Slide 2</div>
  <div class="swiper-slide">Slide 3</div>
  <div class="swiper-slide">Slide 4</div>
</SwiperComponent> -->


<!-- <HeadMeta />  -->
<main class="">
   <!--<div class="text-center mb-5">
    <h1 class="display-4 fw-bold text-primary animate__animated animate__fadeInDown">
      💰 PoupaPoupa 💸
    </h1>
    <p class="lead text-muted animate__animated animate__fadeInUp">
      Gerencie seus gastos de forma inteligente e economize!
    </p>
  </div> -->

  <div class="card shadow-lg p-md-5 p-3 rounded-4 animate__animated animate__zoomIn">
      <Counter />
      <Mercados />
  </div>

  <footer class="text-center mt-5 text-muted">
    <p>&copy; {new Date().getFullYear()} PoupaPoupa. Todos os direitos reservados ao Renatinho.</p>
  </footer>
</main>

<style>
  /* Importa as animações do Animate.css (certifique-se de que está no seu index.html) */
  @import 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css';

  :global(body) {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: #f0f2f5; /* Um cinza claro suave para o fundo */
    color: #343a40; /* Cor de texto padrão */
    line-height: 1.6;
  }

  .container {
    max-width: 800px; /* Largura máxima para centralizar o conteúdo */
  }

  .display-4 {
    font-size: calc(1.75rem + 1.5vw); /* Torna o título responsivo */
    color: #007bff; /* Cor primária do Bootstrap */
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
  }

  .lead {
    font-size: 1.25rem;
    color: #6c757d;
  }

  .card {
    border: none; /* Remove a borda padrão do Bootstrap */
    border-radius: 1.25rem; /* Bordas mais arredondadas */
    background-color: #ffffff; /* Fundo branco para o card */
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1); /* Sombra mais pronunciada e suave */
    transition: all 0.3s ease-in-out; /* Transição suave para futuras interações */
  }

  .card:hover {
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15); /* Sombra um pouco maior no hover */
  }

  .my-4 {
    border-top: 1px solid #e9ecef; /* Linha divisória mais suave */
  }

  footer {
    padding: 20px 0;
    font-size: 0.9em;
    color: #888;
  }
</style>