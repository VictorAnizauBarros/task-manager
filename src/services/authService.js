const bcrypt = require('bcryptjs');
const prisma = require('../config/database');
class AuthService {
 async findUserByUsername(username) {
 return prisma.users.findUnique({
 where: { username }
 });
 }
 async createUser(username, password) {
 const hashedPassword = bcrypt.hashSync(password, 8);
 return prisma.users.create({
 data: {
 username,
 password: hashedPassword
 }
 });
 }
 verifyPassword(password, hashedPassword) {
 return bcrypt.compareSync(password, hashedPassword);
 }
}
module.exports = new AuthService();