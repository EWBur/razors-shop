<script>
    import { onMount } from "svelte";
    import { navigate, link } from "svelte-navigator";
    import user from "../stores/user";
    import { cartTotal } from "../stores/cart";

    let name;

    $: isEmpty = !name;

    onMount(() => {
        if (!$user.jwt) {
            navigate("/");
        }
    });

    function handleSubmit() {
        console.log("form submitted");
    }
</script>

{#if $cartTotal > 0}
    <section class="form">
        <h2 class="section-title">checkout</h2>
        <form on:submit|preventDefault={handleSubmit} class="checkout-form">
            <h3>order total : ${$cartTotal}</h3>
            <!-- single input -->
            <div class="form-control">
                <label for="name">your name</label>
                <input type="text" id="name" bind:value={name} />
            </div>
            <!-- end of single input -->
            <!-- stripe stuff -->
            <!-- end of stripe stuff -->
            <!-- error message -->
            {#if isEmpty}
                please fill out name field
            {/if}
            <button
                class="btn btn-block btn-primary"
                type="submit"
                disabled={isEmpty}
                class:disabled={isEmpty}>submit</button
            >
        </form>
    </section>
{:else}
    <div class="checkout-empty">
        <h2>Your cart is empty</h2>
        <a href="/products" class="btn btn-primary" use:link>fill it</a>
    </div>
{/if}
