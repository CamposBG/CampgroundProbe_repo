const express = require('express');
const router = express.Router();
 

router.get("/", (req, res) => {
    res.render('Portifolio/portifolio_index.ejs')
})
router.get("/project2", (req, res) => {
    res.render('Portifolio/comissioned_bootstrap.ejs')
})

module.exports = router;