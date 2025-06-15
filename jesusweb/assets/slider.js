document.addEventListener("DOMContentLoaded", function () {
    const posts = Array.from(document.querySelectorAll(".recent-post"));
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");

    // Create pagination indicator (your existing code)
    const paginationIndicator = document.createElement("div");
    paginationIndicator.id = "paginationIndicator";
    paginationIndicator.style.textAlign = "center";
    paginationIndicator.style.margin = "10px 0";
    document.querySelector(".post-slider").appendChild(paginationIndicator);

    // Initialize variables (will be updated in updatePostsPerPage)
    let index = 0;
    let postsPerPage;
    let totalPages;

    // Function to determine posts per page based on screen size
    function updatePostsPerPage() {
        if (window.matchMedia("(max-width: 450px)").matches) {
            postsPerPage = 4; // 2x2 grid
        }else if (window.matchMedia("(max-width: 540px)").matches) {
            postsPerPage = 2; // 2x2 grid
        }else if (window.matchMedia("(max-width: 670px)").matches) {
            postsPerPage = 2; // 2x2 grid
        }else if (window.matchMedia("(max-width: 670px)").matches) {
            postsPerPage = 4; // 2x2 grid
        } else if (window.matchMedia("(max-width: 1030px)").matches) {
            postsPerPage = 6; // 3x2 grid
        } else {
            postsPerPage = 8; // 4x2 grid (your original value)
        }

        totalPages = Math.ceil(posts.length / postsPerPage);
        
        // Ensure current page stays valid after resize
        if (index >= totalPages && totalPages > 0) {
            index = totalPages - 1;
        }
        
        showPage();
    }

    // Your existing showPage function with slight optimization
    function showPage() {
        console.log(`Showing posts for index: ${index}`);

        // Hide all posts
        posts.forEach(post => post.style.display = "none");

        // Calculate range
        const start = index * postsPerPage;
        const end = Math.min(start + postsPerPage, posts.length);

        // Show current page posts
        for (let i = start; i < end; i++) {
            posts[i].style.display = "block";
        }

        console.log(`Showing posts ${start} to ${end - 1}`);

        // Update button visibility (your existing logic)
        prevBtn.style.display = index > 0 ? "block" : "none";
        nextBtn.style.display = end < posts.length ? "block" : "none";

        // Update pagination indicator (your existing logic)
        paginationIndicator.textContent = `Page ${index + 1} of ${totalPages}`;
    }

    // Your existing navigation handlers
    nextBtn.addEventListener("click", function () {
        if (index < totalPages - 1) {
            index++;
            console.log("Next clicked. New index:", index);
            showPage();
        }
    });

    prevBtn.addEventListener("click", function () {
        if (index > 0) {
            index--;
            console.log("Prev clicked. New index:", index);
            showPage();
        }
    });

    // Initialize and set up resize listener
    updatePostsPerPage();
    window.addEventListener('resize', updatePostsPerPage);
});

