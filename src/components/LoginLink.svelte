<script>
    import user from "../stores/user";
    import { link } from "svelte-navigator";
    import globalStore from "../stores/globalStore";
    import { logoutUser } from "../stores/user";
</script>

{#if $user.jwt}
    <!--  $user.jwt} -->
    <a
        href="/"
        class="logout-btn"
        on:click={() => {
            logoutUser();
            globalStore.toggleItem("sidebar", false);
        }}
    >
        logout
    </a>
{:else}
    <a
        href="/login"
        on:click={() => {
            console.log("Login");
            globalStore.toggleItem("sidebar", false);
        }}
    >
        login
    </a>
{/if}
