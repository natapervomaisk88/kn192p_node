import users from "../models/users.js";
import bcrypt from "bcryptjs";

export const registration = (req, res, next) => {
  const { name, login, email, password, password_repeat, is_remember } =
    req.body;
  if (password === password_repeat) {
    //сравним пароли
    //нет ли уже такого пользователя (login, email)
    //regex for email
    // login не менее 5 символов
    bcrypt.genSalt(10, (err, salt) => {
      if (err) throw err;
      else {
        bcrypt.hash(password, salt, (err, hash) => {
          if (err) throw err;
          else {
            const mapped = users.map((u) => u.id);
            const id = mapped.length ? Math.max(...mapped) + 1 : 1;
            users.push({
              id: id,
              name: name,
              login: login,
              email: email,
              password: hash,
              salt: salt,
            });
            console.log(users);
          }
        });
      }
    });
    if (is_remember) {
      // res.cookie("username", login, {
      //   maxAge: 3600 * 24, //час життя куки 1 доба
      //   signed: true,
      // });
      req.session.username = login;
    }
  }
  next();
};

export const auth = (req, res, next) => {
  const { login, password, is_remember } = req.body;
  const userObj = users.find((n) => n.login == login);
  if (userObj) {
    const hash = bcrypt.hashSync(password, userObj.salt);
    if (hash === userObj.password) {
      console.log(hash);
      if (is_remember) {
        req.session.username = login;
        // res.cookie("username", login, {
        //   maxAge: 3600 * 24, //час життя куки 1 доба
        //   signed: true,
        // });
      }
    }
  }
  next();
};
