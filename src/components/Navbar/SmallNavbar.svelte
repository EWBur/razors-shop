<script>
    // cart button
    // global store
    import { link } from "svelte-navigator";
    import CartButton from "../Cart/CartButton.svelte";
</script>

<nav class="navbar">
    <div class="nav-center">
        <button class="btn-sidebar-toggle">
            <i class="fas fa-bars" />
        </button>
        <a href="/" use:link class="nav-logo">
            <img src="/assets/images/logo.svg" alt="razors logo" class="logo" />
        </a>
        <CartButton />
    </div>
</nav>
