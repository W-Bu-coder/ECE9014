const getAllCoaches = (req, res) => {

    let query = "SELECT * FROM `coaches` ORDER BY id ASC";

    db.query(query, (err, result) => {
        if (err) {
            return res.redirect('/');
        }
        
        res.render('coaches/index.ejs', {
            title: 'Coach Management System',
            coaches: result
        });
    });
};

const getAddCoachPage = (req, res) => {
    res.render('coaches/add-coach.ejs', {
        title: 'Add New Coach'
    });
};

const addCoach = (req, res) => {

    const currentTime = Math.floor(Date.now() / 1000);
    
    let data = {
        name: req.body.name,
        avatar: req.body.avatar,
        title: req.body.title,
        introduction: req.body.introduction,
        status: req.body.status,
        created_at: currentTime,
        updated_at: currentTime
    };

    let query = "INSERT INTO `coaches` SET ?";
    db.query(query, data, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.redirect('/coaches');
    });
};

const getEditCoachPage = (req, res) => {
    let coachId = req.params.id;
    
    let query = "SELECT * FROM `coaches` WHERE id = ?";
    db.query(query, [coachId], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        
        res.render('coaches/edit-coach.ejs', {
            title: 'Edit Coach',
            coach: result[0]
        });
    });
};


const editCoach = (req, res) => {
    let coachId = req.params.id;
    const currentTime = Math.floor(Date.now() / 1000);
    
    let data = {
        name: req.body.name,
        avatar: req.body.avatar,
        title: req.body.title,
        introduction: req.body.introduction,
        status: req.body.status,
        updated_at: currentTime
    };
    
    let query = "UPDATE `coaches` SET ? WHERE id = ?";
    db.query(query, [data, coachId], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.redirect('/coaches');
    });
};

const deleteCoach = (req, res) => {
    let coachId = req.params.id;
    
    let query = "DELETE FROM `coaches` WHERE id = ?";
    db.query(query, [coachId], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.redirect('/coaches');
    });
};

module.exports = {
    getAllCoaches,
    getAddCoachPage,
    addCoach,
    getEditCoachPage,
    editCoach,
    deleteCoach
};