/**
 * Task: CleanExpiredQr
 * Responsibilities:
 * - Delete expired QR codes from the database.
 * - Log deleted QRs.
 * Collaborators:
 * - Qr (Model)
 * - fs
 * - Sequelize Op
 */
const { Qr } = require("../models");
const fs = require("fs");
const { Op } = require("sequelize");

const cleanExpiredQr = async () => {
    try {
        const now = new Date();

        const expiredQrs = await Qr.findAll({
            where: { expiration: { [Op.lt]: now } },
        });

        if (expiredQrs.length > 0) {
            if (!fs.existsSync("./logs")) {
                fs.mkdirSync("./logs");
            }
            fs.appendFileSync(
                "./logs/expired_qrs.log",
                JSON.stringify(expiredQrs, null, 2)
            );
        }

        await Qr.destroy({
            where: { expiration: { [Op.lt]: now } },
        });

    } catch (error) {
        console.error("Error cleaning expired QRs:", error.message);
    }
};

module.exports = cleanExpiredQr;