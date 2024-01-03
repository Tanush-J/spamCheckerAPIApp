const { Sequelize } = require('sequelize');
const mysql = require('mysql');
require('dotenv').config()

const env = process.env;

const createDatabase = async () => {
  const connection = await mysql.createConnection({ host: env.DB_HOST, user: env.DB_USERNAME, password: env.DB_PASSWORD });
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${env.DB_NAME}\`;`, (err) => {
    if(err) {
      console.log('Error creating database: ' + err);
    } else {
      console.log('Successfully created database if not exist');
    }
  });
  await connection.end()
}
createDatabase();

const sequelize = new Sequelize('spamCheckerDB', 'root', '12345', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
});

const { User } = require('./models/user');
const { SpamData } = require('./models/spamData');

// Seed the database with sample data
const seedDatabase = async () => {
  try {
    await User.sync({ force: true }); // Drop and recreate tables
    await SpamData.sync({ force: true }); // Drop and recreate tables

    // Create sample users (registeredUserId = null means its a imported contact and registeredUserId is the id of user from where it is imported)
    await User.bulkCreate([
      { id: 1, name: 'Tanush Jangid', phoneNumber: '1234567890', email: 'tanushjangid1234@gmail.com', password: 'password1', isRegistered: true, registeredUserId: null },
      { id: 2, name: 'Ginel Gomesh', phoneNumber: '2456543210', email: 'ginesh@example.com', password: 'password2', isRegistered: true, registeredUserId: null  },
      { id: 3, name: 'Jimmy Goh', phoneNumber: '2276673210', email: 'Jimmy@example.com', password: 'password2', isRegistered: true, registeredUserId: null  },
      { id: 4, name: 'Lenard Fasber', phoneNumber: '3376543210', email: 'Fasber@example.com', password: 'password2', isRegistered: true, registeredUserId: null  },
      { id: 5, name: 'Kenny Seb', phoneNumber: '7676543210', email: '', password: 'password3', isRegistered: true, registeredUserId: null  },
      { id: 6, name: 'Jenny Dikshit', phoneNumber: '9876743210', email: '', password: '', isRegistered: false, registeredUserId: 4  },
      { id: 7, name: 'James', phoneNumber: '4276543210', email: '', password: '', isRegistered: false, registeredUserId: 1  },
      { id: 8, name: 'James Don', phoneNumber: '4276543210', email: '', password: '', isRegistered: false, registeredUserId: 2  },
      { id: 9, name: 'James D', phoneNumber: '4276543210', email: '', password: '', isRegistered: false, registeredUserId: 3  },
      { id: 10, name: 'J D', phoneNumber: '4276543210', email: '', password: '', isRegistered: false, registeredUserId: 4  },
    ]);

    //sample spam data
    await SpamData.bulkCreate([
      { phoneNumber: '1234567890', reporterId: 2 },
      { phoneNumber: '1234567890', reporterId: 3 },
      { phoneNumber: '1234567890', reporterId: 3 },
      { phoneNumber: '9876543210', reporterId: 2 },
      { phoneNumber: '9876543210', reporterId: 2 },
      { phoneNumber: '2276543210', reporterId: 2 },
      { phoneNumber: '2276543210', reporterId: 1 },
    ]);

    console.log('Database seeded successfully.');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await sequelize.close();
  }
};

seedDatabase();