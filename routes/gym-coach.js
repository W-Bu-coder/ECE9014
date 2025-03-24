
const getAllAssignments = async (req, res) => {
    try {
        const filterId = req.query.filter_id || null;

        const [allCoaches, allGyms] = await Promise.all([
            getAllCoaches(),
            getAllGyms()
        ]);

        let query = `
            SELECT gc.id, gc.coach_id, gc.gym_id, gc.created_at, gc.updated_at,
                   c.name AS coach_name, g.name AS gym_name
            FROM gym_coaches AS gc
            JOIN coaches AS c ON gc.coach_id = c.id
            JOIN gyms AS g ON gc.gym_id = g.id
        `;

        const queryParams = [];
        if (filterId) {
            query += " WHERE gc.gym_id = ?";
            queryParams.push(filterId);
        }
        
        query += " ORDER BY gc.id DESC";

        const assignments = await new Promise((resolve, reject) => {
            db.query(query, queryParams, (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });

        res.render('relation/gym-coach.ejs', {
            title: 'Gym-Coach Assignments',
            assignments: assignments,
            allCoaches: allCoaches,
            allGyms: allGyms,
            filterId: filterId
        });
    } catch (err) {
        res.status(500).send(err);
    }
};

const getAllCoaches = () => {
    return new Promise((resolve, reject) => {
        let query = "SELECT id, name, title FROM coaches WHERE status = 1 ORDER BY name ASC";
        db.query(query, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};

const getAllGyms = () => {
    return new Promise((resolve, reject) => {
        let query = "SELECT id, name, city FROM gyms ORDER BY name ASC";
        db.query(query, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};

module.exports = {
    getAllAssignments
};