import { dom } from "../../../kolibri/util/dom.js";
import { URI_HASH_HOME, href } from "../../../customize/uriHashes.js";
import { Page } from "../../../kolibri/navigation/page/page.js";
import { KOLIBRI_LOGO_SVG } from "../../../kolibri/style/kolibriStyle.js";

export { AnimationPage };

const PAGE_CLASS = "animation";

const AnimationPage = () => Page({
    titleText: "Kolibri Backflip Animation",
    activationMs: 1000,
    passivationMs: 1000,
    pageClass: PAGE_CLASS,
    styleElement: /** @type { HTMLStyleElement } */ styleElement,
    contentElement: /** @type { HTMLElement } */ contentElement,
});

const [contentElement] = dom(`
    <div class="${PAGE_CLASS}">
        <header>
            <div class="kolibri-logo-container">
                <div class="kolibri-logo">
                    ${KOLIBRI_LOGO_SVG}
                </div>
            </div>
            <h1>Kolibri Backflip Animation</h1>
        </header>
        <main class="prosa">
            <section>
                <h2>Backflip and Flapping Wings</h2>
            </section>
            <section class="buttons">
                <a class="btn primary glow" ${href(URI_HASH_HOME)}>Back to Home</a>
            </section>
        </main>
    </div>
`);

const [styleElement] = dom(`
    <style data-style-id="${PAGE_CLASS}">
        .${PAGE_CLASS} {
            text-align: center;
        }

        .kolibri-logo-container {
            position: relative;
            width: 100%;
            height: 400px;
            overflow: hidden;
        }

        .kolibri-logo {
            position: absolute;
            top: 50%;
            left: -10%;
            transform: translateY(-50%);
            animation: flyBackflip 6s ease-in-out infinite;
        }

        @keyframes flyBackflip {
            0% {
                left: -10%;
                transform: translateY(-50%) rotate(0deg) scale(1);
            }
            50% {
                left: 50%;
                transform: translateY(-50%) rotate(360deg) scale(1.2);
            }
            100% {
                left: 110%;
                transform: translateY(-50%) rotate(720deg) scale(1);
            }
        }

        .kolibri-logo svg {
            animation: flapWings 0.5s ease-in-out infinite;
        }

        @keyframes flapWings {
            0%, 100% {
                transform: rotate(0deg);
            }
            50% {
                transform: rotate(10deg);
            }
        }

        header h1 {
            margin-top: 1rem;
            font-size: 2rem;
        }

        .prosa {
            padding: 1rem;
        }

        .buttons {
            margin-top: 1rem;
        }

        .btn {
            padding: 0.5em 1em;
            text-decoration: none;
            color: white;
            background-color: #44aa88;
            border-radius: 5px;
            transition: transform 0.3s;
        }

        .btn:hover {
            transform: scale(1.1);
        }
    </style>
`);
