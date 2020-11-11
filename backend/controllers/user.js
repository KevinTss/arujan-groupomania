const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const db = require('../database');

// get auth user
exports.me = (req, res) => {
  // req.user = user en db
  res.status(200).json({
    user: req.user,
  });
};

//Création d'un utilisateur
exports.signup = (req, res) => {
  const { username, email, password } = req.body;

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
        // console.log('results', results);
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

          //   console.log('The token is: ' + token);

          //   const cookieOptions = {
          //     expires: new Date(
          //       Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
          //     ),
          //     httpOnly: true,
          //   };

          //   res.cookie('jwt, token, cookieOptions ');
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

//Mofifier un utilisateur
exports.modifyUser = (req, res, next) => {};

//Supprimer un utilisateur
exports.deleteUser = (req, res, next) => {};
