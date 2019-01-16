module.exports = {
    ReadMessage(message,x,y,z,b,d,mod,e) {
        if(message == undefined)return;
        var defaultJSON = {
            "entity":e,
            "entityMod":false,
            "float":10,
            "others":[0,0,0],
            "shape":"hollow",
            "height":0,
            "delays":10,
            "radius":0,
            "direction":null,
            "writeDefaultData":false,
            "position": [x, y, z],
            "block": b,
            "data": d,
            "buildMod": mod,
            "buildType":null
        };
        var chat = message.trim().split(" ");
        defaultJSON.buildType = chat[0];
        if (chat[1] == "-h" || chat[1] == "-help" || chat[1] == "h" || chat[1] == "help") {
            defaultJSON = {
                "showhelp": chat[0]
            };
            return defaultJSON;
        }else if (chat[0] == "get"){
            defaultJSON = {
                "get": chat[1]
            };
        }
        if (chat.indexOf("-p") != -1) {
            defaultJSON.position = [chat[chat.indexOf("-p") + 1], chat[chat.indexOf("-p") + 2], chat[chat.indexOf("-p") + 3]]
        }
        if (chat.indexOf("-b") != -1) {
            defaultJSON.block = chat[chat.indexOf("-b") + 1]
        }
        if (chat.indexOf("-d") != -1) {
            defaultJSON.data = chat[chat.indexOf("-d") + 1]
        }
        if (chat.indexOf("-m") != -1) {
            defaultJSON.buildMod = chat[chat.indexOf("-m") + 1]
        }
        if (chat.indexOf("-r") != -1){
            defaultJSON.radius = chat[chat.indexOf("-r") + 1]
        }
        if (chat.indexOf("-t") != -1){
            defaultJSON.delays = chat[chat.indexOf("-t") + 1]
        }
        if (chat.indexOf("-h") != -1){
            defaultJSON.height = chat[chat.indexOf("-h") + 1] - 1
        }
        if (chat.indexOf("-s") != -1){
            defaultJSON.shape = chat[chat.indexOf("-s") + 1]
        }
        if (chat.indexOf("-f") != -1){
            defaultJSON.float = chat[chat.indexOf("-f") + 1]
        }
        if (chat.indexOf("-em") != -1){
            defaultJSON.entityMod = chat[chat.indexOf("-em") + 1]
        }
        if (chat.indexOf("-e") != -1){
            defaultJSON.entity =chat[chat.indexOf("-e") + 1]
        }
        if (chat[0] == "let") {
            switch (chat[1]) {
                case "entity":
                    defaultJSON.entity = chat[2];
                    break;
                case "block":
                    defaultJSON.block = chat[2];
                    break;
                case "data":
                    defaultJSON.data = chat[2];
                    break;
                case "mod":
                    defaultJSON.buildMod = chat[2];
                    break;
                case "pos" || "position": defaultJSON.position = [chat[2], chat[3], chat[4]];
                    break;
                default:
                    break;
            }
            defaultJSON.writeDefaultData = true;
            return defaultJSON;
        }
        if (chat[0] == "ellipse" || chat[0] == "ellipsoid" || chat[0] == "torus"){
            defaultJSON.others = [chat[1],chat[2],chat[3]];
        }else if (chat[1] == "x" || chat[1] == "y" || chat[1] == "z")defaultJSON.direction = chat[1];
        return defaultJSON;
    }
}
//console.log(ReadMessage("round",10,10,10,"glass",10,"keep"));
