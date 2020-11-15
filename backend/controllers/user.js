const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const db = require('../database');

exports.me = (req, res) => {
  res.status(200).json({
    user: req.user,
  });
};

//Création d'un utilisateur
exports.signup = (req, res) => {
  const { username, email, password } = req.body;

  let test_email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,5})+$/;
  let test_password = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/;

  if (!email.match(test_email)) {
    return res.status(401).json({
      message: "L'email est invalide",
    });
  }
  if (!password.match(test_password)) {
    return res.status(401).json({
      message: 'Le mote passe est invalide',
    });
  }

  db.query(
    'SELECT email from users WHERE email = ?',
    [email],
    async (error, results) => {
      if (error) {
        console.log(error);
      }

      if (results.length > 0) {
        return res.status(401).json({
          message: "L'email est déja utilisée",
        });
      }

      let hashedPassword = await bcrypt.hash(password, 10);

      db.query(
        'INSERT INTO users SET ?',
        { username: username, email: email, password: hashedPassword },
        (error, results) => {
          if (error) {
            return res.status(500).json({
              message: error.message,
            });
          } else {
            return res.status(201).json({
              message: 'Utilisateur créée',
            });
          }
        }
      );
    }
  );
};
//Connexion d'un utilisateur
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: 'Email et mot de passe sont requis',
      });
    }

    db.query(
      'SELECT * FROM USERS WHERE email = ?',
      [email],
      async (error, results) => {
        if (
          !results ||
          !(await bcrypt.compare(password, results[0].password))
        ) {
          return res.status(401).json({
            message: 'Email ou mot de passe incorrect',
          });
        } else {
          const user = results[0];

          const token = jwt.sign(
            { id_user: user.id_user, test: 'kevin' },
            process.env.JWT_SECRET,
            {
              expiresIn: process.env.JWT_EXPIRES_IN || '2 days',
            }
          );

          return res.status(200).json({
            message: 'Utilisateur connecté',
            token: token,
            user: user,
          });
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};

exports.getUsersByIds = (req, res) => {
  const ids = req.params.ids;
  const idsarray = ids.split('-');

  const users = [];

  idsarray.forEach(async (id, index, i) => {
    const long = i.length;
    const isLastRound = long === index + 1;
    db.query(`SELECT * FROM users WHERE id_user = ?`, [id], (err, result) => {
      if (!err) {
        console.log('res', result[0]);
        if (result[0]) {
          users.push(result[0]);
        }

        if (isLastRound) {
          return res.status(200).json({
            users,
          });
        }
      }
    });
  });
};

//Mofifier un utilisateur
exports.modifyUser = (req, res, next) => {};

//Supprimer un utilisateur
exports.deleteUser = (req, res, next) => {
  const authUser = req.user;
  const userIdToDelete = req.params.id;

  if (!req.user) {
    return res.status(401).json({
      message: 'You should authenticated',
    });
  }

  if (Number(authUser.id_user) !== Number(userIdToDelete)) {
    return res.status(401).json({
      message: 'Permission denied',
    });
  }

  // to change
  db.query(
    `DELETE FROM comments WHERE id_user = ?`,
    [userIdToDelete],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          message: err.message,
        });
      }

      db.query(
        `SELECT * FROM articles WHERE id_user = ?`,
        [userIdToDelete],
        (err, result) => {
          if (err) {
            return res.status(500).json({
              message: err.message,
            });
          }

          const imgToDelete = result.map((item) => item.image_url);
          imgToDelete.forEach((imageName) => {
            const fileToDelete = publicDirectory + imageName;
            fs.unlinkSync(fileToDelete);
          });

          db.query(
            `DELETE FROM articles WHERE id_user = ?`,
            [userIdToDelete],
            (err, result) => {
              if (err) {
                return res.status(500).json({
                  message: err.message,
                });
              }

              db.query(
                `DELETE FROM users WHERE id_user = ?`,
                [userIdToDelete],
                (err, result) => {
                  if (err) {
                    console.log('++4');
                    return res.status(500).json({
                      message: err.message,
                    });
                  }

                  return res.status(200).json({
                    message: 'Account deleted',
                  });
                }
              );
            }
          );
        }
      );
    }
  );
};
