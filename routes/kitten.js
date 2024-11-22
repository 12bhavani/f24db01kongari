var express = require('express');
kitten_controlers = require('../controllers/kitten');
var router = express.Router();
 
/* GET kitten page. */
const secured = (req, res, next) => {if (req.user){
                    return next();
                    }
                 res.redirect("/login");}

                                        
router.get('/', kitten_controlers.kitten_view_all_Page);
router.get('kitten/:id', kitten_controlers.kitten_detail);
router.get('/detail', kitten_controlers.kitten_view_one_Page);
router.delete('/:id', kitten_controlers.kitten_delete);
router.get('/create', kitten_controlers.kitten_create_Page); 
router.get('/update', secured, kitten_controlers.kitten_update_Page);
router.get('/delete', kitten_controlers.kitten_delete_Page);


module.exports = router;