SELECT employee.id, first_name, last_name, role_id, title
FROM employee
JOIN roles ON employee.role_id = roles.id
ORDER BY employee.id