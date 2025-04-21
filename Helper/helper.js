/**
 * Helper Utility Class
 * @module Helper
 * 
 * This module provides reusable utility methods used across the automation test suite,
 * such as permission handling, touch actions, swiping gestures, and login flows for different departments.
 */

const permissionModal = require('../PageObjects/permissionModal');
const login = require("../PageObjects/login");
const department = require("../PageObjects/department");

class Helper {
    /**
     * Grants necessary permissions by interacting with permission prompts.
     * Waits explicitly for the permission modal and message collapse elements.
     * 
     * @static
     * @returns {Promise<void>}
     */
    static async givePermission() {
        await $(permissionModal.picturesRecordVideo).waitForDisplayed({ timeout: 5000 });
        await $(permissionModal.picturesRecordVideo).click();

        await $(permissionModal.deviceLocation).waitForDisplayed({ timeout: 5000 });
        await $(permissionModal.deviceLocation).click();

        await $(permissionModal.managePhoneCalls).waitForDisplayed({ timeout: 5000 });
        await $(permissionModal.managePhoneCalls).click();

        await $(permissionModal.photosMedia).waitForDisplayed({ timeout: 5000 });
        await $(permissionModal.photosMedia).click();

        await $(permissionModal.sms).waitForDisplayed({ timeout: 5000 });
        await $(permissionModal.sms).click();

        await $(permissionModal.messageCollapse).waitForDisplayed({ timeout: 10000 });
        await $(permissionModal.messageCollapse).click();
    }

    /**
     * Taps at the given screen coordinates.
     * 
     * @static
     * @async
     * @param {Object} loc - Tap location with `{ x, y }` properties.
     * @returns {Promise<void>}
     */
    static async tap(loc) {
        await driver.touchPerform([{
            action: 'tap',
            options: loc,
        }]);
    }

    /**
     * Continuously swipes up until the specified element is found on screen.
     * 
     * @static
     * @async
     * @param {string} element - Selector of the element to find.
     * @returns {Promise<void>}
     */
    static async swipeTillElementVisible(element) {
        let isVisible = await $(element).isExisting();
        while (!isVisible) {
            this.swipeUp();
            isVisible = await $(element).isExisting();
        }
    }

    /**
     * Performs a swipe-up gesture from the specified start point to the end point.
     * 
     * @static
     * @param {Object} [start={ x: 100, y: 800 }] - Starting coordinates.
     * @param {Object} [end={ x: 100, y: 100 }] - Ending coordinates.
     * @param {number} [wait=1000] - Wait time in milliseconds between press and move.
     */
    static swipeUp(start = { x: 100, y: 800 }, end = { x: 100, y: 100 }, wait = 1000) {
        driver.touchPerform([
            { action: 'press', options: start },
            { action: 'wait', options: { ms: wait } },
            { action: 'moveTo', options: end },
            { action: 'release' },
        ]);
    }

    /**
     * Performs a custom swipe gesture from start to end coordinates.
     * 
     * @static
     * @param {Object} start - Starting coordinates `{ x, y }`.
     * @param {Object} end - Ending coordinates `{ x, y }`.
     * @param {number} [wait=1000] - Wait time in milliseconds.
     */
    static swipe(start, end, wait = 1000) {
        driver.touchPerform([
            { action: 'press', options: start },
            { action: 'wait', options: { ms: wait } },
            { action: 'moveTo', options: end },
            { action: 'release' },
        ]);
    }

    /**
     * Performs login and department selection based on input credentials and department name.
     * 
     * @static
     * @async
     * @param {string} userid - User ID for login.
     * @param {string} password - Corresponding password.
     * @param {string} dept - Department name (e.g., 'sales', 'faultRepair', 'deployment').
     * @returns {Promise<void>}
     * @throws {Error} When an unknown department is specified.
     */
    static async departmentlogin(userid, password, dept) {
        await $(login.userid).waitForDisplayed({ timeout: 5000 });
        await $(login.userid).setValue(userid);

        await $(login.password).waitForDisplayed({ timeout: 5000 });
        await $(login.password).setValue(password);

        await $(login.loginButton).click();

        switch (dept.toLowerCase()) {
            case 'sales':
                await $(department.sales).waitForDisplayed({ timeout: 10000 });
                await $(department.sales).click();
                break;
            case 'faultrepair':
                await $(department.faultRepair).waitForDisplayed({ timeout: 10000 });
                await $(department.faultRepair).click();
                break;
            case 'deployment':
                await $(department.deployment).waitForDisplayed({ timeout: 10000 });
                await $(department.deployment).click();
                break;
            default:
                throw new Error(`Unknown department: ${dept}`);
        }
    }
}

module.exports = Helper;
