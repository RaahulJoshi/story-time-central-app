
-- Insert roles
INSERT INTO roles (name) VALUES ('USER') ON DUPLICATE KEY UPDATE name = VALUES(name);
INSERT INTO roles (name) VALUES ('LIBRARIAN') ON DUPLICATE KEY UPDATE name = VALUES(name);
INSERT INTO roles (name) VALUES ('ADMIN') ON DUPLICATE KEY UPDATE name = VALUES(name);

-- Insert admin user (password: admin123)
INSERT INTO users (username, email, password, first_name, last_name) 
VALUES ('admin', 'admin@libraryhub.com', '$2a$10$PV6VMgm8.bhwPAHrBIvWK.VJ9kP8LQTH5OPsXMu.arRUO3UpoLBkm', 'Admin', 'User')
ON DUPLICATE KEY UPDATE username = VALUES(username);

-- Link admin to ADMIN role
INSERT INTO user_roles (user_id, role_id) 
SELECT u.id, r.id FROM users u, roles r 
WHERE u.username = 'admin' AND r.name = 'ADMIN'
ON DUPLICATE KEY UPDATE user_id = VALUES(user_id);

-- Insert sample books
INSERT INTO books (title, author, isbn, published, genre, description, cover_image, available)
VALUES 
('To Kill a Mockingbird', 'Harper Lee', '9780061120084', '1960-07-11', 'Fiction', 'The unforgettable novel of a childhood in a sleepy Southern town and the crisis of conscience that rocked it.', 'https://images-na.ssl-images-amazon.com/images/I/71FxgtFKcQL.jpg', 5),
('1984', 'George Orwell', '9780451524935', '1949-06-08', 'Dystopian', 'Among the seminal texts of the 20th century, Nineteen Eighty-Four is a rare work that grows more haunting as its futuristic purgatory becomes more real.', 'https://images-na.ssl-images-amazon.com/images/I/71kxa1-0mfL.jpg', 3),
('The Great Gatsby', 'F. Scott Fitzgerald', '9780743273565', '1925-04-10', 'Fiction', 'The story of the mysteriously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan.', 'https://images-na.ssl-images-amazon.com/images/I/71FTb9X6wsL.jpg', 2),
('Pride and Prejudice', 'Jane Austen', '9780141439518', '1813-01-28', 'Romance', 'Few have failed to be charmed by the witty and independent spirit of Elizabeth Bennet in Austen\'s beloved classic.', 'https://images-na.ssl-images-amazon.com/images/I/71Q0kJZgntL.jpg', 4),
('The Hobbit', 'J.R.R. Tolkien', '9780547928227', '1937-09-21', 'Fantasy', 'A great modern classic and the prelude to The Lord of the Rings.', 'https://images-na.ssl-images-amazon.com/images/I/91b0C2YNSrL.jpg', 3),
('The Catcher in the Rye', 'J.D. Salinger', '9780316769488', '1951-07-16', 'Fiction', 'The hero-narrator of The Catcher in the Rye is an ancient child of sixteen, a native New Yorker named Holden Caufield.', 'https://images-na.ssl-images-amazon.com/images/I/81OthjkJBuL.jpg', 1)
ON DUPLICATE KEY UPDATE title = VALUES(title);
