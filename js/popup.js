let submit = document.getElementById('enviar');

submit.onclick = function (element) {
    let country_code = document.getElementById('pais').value;
    let number = (document.getElementById('numero').value).replace(/\D/g, '');
    let mensage = document.getElementById('mensagem').value;

    let whatsAppLink = `https://api.whatsapp.com/send?phone=${country_code}${number}&text=${mensage}&source=&data=`;

    if (number != "" && number.length > 10) {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.executeScript(
                window.open(whatsAppLink, "_blank")
            );
        });
    } else {
        alert("Por favor digite um número de telefone válido!")
    }
};