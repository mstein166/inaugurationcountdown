function calculateDaysUntil() {
    const targetDate = new Date('2025-01-20T12:00:00');
    const currentDate = new Date();
    
    // Reset time portion to ensure we're just calculating whole days
    currentDate.setHours(0, 0, 0, 0);
    
    const differenceInTime = targetDate.getTime() - currentDate.getTime();
    const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
    
    document.getElementById('daysUntil').textContent = differenceInDays;
}

// Calculate immediately when page loads
calculateDaysUntil();

// Update every day at midnight
setInterval(() => {
    calculateDaysUntil();
}, 86400000); // 24 hours in milliseconds