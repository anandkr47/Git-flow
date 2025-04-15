import { Settings } from '../types/index';

document.addEventListener('DOMContentLoaded', () => {
    const settingsForm = document.getElementById('settings-form') as HTMLFormElement;
    
    // Load saved settings
    const defaultSettings: Settings = {
        theme: 'light',
        detailLevel: 'medium',
        autoGenerate: true
    };

    chrome.storage.sync.get(defaultSettings, (items) => {
        const settings = items as Settings;
        (document.getElementById('theme') as HTMLSelectElement).value = settings.theme;
        (document.getElementById('detail-level') as HTMLSelectElement).value = settings.detailLevel;
        (document.getElementById('auto-generate') as HTMLInputElement).checked = settings.autoGenerate;
    });

    // Save settings
    settingsForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const theme = (document.getElementById('theme') as HTMLSelectElement).value as Settings['theme'];
        const detailLevel = (document.getElementById('detail-level') as HTMLSelectElement).value as Settings['detailLevel'];
        const autoGenerate = (document.getElementById('auto-generate') as HTMLInputElement).checked;

        const settings: Settings = {
            theme,
            detailLevel,
            autoGenerate
        };

        chrome.storage.sync.set(settings, () => {
            const status = document.getElementById('status');
            if (status) {
                status.textContent = 'Settings saved!';
                setTimeout(() => {
                    status.textContent = '';
                }, 2000);
            }
        });

        // Notify content script of settings change
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs[0].id) {
                chrome.tabs.sendMessage(tabs[0].id, {
                    type: 'settingsUpdated',
                    settings
                });
            }
        });
    });
});
