<script>
    import { onMount, onDestroy } from "svelte";
    import products from "../../stores/defaultProducts";
</script>

<h1>Welcome to products component</h1>
{#each $products as prod}
    <h2>{prod.title}</h2>
{/each}
