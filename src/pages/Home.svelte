<script>
    import Hero from "../components/Hero.svelte";
    import { Link } from "svelte-navigator";
    import Featured from "../components/Products/Featured.svelte";
</script>

<svelte:head>
    <title>Razors</title>
</svelte:head>
<Hero>
    <Link to="/products" class="btn btn-primary btn-hero">shop now</Link>
</Hero>
<Featured title="featured products" />
