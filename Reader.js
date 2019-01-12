function ReadMessage(message,x,y,z,b,d,mod) {
    var defaultJSON = {
        "position": [x, y, z],
        "block": b,
        "data": d,
        "buildMod": mod
    };
    var chat = message.trim().split(" ");
    if (chat[1] == "-h" || chat[1] == "-help" || chat[1] == "h" || chat[1] == "help") {
        defaultJSON = {
            "showhelp": chat[0]
        };
        return defaultJSON;
    } else if (chat.indexOf("-p") != -1) {
        defaultJSON.position = [chat[chat.indexOf("-p") + 1], chat[chat.indexOf("-p") + 2], chat[chat.indexOf("-p") + 3]]
    }
    if (chat.indexOf("-b") != -1) {
        defaultJSON.block = chat[chat.indexOf("-b") + 1]
    }
    if (chat.indexOf("-d") != -1) {
        defaultJSON.data = chat[chat.indexOf("-d") + 1]
    }
    if (chat.indexOf("-m") != -1) {
        console.log(chat.indexOf("-m"));
        defaultJSON.buildMod = chat[chat.indexOf("-m") + 1]
    }
    if (chat[0] == "let") {
        switch (chat[1]) {
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
        return defaultJSON;
    }
    return defaultJSON;
}
console.log(ReadMessage("round",10,10,10,"glass",10,"keep"));
// module.export = ReadMessage();
