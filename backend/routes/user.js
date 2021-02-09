const express = require('express');
const router = express.Router();

router.get('/user', (req,res) => {
    res.json({
        data: "Hey Ronald, welcome to the User API endpoint"
    })
});

module.exports = router;