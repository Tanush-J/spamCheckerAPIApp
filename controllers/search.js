const { QueryTypes } = require("sequelize");
const sequelize = require("../connect");

const registeredUserFilterationHandler = (results) => {
    const checkForRegistration = results.filter(ele => ele.isRegistered)
    if(checkForRegistration.length < 1){
        return results;
    } else {
        return checkForRegistration;
    }
}

const sendUserInfo = async (req, res) => {
    const { phoneNumber } = req.query;
    const searcherUserId = req.session.userId;
    
    try {
        const results = await sequelize.query(
            `SELECT 
                users.id, users.name, users.phoneNumber, users.email, users.isRegistered, COUNT(spamData.id) AS spamCount
            FROM 
                users 
            LEFT JOIN spamData ON users.phoneNumber = spamData.phoneNumber
            WHERE users.phoneNumber = :phoneNumber 
            GROUP BY users.id;`,
            {
                replacements: { phoneNumber },
                type: QueryTypes.SELECT
            }
        )

        const filteredResults = registeredUserFilterationHandler(results);

        const response = {
            name: filteredResults[0].name,
            phoneNumber,
            spamCount: filteredResults[0].spamCount
        }

        if(searcherUserId == filteredResults[0].id){
            response['email'] = filteredResults[0].email,
            res.status(200).json(response)
            return;
        }

        const searcherProfile = await sequelize.query(
            `Select registeredUserId 
            from users 
            where id = :searcherUserId`, 
            {
                replacements: { searcherUserId }, 
                type: QueryTypes.SELECT
            }
        );

        if((filteredResults.length === 1 && filteredResults[0].id === searcherProfile[0].registeredUserId)){
            response['email'] = filteredResults[0].email,
            res.status(200).json(response)
        } else {
            res.status(200).json(response)
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Search failed." })
    }
}

const searchByName = async (req, res) => {
  const { query } = req.query;
  try {
    const results = await sequelize.query(
        `SELECT
            User.name,
            User.phoneNumber,
            COUNT(spamData.id) AS spamCount
        FROM
            users AS User
        LEFT JOIN
            spamData ON User.id = spamData.reporterId
        WHERE
            User.name LIKE :startWith
         OR User.name LIKE :substring
        GROUP BY
            User.id
        ORDER BY
            CASE
                WHEN User.name LIKE :startWith THEN 0
                ELSE 1
            END,
            User.name;`,
      {
        replacements: { startWith: `${query}%`, substring: `%${query}%` },
        type: QueryTypes.SELECT
      }
    );

    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: "Search failed." });
  }
};

const searchByPhoneNumber = async (req, res) => {
  const { phoneNumber } = req.query;
  try {
    const results = await sequelize.query(
        `SELECT 
            users.name, users.phoneNumber, COUNT(spamData.id) AS spamCount, users.isRegistered
        FROM 
            users 
        LEFT JOIN spamData ON users.phoneNumber = spamData.phoneNumber
        WHERE users.phoneNumber = :phoneNumber 
        GROUP BY users.id;`,
      {
        replacements: { phoneNumber },
        type: QueryTypes.SELECT
      }
    );

    const filteredResults = registeredUserFilterationHandler(results)
    res.status(200).json(filteredResults);

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Search failed." });
  }
};

module.exports = { searchByName, searchByPhoneNumber, sendUserInfo };
