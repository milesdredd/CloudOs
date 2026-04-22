import { appListDb } from "../model/appList.model.js";
async function handleAppList(req, res) {
    try {

        console.log("fetching available apps... ");
        const apps = await appListDb.find();
        // super roles can acess more apps ? 

        res.status(200).send(apps);
    }
    catch (e) {
        console.log({ msg: "error getting app  list " });
        console.log(e);
        res.status(400).json({ msg: "error getting app list" });
    }


}
async function addApp(req, res) {
    try {
        const { Name, Icon, AppId } = req.body;
        const newApp = await appListDb.create(
            {
                Name,
                Icon,
                AppId
            }
        )
        console.log("***** App Created ****")
        console.log(newApp);
        console.log("*******************")
        res.status(201).json(newApp);
    } catch (e) {
        console.log(e);
        console.log("err create new app");
    }

}
export { handleAppList, addApp };