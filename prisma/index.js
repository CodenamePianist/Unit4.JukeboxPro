const bcrypt = require("bcrypt");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient().$extends({
  model: {
    user: {
      async register(username, password) {
        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = await prisma.user.create({
          data: {
            username,
            password: hashPassword,
          },
        });
        return newUser;
      },
      async login(username, password) {
        const user = await prisma.user.findUniqueOrThrow({
          where: { username },
        });
        const valid = await bcrypt.compare(password, hashPassword);
        if (!valid) throw Error("Invalid password");
        return user;
      },
    },
  },
});

module.exports = prisma;
