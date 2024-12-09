import { dom } from "../../../kolibri/util/dom.js";
import { URI_HASH_HOME, href } from "../../../customize/uriHashes.js";
import { Page } from "../../../kolibri/navigation/page/page.js";
import { KOLIBRI_LOGO_SVG } from "../../../kolibri/style/kolibriStyle.js";

export { AnimationPage };

const PAGE_CLASS = "animation-page";

/**
 * Erstellt und lädt die AnimationPage
 * @return { Page } Die AnimationPage-Instanz
 * @constructor
 */
const AnimationPage = () => Page({
    titleText: "Kolibri Backflip Animation",
    activationMs: 1000,
    passivationMs: 2000,
    pageClass: PAGE_CLASS,
    styleElement: /** @type { HTMLStyleElement } */ styleElement,
    contentElement: /** @type { HTMLElement } */ contentElement,
    onBootstrap
});

/**
 * HTML-Struktur der AnimationPage
 * Enthält header mit Kolibri, main mit Buttons und Text und den Firework-Container
 * 
 * @type {HTMLElement}
 */
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

        <!-- Feuerwerk -->
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

/**
 * CSS-Stylesheet für die AnimationPage
 * 
 * @type {HTMLStyleElement}
 */
const [styleElement] = dom(`
    <style data-style-id="${PAGE_CLASS}">
        @import "./animation.css";
    </style>
`);

/**
 * Initialisiert die AnimationsPage während der Bootstrap-Phase
 * Richtet die EventListener für die Animationen und Interaktionen ein
 */
function onBootstrap() {
    const kolibri = document.querySelector(`.${PAGE_CLASS} .kolibri-logo-static`);
    const backflipButton = document.querySelector(".backflip-button");
    if (!kolibri || !backflipButton) return;

    // Entfernt die fly-in Klasse nach 4,35 Sekunden. Ansonsten würde der Kolibri noch ein weiteres Mal hinein fliegen.
    kolibri.addEventListener(
        "animationstart",
        (event) => {
            if (event.animationName === "animation_fly_in") {
                setTimeout(() => kolibri.classList.remove("fly-in"), 4350); // Versichert, dass die Klasse fly-in nach 4,35 Sekunden entfernt wird
            }
        },
        { once: true } // Wird dadurch nur ein Mal ausgeführt
    );

    // Macht automatisch einen Backflip beim hinein fliegen
    setTimeout(() => {
        triggerBackflip(kolibri);
    }, 3000); // Genauso lange wie die Fly-Animation dauert

    // Triggert Backflip und Feuerwerk
    backflipButton.addEventListener("click", () => {
        triggerBackflip(kolibri);
        triggerFireworks();
    });
}

/**
 * Triggert eine Backflip-Animation für den Kolibri
 * 
 * @param {SVGAnimateElement} kolibri - Kolibri-SVG Element
 */
function triggerBackflip(kolibri) {
    if (!kolibri) return;

    // Fügt die Backflip-Klasse dem Kolibri hinzu
    kolibri.classList.add("trigger-backflip");

    // Entfernt die Backflip-Klasse nach der Animation wieder
    kolibri.addEventListener(
        "animationend",
        (event) => {
            if (event.animationName === "animation_single_backflip") {
                kolibri.classList.remove("trigger-backflip");
            }
        },
        { once: true }
    );
}

/**
 * Triggert das Feuerwerk an einer zufälligen Stelle innerhalb des Containers
 */
function triggerFireworks() {
    const fireworks = document.querySelectorAll('.firework');
    const container = document.querySelector('.fireworks-container');
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;

    fireworks.forEach((firework) => {
        // Zufällige Positionen für das Feuerwerk
        const randomX = Math.random() * containerWidth - containerWidth / 2;
        const randomY = Math.random() * containerHeight - containerHeight / 2;

        // Wendet die zufällige Positionen auf die CSS-Variablen an
        firework.style.setProperty('--x', `${randomX}px`);
        firework.style.setProperty('--y', `${randomY}px`);

        // Resetted die Animation
        firework.style.animation = 'none'; // Animation resetten
        firework.offsetHeight; // Trigger-Reflow um die Animation neu starten zu können
        firework.style.animation = ''; // Animation neu anwenden
    });
}
