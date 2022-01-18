<script>
    import globalStore from "../../stores/globalStore";
    import { link } from "svelte-navigator";
    import links from "../../constants/links";
    import { fly, fade, blur } from "svelte/transition";
    import user from "../../stores/user";

    // components
    import CartList from "./CartList.svelte";

    // itemlist
</script>

<div
    class="cart-overlay"
    transition:blur
    on:click|self={() => {
        globalStore.toggleItem("cart", false);
    }}
>
    <div class="cart-container" transition:fly={{ x: 100 }}>
        <div class="cart" transition:fade={{ delay: 300 }}>
            <!-- cart header -->
            <div class="cart-header">
                <button
                    class="btn-close"
                    on:click={() => globalStore.toggleItem("cart", false)}
                >
                    <i class="fas fa-window-close" />
                </button>
                <h2 class="cart-title">your cart</h2>
                <span />
            </div>
            <!-- End of cart header -->
            <!-- cart items -->
            <CartList />
            <!-- End of cart items -->
            <!-- cart footer -->
            <div class="cart-footer">
                {#if $user.jwt}
                    <a
                        href="/checkout"
                        use:link
                        on:click={() => globalStore.toggleItem("cart", false)}
                        class="btn btn-primary btn-block">checkout</a
                    >
                {:else}
                    <p class="cart-login">
                        Please
                        <a
                            href="/login"
                            use:link
                            on:click={() =>
                                globalStore.toggleItem("cart", false)}>Login</a
                        >
                        to checkout
                    </p>
                {/if}
            </div>
            <!-- End of cart footer -->
        </div>
    </div>
</div>
