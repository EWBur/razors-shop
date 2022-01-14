<script>
    import globalStore from "../../stores/globalStore";
    import cart from "../../stores/cart";
    $: nItems = $cart.reduce((total, cur) => {
        return (total += cur.amount);
    }, 0);
</script>

<div class="btn-cart-container">
    <button
        class="btn-cart-toggle"
        on:click={() => globalStore.toggleItem("cart", true)}
    >
        <i class="fas fa-cart-plus" />
    </button>
    <span class="btn-cart-items">{nItems}</span>
</div>
