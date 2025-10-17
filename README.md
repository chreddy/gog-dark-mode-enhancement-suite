# gog-dark-mode-enhancement-suite

GOG Dark Mode Enhancement Suite
A comprehensive Tampermonkey userscript that fixes visual bugs and enhances the dark mode experience on GOG.com.

##What It Fixes
###Dark Mode Enhancements
Library Page: Fixes bright separator lines between games that were visible in dark mode, now shows proper dark separators that work at all zoom levels (including 90%)
Settings Pages: Fixes dropdown menus, input fields, checkboxes, and radio buttons to have proper dark backgrounds and visible text
Wallet Page: Adjusts transaction header background color to match the dark theme
Download Popups: Changes the dropdown arrow from black to white for better visibility

###Light Mode Fixes
Library Page: Ensures separator lines display consistently between games at all zoom levels (fixes the same zoom rendering issue that existed in dark mode)

###Quality of Life Improvements
Wishlist: Upgrades game cover images from 100px to 196px resolution (392px for retina displays)
Wishlist Dropdown: Preserves original styling for the "who can view" dropdown

###General Bug Fixes (Work in Both Modes)
Orders Page: Fixes URL hash duplication bug where search terms would accumulate !%2F prefixes on each reload
Orders Page: Properly aligns "Orders history" text and search field at the same height

###Installation
Open this link, after you've installed Tampermonkey: https://github.com/chreddy/gog-dark-mode-enhancement-suite/blob/main/ultimate.user.js
