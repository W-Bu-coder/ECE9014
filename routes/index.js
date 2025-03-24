const getHomePage = (req, res) => {
    let query = "SELECT * FROM `gyms` ORDER BY id ASC";
    db.query(query, (err, result) => {
        if (err) {
            return res.redirect('/');
        }

        res.render('index.ejs', {
            title: 'Gym Management System',
            gyms: result
        });
    });
};

const getAddPage = (req, res) => {
    res.render('add-gym.ejs', {
        title: 'Add New Gym'
    });
};


const addGym = (req, res) => {
    let data = {
        merchant_id: req.body.merchant_id,
        name: req.body.name,
        address: req.body.address,
        cover: req.body.cover,
        city: req.body.city,
        lat: req.body.lat,
        lon: req.body.lon,
        contact: req.body.contact,
        telephone: req.body.telephone,
        description: req.body.description,
        status: req.body.status
    };
    
    let query = "INSERT INTO `gyms` SET ?";
    db.query(query, data, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.redirect('/');
    });
};


const getEditPage = (req, res) => {
    let gymId = req.params.id;
    
    let query = "SELECT * FROM `gyms` WHERE id = ?";
    db.query(query, [gymId], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        
        res.render('edit-gym.ejs', {
            title: 'Edit Gym',
            gym: result[0]
        });
    });
};


const editGym = (req, res) => {
    let gymId = req.params.id;
    
    let data = {
        merchant_id: req.body.merchant_id,
        name: req.body.name,
        address: req.body.address,
        cover: req.body.cover,
        city: req.body.city,
        lat: req.body.lat,
        lng: req.body.lng,
        contact: req.body.contact,
        telephone: req.body.telephone,
        description: req.body.description,
        status: req.body.status
    };
    
    let query = "UPDATE `gyms` SET ? WHERE id = ?";
    db.query(query, [data, gymId], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.redirect('/');
    });
};

const deleteGym = (req, res) => {
    let gymId = req.params.id;
    
    let query = "DELETE FROM `gyms` WHERE id = ?";
    db.query(query, [gymId], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.redirect('/');
    });
};


module.exports = {
    getHomePage,
    getAddPage,
    addGym,
    getEditPage,
    editGym,
    deleteGym
};