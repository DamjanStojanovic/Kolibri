import { dom } from "../../../kolibri/util/dom.js";
import { URI_HASH_HOME, href } from "../../../customize/uriHashes.js";
import { Page } from "../../../kolibri/navigation/page/page.js";
import { KOLIBRI_LOGO_SVG } from "../../../kolibri/style/kolibriStyle.js";

export { AnimationPage };

const PAGE_CLASS = "animation-page";

const AnimationPage = () => Page({
    titleText: "Kolibri Backflip Animation",
    activationMs: 1000,
    passivationMs: 2000, // Matches the fade-out duration
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
            <h1>Kolibri Backflip Animation</h1>
            <div class="subtitle">Backflip and Flapping Wings</div>
        </header>
        <main class="prosa">
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
                setTimeout(() => kolibri.classList.remove("fly-in"), 4400); // Ensure the class is removed after the animation starts
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
    const fireworks = document.querySelectorAll(".firework");
    // Remove and re-add the class to restart the animation
    fireworks.forEach((firework) => {
        firework.style.animation = "none"; // Reset the animation
        firework.offsetHeight; // Force reflow to allow the animation to re-trigger
        firework.style.animation = ""; // Reapply the animation
    });
}
