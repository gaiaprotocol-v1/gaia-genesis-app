import { SkyRouter } from "skyrouter";
import Buyback from "./view/Buyback";
import CheckHolder from "./view/CheckHolder";
import Dashboard from "./view/Dashboard";
import Hourglass from "./view/Hourglass";
import Layout from "./view/Layout";
import Mining from "./view/Mining";

(async () => {
    SkyRouter.route("**", Layout);

    SkyRouter.route("", Dashboard);
    SkyRouter.route("mining", Mining);
    SkyRouter.route("buyback", Buyback);
    SkyRouter.route("hourglass", Hourglass);
    SkyRouter.route("checkholder", CheckHolder);

    if (sessionStorage.__spa_path) {
        SkyRouter.go(sessionStorage.__spa_path);
        sessionStorage.removeItem("__spa_path");
    }
})();