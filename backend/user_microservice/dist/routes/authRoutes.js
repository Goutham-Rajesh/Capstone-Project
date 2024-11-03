"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const auth_1 = require("../middleware/auth");
const User_1 = __importDefault(require("../models/User"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const router = express_1.default.Router();
router.post('/register', authController_1.register);
router.post('/login', authController_1.login);
router.get('/users', auth_1.authenticateToken, (0, auth_1.authorizeRole)(['Admin', 'Chit Creator']), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield User_1.default.findAll();
    res.json(users);
}));
router.get('/user/:id', auth_1.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield User_1.default.findByPk(req.params.id);
    res.json(users);
}));
// Assuming authenticateToken is a middleware for authentication
router.get('/user/email/:email', auth_1.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findOne({
            where: {
                email: req.params.email,
            }
        });
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.json(user);
    }
    catch (error) {
        console.error("Error retrieving user by email:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}));
router.post('/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.body;
    try {
        user.forEach((user) => __awaiter(void 0, void 0, void 0, function* () {
            user.password = yield bcryptjs_1.default.hash(user.password, 10);
            yield User_1.default.create(user);
        }));
        console.log('added user');
    }
    catch (error) {
        console.error('Error adding user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
    res.json({ message: 'Users added successfully' });
}));
router.get('/user/getemail/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield User_1.default.findByPk(req.params.id);
    res.json({ email: users === null || users === void 0 ? void 0 : users.email });
}));
exports.default = router;
