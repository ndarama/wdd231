document.addEventListener("DOMContentLoaded", () => {
    const openModalLinks = document.querySelectorAll(".open-modal");
    const closeModalButtons = document.querySelectorAll(".close-modal");
    const membershipCards = document.querySelectorAll(".membership-card");

    openModalLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const targetModal = document.querySelector(link.getAttribute("href"));
            if (targetModal) targetModal.showModal();
        });
    });

    closeModalButtons.forEach(button => {
        button.addEventListener("click", () => {
            button.closest("dialog").close();
        });
    });
    
    membershipCards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add("animate");
        }, index * 700);  // Stagger animation start by 200ms for each card
    });
});
