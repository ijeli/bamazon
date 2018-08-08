drop database if exists bamazon;

create database bamazon;

use bamazon;

create table products (
item_id int not null auto_increment,
product_name varchar(100) null,
department_name varchar(100) null,
price dec(10, 2) null,
stock_quantity int(10) null,
primary key (item_id)
);

insert into products (product_name, department_name, price, stock_quantity)
values ("Black Diamond Harness", "Outdoor depar", 49.99, 25);

insert into products (product_name, department_name, price, stock_quantity)
values ("Petzl Harness", "Outdoor department", 69.99, 24);

insert into products (product_name, department_name, price, stock_quantity)
value ("La Sportiva Neutral Climbing Shoes", "Shoe department", 79.99, 20);

insert into products (product_name, department_name, price, stock_quantity)
value ("La Sportiva Moderate Climbing Shoes", "Shoe department", 120.99, 10);

insert into products (product_name, department_name, price, stock_quantity)
value ("La Sportiva Aggressive Climbing Shoes", "Shoe department", 189.99, 11);

insert into products (product_name, department_name, price, stock_quantity)
value ("Scarpa Neutral Climbing Shoes", "Shoes department", 91.99, 25);

insert into products (product_name, department_name, price, stock_quantity)
value ("Scarpa Aggressive Climbing Shoes", "Shoes department", 195.99, 15);

insert into products (product_name, department_name, price, stock_quantity)
value ("Carbinar", "Outdoor department", 19.99, 25);

insert into products (product_name, department_name, price, stock_quantity)
value ("Belay Device", "Outdoor department", 19.99, 25);

insert into products (product_name, department_name, price, stock_quantity)
value ("Automatic Belay Device", "Outdoor department", 49.99, 15);

SELECT * FROM bamazon.products;




