-- Below records for categories

INSERT INTO category (category_name) VALUES ('Electronics');
INSERT INTO category (category_name) VALUES ('Clothing');
INSERT INTO category (category_name) VALUES ('Books');
INSERT INTO category (category_name) VALUES ('Home Appliances');
INSERT INTO category (category_name) VALUES ('Furniture');

-- Below records for products

-- Electronics
INSERT INTO Product (product_name, description, product_image, quantity, price, discount, special_price, category_id)
VALUES ('Smartphone', 'Latest model with 128GB storage', 'smartphone.jpg', 50, 699.99, 50.00, 649.99, 1);

INSERT INTO Product (product_name, description, product_image, quantity, price, discount, special_price, category_id)
VALUES ('Laptop', '15-inch laptop with 16GB RAM', 'laptop.jpg', 30, 1299.99, 100.00, 1199.99, 1);

-- Clothing
INSERT INTO Product (product_name, description, product_image, quantity, price, discount, special_price, category_id)
VALUES ('T-Shirt', 'Cotton t-shirt, available in multiple colors', 'tshirt.jpg', 100, 19.99, 5.00, 14.99, 2);

INSERT INTO Product (product_name, description, product_image, quantity, price, discount, special_price, category_id)
VALUES ('Jeans', 'Slim-fit jeans, blue denim', 'jeans.jpg', 75, 49.99, 10.00, 39.99, 2);

-- Books
INSERT INTO Product (product_name, description, product_image, quantity, price, discount, special_price, category_id)
VALUES ('Novel', 'Bestselling fiction novel', 'novel.jpg', 200, 14.99, 2.00, 12.99, 3);

INSERT INTO Product (product_name, description, product_image, quantity, price, discount, special_price, category_id)
VALUES ('Textbook', 'Advanced mathematics textbook', 'textbook.jpg', 50, 99.99, 10.00, 89.99, 3);

-- Home Appliances
INSERT INTO Product (product_name, description, product_image, quantity, price, discount, special_price, category_id)
VALUES ('Blender', 'High-speed blender with 1000W motor', 'blender.jpg', 40, 79.99, 10.00, 69.99, 4);

INSERT INTO Product (product_name, description, product_image, quantity, price, discount, special_price, category_id)
VALUES ('Microwave', '20L capacity microwave oven', 'microwave.jpg', 25, 149.99, 20.00, 129.99, 4);

-- Furniture
INSERT INTO Product (product_name, description, product_image, quantity, price, discount, special_price, category_id)
VALUES ('Sofa', '3-seater leather sofa', 'sofa.jpg', 10, 799.99, 100.00, 699.99, 5);

INSERT INTO Product (product_name, description, product_image, quantity, price, discount, special_price, category_id)
VALUES ('Dining Table', '6-seater wooden dining table', 'dining_table.jpg', 15, 499.99, 50.00, 449.99, 5);
