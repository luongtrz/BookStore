// Giả sử dữ liệu nhận xét tĩnh hoặc tải từ server (có thể dùng JSON nếu có nhiều nhận xét)
const commentsData = {
  "1": ["Great book!", "Loved the illustrations."],
  "2": ["Informative and well-written.", "A bit lengthy, but worth it."],
  // Nhận xét cho các sách khác
};

function updateTotalPrice(quantity, bookPrice) {
  console.log(bookPrice)


  totalPrice = bookPrice * quantity;
  document.getElementById("total-price").innerText = totalPrice.toLocaleString();
}


function initializeQuantityControls(bookPrice) {
  let quantityInput = document.getElementById("quantity");
  console.log(quantityInput +" quantityInput 1");
  let increaseBtn = document.getElementById("increase");
  let decreaseBtn = document.getElementById("decrease");


  // Bắt đầu với số lượng là 1
  let quantity = 1;
  updateTotalPrice(quantity,bookPrice);

  // Xử lý sự kiện tăng số lượng
  increaseBtn.addEventListener("click", () => {
      quantity++;
      console.log(quantity+"quantity")
      quantityInput.value = quantity;
      decreaseBtn.disabled = quantity <= 1;
      updateTotalPrice(quantity,bookPrice);
  });
  // Xử lý sự kiện giảm số lượng
  decreaseBtn.addEventListener("click", () => {
      if (quantity > 1) {
          quantity--;
          quantityInput.value = quantity;
          decreaseBtn.disabled = quantity <= 1;
          updateTotalPrice(quantity,bookPrice);
      }
  });
}


// Hàm để lấy ID sách từ URL
function getBookIdFromUrl() {
const params = new URLSearchParams(window.location.search);
return params.get("id");
}

// Hàm để tải dữ liệu sách từ API và hiển thị sách
async function loadBookDetails() {
const bookId = getBookIdFromUrl();
console.log(bookId + "bookId");

const response = await fetch(`https://book-store-app-git-main-luongtrzs-projects.vercel.app/books/${bookId}`); // Đường dẫn đến API, thay đổi khi nộp bài, tạm thời host ở port 5000
if (!response.ok) {
  document.getElementById("book-container").innerText = "Book not found";
  return;
}

const book = await response.json();

if (book) {
  document.getElementById("book-title").innerText = `Sách: ${book.title}`;
  document.getElementById("book-image").src = `${book.image}`;
  document.getElementById("book-author").innerText = `Tác giả: ${book.author}`;
  document.getElementById("book-description").innerText = book.description;
  document.getElementById("book-company").innerText = `Nhà xuất bản: ${book.company}`;
  document.getElementById("book-size").innerText = `Kích thước: ${book.size}`;
  document.getElementById("book-price").innerText = "Giá: " + book.price.toLocaleString() + " VND";
  document.getElementById("book-pages").innerText = `Số trang: ${book.pages}`;
  document.getElementById("book-rating").innerText = `Đánh giá: ${book.rating}`;
  document.getElementById("book-sold").innerText = `Đã bán ${book.sold} cuốn`;

  // Cập nhật tổng tiền ban đầu
  updateTotalPrice(1,book.price);

  // Khởi tạo sự kiện cho các nút tăng/giảm số lượng
  initializeQuantityControls(book.price);

} else {
  document.getElementById("book-container").innerText = "Book not found";
}
}

// Gọi hàm để tải chi tiết sách
loadBookDetails();