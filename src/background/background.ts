import { Settings } from '../types/index';

// Listen for installation or update
chrome.runtime.onInstalled.addListener(() => {
    // Set default settings
    const defaultSettings: Settings = {
        theme: 'light',
        detailLevel: 'medium',
        autoGenerate: true
    };
    
    chrome.storage.sync.set(defaultSettings);
});

// Listen for messages from content script or popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === 'getSettings') {
        chrome.storage.sync.get({
            theme: 'light',
            detailLevel: 'medium',
            autoGenerate: true
        }, (settings) => {
            sendResponse(settings);
        });
        return true; // Will respond asynchronously
    }
});
