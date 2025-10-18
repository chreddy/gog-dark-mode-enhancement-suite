// ==UserScript==
// @name         GOG Dark Mode Enhancement Suite
// @namespace    gog-dark-mode-enhancement-suite
// @version      1.0.1
// @description  Enhances GOG.com dark mode with styling fixes, bug fixes, and UI improvements
// @author       chreddy
// @match        https://www.gog.com/account*
// @match        https://www.gog.com/redeem*
// @match        https://www.gog.com/wallet*
// @match        https://www.gog.com/*/account*
// @match        https://www.gog.com/*/redeem*
// @match        https://www.gog.com/*/wallet*
// @updateURL    https://github.com/chreddy/gog-dark-mode-enhancement-suite/raw/refs/heads/main/gog-dark-mode-enhancement-suite.user.js
// @downloadURL  https://github.com/chreddy/gog-dark-mode-enhancement-suite/raw/refs/heads/main/gog-dark-mode-enhancement-suite.user.js
// @grant        GM_addStyle
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    console.log('GOG Dark Mode Enhancement Suite: Script loaded');

    const cssRules = `
        /* ===== LIBRARY PAGE FIXES (Dark Mode Only) ===== */
        /* Fix the container background color ONLY for list view */
        /* This shows through the 1-pixel gaps between game entries */
        html[data-theme="dark"] .account__products.list--rows {
            background-color: #404040 !important;
        }

        html[data-theme="dark"] .account__products--games.list--rows {
            background-color: #404040 !important;
        }

        html[data-theme="dark"] .list.account__products.account__products--games.list--rows {
            background-color: #404040 !important;
        }

        /* Fix carousel arrow backgrounds in dark mode */
        html[data-theme="dark"] ._cs-wrapper ._cs-left,
        html[data-theme="dark"] ._cs-wrapper ._cs-right {
            background-color: #212121 !important;
        }

        /* Ensure grid view keeps its original background */
        /* Grid view should not have the dark background */
        html[data-theme="dark"] .account__products.list--grid,
        html[data-theme="dark"] .account__products--games.list--grid,
        html[data-theme="dark"] .account__products--movies.list--grid {
            background-color: transparent !important;
        }

        /* Fix download dropdown arrow color in game/movie details popup */
        html[data-theme="dark"] .game-details__header-icon,
        html[data-theme="dark"] .module-header2__element svg,
        html[data-theme="dark"] .module-header2__element--selected svg {
            fill: #f2f2f2 !important;
            color: #f2f2f2 !important;
        }

        /* Also target the use element and paths inside SVG */
        html[data-theme="dark"] .game-details__header-icon use,
        html[data-theme="dark"] .game-details__header-icon path,
        html[data-theme="dark"] .module-header2__element svg use,
        html[data-theme="dark"] .module-header2__element svg path {
            fill: #f2f2f2 !important;
        }
		
        /* LIST VIEW ONLY: Remove the original border and any margins/gaps */
        html[data-theme="dark"] .list--rows .product-row {
            border-top: none !important;
            margin-top: 0 !important;
            margin-bottom: 0 !important;
        }

        html[data-theme="dark"] .list--rows .product-row-wrapper {
            margin-top: 0 !important;
            margin-bottom: 0 !important;
        }

        /* LIST VIEW ONLY: Add border-top only between product-row-wrapper items */
        /* Using the + selector means only wrappers that follow another wrapper get a border */
        html[data-theme="dark"] .list--rows .product-row-wrapper + .product-row-wrapper {
            border-top: 1px solid #404040 !important;
            margin-top: 0 !important;
        }

        /* LIST VIEW ONLY: Ensure no borders on first and last items */
        html[data-theme="dark"] .list--rows .product-row-wrapper:first-child,
        html[data-theme="dark"] .list--rows .product-row-wrapper:last-child {
            border-bottom: none !important;
        }

        /* ===== LIGHT MODE FIXES ===== */
        /* Fix separator lines at different zoom levels in light mode too */
        /* Light mode has the same zoom issue as dark mode had */

        html:not([data-theme="dark"]) .list--rows .product-row {
            border-top: none !important;
            margin-top: 0 !important;
            margin-bottom: 0 !important;
        }

        html:not([data-theme="dark"]) .list--rows .product-row-wrapper {
            margin-top: 0 !important;
            margin-bottom: 0 !important;
        }

        /* Use the original light mode separator color */
        html:not([data-theme="dark"]) .list--rows .product-row-wrapper + .product-row-wrapper {
            border-top: 1px solid #cfcfcf !important;
            margin-top: 0 !important;
        }

        html:not([data-theme="dark"]) .list--rows .product-row-wrapper:first-child,
        html:not([data-theme="dark"]) .list--rows .product-row-wrapper:last-child {
            border-bottom: none !important;
        }

        /* Also need to set the light mode background */
        html:not([data-theme="dark"]) .account__products.list--rows {
            background-color: #cfcfcf !important;
        }

        /* ===== SETTINGS PAGE FIXES (Dark Mode Only) ===== */
        /* Fix dropdown options visibility */
        html[data-theme="dark"] select option,
        html[data-theme="dark"] .form__select option,
        html[data-theme="dark"] ._dropdown__item,
        html[data-theme="dark"] ._dropdown__items ._dropdown__item {
            background-color: #3d3d3d !important;
            color: #f2f2f2 !important;
        }

        /* EXCEPT: Don't apply to wishlist dropdown and current text */
        /* The wishlist sharing dropdown should keep its original styling */
        html[data-theme="dark"] .wishlist-options__dropdown ._dropdown__item,
        html[data-theme="dark"] .wishlist-options__dropdown ._dropdown__items ._dropdown__item,
        html[data-theme="dark"] .wishlist-options__current,
        html[data-theme="dark"] span.wishlist-options__current {
            background-color: transparent !important;
            color: inherit !important;
        }

        /* More specific override for wishlist current text */
        html[data-theme="dark"] .wishlist-options__dropdown .wishlist-options__current,
        html[data-theme="dark"] ._dropdown.wishlist-options__dropdown .wishlist-options__current {
            background-color: transparent !important;
        }

        /* Hover state */
        html[data-theme="dark"] select option:hover,
        html[data-theme="dark"] .form__select option:hover,
        html[data-theme="dark"] ._dropdown__item:hover {
            background-color: #404040 !important;
            color: #ffffff !important;
        }

        /* EXCEPT: Don't apply hover to wishlist dropdown */
        html[data-theme="dark"] .wishlist-options__dropdown ._dropdown__item:hover {
            background-color: transparent !important;
            color: inherit !important;
        }

        /* Dropdown container */
        html[data-theme="dark"] ._dropdown__items,
        html[data-theme="dark"] .form__select,
        html[data-theme="dark"] select {
            background-color: #3d3d3d !important;
            color: #f2f2f2 !important;
        }

        /* Custom dropdown elements */
        html[data-theme="dark"] [class*="dropdown"] [class*="option"],
        html[data-theme="dark"] [class*="select"] [class*="option"] {
            background-color: #3d3d3d !important;
            color: #f2f2f2 !important;
        }

        html[data-theme="dark"] [class*="dropdown"] [class*="option"]:hover,
        html[data-theme="dark"] [class*="select"] [class*="option"]:hover {
            background-color: #404040 !important;
        }

        /* Fix input fields - make text visible */
        html[data-theme="dark"] input[type="text"],
        html[data-theme="dark"] input[type="email"],
        html[data-theme="dark"] input[type="password"],
        html[data-theme="dark"] textarea,
        html[data-theme="dark"] .tag-input-wrapper__input {
            background-color: #3d3d3d !important;
            color: #f2f2f2 !important;
        }

        /* IMPORTANT: Completely exclude search inputs from all overrides */
        /* Search inputs need to keep their transparent background and inherit styles from parent */
        html[data-theme="dark"] ._search input,
        html[data-theme="dark"] ._search__input,
        html[data-theme="dark"] ._search ._search__input,
        html[data-theme="dark"] .orders-header__search input,
        html[data-theme="dark"] .orders-header__search-input {
            background-color: transparent !important;
            background: transparent !important;
            border: 0 !important;
            border-radius: inherit !important;
            line-height: inherit !important;
            padding: 0 1.8em !important;
            color: inherit !important;
        }

        /* Orders header alignment fix - applies in ALL modes (this is a bug fix, not styling) */
        /* Disable flexbox and use absolute positioning for proper alignment */
        .orders-log-module-header {
            display: block !important;
            position: relative !important;
        }

        /* Position search field absolutely to the right */
        .orders-header__search {
            position: absolute !important;
            right: 0 !important;
        }

        /* Keep "Orders History" on the left (normal flow) */
        .orders-header__text {
            display: inline-block !important;
        }

        /* Only style non-search text inputs */
        html[data-theme="dark"] input[type="text"]:not(._search__input):not(._search input),
        html[data-theme="dark"] input[type="search"],
        html[data-theme="dark"] .form__input,
        html[data-theme="dark"] input.form__input {
            border-radius: 3px !important;
        }

        /* Keep placeholder text visible but slightly dimmed */
        html[data-theme="dark"] input::placeholder,
        html[data-theme="dark"] textarea::placeholder {
            color: #888888 !important;
            opacity: 1 !important;
        }

        /* Input focus state */
        html[data-theme="dark"] input:focus,
        html[data-theme="dark"] textarea:focus {
            background-color: #333333 !important;
            color: #ffffff !important;
        }

        /* Fix tag input wrapper and inside options (cancel button area) */
        html[data-theme="dark"] .tag-input-wrapper,
        html[data-theme="dark"] .tag-input__inside-options {
            background-color: #3d3d3d !important;
        }

        html[data-theme="dark"] .tag-item .tag-input__inside-options {
            background-color: transparent !important;
        }

        /* Cancel button styling */
        html[data-theme="dark"] .tag-input__option,
        html[data-theme="dark"] a.tag-input__option {
            background-color: transparent !important;
            color: #f2f2f2 !important;
        }

        html[data-theme="dark"] .tag-input__option:hover,
        html[data-theme="dark"] a.tag-input__option:hover {
            color: #ffffff !important;
        }

        /* Fix checkboxes and radio buttons in dark mode */
        html[data-theme="dark"] .checkbox,
        html[data-theme="dark"] .radio,
        html[data-theme="dark"] .dropdown-input.checkbox {
            background: #3d3d3d !important;
            border: 1px solid #6a6a6a !important;
            box-shadow: inset 0 1px 3px rgba(0,0,0,.3) !important;
        }

        /* Make checkmark visible when checked */
        html[data-theme="dark"] .checkbox::before,
        html[data-theme="dark"] .dropdown-input.checkbox::before {
            color: #f2f2f2 !important;
        }

        /* Fix loading spinner visibility on orders page */
        /* The spinner uses box-shadow to create the visual, not borders */
        /* Using all 40 shadow positions to match the smooth appearance of light mode */
        html[data-theme="dark"] .list__spinner-in,
        html[data-theme="dark"] .account__list-spinner-in {
            color: #f2f2f2 !important;
            /* Override the black box-shadows with bright ones - all 40 positions */
            box-shadow:
                rgb(242, 242, 242) 15.2px 0px 0px 0px,
                rgba(242, 242, 242, 0.97) 15.12px -1.584px 0px 0px,
                rgba(242, 242, 242, 0.933) 14.864px -3.168px 0px 0px,
                rgba(242, 242, 242, 0.9) 14.464px -4.704px 0px 0px,
                rgba(242, 242, 242, 0.867) 13.888px -6.176px 0px 0px,
                rgba(242, 242, 242, 0.83) 13.168px -7.6px 0px 0px,
                rgba(242, 242, 242, 0.8) 12.304px -8.928px 0px 0px,
                rgba(242, 242, 242, 0.77) 11.296px -10.176px 0px 0px,
                rgba(242, 242, 242, 0.733) 10.176px -11.296px 0px 0px,
                rgba(242, 242, 242, 0.7) 8.928px -12.304px 0px 0px,
                rgba(242, 242, 242, 0.667) 7.6px -13.168px 0px 0px,
                rgba(242, 242, 242, 0.63) 6.176px -13.888px 0px 0px,
                rgba(242, 242, 242, 0.6) 4.704px -14.464px 0px 0px,
                rgba(242, 242, 242, 0.57) 3.168px -14.864px 0px 0px,
                rgba(242, 242, 242, 0.533) 1.584px -15.12px 0px 0px,
                rgba(242, 242, 242, 0.5) 0px -15.2px 0px 0px,
                rgba(242, 242, 242, 0.467) -1.584px -15.12px 0px 0px,
                rgba(242, 242, 242, 0.43) -3.168px -14.864px 0px 0px,
                rgba(242, 242, 242, 0.4) -4.704px -14.464px 0px 0px,
                rgba(242, 242, 242, 0.37) -6.176px -13.888px 0px 0px,
                rgba(242, 242, 242, 0.333) -7.6px -13.168px 0px 0px,
                rgba(242, 242, 242, 0.3) -8.928px -12.304px 0px 0px,
                rgba(242, 242, 242, 0.267) -10.176px -11.296px 0px 0px,
                rgba(242, 242, 242, 0.23) -11.296px -10.176px 0px 0px,
                rgba(242, 242, 242, 0.2) -12.304px -8.928px 0px 0px,
                rgba(242, 242, 242, 0.17) -13.168px -7.6px 0px 0px,
                rgba(242, 242, 242, 0.133) -13.888px -6.176px 0px 0px,
                rgba(242, 242, 242, 0.1) -14.464px -4.704px 0px 0px,
                rgba(242, 242, 242, 0.067) -14.864px -3.168px 0px 0px,
                rgba(242, 242, 242, 0.03) -15.12px -1.584px 0px 0px,
                rgba(242, 242, 242, 0) -15.2px 0px 0px 0px !important;
        }

        /* Fix the container to remove bright horizontal line - applies to BOTH modes */
        .list__spinner,
        .account__list-spinner,
        .list__message {
            border-top: none !important;
            border-bottom: none !important;
        }

        /* Hide search field spinner - applies to BOTH modes */
        ._search__spinner {
            display: none !important;
        }

        /* ===== WALLET PAGE FIXES (Dark Mode Only) ===== */
        /* Fix wallet transaction header background */
        html[data-theme="dark"] .wallet-transactions__head {
            background-color: #585858 !important;
        }

        /* Ensure text is visible */
        html[data-theme="dark"] .wallet-transactions__header {
            color: #f2f2f2 !important;
        }

        /* ===== REDEEM PAGE FIXES (Dark Mode Only) ===== */
        /* Fixes checkbox background colors as well as the reCAPTCHA text color */
        html[data-theme="dark"] .select-products-text,
        html[data-theme="dark"] .captchaText .externalLink {
            color: #f2f2f2 !important;
        }

        html[data-theme="dark"] .captchaText {
            color: #a0a0a0 !important;
        }

        html[data-theme="dark"] .select-checkbox,
        html[data-theme="dark"] .select-products-checkbox {
            background-color: #f2f2f2 !important;
        }

        html[data-theme="dark"] .select-checkbox:focus,
        html[data-theme="dark"] .select-products-checkbox:focus {
            background-color: #f2f2f2 !important;
        }
    `;

    if (typeof GM_addStyle !== 'undefined') {
        GM_addStyle(cssRules);
    } else {
        const style = document.createElement('style');
        style.id = 'gog-dark-mode-enhancement-suite-fix';
        style.textContent = cssRules;

        if (document.head || document.documentElement) {
            (document.head || document.documentElement).appendChild(style);
        } else {
            document.addEventListener('DOMContentLoaded', () => {
                document.head.appendChild(style);
            });
        }
    }

    // ===== WISHLIST PAGE: UPGRADE IMAGES TO HIGHER RESOLUTION =====
    if (window.location.pathname.includes('/wishlist')) {

        function upgradeImages() {
            const images = document.querySelectorAll('.product-row__img');

            images.forEach(img => {
                const srcset = img.getAttribute('srcset') || img.getAttribute('ng-srcset');

                if (srcset && srcset.includes('_100.jpg')) {
                    const newSrcset = srcset
                        .replace(/_100\.jpg/g, '_196.jpg')
                        .replace(/_200\.jpg/g, '_392.jpg');

                    img.setAttribute('srcset', newSrcset);
                    img.setAttribute('ng-srcset', newSrcset);

                    const src = img.getAttribute('src');
                    if (src && src.includes('_100.jpg')) {
                        img.setAttribute('src', src.replace('_100.jpg', '_196.jpg'));
                    }
                }
            });
        }

        upgradeImages();

        const observer = new MutationObserver((mutations) => {
            let shouldUpgrade = false;

            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === 1) {
                        if (node.classList && node.classList.contains('product-row__img')) {
                            shouldUpgrade = true;
                        } else if (node.querySelector && node.querySelector('.product-row__img')) {
                            shouldUpgrade = true;
                        }
                    }
                });
            });

            if (shouldUpgrade) {
                upgradeImages();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    // ===== LIBRARY PAGE: DIRECT MANIPULATION AS BACKUP =====
    // Only apply in dark mode
    if (window.location.pathname.includes('/account') && !window.location.pathname.includes('/settings') && !window.location.pathname.includes('/wishlist')) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                // Check if dark mode is active
                if (document.documentElement.getAttribute('data-theme') === 'dark') {
                    const container = document.querySelector('.account__products.list--rows');
                    if (container) {
                        container.style.backgroundColor = '#404040';
                    }
                }
            }, 500);
        });
    }

    // ===== ACCOUNT PAGES: FIX MENU COLORS =====
    if (window.location.pathname.includes('/account')) {
        const style = document.createElement('style');
        style.textContent = `
            html[data-theme="dark"] nav.menu {
                --c-ui-primary: #303030 !important;
                --c-background: #1a1a1a !important;
            }

            html[data-theme="dark"] .menu-header.menu-account__user {
                background-color: #212121 !important;
            }
        `;
        document.head.appendChild(style);
    }

    // ===== BUG FIXES =====
    // Note: Text capitalization and URL cleaning work in ALL modes (actual bugs)
    // Icon color fix only applies in dark mode

    // Fix the hardcoded black fill in the dropdown-down icon (ONLY in dark mode)
    function fixDropdownIcon() {
        const symbol = document.querySelector('#icon-dropdown-down');
        if (symbol) {
            const path = symbol.querySelector('path');
            if (path) {
                // Check current theme
                const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';

                if (isDarkMode) {
                    path.setAttribute('fill', '#f2f2f2');
                } else {
                    // Restore original black color in light mode
                    path.setAttribute('fill', '#000000');
                }
            }
        }
    }

    // Fix library background (ONLY in dark mode)
    function fixLibraryBackground() {
        if (window.location.pathname.includes('/account') && !window.location.pathname.includes('/settings') && !window.location.pathname.includes('/wishlist')) {
            const container = document.querySelector('.account__products.list--rows');
            if (container) {
                const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';

                if (isDarkMode) {
                    container.style.backgroundColor = '#404040';
                } else {
                    // Remove our background override in light mode
                    container.style.backgroundColor = '';
                }
            }
        }
    }

    // Fix capitalization for "Orders History" and "orders in progress"
    function fixOrdersCapitalization() {
        const ordersHistoryText = document.querySelector('.orders-header__text');
        if (ordersHistoryText) {
            const textNodes = Array.from(ordersHistoryText.childNodes).filter(node =>
                node.nodeType === Node.TEXT_NODE
            );
            textNodes.forEach(node => {
                if (node.textContent.trim() === 'Orders History') {
                    node.textContent = node.textContent.replace('Orders History', 'Orders history');
                }
            });
        }

        const ordersInProgressLabel = document.querySelector('[hook-test="ordersHistoryInProgress"]');
        if (ordersInProgressLabel) {
            const textNodes = Array.from(ordersInProgressLabel.childNodes).filter(node =>
                node.nodeType === Node.TEXT_NODE
            );
            textNodes.forEach(node => {
                if (node.textContent.trim() === 'orders in progress') {
                    node.textContent = 'Orders in progress';
                }
            });
        }
    }

    // Run on load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            fixDropdownIcon();
            fixLibraryBackground();
            fixOrdersCapitalization();
        });
    } else {
        fixDropdownIcon();
        fixLibraryBackground();
        fixOrdersCapitalization();
    }

    setTimeout(() => {
        fixDropdownIcon();
        fixLibraryBackground();
        fixOrdersCapitalization();
    }, 1000);

    // Watch for theme changes on the html element
    const themeObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
                fixDropdownIcon();
                fixLibraryBackground();
            }
        });
    });

    // Observe the html element for data-theme attribute changes
    themeObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['data-theme']
    });

    // Watch for text content changes (dropdown opening, etc)
    const textObserver = new MutationObserver(() => {
        fixOrdersCapitalization();
    });

    if (document.body) {
        textObserver.observe(document.body, { childList: true, subtree: true });
    }

    // Fix the orders page URL hash duplication bug
    if (window.location.pathname.includes('/settings/orders')) {
        function cleanOrdersURL() {
            const hash = window.location.hash;
            if (hash.includes('!%2F')) {
                const cleanMatch = hash.match(/#!#%2F(.+)$/);
                if (cleanMatch) {
                    let searchTerm = cleanMatch[1];
                    searchTerm = searchTerm.replace(/(!%2F|!%2F2F)+/g, '');

                    if (searchTerm) {
                        const cleanHash = `#!#%2F${searchTerm}`;
                        window.history.replaceState(null, '', window.location.pathname + cleanHash);

                        const searchInput = document.querySelector('.orders-header__search-input');
                        if (searchInput && searchInput.value.includes('!%2F')) {
                            searchInput.value = decodeURIComponent(searchTerm);
                            const event = new Event('input', { bubbles: true });
                            searchInput.dispatchEvent(event);
                        }
                    }
                }
            }
        }

        cleanOrdersURL();
        setTimeout(cleanOrdersURL, 500);
        setTimeout(cleanOrdersURL, 1500);
    }
})();
