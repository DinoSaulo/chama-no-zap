chrome.runtime.onInstalled.addListener(function () {
    chrome.storage.sync.set({}, function () {
        console.log("Bem vindo ao Chama no Zap!");
        window.open('./helloPage.html', "_blank")
    });
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [new chrome.declarativeContent.PageStateMatcher({
                //pageUrl: { hostEquals: "developer.chrome.com" }
            })
            ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
    });
});

chrome.contextMenus.create({
    id: "abrirContato-CNZ",
    title: "Abrir este contato no WhatsApp",
    contexts: ["selection"],
});

chrome.contextMenus.onClicked.addListener(function(clickData){
    if (clickData.menuItemId == "abrirContato-CNZ" && clickData.selectionText){
        
        let phone_number = clickData.selectionText.replace(/\D/g, '');
        
        if (phone_number != "" && phone_number.length > 10) {
            chrome.storage.sync.set({'phone_number': phone_number}, function() {
                let whatsAppLink = `https://api.whatsapp.com/send?phone=55${phone_number}&text=&source=&data=`;
                window.open(whatsAppLink, "_blank")
            });
        } else {
            var notifyOptions = {
                type: 'basic',
                iconUrl: 'images/chama_no_zap48.png',
                title: 'Este número de telefone não é válido!',
                mensage: 'Por favor verifique o número selecionado.'
            };
            //chrome.notifications.create('limitNotif', notifyOptions);
            alert('Este número de telefone não é válido!');
        }
    }
})

/* ------------------------ To Implement Before
chrome.contextMenus.create({
    id: "enviarMensagem-CNZ",
    title: "Enviar mensagem pelo Chama no Zap",
    contexts: ["selection"],
});

chrome.contextMenus.onClicked.addListener(function(clickData){
    if (clickData.menuItemId == "enviarMensagem-CNZ" && clickData.selectionText){
        
        let phone_number = clickData.selectionText.replace(/\D/g, '');
        
        if (phone_number != "" && phone_number.length > 10) {
            // TODO
        } else {
            alert('Este número de telefone não é válido!');
        }
    }
})*/