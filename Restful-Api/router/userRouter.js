const { json } = require('express');

const router = require('express').Router();


const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');
const userController = require('../controllers/userController');

// Tüm kullanıcıları sadece admin listeleyebilsin
router.get('/', [authMiddleware, adminMiddleware], userController.allUserList);
// oturum açan kullanıcıların bilgilerini gösterir.
router.get('/me', authMiddleware, userController.userInformation);
//oturum açan kullanıcıyı güncelleme işlemleri
router.patch('/me', authMiddleware, userController.userInfoUpdate);
// Yeni kullanıcı oluşturma
router.post('/', userController.createNewUser);
// Sisteme giriş işlemleri
router.post('/giris', userController.login);
// Admin tarafından user bilgi güncellemeleri
router.patch('/:id', userController.adminUserUpdate);
// Admin tarafından tüm kullanıcıların silinmesi
router.delete('/deleteAll', [authMiddleware, adminMiddleware], userController.deleteAllUser);
// Kullanıcının kendisini silmesi
router.delete('/me', authMiddleware, userController.deleteUser);
// Adminin bir adet kullanıcıyı silmesi
router.delete('/:id', [authMiddleware, adminMiddleware], userController.adminUserDelete);

module.exports = router;