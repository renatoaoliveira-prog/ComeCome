<svelte:head>
  
<meta charset="UTF-8" />
<link rel="icon" type="image/svg+xml" href="/vite.svg" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="description" content="PaginaZinha" />

<link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:200,200i,300,300i,400,400i,600,600i,700,700i,900,900i" rel="stylesheet">
<link rel="stylesheet" href="https://qld-cms.escolavirtual.pt/themes/ev/assets/css/CommonStyles18.css">
<link rel="stylesheet" href="https://qld-cms.escolavirtual.pt/themes/ev/assets/css/header20Styles.css">
<link rel="stylesheet" href="https://qld-cms.escolavirtual.pt/themes/ev/assets/css/mobileNavigationStyles20.css">
<link rel="stylesheet" href="https://qld-cms.escolavirtual.pt/themes/ev/assets/css/litebox.css">
<link rel="stylesheet" href="https://qld-cms.escolavirtual.pt/themes/ev/assets/css/blogueArtigosPagStyles.css">
<link rel="stylesheet" href="https://qld-cms.escolavirtual.pt/themes/ev/assets/css/footer20Styles.css">

<script>
  // If you need to load external scripts, do so dynamically here
  const scripts = [
	"https://qld-cms.escolavirtual.pt/themes/ev/assets/js/custom-scripts.js",
	"https://qld-cms.escolavirtual.pt/themes/ev/assets/js/jquery-1.11.1.js",
	"https://qld-cms.escolavirtual.pt/themes/ev/assets/js/litebox.js",
	"https://qld-cms.escolavirtual.pt/themes/ev/assets/js/images-loaded.min.js",
	"https://qld-cms.escolavirtual.pt/themes/ev/assets/js/jquery.placeholder.js",
	"https://qld-cms.escolavirtual.pt/themes/ev/assets/js/jquery.easing.1.3.js",
	"https://qld-cms.escolavirtual.pt/themes/ev/assets/js/mobileNavigation.js",
	"https://qld-cms.escolavirtual.pt/themes/ev/assets/js/mobileNavigation20Adds.js",
	"https://qld-cms.escolavirtual.pt/themes/ev/assets/js/toViewAnimation.js",
	"https://qld-cms.escolavirtual.pt/themes/ev/assets/js/parallaxParty.js",
	"https://qld-cms.escolavirtual.pt/themes/ev/assets/js/jquery.anchor.js"
  ];

  // Load scripts on mount
  import { onMount } from "svelte";
  onMount(() => {
	scripts.forEach(src => {
	  const script = document.createElement("script");
	  script.src = src;
	  script.async = false;
	  document.body.appendChild(script);
	});
  });
</script>

<title>PaginaZinha</title>


</svelte:head>