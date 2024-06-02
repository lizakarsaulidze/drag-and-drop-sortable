document.addEventListener("DOMContentLoaded", function() {
    const items = document.querySelectorAll(".item");
    const sortableLists = document.querySelectorAll(".sortable-list");

    items.forEach(item => {
        item.addEventListener("dragstart", () => {
            setTimeout(() => item.classList.add("dragging"), 0);
        });

        item.addEventListener("dragend", () => {
            item.classList.remove("dragging");
        });
    });

    const initSortableList = (e) => {
        const draggingItem = document.querySelector(".dragging");
        const siblingItems = [...e.target.querySelectorAll(".item:not(.dragging)")];

        let nextSibling = siblingItems.find(sibling => {
            return e.clientY <= sibling.getBoundingClientRect().top + sibling.offsetHeight / 2;
        });

        if (nextSibling === undefined) {
            e.target.appendChild(draggingItem);
        } else {
            e.target.insertBefore(draggingItem, nextSibling);
        }
    };

    sortableLists.forEach(sortableList => {
        sortableList.addEventListener("dragover", (e) => {
            e.preventDefault();
            initSortableList(e);
        });
    });
});
