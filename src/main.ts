import msg from "msg.js";
import { SkyRouter } from "skyrouter";
import superagent from "superagent";
import BrowserInfo from "./BrowserInfo";
import Buyback from "./view/Buyback";
import CheckHolder from "./view/CheckHolder";
import Dashboard from "./view/Dashboard";
import Hourglass from "./view/Hourglass";
import Layout from "./view/Layout";
import NewTransfer from "./view/NewTransfer";
import Mining from "./view/Mining";

(async () => {
    msg.language = BrowserInfo.language;
    msg.parseCSV((await superagent.get("/msg.csv")).text);

    SkyRouter.route("**", Layout);

    SkyRouter.route("", Dashboard);
    SkyRouter.route("mining", Mining);
    SkyRouter.route("newtransfer", NewTransfer);
    SkyRouter.route("buyback", Buyback);
    SkyRouter.route("hourglass", Hourglass);
    SkyRouter.route("checkholder", CheckHolder);

    if (sessionStorage.__spa_path) {
        SkyRouter.go(sessionStorage.__spa_path);
        sessionStorage.removeItem("__spa_path");
    }
})();