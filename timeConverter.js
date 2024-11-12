// Add styles for the buttons
const converterStyles = `
.converter-button {
    background-color: #800000;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    margin: 10px 5px;
    display: inline-block;
    transition: background-color 0.3s, transform 0.1s;
}

.converter-button:hover {
    background-color: #a00000;
}

.converter-button:active {
    transform: scale(0.98);
}

.button-container {
    text-align: center;
    margin: 10px 0;
}
`;

// Add the styles to the document
const converterStyleSheet = document.createElement("style");
converterStyleSheet.innerText = converterStyles;
document.head.appendChild(converterStyleSheet);

// Function to calculate time remaining
function getTimeRemaining() {
    const targetDate = new Date('2025-01-20T12:00:00');
    const currentDate = new Date();
    
    // For days calculation, use the same method as countdown.js
    const midnightDate = new Date(currentDate);
    midnightDate.setHours(0, 0, 0, 0);
    const daysRemaining = Math.ceil((targetDate - midnightDate) / (1000 * 3600 * 24));
    
    // For hours and minutes, use the exact current time
    const differenceInTime = targetDate - currentDate;
    const hoursRemaining = Math.floor(differenceInTime / (1000 * 3600));
    const minutesRemaining = Math.floor(differenceInTime / (1000 * 60));
    
    return {
        days: daysRemaining,
        hours: hoursRemaining,
        minutes: minutesRemaining
    };
}

// Function to add the time converter
function addTimeConverter() {
    // Wait for the countdown value to be populated
    const checkForContent = setInterval(() => {
        const daysUntilElement = document.getElementById('daysUntil');
        
        if (daysUntilElement && daysUntilElement.textContent) {
            clearInterval(checkForContent);
            initializeConverter();
        }
    }, 100);
    
    // Initialize converter once content is ready
    function initializeConverter() {
        // Create button container
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'button-container';
        
        // Create minutes button
        const minutesButton = document.createElement('button');
        minutesButton.className = 'converter-button';
        minutesButton.textContent = 'Convert to Minutes';
        
        // Create hours button
        const hoursButton = document.createElement('button');
        hoursButton.className = 'converter-button';
        hoursButton.textContent = 'Convert to Hours';
        
        // Add buttons to container
        buttonContainer.appendChild(hoursButton);
        buttonContainer.appendChild(minutesButton);
        
        // Find paragraph
        const paragraph = document.querySelector('p');
        if (!paragraph) {
            console.error('Required paragraph not found');
            return;
        }
        
        // Insert button container after paragraph
        paragraph.parentNode.insertBefore(buttonContainer, paragraph.nextSibling);
        
        let currentUnit = 'days';
        const timeUnitSpan = document.getElementById('timeUnit');
        
        // Conversion functions
        function updateDisplay() {
            const timeRemaining = getTimeRemaining();
            const daysUntilElement = document.getElementById('daysUntil');
            
            switch(currentUnit) {
                case 'days':
                    daysUntilElement.textContent = timeRemaining.days.toLocaleString();
                    timeUnitSpan.textContent = 'days';
                    minutesButton.textContent = 'Convert to Minutes';
                    hoursButton.textContent = 'Convert to Hours';
                    break;
                    
                case 'hours':
                    daysUntilElement.textContent = timeRemaining.hours.toLocaleString();
                    timeUnitSpan.textContent = 'hours';
                    hoursButton.textContent = 'Convert to Days';
                    minutesButton.textContent = 'Convert to Minutes';
                    break;
                    
                case 'minutes':
                    daysUntilElement.textContent = timeRemaining.minutes.toLocaleString();
                    timeUnitSpan.textContent = 'minutes';
                    minutesButton.textContent = 'Convert to Days';
                    hoursButton.textContent = 'Convert to Hours';
                    break;
            }
        }
        
        // Add click event listeners
        minutesButton.addEventListener('click', () => {
            currentUnit = currentUnit === 'minutes' ? 'days' : 'minutes';
            updateDisplay();
        });
        
        hoursButton.addEventListener('click', () => {
            currentUnit = currentUnit === 'hours' ? 'days' : 'hours';
            updateDisplay();
        });
        
        // Update the display every minute to keep it current
        setInterval(updateDisplay, 60000);
    }
}

// Initialize when the document is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addTimeConverter);
} else {
    addTimeConverter();
}