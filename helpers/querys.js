const GET_ROL_BY_ID = 'SELECT roles.id_role, roles.description FROM roles JOIN users_roles ON roles.id_role = users_roles.id_role  JOIN users ON users.id_user = users_roles.id_user WHERE users.id_user = ';
const ADD_ROL_TO_USER = 'INSERT INTO users_roles (id_user,id_role)  VALUES (?,?)'
const UPDATE_USER_ROL = 'UPDATE users_roles SET id_role = ? WHERE id_user = ?'
module.exports = {
    GET_ROL_BY_ID,
    ADD_ROL_TO_USER,
    UPDATE_USER_ROL
}