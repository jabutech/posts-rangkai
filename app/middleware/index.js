// Import model user
const User = require("../user/model");
// Import jwt
const jwt = require("jsonwebtoken");
// Import config
const config = require("../../config");

module.exports = {
  isLoginUser: async (req, res, next) => {
    try {
      // Cek apakah client user ada melampirkan token
      const token = req.headers.authorization
        ? //   Jika ada replace tambahkan `Bearer ` didepannya token
          req.headers.authorization.replace("Bearer ", "")
        : // Jika tidak ada kirim null
          null;

      //  Verify token dengan secretKey apakah sama
      const tokenVerify = jwt.verify(token, config.secretKey);

      //   Cari user berdasarkan id user yang ingin login
      const user = await User.findOne({ _id: tokenVerify.user.id });

      //   Jika user tidak ditemukan kirim error
      if (!user) {
        throw new Error();
      }

      // Jika user ada, set data user dan token yang sedang login ke argument request
      // Tujuannya agar ketika akses data yang harus perlu token bisa diverivikasi langsung dari argument request
      req.user = user;
      req.token = token;
      // Lanjutkan proses
      next();
    } catch (err) {
      // Handle error
      res.status(401).json({
        message: "ERROR",
        data: "Not authorized to access this resource",
      });
    }
  },
};
