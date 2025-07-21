<script>
  import Swiper from 'swiper/bundle';
  import 'swiper/swiper-bundle.css';
  import { onMount, onDestroy } from 'svelte';

  export let options = {};
  let swiper;
  let swiperContainer;

  onMount(() => {
    swiper = new Swiper(swiperContainer, options);
  });

  onDestroy(() => {
    if (swiper) {
      swiper.destroy();
    }
  });

 
</script>

<div class="swiper" bind:this={swiperContainer}>
  <div class="swiper-wrapper">
    <slot />
  </div>

  <!-- Pagination e Navigation -->
  {#if options.pagination}
    <div class="swiper-pagination"></div>
  {/if}
  {#if options.navigation}
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  {/if}
</div>

<style> 
  .swiper {
    width: 100%;
    height: 100%;
  }



</style>