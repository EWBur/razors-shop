<script>
    import globalStore from "../../stores/globalStore";
    import { link } from "svelte-navigator";
    import links from "../../constants/links";
    import { fly, fade } from "svelte/transition";
    import LoginLink from "../LoginLink.svelte";
</script>

<div
    class="sidebar-container"
    in:fly={{ x: -1000 }}
    out:fly={{ x: -1000, duration: 500 }}
>
    <div class="sidebar" transition:fade={{ delay: 300 }}>
        <div class="sidebar-header">
            <button
                class="btn-close"
                on:click={() => {
                    globalStore.toggleItem("sidebar", false);
                }}
            >
                <i class="fas fa-window-close" />
            </button>
        </div>
        <img
            src="/assets/images/logo.svg"
            alt="razors logo"
            class="logo sidebar-logo"
        />
        <ul class="sidebar-links">
            {#each links as sideLink}
                <li>
                    <a
                        href={sideLink.url}
                        use:link
                        on:click={() => {
                            globalStore.toggleItem("sidebar", false);
                        }}
                    >
                        {sideLink.text}
                    </a>
                </li>
            {/each}
            <li>
                <LoginLink />
            </li>
        </ul>
    </div>
</div>
