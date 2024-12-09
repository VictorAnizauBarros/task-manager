const authService = require("../services/authService");
exports.getLogin = (req, res) => {
  if (req.session.userId) {
    return res.redirect("/tasks");
  }
  res.render("main", { title: "Login", body: "content/login" });
};
exports.postLogin = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await authService.findUserByUsername(username);
    if (user && authService.verifyPassword(password, user.password)) {
      req.session.userId = user.id;
      req.session.userName = user.username;
      res.redirect("/tasks");
    } else {
      res.redirect("/login?error=invalid");
    }
  } catch (error) {
      console.error("Erro ao fazer login:", error);
    res.redirect("/login?error=server");
  }
};
exports.getRegister = (req, res) => {
  if (req.session.userId) {
    return res.redirect("/tasks");
  }
  res.render("main", { title: "Registrar-se", body: "content/register" });
};
exports.postRegister = async (req, res) => {
  const { username, password } = req.body;
  try {
    const existingUser = await authService.findUserByUsername(username);
    if (existingUser) {
      return res.redirect("/register?error=username_exists");
    }
    await authService.createUser(username, password);
    res.redirect("/login?isRegister=true");
  } catch (error) {
    console.error("Erro ao registrar:", error);
    res.redirect("/register?error=unknown");
  }
};
exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect("/login");
};
