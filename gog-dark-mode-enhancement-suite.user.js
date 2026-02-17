// ==UserScript==
// @name         GOG Dark Mode Enhancement Suite
// @namespace    gog-dark-mode-enhancement-suite
// @version      1.3
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

        /* Fix border color on filter section */
        html[data-theme="dark"] .filters__section ~ .filters__section > .filter,
        html[data-system-theme="dark"] .filters__section ~ .filters__section > .filter {
            border-color: #404040 !important;
        }

        html[data-theme="dark"] .filter__items._dropdown__items.js-not-toggle,
        html[data-theme="dark"] .filter__items._dropdown__items.js-not-toggle ._dropdown__item,
        html[data-system-theme="dark"] .filter__items._dropdown__items.js-not-toggle,
        html[data-system-theme="dark"] .filter__items._dropdown__items.js-not-toggle ._dropdown__item {
            background-color: #303030 !important;
        }

        html[data-theme="dark"] .filter__items._dropdown__items.js-not-toggle ._dropdown__item:hover,
        html[data-system-theme="dark"] .filter__items._dropdown__items.js-not-toggle ._dropdown__item:hover {
            background-color: #3d3d3d !important;
        }

        html[data-theme="dark"] .filter__items._dropdown__items.js-not-toggle .pagin,
        html[data-theme="dark"] .filter__items._dropdown__items.js-not-toggle ._fake_dropdown__item,
        html[data-system-theme="dark"] .filter__items._dropdown__items.js-not-toggle .pagin,
        html[data-system-theme="dark"] .filter__items._dropdown__items.js-not-toggle ._fake_dropdown__item {
            background-color: #303030 !important;
        }

        /* Fixes background color for "Sort by" and "View as" menus */
        html[data-theme="dark"] .module-header-dd__items,
        html[data-theme="dark"] .module-header-dd__items ._dropdown__item,
        html[data-system-theme="dark"] .module-header-dd__items,
        html[data-system-theme="dark"] .module-header-dd__items ._dropdown__item,
        html[data-theme="dark"] .header-dropdown__items._dropdown__items > ._dropdown__item {
            background-color: #303030 !important;
        }

        html[data-theme="dark"] .module-header-dd__items ._dropdown__item:hover,
        html[data-system-theme="dark"] .module-header-dd__items ._dropdown__item:hover,
        html[data-theme="dark"] .header-dropdown__items._dropdown__items > ._dropdown__item:hover {
            background-color: #3d3d3d !important;
        }


        /* ===== GENERAL SETTINGS PAGE FIXES (Dark Mode Only) ===== */
        /* Fix dropdowns */
        html[data-theme="dark"] select,
        html[data-theme="dark"] select option,
        html[data-theme="dark"] .form__select,
        html[data-theme="dark"] .form__select option,
        html[data-system-theme="dark"] select,
        html[data-system-theme="dark"] select option,
        html[data-system-theme="dark"] .form__select,
        html[data-system-theme="dark"] .form__select option {
            background-color: #3d3d3d !important;
            color: #f2f2f2 !important;
            padding-left: 8px !important;
        }

        html[data-theme="dark"] .input--big,
        html[data-system-theme="dark"] .input--big {
            background-color: #3d3d3d !important;
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

        /* Search inputs need to keep their transparent background */
        ._search__input {
            background: transparent !important;
        }


        /* ===== SETTINGS NAV MENU ===== */
        /* Separator lines (dark mode) ===== */
        html[data-theme="dark"] .settings__nav-item,
        html[data-system-theme="dark"] .settings__nav-item,
        html[data-theme="dark"] .settings__nav-link,
        html[data-system-theme="dark"] .settings__nav-link {
            border-color: #404040 !important;
        }

        /* Hover color */
        html[data-theme="dark"] .settings__nav-link:hover,
        html[data-system-theme="dark"] .settings__nav-link:hover {
            background-color: #404040 !important;
        }

        /* ===== SETTINGS PAGES: FIX SEPARATOR LINES (Dark Mode Only) ===== */
        html[data-theme="dark"] .settings-item__section,
        html[data-system-theme="dark"] .settings-item__section {
            border-bottom-color: #404040 !important;
        }

        html[data-theme="dark"] .settings-list,
        html[data-system-theme="dark"] .settings-list {
            border-color: #404040 !important;
        }

        html[data-theme="dark"] .subscriptions-list,
        html[data-system-theme="dark"] .subscriptions-list {
            border-top-color: #404040 !important;
        }

        html[data-theme="dark"] .subscriptions-list__item,
        html[data-system-theme="dark"] .subscriptions-list__item {
            border-bottom-color: #404040 !important;
        }

        /* Remove double borders between subscription sections (all modes) */
        .subscriptions-list + .subscriptions-list {
            border-top: none !important;
        }


        /* ===== ORDERS PAGE FIXES ===== */
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


        /* ===== TAGS PAGE ===== */
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

        html[data-theme="dark"] .tag-input__inside-options,
        html[data-system-theme="dark"] .tag-input__inside-options {
            background-color: transparent !important;
        }


        /* ===== WALLET PAGE FIXES (Dark Mode Only) ===== */
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


        /* ===== FRIENDS PAGE: INVITE MODAL (Dark Mode) ===== */
        html[data-theme="dark"] ._modal,
        html[data-system-theme="dark"] ._modal {
            background-color: #2a2a2a !important;
        }

        /* Header text */
        html[data-theme="dark"] ._modal .module-header2__element,
        html[data-system-theme="dark"] ._modal .module-header2__element {
            color: #f2f2f2 !important;
        }

        /* Body text */
        html[data-theme="dark"] ._modal .invite-text,
        html[data-system-theme="dark"] ._modal .invite-text {
            color: #888888 !important;
        }

        /* Search input */
        html[data-theme="dark"] ._modal ._search__input,
        html[data-system-theme="dark"] ._modal ._search__input {
            background-color: #3d3d3d !important;
            padding-left: 2.5em !important;
        }

        html[data-theme="dark"] ._modal .invite-search__icon,
        html[data-system-theme="dark"] ._modal .invite-search__icon {
            color: #f2f2f2 !important;
            z-index: 1 !important;
        }

        ._modal .invite-result {
            border: none !important;
        }

html[data-theme="dark"] .user-rectangle__items ._dropdown__item:hover,
html[data-theme="dark"] .user-rectangle__items a._dropdown__item:hover,
html[data-system-theme="dark"] .user-rectangle__items ._dropdown__item:hover,
html[data-system-theme="dark"] .user-rectangle__items a._dropdown__item:hover {
    background-color: #3d3d3d !important;
    color: #ffffff !important;
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
    /*if (window.location.pathname.includes('/account') ||
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
    }*/

    // ===== USER PAGES: FIX MENU COLORS =====
    /*if (window.location.pathname.includes('/u/')) {
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
    }*/

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

    // ===== WISHLIST PAGE: Product row background color (dark mode only) =====
    if (window.location.pathname.includes('/account/wishlist')) {
        const style = document.createElement('style');
        style.textContent = `
            html[data-theme="dark"] .product-row-wrapper,
            html[data-system-theme="dark"] .product-row-wrapper {
                background-color: #303030 !important;
            }
            html[data-theme="light"] .product-row-wrapper,
            html[data-system-theme="light"] .product-row-wrapper {
                background-color: #e9e9e9 !important;
            }
        `;
        document.head.appendChild(style);
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

    // ===== WISHLIST PAGES: VARIOIUS FIXES ON PUBLIC WISHLISTS =====
    if (window.location.pathname.includes('/u/') && window.location.pathname.includes('/wishlist')) {
        function fixWishlistProductBackgrounds() {
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark' ||
                          document.documentElement.getAttribute('data-system-theme') === 'dark';

            // Fix product backgrounds
            document.querySelectorAll('.product-state-holder').forEach(el => {
                el.style.setProperty('background', isDark ? '#303030' : '#e9e9e9', 'important');
                el.addEventListener('mouseenter', () => {
                    el.style.setProperty('background', isDark ? '#3d3d3d' : '#f2f2f2', 'important');
                });
                el.addEventListener('mouseleave', () => {
                    el.style.setProperty('background', isDark ? '#303030' : '#e9e9e9', 'important');
                });
            });

            // Fix owned game opacity
            document.querySelectorAll('.product-row.is-owned .price-btn').forEach(el => {
                el.style.setProperty('opacity', '1', 'important');
            });

            // Fix owned text color
            document.querySelectorAll('.price-btn__text--owned').forEach(el => {
                el.style.setProperty('color', isDark ? '#f2f2f2' : '', 'important');
                el.style.setProperty('opacity', '1', 'important');
            });

            // Fix search input background
            document.querySelectorAll('._search__input').forEach(el => {
                el.style.setProperty('background', 'transparent', 'important');
            });

            if (isDark) {
                // Fix filter section borders
                document.querySelectorAll('.filters__section ~ .filters__section > .filter').forEach(el => {
                    el.style.setProperty('border-color', '#404040', 'important');
                });

                // Fix filter dropdown backgrounds
                document.querySelectorAll('.filter__items._dropdown__items.js-not-toggle').forEach(el => {
                    el.style.setProperty('background-color', '#303030', 'important');
                });

                // Fix filter dropdown items
                document.querySelectorAll('.filter__items._dropdown__items.js-not-toggle ._dropdown__item').forEach(el => {
                    el.style.setProperty('background-color', '#303030', 'important');
                    el.addEventListener('mouseenter', () => {
                        el.style.setProperty('background-color', '#3d3d3d', 'important');
                    });
                    el.addEventListener('mouseleave', () => {
                        el.style.setProperty('background-color', '#303030', 'important');
                    });
                });

                // Fix pagination and fake dropdown items
                document.querySelectorAll('.filter__items._dropdown__items.js-not-toggle .pagin, .filter__items._dropdown__items.js-not-toggle ._fake_dropdown__item').forEach(el => {
                    el.style.setProperty('background-color', '#303030', 'important');
                });

                // Fix sort/view dropdown backgrounds
                document.querySelectorAll('.module-header-dd__items, .module-header-dd__items ._dropdown__item, .header-dropdown__items._dropdown__items > ._dropdown__item').forEach(el => {
                    el.style.setProperty('background-color', '#303030', 'important');
                    el.addEventListener('mouseenter', () => {
                        el.style.setProperty('background-color', '#3d3d3d', 'important');
                    });
                    el.addEventListener('mouseleave', () => {
                        el.style.setProperty('background-color', '#303030', 'important');
                    });
                });
            }
        }

        fixWishlistProductBackgrounds();
        setTimeout(fixWishlistProductBackgrounds, 500);

        const observer = new MutationObserver(fixWishlistProductBackgrounds);
        if (document.body) {
            observer.observe(document.body, { childList: true, subtree: true });
        }

        const themeObserver = new MutationObserver(fixWishlistProductBackgrounds);
        themeObserver.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['data-theme', 'data-system-theme']
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
            if (hash.includes('%2F%2F')) {
                const cleanMatch = hash.match(/#!#%2F(.+)$/);
                if (cleanMatch) {
                    let searchTerm = cleanMatch[1];
                    searchTerm = searchTerm.replace(/^(%2F)+/i, '');

					if (searchTerm) {
                        const cleanHash = `#!#%2F${searchTerm}`;
                        window.history.replaceState(null, '', window.location.pathname + cleanHash);

                        const searchInput = document.querySelector('.orders-header__search-input');
                        if (searchInput && searchInput.value.includes('%2F')) {
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
            fixOrdersCapitalization();
            addCloudSavesLink();
        });
    } else {
        fixOrdersCapitalization();
        addCloudSavesLink();
    }

    setTimeout(() => {
        fixOrdersCapitalization();
        addCloudSavesLink();
    }, 1000);

    // Watch for text content changes (dropdown opening, etc)
    const textObserver = new MutationObserver(() => {
        fixOrdersCapitalization();
    });

    if (document.body) {
        textObserver.observe(document.body, { childList: true, subtree: true });
    }
})();
