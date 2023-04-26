function generateResponse(req, res, next) {
    console.log('Se recibió unas solicitud de MANYCHAT');

    let data = req.body;
    console.log(data);

    let response = {
        "response": "La respuesta del chatbot"
    };
      
    
    setTimeout(() => {
        res.send(response);
    }, 3000);
}

module.exports = {
    generateResponse
}