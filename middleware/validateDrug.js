module.exports = function (req, res, next) {
    const { name, dosage, card, pack, perDay } = req.body;

    // a. Name length > 5
    if (!name || name.trim().length <= 5) {
        return res.status(400).json({ message: "Name must be longer than 5 characters" });
    }

    // b. Dosage format: XX-morning,XX-afternoon,XX-night (X là digit)
    const dosageRegex = /^\d+-morning,\d+-afternoon,\d+-night$/;
    if (!dosage || !dosageRegex.test(dosage)) {
        return res.status(400).json({
            message: "Dosage must follow format: XX-morning,XX-afternoon,XX-night"
        });
    }

    // c. Card > 1000
    if (isNaN(card) || Number(card) <= 1000) {
        return res.status(400).json({ message: "Card must be more than 1000" });
    }

    // d. Pack > 0
    if (isNaN(pack) || Number(pack) <= 0) {
        return res.status(400).json({ message: "Pack must be more than 0" });
    }

    // e. PerDay > 0 and < 90
    if (isNaN(perDay) || Number(perDay) <= 0 || Number(perDay) >= 90) {
        return res.status(400).json({ message: "PerDay must be > 0 and < 90" });
    }

    // Nếu tất cả hợp lệ → cho đi tiếp
    next();
};
