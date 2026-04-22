import mongo from "mongoose";
const appSchema = new mongo.Schema(
    {
        Name: {
            type: String,
            required: true
        },
        Icon: {
            type: String,
            required: true
        },
        AppId: {
            type: String,
            required: true
        }
    }, { timestamps: true }
)
const appListDb = mongo.model("AppList", appSchema);
export { appListDb };

