<template>
    <header>
        <div>
            <div>💬 Kudos</div>
            <div class="links">
                <router-link :to="{ name: 'signup' }">Join us</router-link>
                <router-link :to="{ name: 'login' }">Sign in</router-link>
            </div>
        </div>
    </header>
    <div id='home-page'>
        <div class="hero">
            <h1>Come and start chatting the Kudos way!</h1>
            <p>Kudos, where communication meets simplicity. Experience the future of messaging with a chat app designed for the modern user. Chat freely and connect instantly.</p>
            <div class='buttons'>
                <button class='one'>
                    <router-link :to="{ name: 'signup' }">Join us</router-link>
                </button>
                <button class='two'>
                    <router-link :to="{ name: 'login' }">Sign in</router-link>
                </button>
            </div>
        </div>

        <div class="section-with-image">
            <div class="with-image">
                <div>
                    <div class="subtitle">thoughtfully designed</div>
                    <h2>Sleek and stylish: discover Kudos' dark themed UI.</h2>
                    <p>Kudos boasts a sleek and stylish dark-themed user interface that's not only easy on the eyes but also enhances your overall user experience. With the dark theme, you can enjoy chatting late into the night without straining your eyes.</p>
                </div>
                <img src="https://images.unsplash.com/photo-1503332132010-d1b77a049ddd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=360&h=420" alt="" />
            </div>
            <div class="with-image second">
                <img src="https://images.unsplash.com/photo-1531545514256-b1400bc00f31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=360&h=420" alt="" />
                <div>
                    <div class="subtitle">community-driven and open</div>
                    <h2>Join the Kudos revolution: we're open-source!</h2>
                    <p>At Kudos, we believe in the power of collaboration and community. That's why we're open-source, welcoming contributions from developers worldwide. Join us in shaping the future of chat apps by contributing your skills and ideas to Kudos.</p>
                </div>
            </div>
            <div class="with-image">
                <div>
                    <div class="subtitle">EASIER THAN EVER</div>
                    <h2>Join with just a username!</h2>
                    <p>Say goodbye to the hassle of sharing your email address and personal information just to chat. All you need is a unique username, and you're ready to dive into a world of instant communication.</p>
                </div>
                <img src="https://images.unsplash.com/photo-1521312706689-fbd93fd5af46?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=360&h=420" alt="" />
            </div>
        </div>

        <div class="features-section">
            <div class='heading'>
                <h2>Everything you need.</h2>
                <p>Experience the future of messaging with a chat app designed for the modern user.</p>
            </div>
            <div class="features">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                    <div>
                        <h3>Instant communication.</h3>
                        <p>Kudos leverages the power of websockets to bring you real-time messaging like never before. Say goodbye to delayed messages and hello to instant, seamless conversations.</p>
                    </div>
                </div>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                    <div>
                        <h3>Stay informed with online status.</h3>
                        <p>When you open a chat, our online status indicators powered by websockets instantly show you who's online and ready to chat - no more guessing or waiting for a response.</p>
                </div>
                </div>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                    <div>
                        <h3>Effortless group chats.</h3>
                        <p>Create group chats with friends, family, or coworkers, where every message sent by any group member is instantly transmitted to every participant.</p>
                </div>
                </div>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                    <div>
                        <h3>Connect everywhere anytime.</h3>
                        <p>Whether you're on your desktop, tablet, or mobile phone, Kudos ensures that your messages are synchronized across all your devices in real time.</p>
                </div>
                </div>
            </div>
        </div>

        <div class='faq-section'>
            <div class='heading'>
                <h2>Frequently asked questions.</h2>
                <p>Whether you're wondering about the sign-up process, group chats, online status, or data security, we've got you covered.</p>
            </div>
            <div class="questions">
                <div class="question">
                    <div>
                        <label for="faq-1" class="one" >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width={1.5} stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
                        </label>
                        <h3>What information do I need to sign up for Kudos?</h3>
                    </div>
                    <input type='checkbox' id='faq-1' class='faq-opener' />
                    <p>To sign up for Kudos, you only need to provide a username and a password. No email address is required, ensuring a hassle-free registration process.</p>
                </div>
                <div class="question">
                    <div>
                        <label for="faq-2" class="one" >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width={1.5} stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
                        </label>
                        <h3>How do I send a private message to another user?</h3>
                    </div>
                    <input type='checkbox' id='faq-2' class='faq-opener' />
                    <p>Sending a private message is easy on Kudos. Simply search for the username of the recipient, start a chat, and type your message. It will be instantly delivered to the recipient, and you can enjoy a real-time conversation.</p>
                </div>
                <div class="question">
                    <div>
                        <label for="faq-3" class="one" >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width={1.5} stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
                        </label>
                        <h3>How can I know if a user is online?</h3>
                    </div>
                    <input type='checkbox' id='faq-3' class='faq-opener' />
                    <p>Kudos keeps you informed about the online status of other users. When you open a chat with someone, you'll see a green dot next to their username if they are currently using the app, making it easy to reach out when they're available.</p>
                </div>
                <div class="question">
                    <div>
                        <label for="faq-4" class="one" >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width={1.5} stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
                        </label>
                        <h3>Can I create group chats on Kudos?</h3>
                    </div>
                    <input type='checkbox' id='faq-4' class='faq-opener' />
                    <p>Absolutely! You can create group chats with two or more people on Kudos. Any message sent by a member of the group is instantly delivered to every member, allowing for seamless group communication.</p>
                </div>
                <div class="question">
                    <div>
                        <label for="faq-5" class="one" >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width={1.5} stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
                        </label>
                        <h3>Is Kudos available on multiple platforms?</h3>
                    </div>
                    <input type='checkbox' id='faq-5' class='faq-opener' />
                    <p>Yes, as Kudos is a web app, it can be used on your desktop, tablet, or mobile device, ensuring you can stay connected with your friends and groups wherever you are.</p>
                </div>
                <div class="question">
                    <div>
                        <label for="faq-6" class="one" >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width={1.5} stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
                        </label>
                        <h3>Is my data secure on Kudos?</h3>
                    </div>
                    <input type='checkbox' id='faq-6' class='faq-opener' />
                    <p>Your privacy and security are a top priority for us. Kudos employs robust encryption to protect your messages and personal information. You can chat with confidence, knowing that your data is safe and secure.</p>
                </div>
            </div>
        </div>

        <div class="cta-section">
            <div class='content'>
                <h2>Ready to try Kudos?</h2>
                <p>Don't miss out on the next level of messaging. Join now!</p>
            </div>
            <div class='links'>
                <router-link :to="{ name: 'signup' }">Join us</router-link>
                <router-link :to="{ name: 'login' }">Sign in</router-link>
            </div>
        </div>
    </div>
    <footer>
        <div>
            <div>© 2023 Victor</div>
            <a href="https://github.com/victor891263/kudos" target="_blank" rel="noreferrer"><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.026 2C7.13295 1.99937 2.96183 5.54799 2.17842 10.3779C1.395 15.2079 4.23061 19.893 8.87302 21.439C9.37302 21.529 9.55202 21.222 9.55202 20.958C9.55202 20.721 9.54402 20.093 9.54102 19.258C6.76602 19.858 6.18002 17.92 6.18002 17.92C5.99733 17.317 5.60459 16.7993 5.07302 16.461C4.17302 15.842 5.14202 15.856 5.14202 15.856C5.78269 15.9438 6.34657 16.3235 6.66902 16.884C6.94195 17.3803 7.40177 17.747 7.94632 17.9026C8.49087 18.0583 9.07503 17.99 9.56902 17.713C9.61544 17.207 9.84055 16.7341 10.204 16.379C7.99002 16.128 5.66202 15.272 5.66202 11.449C5.64973 10.4602 6.01691 9.5043 6.68802 8.778C6.38437 7.91731 6.42013 6.97325 6.78802 6.138C6.78802 6.138 7.62502 5.869 9.53002 7.159C11.1639 6.71101 12.8882 6.71101 14.522 7.159C16.428 5.868 17.264 6.138 17.264 6.138C17.6336 6.97286 17.6694 7.91757 17.364 8.778C18.0376 9.50423 18.4045 10.4626 18.388 11.453C18.388 15.286 16.058 16.128 13.836 16.375C14.3153 16.8651 14.5612 17.5373 14.511 18.221C14.511 19.555 14.499 20.631 14.499 20.958C14.499 21.225 14.677 21.535 15.186 21.437C19.8265 19.8884 22.6591 15.203 21.874 10.3743C21.089 5.54565 16.9181 1.99888 12.026 2Z"></path></svg></a>
        </div>
    </footer>
</template>

<style>
@import "../styles/home.css";
</style>