async function fetchPopularBooks() {
    try {
        const response = await fetch(`https://book-store-app-git-main-luongtrzs-projects.vercel.app/books`); // Gọi API lấy sách
        const books = await response.json(); // Lấy JSON từ API

        let bookItemsHTML = '';

        // Take the first 4 elements of books
        const firstFourBooks = books.slice(0, 4);

        //random genre

        firstFourBooks.forEach(book => {
            bookItemsHTML += `
                <div class="mb-8 md:col-6">
                    <div class="card">
                        <img
                            class="card-img"
                            width="235"
                            height="304"
                            src="${book.image}"
                            alt="${book.title}"
                        />
                        <div class="card-content">
                            <div class="card-tags">
                                <a class="tag" href="#">${book.genre}</a>
                            </div>
                            <h3 class="h4 card-title">
                                <a href="book-single.html?id=${book.id}">
                                    ${book.title}
                                </a>
                            </h3>
                            <p>
                                Author: ${book.author}
                                <br>
                                <b class="text-red-500">Prices: ${book.price.toLocaleString()} VND</b>
                            </p>
                            <div class="card-footer mt-6 flex space-x-4">
                                <span class="inline-flex items-center text-xs text-[#666]">
                                    <svg class="mr-1.5" width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12.5 2H11V0.375C11 0.16875 10.8313 0 10.625 0H9.375C9.16875 0 9 0.16875 9 0.375V2H5V0.375C5 0.16875 4.83125 0 4.625 0H3.375C3.16875 0 3 0.16875 3 0.375V2H1.5C0.671875 2 0 2.67188 0 3.5V14.5C0 15.3281 0.671875 16 1.5 16H12.5C13.3281 16 14 15.3281 14 14.5V3.5C14 2.67188 13.3281 2 12.5 2ZM12.3125 14.5H1.6875C1.58438 14.5 1.5 14.4156 1.5 14.3125V5H12.5V14.3125C12.5 14.4156 12.4156 14.5 12.3125 14.5Z" fill="#939393"/>
                                    </svg>
                                    ${book.pages} trang
                                </span>
                                <span class="inline-flex items-center text-xs text-[#666]">
                                    <svg class="mr-1.5" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M7.65217 0C3.42496 0 0 3.58065 0 8C0 12.4194 3.42496 16 7.65217 16C11.8794 16 15.3043 12.4194 15.3043 8C15.3043 3.58065 11.8794 0 7.65217 0ZM7.65217 14.4516C4.24264 14.4516 1.48107 11.5645 1.48107 8C1.48107 4.43548 4.24264 1.54839 7.65217 1.54839C11.0617 1.54839 13.8233 4.43548 13.8233 8C13.8233 11.5645 11.0617 14.4516 7.65217 14.4516ZM9.55905 11.0839L6.93941 9.09355C6.84376 9.01935 6.78822 8.90323 6.78822 8.78065V3.48387C6.78822 3.27097 6.95484 3.09677 7.15849 3.09677H8.14586C8.34951 3.09677 8.51613 3.27097 8.51613 3.48387V8.05484L10.5773 9.62258C10.7439 9.74839 10.7778 9.99032 10.6575 10.1645L10.0774 11C9.95708 11.171 9.72567 11.2097 9.55905 11.0839Z" fill="#939393"/>
                                    </svg>
                                    ${book.sold} sách đã bán
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });

        // Thêm toàn bộ HTML vào `book-list` container
        const bookListContainer = document.getElementById('book-list');
        bookListContainer.innerHTML = bookItemsHTML;

    } catch (error) {
        console.error('Error fetching books:', error);
    }
}

async function fetchOtherBooks(genre) {
    try {
        const response = await fetch(`https://book-store-app-git-main-luongtrzs-projects.vercel.app/books`); // Gọi API lấy sách
        const books = await response.json(); // Lấy JSON từ API

        let otherBooksHTML = '';

        if(genre === "All Genres") {
            otherBooks = books;
        }
        else {
            otherBooks = books.filter(book => book.genre === genre);
        }

        otherBooks.forEach(book => {
            otherBooksHTML += `
                <div class="mb-8 md:col-6 lg:col-4">
                    <div class="card">
                        <img
                            class="card-img"
                            style="width: 330px; height: 500px; object-fit: cover;"
                            src="${book.image}"
                            alt="${book.title}"
                        />
                        <div class="card-content">
                            <div class="card-tags">
                                <a class="tag" href="#">${book.genre}</a>
                            </div>
                            <h3 class="h4 card-title">
                                <a href="book-single.html?id=${book.id}">
                                    ${book.title}
                                </a>
                            </h3>
                            <p>
                                Author: ${book.author}
                                <br>
                                <b class="text-red-500">Prices: ${book.price.toLocaleString()} VND</b>
                            </p>
                            <div class="card-footer mt-6 flex space-x-4">
                                <span class="inline-flex items-center text-xs text-[#666]">
                                    <svg
                                      class="mr-1.5"
                                      width="14"
                                      height="16"
                                      viewBox="0 0 14 16"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M12.5 2H11V0.375C11 0.16875 10.8313 0 10.625 0H9.375C9.16875 0 9 0.16875 9 0.375V2H5V0.375C5 0.16875 4.83125 0 4.625 0H3.375C3.16875 0 3 0.16875 3 0.375V2H1.5C0.671875 2 0 2.67188 0 3.5V14.5C0 15.3281 0.671875 16 1.5 16H12.5C13.3281 16 14 15.3281 14 14.5V3.5C14 2.67188 13.3281 2 12.5 2ZM12.3125 14.5H1.6875C1.58438 14.5 1.5 14.4156 1.5 14.3125V5H12.5V14.3125C12.5 14.4156 12.4156 14.5 12.3125 14.5Z"
                                        fill="#939393"
                                      />
                                    </svg>
                                    ${book.publicationDate || '21st Sep,2020'}
                                </span>
                                <span class="inline-flex items-center text-xs text-[#666]">
                                    <svg
                                      class="mr-1.5"
                                      width="16"
                                      height="16"
                                      viewBox="0 0 16 16"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M7.65217 0C3.42496 0 0 3.58065 0 8C0 12.4194 3.42496 16 7.65217 16C11.8794 16 15.3043 12.4194 15.3043 8C15.3043 3.58065 11.8794 0 7.65217 0ZM7.65217 14.4516C4.24264 14.4516 1.48107 11.5645 1.48107 8C1.48107 4.43548 4.24264 1.54839 7.65217 1.54839C11.0617 1.54839 13.8233 4.43548 13.8233 8C13.8233 11.5645 11.0617 14.4516 7.65217 14.4516ZM9.55905 11.0839L6.93941 9.09355C6.84376 9.01935 6.78822 8.90323 6.78822 8.78065V3.48387C6.78822 3.27097 6.95484 3.09677 7.15849 3.09677H8.14586C8.34951 3.09677 8.51613 3.27097 8.51613 3.48387V8.05484L10.5773 9.62258C10.7439 9.74839 10.7778 9.99032 10.6575 10.1645L10.0774 11C9.95708 11.171 9.72567 11.2097 9.55905 11.0839Z"
                                        fill="#939393"
                                      />
                                    </svg>
                                    ${book.readingTime || '10 Min To Read'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });

        // Thêm toàn bộ HTML vào `other-book` container
        const otherBookListContainer = document.getElementById('other-book');
        otherBookListContainer.innerHTML = otherBooksHTML;

    } catch (error) {
        console.error('Error fetching other books:', error);
    }
}


async function fetchGenres() {
    try {
        const response = await fetch('https://book-store-app-git-main-luongtrzs-projects.vercel.app/genres'); // Gọi API lấy thể loại từ database
        console.log(response.json() + "response");
        const Genres = await response.json(); // Chuyển đổi dữ liệu về JSON
        console.log(Genres + "Genres");

        let genreHTML = '<li><a class="filter-btn filter-btn-active btn btn-sm" href="list-book.html">All Genres</a></li>';

        Genres.forEach(genre => {
            genreHTML += `
                <li>
                    <a class="filter-btn btn btn-sm" href="list-book.html?genre=${encodeURIComponent(genre)}">
                        ${genre}
                    </a>
                </li>
            `;
        });

        const genreFilterContainer = document.getElementById('genres');
        if (genreFilterContainer) {
            genreFilterContainer.innerHTML = genreHTML;
        } else {
            console.error("genre filter container not found");
        }
    } catch (error) {
        console.error("Error fetching Genres:", error);
    }
}


// Gọi các hàm khi trang được load
window.onload = () => {
    fetchGenres();
    fetchPopularBooks();
};


// Cập nhật URL khi nhấp vào nút thể loại
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function(event) {
        event.preventDefault(); // Ngăn chặn hành động mặc định của liên kết

        // Xóa class 'filter-btn-active' khỏi tất cả các nút
        document.querySelectorAll('.filter-btn').forEach(a => {
            a.classList.remove('filter-btn-active'); // Đảm bảo chỉ xóa từ các nút
        });

        // Gán class 'filter-btn-active' cho nút được nhấp
        this.classList.add('filter-btn-active');

        const genre = this.textContent.trim(); // Lấy tên thể loại từ nội dung văn bản
        window.location.href = `list-book.html?genre=${encodeURIComponent(genre)}`; // Điều hướng trang với query string
    });
});

// Khi trang 'list-book.html' tải, kiểm tra URL để lấy thể loại
window.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const genre = urlParams.get('genre') || 'All Genres'; // Lấy thể loại từ query string, mặc định là "All Genres"

    // Gọi hàm fetchOtherBooks với thể loại đã lấy
    fetchOtherBooks(genre);
});

