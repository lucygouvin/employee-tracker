SELECT employee.id, first_name, last_name, role_id, title
FROM employee
JOIN roles ON employee.role_id = roles.id
ORDER BY employee.id

-- job title, role id, the department that role belongs to, and the salary for that role
SELECT roles.title, roles.id, departments.dept_name, roles.salary*100
FROM roles
JOIN departments ON roles.department_id = departments.id

-- including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
SELECT employee.id, employee.first_name, employee.last_name, roles.title, departments.dept_name AS department, roles.salary*1000 AS salary, employee.manager_id
FROM employee
INNER JOIN roles ON roles.id = employee.role_id
INNER JOIN departments ON roles.department_id = department.id