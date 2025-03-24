const getAllAssignments = async (req, res) => {
    try {
        const filterId = req.query.filter_id || null;

        const [allCoaches, allCourses] = await Promise.all([
            getAllCoaches(),
            getAllCourses()
        ]);

        let query = `
            SELECT cc.id, cc.coach_id, cc.course_id, cc.created_at, cc.updated_at,
                   c.name AS coach_name, co.name AS course_name
            FROM coach_courses AS cc
            JOIN coaches AS c ON cc.coach_id = c.id
            JOIN courses AS co ON cc.course_id = co.id
        `;

        const queryParams = [];
        if (filterId) {
            query += " WHERE cc.course_id = ?";
            queryParams.push(filterId);
        }
        
        query += " ORDER BY cc.id DESC";

        const assignments = await new Promise((resolve, reject) => {
            db.query(query, queryParams, (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });

        res.render('relation/coach-course.ejs', {
            title: 'Course-Coach Assignments',
            assignments: assignments,
            allCoaches: allCoaches,
            allCourses: allCourses,
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

const getAllCourses = () => {
    return new Promise((resolve, reject) => {
        let query = "SELECT id, name, start_time FROM courses ORDER BY name ASC";
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