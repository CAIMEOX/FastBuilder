module.exports = {
    ReadMessage(root,message,x,y,z,b,d,mod,e){
        if(message == undefined)return;
        var defaultJSON = {};
        var chat = message.trim().split(" ");
        defaultJSON.get = chat[0] == "get" ? chat[1] :null;
        defaultJSON.buildType = chat[0] == "sudo" ? chat[1] : chat[0];
        defaultJSON.entity = chat.indexOf("entity") != -1 ? chat[chat.indexOf("entity") + 1] : chat.indexOf("-e") != -1 ? chat[chat.indexOf("-e") + 1] : e;
        defaultJSON.position = chat.indexOf("pos") != -1 ? [chat[chat.indexOf("pos")+1],chat[chat.indexOf("pos")+1],chat[chat.indexOf("pos")+1]] : chat.indexOf("-p") != -1 ? [chat[chat.indexOf("-p") + 1], chat[chat.indexOf("-p") + 2], chat[chat.indexOf("-p") + 3]] : [x,y,z];
        defaultJSON.block = chat.indexOf("block") != -1 ? chat[chat.indexOf("block") + 1] : chat.indexOf("-b") != -1 ? chat[chat.indexOf("-b") + 1] : b;
        defaultJSON.data =  chat.indexOf("data") != -1 ? chat[chat.indexOf("data") + 1] : chat.indexOf("-d") != -1 ? chat[chat.indexOf("-d") + 1] : d;
        defaultJSON.buildMod = chat.indexOf("mod") != -1 ? chat[chat.indexOf("mod")+1] : chat.indexOf("-m") != -1 ? chat[chat.indexOf("-m") + 1] : mod;
        defaultJSON.radius = chat.indexOf("-r") != -1 ? chat[chat.indexOf("-r") + 1] : null;
        defaultJSON.delays = chat.indexOf("-t") != -1 ? chat[chat.indexOf("-t") + 1] : 10;
        defaultJSON.height = chat.indexOf("-h") != -1 ? chat[chat.indexOf("-h") + 1] - 1 : 0;
        defaultJSON.shape = chat.indexOf("-s") != -1 ? chat[chat.indexOf("-s") + 1] : "hollow";
        defaultJSON.float = chat.indexOf("-f") != -1 ? chat[chat.indexOf("-f") + 1] : 50;
        defaultJSON.entityMod = chat.indexOf("-em") != -1 ? chat[chat.indexOf("-em") + 1] : false;
        defaultJSON.showhelp = (chat[0] == "help" && (chat[1] != "-l" && chat[1] != "--list") && chat[1] != undefined)? chat[1]:null;
        defaultJSON.showhelp = (chat[1] == "help" || chat[1] == "h" || chat[1] == "-h" || chat[1] == "--help") ? chat[0] : null;
        defaultJSON.listhelps = (chat[0] == "help" && chat[1] != "-l" && chat[1] != "--list") ? true : false;
        defaultJSON.listhelp = (chat[0] == "help" && (chat[1] == "-l" || chat[1] == "--list")) ? true : false;
        defaultJSON.close = (chat[0] == "close" || chat[0] == "closewebsocket") ? true : false;
        defaultJSON.writeDefaultData = chat[0] == "let" ? true : false;
        defaultJSON.sudo = chat[0] == "sudo" ? true : root;
        defaultJSON.root = chat[0] == "sudo" && chat[1] == "su" ? true : false;
        defaultJSON.others = chat.indexOf("ellipse") != -1 ? [chat[chat.indexOf("ellipse")+1],chat[chat.indexOf("ellipse")+2],chat[chat.indexOf("ellipse")+3]]:chat.indexOf("ellipsoid") != -1?[chat[chat.indexOf("ellipsoid")+1],chat[chat.indexOf("ellipsoid")+2],chat[chat.indexOf("ellipsoid")+3]]:[chat[chat.indexOf("torus")+1],chat[chat.indexOf("torus")+2],chat[chat.indexOf("torus")+3]];
        defaultJSON.direction = chat.indexOf("x") != -1 ? "x":chat.indexOf("y") != -1?"y":"z";
        return defaultJSON;
    }
};