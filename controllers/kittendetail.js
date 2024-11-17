var Kittennew = require('../models/kitten');

exports.kitten_view_one_Page = async function(req, res) {
    console.log("single view for id " + req.query.id)
      try{
      result = await Kittennew.findById(req.query.id)
      res.render('kittendetail', { title: 'kitten Detail', toShow: result });
      }
      catch(err){
      res.status(500)
      res.send(`{'error': '${err}'}`);
      }
      };
  