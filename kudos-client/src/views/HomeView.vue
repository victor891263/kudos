<template>
    <span id='floating-logo'>Kudos</span>
    <div id='home-page'>
        <h1>Connect effortlessly with anyone, any time</h1>
        <p>Kudos is an online chat application that allows strangers to connect each other or create chat groups to have a conversation with like-minded individuals.</p>
        <div class='buttons'>
            <button class='one'>
                <router-link :to="{ name: 'signup' }">Sign up</router-link>
            </button>
            <button class='two'>
                <router-link :to="{ name: 'login' }">Login</router-link>
            </button>
        </div>
    </div>
    <span id='copyright'>© 2022 Kudos. All rights reserved.</span>
</template>

<style>
#floating-logo {
    color: var(--violet-50) !important;
    font-weight: 800;

    position: absolute;
    top: 1rem;
    left: 1rem;
}

#home-page {
    margin: auto;
    padding-left: 1rem;
    padding-right: 1rem;
    width: min(100%, 500px);
}

#home-page h1 {
    margin-bottom: 1.4rem;
}

#home-page p {
    font-size: calc(1rem + 1px);
}

#home-page .buttons {
    display: grid !important;
    gap: 0.6rem;
    grid-template-columns: repeat(2, 1fr);
    margin-top: 2rem;
}

#home-page button {
    border-radius: 0.6rem;
}

#home-page button a {
    font-weight: 600;
    padding: 0.6rem;
    width: 100%;
}

#home-page button.one a {
    color: var(--gray-10) !important;
}

#home-page button.two a {
    color: var(--violet-50) !important;
}

#copyright {
    align-self: center;
    color: var(--gray-50) !important;
    font-size: 0.9rem;

    position: absolute;
    bottom: 1rem;
}

@media (min-width: 768px) {
    #home-page p {
        font-size: calc(1rem + 2px);
    }

    #home-page button a {
        font-size: calc(1rem + 1px);
    }
}
</style>