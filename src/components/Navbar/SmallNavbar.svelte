<script>
    import globalStore from "../../stores/globalStore";
    import { link } from "svelte-navigator";
    import CartButton from "../Cart/CartButton.svelte";
    let openSidebar = globalStore.toggleItem;
</script>

<nav class="navbar">
    <div class="nav-center">
        <button
            class="btn-sidebar-toggle"
            on:click={() => openSidebar("sidebar", true)}
        >
            <i class="fas fa-bars" />
        </button>
        <a href="/" use:link class="nav-logo">
            <img src="/assets/images/logo.svg" alt="razors logo" class="logo" />
        </a>
        <CartButton />
    </div>
</nav>
