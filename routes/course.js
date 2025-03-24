const getAllCourses = (req, res) => {

    let query = "SELECT * FROM `courses` ORDER BY id ASC";

    db.query(query, (err, result) => {
        if (err) {
            return res.redirect('/');
        }

        res.render('courses/index.ejs', {
            title: 'Course Management System',
            courses: result
        });
    });
};

const getAddCoursePage = (req, res) => {
    res.render('courses/add-course.ejs', {
        title: 'Add New Course'
    });
};

const addCourse = (req, res) => {

    const currentTime = Math.floor(Date.now() / 1000);

    const coverUrl = req.body.cover;

    let data = {
        name: req.body.name,
        cover: coverUrl,
        introduction: req.body.introduction,
        start_time: req.body.start_time,
        end_time: req.body.end_time,
        lessons: req.body.lessons,
        price: req.body.price,
        status: req.body.status,
        created_at: currentTime,
        updated_at: currentTime
    };

    let query = "INSERT INTO `courses` SET ?";
    db.query(query, data, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.redirect('/courses');
    });
};

const getEditCoursePage = (req, res) => {
    let courseId = req.params.id;
    
    let query = "SELECT * FROM `courses` WHERE id = ?";
    db.query(query, [courseId], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        
        res.render('courses/edit-course.ejs', {
            title: 'Edit Course',
            course: result[0]
        });
    });
};

const editCourse = (req, res) => {
    let courseId = req.params.id;
    const currentTime = Math.floor(Date.now() / 1000);

    const coverUrl = req.body.cover;
    if (!coverUrl.match(/\.(jpeg|jpg|gif|png)$/i)) {
        return res.status(400).send({
            message: "Cover URL must end with a valid image extension (.jpg, .jpeg, .png, or .gif)"
        });
    }
    
    let data = {
        name: req.body.name,
        cover: coverUrl,
        introduction: req.body.introduction,
        start_time: req.body.start_time,
        end_time: req.body.end_time,
        lessons: req.body.lessons,
        price: req.body.price,
        status: req.body.status,
        updated_at: currentTime
    };
    
    let query = "UPDATE `courses` SET ? WHERE id = ?";
    db.query(query, [data, courseId], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.redirect('/courses');
    });
};

const deleteCourse = (req, res) => {
    let courseId = req.params.id;
    
    let query = "DELETE FROM `courses` WHERE id = ?";
    db.query(query, [courseId], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.redirect('/courses');
    });
};

module.exports = {
    getAllCourses,
    getAddCoursePage,
    addCourse,
    getEditCoursePage,
    editCourse,
    deleteCourse
};