import { dom } from "../../../kolibri/util/dom.js";
import { URI_HASH_HOME, href } from "../../../customize/uriHashes.js";
import { Page } from "../../../kolibri/navigation/page/page.js";
import { KOLIBRI_LOGO_SVG } from "../../../kolibri/style/kolibriStyle.js";

export { AnimationPage };

const PAGE_CLASS = "animation-page";

const AnimationPage = () => Page({
    titleText: "Kolibri Backflip Animation",
    activationMs: 1000,
    passivationMs: 2000,
    pageClass: PAGE_CLASS,
    styleElement: /** @type { HTMLStyleElement } */ styleElement,
    contentElement: /** @type { HTMLElement } */ contentElement,
    onBootstrap,
});

const [contentElement] = dom(`
    <div class="${PAGE_CLASS}">
        <header>
            <div class="prosa kolibri-logo-static fly-in" style="width:clamp(10rem, 30cqw, 20rem);">
                ${KOLIBRI_LOGO_SVG}
            </div>
            <h1 class="prosa animation-page passivate">Kolibri Backflip Animation</h1>
            <div class="subtitle prosa animation-page passivate">Backflip and Flapping Wings</div>
        </header>
        <main class="prosa animation-page passivate">
            <section>
                <h2>Interactive Backflip</h2>
                <p>Press the "Backflip" button to make the Kolibri perform a single backflip.</p>
            </section>
            <section class="buttons">
                <button class="btn primary glow backflip-button" onClick="buttonEffect('aKontaktieren')">
                    <span class="button__span">
                        <a id="aKontaktieren" class="button__a">Do a Backflip</a>
                    </span>
                </button>
                <button class="btn primary glow backflip-button" onClick="buttonEffect('aKontaktieren')">
                    <span class="button__span">
                        <a id="aKontaktieren" class="button__a" ${href(URI_HASH_HOME)}>Back to Home</a>
                    </span>
                </button>
            </section>
        </main>

        <!-- Feuerwerk Container -->
        <div class="fireworks-container">
            <div class="firework"></div>
            <div class="firework"></div>
            <div class="firework"></div>
            <div class="firework"></div>
            <div class="firework"></div>
            <div class="firework"></div>
            <div class="firework"></div>
        </div>
    </div>
`);

const [styleElement] = dom(`
    <style data-style-id="${PAGE_CLASS}">
        @import "./animation.css";
    </style>
`);

function onBootstrap() {
    const kolibri = document.querySelector(`.${PAGE_CLASS} .kolibri-logo-static`);
    const backflipButton = document.querySelector(".backflip-button");
    if (!kolibri || !backflipButton) return;

    // Immediately remove the fly-in class after the animation starts
    kolibri.addEventListener(
        "animationstart",
        (event) => {
            if (event.animationName === "animation_fly_in") {
                setTimeout(() => kolibri.classList.remove("fly-in"), 4350); // Ensure the class is removed after the animation starts
            }
        },
        { once: true } // Run once to prevent future triggers
    );

    // Automatically perform one backflip after flying in
    setTimeout(() => {
        triggerBackflip(kolibri);
    }, 3000); // Matches the fly-in duration (3s)

    // Trigger backflip and fireworks on button press
    backflipButton.addEventListener("click", () => {
        triggerBackflip(kolibri);
        triggerFireworks();
    });
}

function triggerBackflip(kolibri) {
    if (!kolibri) return;

    // Add the backflip class
    kolibri.classList.add("trigger-backflip");

    // Remove the backflip class after animation ends to reset
    kolibri.addEventListener(
        "animationend",
        (event) => {
            if (event.animationName === "animation_single_backflip") {
                kolibri.classList.remove("trigger-backflip");
            }
        },
        { once: true } // Run once to prevent future triggers
    );
}

function triggerFireworks() {
    const fireworks = document.querySelectorAll('.firework');
    const container = document.querySelector('.fireworks-container');
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;

    fireworks.forEach((firework) => {
        // Generate random positions within the container
        const randomX = Math.random() * containerWidth - containerWidth / 2; // Range: -containerWidth/2 to +containerWidth/2
        const randomY = Math.random() * containerHeight - containerHeight / 2; // Range: -containerHeight/2 to +containerHeight/2

        // Apply the random positions via CSS variables
        firework.style.setProperty('--x', `${randomX}px`);
        firework.style.setProperty('--y', `${randomY}px`);

        // Restart the animation
        firework.style.animation = 'none'; // Reset the animation
        firework.offsetHeight; // Trigger reflow to restart animation
        firework.style.animation = ''; // Apply the animation again
    });
}
