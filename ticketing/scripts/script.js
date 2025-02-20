     // 5. Footer Updates
function updateFooterDates() {
    document.getElementById("currentyear").textContent = new Date().getFullYear();
    document.getElementById("lastModified").textContent = `Last Modification: ${document.lastModified}`;
}

updateFooterDates();
