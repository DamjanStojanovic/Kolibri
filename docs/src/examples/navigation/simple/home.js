import {dom}                                 from "../../../kolibri/util/dom.js";
import {URI_HASH_ABOUT, href, URI_HASH_HOME} from "../../../customize/uriHashes.js";
import {Page}                                from "../../../kolibri/navigation/page.js";

export { HomePage }

const PAGE_CLASS = URI_HASH_HOME.substring(1);

/**
 * The Home Page should always be available.
 * @return { PageType }
 * @constructor
 */
const HomePage = () => Page(/** @type { PageDataType } */{
    titleText:         "Home Page",
    activationMs:       1000,
    passivationMs:      1000,
    pageClass:          PAGE_CLASS,
    styleElement        ,
    contentElement      ,
 });


const [contentElement] = dom(`
    <div id="content-wrapper" class="${PAGE_CLASS}">            
      <header>
        <div class="kolibri-logo-svg kolibri-logo-anim">
          <svg viewBox="0 0 305 342" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M138 194C183.5 214.5 228 221.5 236.5 341.5C229.5 273.5 187 263.5 138 194Z" fill="#5F2EEA"></path>
            <path d="M117 122C117 46 42.5 17 0 0C81.2 39.2 77.5 79.5 80.5 138C87 216.5 128 235.667 150.5 248C105.7 212 117 157 117 122Z" fill="#FE2EA8"></path>
            <path d="M80.9999 144.5C81.3468 146.565 81.692 148.581 82.0374 150.552C86.8892 170.965 107.957 211.566 156.5 225.5C210.5 241 236.407 308.5 237.074 342C220.5 279.5 210.346 274.538 156.5 250.5C102.35 226.326 92.1459 208.229 82.0374 150.552C81.492 148.257 81.1515 146.218 80.9999 144.5Z" fill="#BE58FD"></path>
            <path d="M115 49.5C100.5 39.8333 79 51.0005 54 32C92.5 36.5 109.5 26 129.5 44C149.5 65 128.5 90 148 113.499C123.5 104.499 133 61.5 115 49.5Z" fill="#5F2EEA"></path>
            <circle cx="100.5" cy="60.5" r="9.5" fill="#2D1FB1"></circle>
            <path class="wing flatter" opacity="0.5" d="M128 179.114C176.159 220.174 254.92 177.348 279 146C243.884 171.608 187.698 146.442 128 179.114Z" fill="#BD53FE" stroke="#BD53FE"></path>
            <path class="wing flatter" opacity="0.7" d="M128 158C163.892 67.1818 241.575 130.021 305 47C263.208 149.285 161.925 132.314 128 158Z" fill="#4C2EEC"></path>
            <path class="wing flatter" opacity="0.7" d="M128 178.895C162.922 103.67 248.073 126.739 305 47C278.211 119.718 247.116 181.904 128 178.895Z" fill="#FF2CA5"></path>
          </svg>
        </div>
        <h1>Welcome to Kolibri</h1>
        <div class="subtitle">The Web UI Toolkit</div>
      </header>
      
      <main>
        <section>
          <h2>What is Kolibri?</h2>
            <p>Kolibri is a vanilla Javascript web UI toolkit that allows you to build Single Page Applications for the web without any dependencies at all - neither at runtime nor at build-time.</p>
            <p>Our approach is different from many other web development frameworks, as we do not rely on external libraries at any stage of the development process. This means that your project can be completely self-contained and easily maintainable, with no need for frequent updates or complicated dependency management.</p>
        </section>
    
        <section class="buttons">
          <a class="btn primary glow" ${href(URI_HASH_HOME)}>Home Page</a> 
          <a class="btn accent  glow" ${href(URI_HASH_ABOUT)}>Go to the about page</a>
        </section>
    
        <section>
          <h2>Give it a go</h2>
            <p>Thank you for visiting the Kolibri website!</p>
            <p>We're excited to offer a WebUI toolkit that allows developers to create fast, efficient web applications without the hassle of complex dependencies. Our toolkit is designed to be simple, intuitive, and easy to use, so you can spend less time dealing with external libraries and more time focusing on your application's functionality.</p>
            <p>Whether you're an experienced developer or just starting out, we believe that Kolibri has something to offer you. Our extensive documentation and testing facilities make it easy to get started with Kolibri.</p>
            <p>So why wait? Try out Kolibri today and see for yourself why it's the best choice for building Single Page Applications for the web!</p>
        </section>
        
        <section>
            <h2>Developer Special</h2>
            <p> Example of a <a ${href("#no-such-uri")}>broken link</a> that appears in the code
                as a type error!
            </p>
        </section>
    
      </main>
    </div>

`);

// Note that we can refer to external css files for the styling. (see discussion there)
const [styleElement] = dom(`
    <style data-style-id="${PAGE_CLASS}">
        @import "./home.css";
    </style>      
`);
