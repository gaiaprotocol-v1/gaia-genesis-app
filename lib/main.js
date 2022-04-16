"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const msg_js_1 = __importDefault(require("msg.js"));
const skyrouter_1 = require("skyrouter");
const superagent_1 = __importDefault(require("superagent"));
const BrowserInfo_1 = __importDefault(require("./BrowserInfo"));
const Buyback_1 = __importDefault(require("./view/Buyback"));
const CheckHolder_1 = __importDefault(require("./view/CheckHolder"));
const Dashboard_1 = __importDefault(require("./view/Dashboard"));
const Hourglass_1 = __importDefault(require("./view/Hourglass"));
const Layout_1 = __importDefault(require("./view/Layout"));
const NewTransfer_1 = __importDefault(require("./view/NewTransfer"));
const Mining_1 = __importDefault(require("./view/Mining"));
(async () => {
    msg_js_1.default.language = BrowserInfo_1.default.language;
    msg_js_1.default.parseCSV((await superagent_1.default.get("/msg.csv")).text);
    skyrouter_1.SkyRouter.route("**", Layout_1.default);
    skyrouter_1.SkyRouter.route("", Dashboard_1.default);
    skyrouter_1.SkyRouter.route("mining", Mining_1.default);
    skyrouter_1.SkyRouter.route("newtransfer", NewTransfer_1.default);
    skyrouter_1.SkyRouter.route("buyback", Buyback_1.default);
    skyrouter_1.SkyRouter.route("hourglass", Hourglass_1.default);
    skyrouter_1.SkyRouter.route("checkholder", CheckHolder_1.default);
    if (sessionStorage.__spa_path) {
        skyrouter_1.SkyRouter.go(sessionStorage.__spa_path);
        sessionStorage.removeItem("__spa_path");
    }
})();
//# sourceMappingURL=main.js.map