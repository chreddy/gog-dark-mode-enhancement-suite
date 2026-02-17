# Changelog

All notable changes to the GOG Dark Mode Enhancement Suite will be documented in this file.

## Version 1.3 (2026-02-17)
Since version 1.2, GOG made some changes to the dark mode. This means that some stuff broke, while other code is no longer needed. Changes:
- Friends page: Improved the "Invite new friend" modal
- Library page: Fixed background color and hover for filter menus, as well as the sort and view menus
- Orders page: Fixed URL hash duplication bug once again, as the pattern changed from !%2F to %2F%2F
- Wishlist page: Fixed colors to make it appear more in line with the collection
- Wishlist page: Public wishlists now looks similar UI-wise to the account-specific wishlist
- Settings page: Fixed separator lines for navigation items, settings items etc., as well as hover color on the menu
- Code optimization: Consolidated and removed redundant CSS and JavaScript, which was mostly due to GOG changing things at their end

## Version 1.2 (2025-10-31)
- System theme support: Dark mode fixes now work when "System mode" is selected
- Account menu: Fixed theme selector layout when switching modes
- Wishlist page: Fixed background colors on dropdown
- Wallet page: Fixed transaction separator lines in dark mode
- Code optimization: Consolidated and removed redundant CSS and JavaScript

## Version 1.1 (2025-10-26)
- Account menu: Cloud saves link added for quick access
- Account menu: Fixed alignment of item count labels (Library, Movies, Wishlist numbers)
- User pages: Fixed broken profile links (View Profile and username links now points correctly to the userpage)
- User pages: Applied account menu color fixes to user wishlist pages
- Code organization: Reorganized sections and enhanced comments for better maintainability and readability
- Removed redundant JavaScript

## Version 1.0.1 (2025-10-18)
- Redeem page: Fixed colors in dark mode
- Account menu: Fixed the menu colors in dark mode
- Fixed: Store link now uses relative URL for consistent navigation

## Version 1.0 (2025-10-17)
- Initial release with general dark mode color enhancements (dropdown menus, input fields, checkboxes, radio buttons, background colors and borders)
- Library page: Fixed the separator line between games, so it now shows up at all zoom levels, and in both dark and light mode
- Orders page: Fixed text capitalization in filter dropdown options
- Orders page: Fixed layout of search-field
- Orders page: Fixed URL hash duplication bug preventing search results after reload
- Wallet page: Fixed colors on the transactions header
- Wishlist page: Upgraded product images to double resolution (196px, 392px for retina displays)
