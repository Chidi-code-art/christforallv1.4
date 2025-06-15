document.addEventListener("DOMContentLoaded", function() {
    const videoPosts = document.querySelectorAll(".video-post");
    const prevBtn = document.getElementById("video-prevBtn");
    const nextBtn = document.getElementById("video-nextBtn");
    const currentPageEl = document.getElementById("currentPage");
    const totalPagesEl = document.getElementById("totalPages");
    
    // Initialize variables (will be updated in updateVideosPerPage)
    let currentPage = 1;
    let videosPerPage;
    let totalPages;

    // Function to determine videos per page based on screen size
    function updateVideosPerPage() {
        if (window.matchMedia("(max-width: 450px)").matches) {
            videosPerPage = 4; // 2x2 grid
        } else if (window.matchMedia("(max-width: 540px)").matches) {
            videosPerPage = 2; // 2x1 grid
        } else if (window.matchMedia("(max-width: 670px)").matches) {
            videosPerPage = 4; // 2x2 grid
        } else if (window.matchMedia("(max-width: 760px)").matches) {
            videosPerPage = 4; // 2x2 grid
        } else if (window.matchMedia("(max-width: 860px)").matches) {
            videosPerPage = 6; // 3x2 grid
        } else if (window.matchMedia("(max-width: 975px)").matches) {
            videosPerPage = 6; // 3x2 grid
        } else if (window.matchMedia("(max-width: 1030px)").matches) {
            videosPerPage = 6; // 3x2 grid
        } else {
            videosPerPage = 8; // 4x2 grid (original value)
        }

        totalPages = Math.ceil(videoPosts.length / videosPerPage);
        totalPagesEl.textContent = totalPages;
        
        // Ensure current page stays valid after resize
        if (currentPage > totalPages && totalPages > 0) {
            currentPage = totalPages;
        }
        
        showPage(currentPage);
    }

    // Function to show videos for current page
    function showPage(page) {
        // Hide all videos
        videoPosts.forEach(video => video.classList.remove("active"));
        
        // Calculate start and end index
        const start = (page - 1) * videosPerPage;
        const end = start + videosPerPage;
        
        // Show videos for current page
        for (let i = start; i < end && i < videoPosts.length; i++) {
            videoPosts[i].classList.add("active");
        }
        
        // Update current page indicator
        currentPageEl.textContent = page;
        
        // Disable/enable navigation buttons
        prevBtn.disabled = page === 1;
        nextBtn.disabled = page === totalPages;
    }
    
    // Initialize first page
    updateVideosPerPage();
    
    // Event listeners for navigation
    prevBtn.addEventListener("click", () => {
        if (currentPage > 1) {
            currentPage--;
            showPage(currentPage);
        }
    });
    
    nextBtn.addEventListener("click", () => {
        if (currentPage < totalPages) {
            currentPage++;
            showPage(currentPage);
        }
    });

    // Update on window resize
    window.addEventListener('resize', updateVideosPerPage);
});