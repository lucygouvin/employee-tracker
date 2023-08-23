INSERT INTO departments (name)
VALUES ("Sales"),
       ("Marketing"),
       ("IT");

INSERT INTO roles(title, salary, department_id)
VALUES ("Chief Executive Officer", 250.9, 1),
("Sales Representative", 50.5, 1),
("Sales Manager", 70.25, 1),
("Business Development Specialist", 45.5, 1),

("Chief Marketing Officer", 200.1, 2),
("Marketing Manager", 100.2, 2),
("Social Media Specialist", 65.7, 2),
("Marketing Analyst", 89.4, 2),

("Chief Technology Officer", 203.1, 3),
("IT Manager", 100.7, 3),
("Software Developer", 120.6, 3),
("IT Support Technician", 60.8, 3);



INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ("Emily", "Johnson", 1, NULL),
("Michael", "Smith",3,1),
("Sophia", "Williams",3,1),
("Daniel", "Jones",2,2),
("Olivia", "Brown",2,3 ),
("Matthew", "Davis",4,1 ),
("Emma", "Miller",4,1 ),
("Christopher", "Wilson", 5,NULL),
("Ava", "Moore", 8, 8),
("Andrew", "Taylor", 8, 8),
("Isabella", "Anderson", 6, 8),
("Ethan", "Thomas", 6,8),
("Mia", "Jackson",7,11),
("William", "White", 7,12),
("Abigail", "Harris",9, NULL),
("James", "Martin", 10, 15),
("Liam", "Thompson", 10, 15),
("Charlotte", "Garcia", 11, 16),
("John", "Martinez", 11, 17),
("Harper", "Robinson", 12, 16),
("David", "Clark", 12, 17),
("Sofia", "Rodriguez", 11, 16),
("Benjamin", "Lewis", 12, 17);
