INSERT INTO departments (department_name)
VALUES 
('Management'),
('Sales'),
('Human Resources'),
('Finance'),
('Engineering'),
('Information Technology'),
('Internal Affairs'),
('Research'),
('Legal'),
('Maintenance');

INSERT INTO roles (title, salary, department_id)
VALUES 
('Chief Executive Officer', 500000.00, 1),
('Sales Lead', 200000.00, 2),
('Salesperson', 100000.00, 3),
('Lead Engineer', 155000.00, 4),
('Senior Engineer', 195000.00, 5),
('Junior Engineer', 130000.00, 6),
('Accountant', 80000.00, 7),
('Legal Team Lead', 2000000.00, 8),
('Lawyer', 85000.00, 9),
('Maintenance', 55000.00, 10);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('John', 'Doe', 1, 1),
('Geoff', 'Withers', 2, 2),
('Mike', 'Chan', 3, 3),
('Ashley', 'Rodriguez', 4, 4),
('Kevin', 'Tupik', 5, 5),
('Kunal', 'Singh', 6, 6),
('Malia', 'Brown', 7, 7),
('Sarah', 'Lourd', 8, 8),
('Tom', 'Allen', 9, 9),
('Brad', 'Grace', 10, 10);