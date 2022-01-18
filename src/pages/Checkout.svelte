<script>
    import { onMount } from "svelte";
    import { navigate, link } from "svelte-navigator";
    import user from "../stores/user";
    import cart, { cartTotal } from "../stores/cart";
    import submitOrder from "../strapi/submitOrder";
    import globalStore from "../stores/globalStore";

    let name = "";
    // Stripe vars
    let cardElement;
    let cardErrors;
    let card;
    let stripe;
    let elements;

    $: isEmpty = !name;

    onMount(() => {
        if (!$user.jwt) {
            navigate("/");
            return;
        }
        if ($cartTotal > 0) {
            stripe = Stripe(
                "pk_test_51KIuSBCpDcQXnOOkC2GSDvwqoKs0nNAVb5Gok8PS61tgRcpBFCFQSvnIqhK4uX2zlEunBLK9ieK5qmyikiX5HT2300sHtEFYtC"
            );
            elements = stripe.elements();
            card = elements.create("card");
            card.mount(cardElement);
            card.addEventListener("change", function (event) {
                if (event.error) {
                    cardErrors.textContent = event.error.message;
                } else {
                    cardErrors.textContent = "";
                }
            });
        }
    });

    async function handleSubmit() {
        globalStore.toggleItem(
            "alert",
            true,
            "submitting order... please wait"
        );
        let response = await stripe.createToken(card).catch((error) => {
            console.log(error);
        });
        const { token } = response;
        console.log(`token : ${token.id}`);
        if (token) {
            const { id } = token;
            let order = await submitOrder({
                name,
                total: $cartTotal,
                items: $cart,
                stripeTokenId: id,
                userToken: $user.jwt,
            });
            if (order) {
                globalStore.toggleItem(
                    "alert",
                    true,
                    "your order is complete!"
                );
                cart.set([]);
                localStorage.setItem("cart", JSON.stringify([]));
                navigate("/");
            } else {
                globalStore.toggleItem(
                    "alert",
                    true,
                    "there was an error with your order. please try again",
                    true
                );
            }
        } else {
        }
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
            <div class="stripe-input">
                <!-- info -->
                <label for="car-element">Credit or Debit card</label>
                <p class="stripe-info">
                    Test using this credit card:
                    <span>4242 4242 4242 4242</span>
                    <br />
                    enter any 5 digits for the zip code
                    <br />
                    enter any 3 digits for the CVC
                </p>
                <div id="card-element" bind:this={cardElement} />
                <div id="card-errors" bind:this={cardErrors} role="alert" />
            </div>
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
