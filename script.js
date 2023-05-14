// Lấy các phần tử DOM cần thiết
const noteForm = document.getElementById('note-form');
const noteInput = document.getElementById('note-input');
const noteList = document.getElementById('note-list');

// Sự kiện submit form
noteForm.addEventListener('submit', function(e) {
    e.preventDefault(); // Ngăn chặn việc reload trang sau khi submit
    const noteText = noteInput.value.trim();
    if (noteText !== '') {
        createNoteItem(noteText);
        noteInput.value = '';
    }
});

// Hàm tạo một ghi chú mới
function createNoteItem(text) {
    const noteItem = document.createElement('div');
    noteItem.className = 'note-item';

    // Kiểm tra xác thực của người dùng (giả sử chỉ hiển thị ghi chú cho người dùng đã đăng nhập)
    if (isUserAuthenticated()) {
        noteItem.innerHTML = `
            <span>${text}</span>
            <button>Xóa</button>
        `;
    } else {
        noteItem.className += ' hidden';
    }

    noteList.appendChild(noteItem);

    const deleteButton = noteItem.querySelector('button');
    deleteButton.addEventListener('click', function() {
        noteList.removeChild(noteItem);
    });
}

// Hàm kiểm tra xác thực người dùng (đây chỉ là ví dụ đơn giản)
function isUserAuthenticated() {
    // Giả sử đã có một biến userAuthenticated đại diện cho trạng thái xác thực
    const userAuthenticated = true; // Thay đổi giá trị này theo logic xác thực thực tế của bạn
    return userAuthenticated;
}

// Hàm kiểm tra xem một ghi chú có thuộc về người dùng hiện tại hay không
function isNoteOwnedByCurrentUser(noteItem) {
    // Giả sử đã có thông tin về người dùng hiện tại và ghi chú đã được liên kết với người dùng đó
    const currentUser = "example_user"; // Thay đổi giá trị này theo người dùng hiện tại của bạn
    const noteOwner = noteItem.getAttribute("data-owner"); // Lấy thông tin về người sở hữu ghi chú từ thuộc tính data-owner
    return currentUser === noteOwner;
}

// Hàm kiểm tra và ẩn ghi chú không thuộc về người dùng hiện tại
function hideNotesNotOwnedByCurrentUser() {
    const noteItems = document.querySelectorAll('.note-item');
    noteItems.forEach((noteItem) => {
        if (!isNoteOwnedByCurrentUser(noteItem)) {
            noteItem.classList.add('hidden');
        }
    });
}

// Gọi hàm hideNotesNotOwnedByCurrentUser để ẩn ghi chú không thuộc về người dùng hiện tại khi trang được tải
hideNotesNotOwnedByCurrentUser();

