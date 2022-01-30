import { SkyRouter } from "skyrouter";
import Layout from "./view/Layout";
import Dashboard from "./view/Dashboard";
import Mining from "./view/Mining";
import Buyback from "./view/Buyback";
import Hourglass from "./view/Hourglass";

(async () => {
    SkyRouter.route("**", Layout);

    SkyRouter.route("", Dashboard);
    SkyRouter.route("mining", Mining);
    SkyRouter.route("buyback", Buyback);
    SkyRouter.route("hourglass", Hourglass);

    if (sessionStorage.__spa_path) {
        SkyRouter.go(sessionStorage.__spa_path);
        sessionStorage.removeItem("__spa_path");
    }
})();