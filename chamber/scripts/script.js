document.addEventListener("DOMContentLoaded", () => {
    const memberList = document.getElementById("member-list");
    const gridViewButton = document.getElementById("grid-view");
    const listViewButton = document.getElementById("list-view");

    let membersData = [];

    async function fetchMembers() {
        try {
            const response = await fetch("data/members.json");
            if (!response.ok) throw new Error("Failed to fetch data");
            membersData = await response.json();
            displayMembers("grid");
        } catch (error) {
            console.error("Error fetching members:", error);
            memberList.innerHTML = `<p style="color:red; text-align:center;">⚠ Failed to load members.</p>`;
        }
    }

    function displayMembers(view) {
        memberList.innerHTML = "";
        memberList.classList.remove("grid-view", "list-view");
        memberList.classList.add(view === "grid" ? "grid-view" : "list-view");

        if (membersData.length === 0) {
            memberList.innerHTML = `<p style="text-align:center;">No members found.</p>`;
            return;
        }

        membersData.forEach(member => {
            const card = document.createElement("div");
            card.className = `card ${getMembershipClass(member.membership)}`;
            card.innerHTML = `
                <div class="membership-badge">${getMembershipBadge(member.membership)}</div>
                <img src="images/${member.image}" alt="${member.name}">
                <div class="card-content">
                    <h3>${member.name}</h3>
                    <p><strong>Address:</strong> ${member.address}</p>
                    <p><strong>Phone:</strong> ${member.phone}</p>
                    <a href="${member.website}" target="_blank">🌐 Visit Website</a>
                </div>
            `;

            if (view === "list") {
                card.classList.add("list-item");
            }

            memberList.appendChild(card);
        });
    }

    function getMembershipClass(level) {
        switch (level) {
            case 3: return "gold-member";
            case 2: return "silver-member";
            default: return "regular-member";
        }
    }

    function getMembershipBadge(level) {
        switch (level) {
            case 3: return "🏆 Gold Member";
            case 2: return "🥈 Silver Member";
            default: return "👤 Regular Member";
        }
    }

    gridViewButton.addEventListener("click", () => displayMembers("grid"));
    listViewButton.addEventListener("click", () => displayMembers("list"));

    fetchMembers();
});
