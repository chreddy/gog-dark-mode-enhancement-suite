// ==UserScript==
// @name         GOG Dark Mode Enhancement Suite
// @namespace    gog-dark-mode-enhancement-suite
// @version      1.2
// @description  Enhances GOG.com dark mode with styling fixes, bug fixes, and UI improvements
// @author       chreddy
// @match        https://www.gog.com/*
// @updateURL    https://github.com/chreddy/gog-dark-mode-enhancement-suite/raw/refs/heads/main/gog-dark-mode-enhancement-suite.user.js
// @downloadURL  https://github.com/chreddy/gog-dark-mode-enhancement-suite/raw/refs/heads/main/gog-dark-mode-enhancement-suite.user.js
// @grant        GM_addStyle
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    console.log('GOG Dark Mode Enhancement Suite: Script loaded');

    const cssRules = `
        /* ===== LIBRARY PAGE FIXES (BOTH MODES) ===== */
        /* LIST VIEW: Remove borders and margins, then add consistent separators */
        .list--rows .product-row,
        .list--rows .product-row-wrapper {
            border: none !important;
            margin: 0 !important;
        }

        /* LIST VIEW: Add border only between product wrappers */
        html[data-theme="dark"] .list--rows .product-row-wrapper + .product-row-wrapper,
        html[data-system-theme="dark"] .list--rows .product-row-wrapper + .product-row-wrapper {
            border-top: 1px solid #404040 !important;
        }
        html:not([data-theme="dark"]):not([data-system-theme="dark"]) .list--rows .product-row-wrapper + .product-row-wrapper {
            border-top: 1px solid #cfcfcf !important;
        }

        /* ===== LIBRARY PAGE FIXES (DARK MODE ONLY) ===== */
        /* Fix carousel arrow backgrounds in dark mode */
        html[data-theme="dark"] ._cs-wrapper ._cs-left,
        html[data-theme="dark"] ._cs-wrapper ._cs-right,
        html[data-system-theme="dark"] ._cs-wrapper ._cs-left,
        html[data-system-theme="dark"] ._cs-wrapper ._cs-right {
            background-color: #212121 !important;
        }

        /* ===== SETTINGS PAGE FIXES (Dark Mode Only) ===== */
        /* Fix dropdown options visibility */
        html[data-theme="dark"] select,
        html[data-theme="dark"] select option,
        html[data-theme="dark"] .form__select,
        html[data-theme="dark"] .form__select option,
        html[data-theme="dark"] ._dropdown__item,
        html[data-theme="dark"] ._dropdown__items,
        html[data-theme="dark"] ._dropdown__items ._dropdown__item,
        html[data-theme="dark"] [class*="dropdown"] [class*="option"],
        html[data-theme="dark"] [class*="select"] [class*="option"],
        html[data-system-theme="dark"] select,
        html[data-system-theme="dark"] select option,
        html[data-system-theme="dark"] .form__select,
        html[data-system-theme="dark"] .form__select option,
        html[data-system-theme="dark"] ._dropdown__item,
        html[data-system-theme="dark"] ._dropdown__items,
        html[data-system-theme="dark"] ._dropdown__items ._dropdown__item,
        html[data-system-theme="dark"] [class*="dropdown"] [class*="option"],
        html[data-system-theme="dark"] [class*="select"] [class*="option"] {
            background-color: #3d3d3d !important;
            color: #f2f2f2 !important;
        }

        /* EXCEPT: Don't apply to wishlist dropdown and current text */
        /* The wishlist sharing dropdown should keep its original styling */
        html[data-theme="dark"] .wishlist-options__dropdown ._dropdown__item,
        html[data-theme="dark"] .wishlist-options__dropdown ._dropdown__items ._dropdown__item,
        html[data-theme="dark"] .wishlist-options__current,
        html[data-theme="dark"] span.wishlist-options__current,
        html[data-system-theme="dark"] .wishlist-options__dropdown ._dropdown__item,
        html[data-system-theme="dark"] .wishlist-options__dropdown ._dropdown__items ._dropdown__item,
        html[data-system-theme="dark"] .wishlist-options__current,
        html[data-system-theme="dark"] span.wishlist-options__current {

            background-color: transparent !important;
            color: inherit !important;
        }

        /* More specific override for wishlist current text */
        html[data-theme="dark"] .wishlist-options__dropdown .wishlist-options__current,
        html[data-theme="dark"] ._dropdown.wishlist-options__dropdown .wishlist-options__current,
        html[data-system-theme="dark"] .wishlist-options__dropdown .wishlist-options__current,
        html[data-system-theme="dark"] ._dropdown.wishlist-options__dropdown .wishlist-options__current {
            background-color: transparent !important;
        }

        /* Hover state */
        html[data-theme="dark"] select option:hover,
        html[data-theme="dark"] .form__select option:hover,
        html[data-theme="dark"] ._dropdown__item:hover,
        html[data-system-theme="dark"] select option:hover,
        html[data-system-theme="dark"] .form__select option:hover,
        html[data-system-theme="dark"] ._dropdown__item:hover {
            background-color: #404040 !important;
            color: #ffffff !important;
        }

        html[data-theme="dark"] [class*="dropdown"] [class*="option"]:hover,
        html[data-theme="dark"] [class*="select"] [class*="option"]:hover,
        html[data-system-theme="dark"] [class*="dropdown"] [class*="option"]:hover,
        html[data-system-theme="dark"] [class*="select"] [class*="option"]:hover {
            background-color: #404040 !important;
        }

        /* EXCEPT: Don't apply to wishlist options */
        html[data-theme="dark"] .wishlist-options [class*="option"]:hover,
        html[data-system-theme="dark"] .wishlist-options [class*="option"]:hover,
        html[data-theme="dark"] [class*="wishlist"] [class*="option"]:hover,
        html[data-system-theme="dark"] [class*="wishlist"] [class*="option"]:hover {
            background-color: transparent !important;
            color: inherit !important;
        }

        /* Fix input fields - make text visible */
        html[data-theme="dark"] input[type="text"],
        html[data-theme="dark"] input[type="email"],
        html[data-theme="dark"] input[type="password"],
        html[data-theme="dark"] textarea,
        html[data-theme="dark"] .tag-input-wrapper__input,
        html[data-system-theme="dark"] input[type="text"],
        html[data-system-theme="dark"] input[type="email"],
        html[data-system-theme="dark"] input[type="password"],
        html[data-system-theme="dark"] textarea,
        html[data-system-theme="dark"] .tag-input-wrapper__input {
            background-color: #3d3d3d !important;
            color: #f2f2f2 !important;
        }

        /* IMPORTANT: Completely exclude search inputs from all overrides */
        /* Search inputs need to keep their transparent background and inherit styles from parent */
        html[data-theme="dark"] ._search input,
        html[data-theme="dark"] ._search__input,
        html[data-theme="dark"] ._search ._search__input,
        html[data-theme="dark"] .orders-header__search input,
        html[data-theme="dark"] .orders-header__search-input,
        html[data-system-theme="dark"] ._search input,
        html[data-system-theme="dark"] ._search__input,
        html[data-system-theme="dark"] ._search ._search__input,
        html[data-system-theme="dark"] .orders-header__search input,
        html[data-system-theme="dark"] .orders-header__search-input {
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
        html[data-theme="dark"] input.form__input,
        html[data-system-theme="dark"] input[type="text"]:not(._search__input):not(._search input),
        html[data-system-theme="dark"] input[type="search"],
        html[data-system-theme="dark"] .form__input,
        html[data-system-theme="dark"] input.form__input {
            border-radius: 3px !important;
        }

        /* Keep placeholder text visible but slightly dimmed */
        html[data-theme="dark"] input::placeholder,
        html[data-theme="dark"] textarea::placeholder,
        html[data-system-theme="dark"] input::placeholder,
        html[data-system-theme="dark"] textarea::placeholder {
            color: #888888 !important;
            opacity: 1 !important;
        }

        /* Input focus state */
        html[data-theme="dark"] input:focus,
        html[data-theme="dark"] textarea:focus,
        html[data-system-theme="dark"] input:focus,
        html[data-system-theme="dark"] textarea:focus {
            background-color: #333333 !important;
            color: #ffffff !important;
        }

        /* Fix tag input wrapper and inside options (cancel button area) */
        html[data-theme="dark"] .tag-input-wrapper,
        html[data-theme="dark"] .tag-input__inside-options,
        html[data-system-theme="dark"] .tag-input-wrapper,
        html[data-system-theme="dark"] .tag-input__inside-options {
            background-color: #3d3d3d !important;
        }

        html[data-theme="dark"] .tag-item .tag-input__inside-options
        html[data-system-theme="dark"] .tag-item .tag-input__inside-options {
            background-color: transparent !important;
        }

        /* Cancel button styling */
        html[data-theme="dark"] .tag-input__option,
        html[data-theme="dark"] a.tag-input__option,
        html[data-system-theme="dark"] .tag-input__option,
        html[data-system-theme="dark"] a.tag-input__option {
            background-color: transparent !important;
            color: #f2f2f2 !important;
        }

        html[data-theme="dark"] .tag-input__option:hover,
        html[data-theme="dark"] a.tag-input__option:hover,
        html[data-system-theme="dark"] .tag-input__option:hover,
        html[data-system-theme="dark"] a.tag-input__option:hover {
            color: #ffffff !important;
        }

        /* Fix checkboxes and radio buttons in dark mode */
        html[data-theme="dark"] .checkbox,
        html[data-theme="dark"] .radio,
        html[data-theme="dark"] .dropdown-input.checkbox,
        html[data-system-theme="dark"] .checkbox,
        html[data-system-theme="dark"] .radio,
        html[data-system-theme="dark"] .dropdown-input.checkbox {
            background: #3d3d3d !important;
            border: 1px solid #6a6a6a !important;
            box-shadow: inset 0 1px 3px rgba(0,0,0,.3) !important;
        }

        /* Make checkmark visible when checked */
        html[data-theme="dark"] .checkbox::before,
        html[data-theme="dark"] .dropdown-input.checkbox::before,
        html[data-system-theme="dark"] .checkbox::before,
        html[data-system-theme="dark"] .dropdown-input.checkbox::before {
            color: #f2f2f2 !important;
        }

        /* Fix loading spinner visibility on orders page */
        /* The spinner uses box-shadow to create the visual, not borders */
        /* Using all 40 shadow positions to match the smooth appearance of light mode */
        html[data-theme="dark"] .list__spinner-in,
        html[data-theme="dark"] .account__list-spinner-in,
        html[data-system-theme="dark"] .list__spinner-in,
        html[data-system-theme="dark"] .account__list-spinner-in {
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
        html[data-theme="dark"] .wallet-transactions__head,
        html[data-system-theme="dark"] .wallet-transactions__head {
            background-color: #303030 !important;
        }

        /* Remove default borders and margins */
        html[data-theme="dark"] .wallet-transactions__item,
        html[data-system-theme="dark"] .wallet-transactions__item {
            border: none !important;
            margin: 0 !important;
        }

        /* Add border only between transaction items */
        html[data-theme="dark"] .wallet-transactions__item + .wallet-transactions__item,
        html[data-system-theme="dark"] .wallet-transactions__item + .wallet-transactions__item {
            border-top: 1px solid #404040 !important;
        }

        /* ===== REDEEM PAGE FIXES (Dark Mode Only) ===== */
        /* Fixes checkbox background colors as well as the reCAPTCHA text color */
        html[data-theme="dark"] .select-products-text,
        html[data-theme="dark"] .captchaText .externalLink,
        html[data-system-theme="dark"] .select-products-text,
        html[data-system-theme="dark"] .captchaText .externalLink {
            color: #f2f2f2 !important;
        }

        html[data-theme="dark"] .captchaText,
        html[data-system-theme="dark"] .captchaText {
            color: #a0a0a0 !important;
        }

        html[data-theme="dark"] .select-checkbox,
        html[data-theme="dark"] .select-checkbox:focus,
        html[data-theme="dark"] .select-products-checkbox,
        html[data-theme="dark"] .select-products-checkbox:focus,
        html[data-system-theme="dark"] .select-checkbox,
        html[data-system-theme="dark"] .select-checkbox:focus,
        html[data-system-theme="dark"] .select-products-checkbox,
        html[data-system-theme="dark"] .select-products-checkbox:focus {
            background-color: #f2f2f2 !important;
        }
    `;

    // Only apply CSS on specific pages
    if (window.location.pathname.includes('/account') || window.location.pathname.includes('/redeem') || window.location.pathname.includes('/wallet')) {
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
    }

    // ===== SYSTEM THEME DETECTION =====
    // Add a class to help CSS target system theme preference
    function updateSystemTheme() {
        const html = document.documentElement;
        const hasThemeAttr = html.hasAttribute('data-theme');

        if (!hasThemeAttr) {
            // System mode is active - detect preference
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            html.setAttribute('data-system-theme', prefersDark ? 'dark' : 'light');
        } else {
            // Manual theme selected - remove system theme attribute
            html.removeAttribute('data-system-theme');
        }
    }

    // Run on load
    updateSystemTheme();

    // Watch for theme changes
    const systemThemeObserver = new MutationObserver(updateSystemTheme);
    systemThemeObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['data-theme']
    });

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateSystemTheme);

    // ===== ACCOUNT MENU: ADD CLOUD SAVES LINK =====
    function addCloudSavesLink() {
        if (document.querySelector('a[href="/account/cloud-saves"]')) {
            return;
        }

        const redeemLink = document.querySelector('a[href="/en/redeem"]');
        if (redeemLink) {
            const redeemItem = redeemLink.closest('.menu-submenu-item');
            const cloudSavesItem = document.createElement('div');
            cloudSavesItem.className = 'menu-submenu-item menu-submenu-item--hover';
            cloudSavesItem.innerHTML = `
                <a href="/account/cloud-saves" class="menu-submenu-link">
                    Cloud saves
                </a>
            `;

            redeemItem.parentNode.insertBefore(cloudSavesItem, redeemItem);
        }
    }

    // ===== ACCOUNT MENU: FIX ALIGNMENT AND THEME SELECTOR =====
    const style = document.createElement('style');
    style.textContent = `
        .menu-submenu-item__label {
            display: inline-block !important;
            vertical-align: middle !important;
            margin-top: -2px !important;
        }

        /* Fix theme selector layout - make icon not affect layout */
        .menu-submenu-item__active-theme-icon {
            position: absolute !important;
            right: 4px !important;
            top: 50% !important;
            transform: translateY(-50%) !important;
            width: 16px !important;
            height: 16px !important;
        }
    `;
    document.head.appendChild(style);

    // ===== ACCOUNT MENU: FIX MENU COLORS (select pages only) =====
    if (window.location.pathname.includes('/account') ||
        window.location.pathname.includes('/wallet') ||
        (window.location.pathname.includes('/u/') && !window.location.pathname.match(/\/u\/[^\/]+\/?$/))) {
        const style = document.createElement('style');
        style.textContent = `
            html[data-theme="dark"] nav.menu,
            html[data-system-theme="dark"] nav.menu {
                --c-ui-primary: #303030 !important;
                --c-background: #1a1a1a !important;
            }

            html[data-theme="dark"] .menu-header.menu-account__user,
            html[data-system-theme="dark"] .menu-header.menu-account__user {
                background-color: #212121 !important;
            }
        `;
        document.head.appendChild(style);
    }

    // ===== LIBRARY PAGE: OFFLINE INSTALLER ICON FIX =====
    // Fix the hardcoded black fill in the dropdown icon
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

    // ===== USER PAGES: FIX MENU COLORS =====
    if (window.location.pathname.includes('/u/')) {
        const style = document.createElement('style');
        style.textContent = `
            html[data-theme="dark"] .user__data.user__data--with-orion-project-link,
            html[data-system-theme="dark"] .user__data.user__data--with-orion-project-link {
                border-color: var(--c-ui-tertiary) !important;
                background: var(--c-ui-primary) !important;
            }
            html[data-theme="dark"] .user__item.user__item:not(.user__item--header),
            html[data-system-theme="dark"] .user__item.user__item:not(.user__item--header) {
                border-top: 1px solid #404040;
                background: var(--c-ui-primary) !important;
            }
        `;
        document.head.appendChild(style);
    }

    // ===== WISHLIST PAGE: FIX SAVE STATUS BACKGROUND =====
    if (window.location.pathname.includes('/wishlist')) {
        function fixWishlistBackground() {
            const saveStatuses = document.querySelector('.wishlist-options__save-statuses');
            const saved = document.querySelector('.wishlist-options__saved');

            if (saveStatuses) {
                saveStatuses.style.setProperty('background-color', 'transparent', 'important');
            }
            if (saved) {
                saved.style.setProperty('background-color', 'transparent', 'important');
            }
        }

        // Run immediately and after delay
        fixWishlistBackground();

        // Watch for the dropdown being interacted with
        const observer = new MutationObserver(fixWishlistBackground);
        if (document.body) {
            observer.observe(document.body, {
                attributes: true,
                attributeFilter: ['class'],
                subtree: true
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

    // ===== BUG FIXES =====
    // ===== ORDERS PAGE: FIX CAPITALIZATION (all modes) =====
    function fixOrdersCapitalization() {
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

    // ===== ORDERS PAGE: URL SEARCH (all modes) =====
    // Fix URL hash duplication bug that prevents search results from displaying after page reload
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

    // ===== USER PAGES: FIX BROKEN PROFILE LINKS =====
    if (window.location.pathname.includes('/u/')) {
        const usernameMatch = window.location.pathname.match(/\/u\/([^\/]+)/);
        if (usernameMatch) {
            const username = usernameMatch[1];
            const correctProfileUrl = `https://www.gog.com/u/${username}`;

            document.addEventListener('mouseover', function(e) {
                const link = e.target.closest('a');
                if (link && link.href === 'https://www.gog.com/u/' && !link.dataset.fixed) {
                    link.setAttribute('href', correctProfileUrl);
                    link.href = correctProfileUrl;
                    link.dataset.fixed = 'true';
                }
            }, true);
        }
    }

    // ===== INITIALIZATION: RUN FIXES ON LOAD =====
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            fixDropdownIcon();
            fixOrdersCapitalization();
            addCloudSavesLink();
        });
    } else {
        fixDropdownIcon();
        fixOrdersCapitalization();
        addCloudSavesLink();
    }

    setTimeout(() => {
        fixDropdownIcon();
        fixOrdersCapitalization();
        addCloudSavesLink();
    }, 1000);

    // Watch for theme changes on the html element
    const themeObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
                fixDropdownIcon();
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
})();
