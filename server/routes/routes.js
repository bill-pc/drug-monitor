const express = require('express');// As in the server.js
const route = express.Router(); //Allows us use express router in this file
const services = require('../services/render');//uses the render.js file from services here

const controller = require('../controller/controller');//uses the render.js file from services here

// import middleware validateDrug
const validateDrug = require('../middleware/validateDrug');

route.get('/', services.home);


route.get('/manage', services.manage);
route.get('/dosage', services.dosage);
route.get('/purchase', services.purchase);
route.get('/add-drug', services.addDrug);
route.get('/update-drug', services.updateDrug);



// API for CRUD operations
// route.post('/api/drugs', controller.create);
// route.get('/api/drugs', controller.find);
// route.put('/api/drugs/:id', controller.update);
// route.delete('/api/drugs/:id', controller.delete);

// ================== API for CRUD operations ==================

// Thêm thuốc mới (có validate dữ liệu trước khi tạo)
route.post('/api/drugs', validateDrug, controller.create);

// Lấy danh sách thuốc
route.get('/api/drugs', controller.find);

// Cập nhật thuốc (cũng cần validate lại dữ liệu khi update)
route.put('/api/drugs/:id', validateDrug, controller.update);

// Xóa thuốc
route.delete('/api/drugs/:id', controller.delete);



// API để thực hiện mua thuốc
route.post('/api/purchase', (req, res) => {
    try {
        const { drugs } = req.body; // Lấy danh sách thuốc từ client gửi lên

        if (!drugs || drugs.length === 0) {
            return res.status(400).json({ success: false, message: "No drugs selected" });
        }

        // TODO: Ở đây bạn có thể xử lý lưu đơn hàng vào DB, hoặc tính toán gì đó
        console.log("Purchase request:", drugs);

        return res.status(200).json({
            success: true,
            message: "Purchase success",
            data: drugs
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: "Server error" });
    }
});
module.exports = route;//exports this so it can always be used elsewhere
