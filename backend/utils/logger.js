import fs from 'fs/promises';
import path from 'path';

// Define the log file path relative to the root directory
const logDir = path.join(process.cwd(), 'logs');
const logFile = path.join(logDir, 'activity.log');

export const logActivity = async (action, title) => {
    try {
        // Ensure the logs directory exists, without throwing an error if it already does
        await fs.mkdir(logDir, { recursive: true });

        // Format the date precisely as requested: [YYYY-MM-DD HH:MM:SS]
        const now = new Date();
        const yyyy = now.getFullYear();
        const mm = String(now.getMonth() + 1).padStart(2, '0');
        const dd = String(now.getDate()).padStart(2, '0');
        const hh = String(now.getHours()).padStart(2, '0');
        const min = String(now.getMinutes()).padStart(2, '0');
        const ss = String(now.getSeconds()).padStart(2, '0');

        const timestamp = `[${yyyy}-${mm}-${dd} ${hh}:${min}:${ss}]`;
        const logEntry = `${timestamp} ${action} - Title: ${title}\n`;

        // Async file write prevents blocking the event loop in Node.js
        await fs.appendFile(logFile, logEntry);
    } catch (error) {
        console.error('Failed to write to log file:', error.message);
    }
};
