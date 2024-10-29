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
const axios_1 = __importDefault(require("axios"));
const chitRouter = express_1.default.Router();
//, authenticateToken, authorizeRole(['Admin', 'Chit Creator', 'Participant']),
chitRouter.post('/addChitfund', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.post('http://localhost:3000/createChitfund', req.body);
        console.log('Chit Fund created successfully:', response.data);
        res.status(201).send("chit fund created successfully");
    }
    catch (error) {
        console.error('Error creating Chit Fund:', error);
    }
}));
chitRouter.post('/updateChitfund/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        console.log(id);
        const response = yield axios_1.default.post(`http://localhost:3000/updatechitfundbyid/${id}`, req.body);
        console.log('Chit Fund updated  successfully:', response.data);
        res.status(201).send("chit fund created successfully");
    }
    catch (error) {
        console.error('Error creating Chit Fund:', error);
    }
}));
chitRouter.get('/getChitfundsByCreator/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // console.log("inside the getchitfundsParticpant")
        const id = req.params.id;
        const response = yield axios_1.default.get(`http://127.0.0.1:3000/getchitfundbyCreatorid/${id}`);
        console.log('Chit Funds =', response.data);
        res.status(201).json(response.data);
    }
    catch (error) {
        console.error('Error getting Chit Fund:', error);
    }
}));
chitRouter.get('/getChitfundsByParticipant/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("inside the getchitfundsParticpant");
        const id = req.params.id;
        const response = yield axios_1.default.get(`http://127.0.1:3000/getchitfundbyparticipantid/${id}`);
        console.log('Chit Funds =', response.data);
        res.status(201).json(response.data);
    }
    catch (error) {
        console.error('Error getting Chit Fund:', error);
    }
}));
chitRouter.get('/getchitfunds', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("inside the getchitfunds");
        const response = yield axios_1.default.get('http://127.0.1:3000/getchitfunds');
        console.log('Chit Funds =', response.data);
        res.status(201).json(response.data);
    }
    catch (error) {
        console.error('Error getting Chit Fund:', error);
    }
}));
exports.default = chitRouter;
