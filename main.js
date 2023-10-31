setInterval(highlighAll, 1000);

function highlighAll () {
    document.querySelectorAll("pre code").forEach(block => {
        hljs.highlighBlock(block);
    });
}

    const chatBox = document.querySelector(".chat-box");
    const messageInput = document.querySelector("#message-input");
    const sendBtn = document.querySelector("#send-btn");

function addMessage (message, isUserMessage) {

    const messageDiv = document.createElement("div");
    messageDiv.classList.add("mt-3", "p-3", "rounded");

    if(isUserMessage) {
        message.classList.add("user-message");

    } else {
        messageDiv.classList.add("bot-message");
    }

// imagem dos icones de interface

messageDiv.innerHTML = `
<img src="{{ url_for('static', filename'images/user.png')
}}" class="user-icon"><p>${message}</p>
`;

chatBox.appendChild(messageDiv);
chatBox.scrollTop = chatBox.scrollHeight;

}

function sendMessage () {

    const message = messageInput.value.trim();

    if(message !== "") {
        addMessage(message, true);

        fetch("/api", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({message})
        })

        .then(response => response.json())
        .then(data => {
                messageInput.value = "";
            const messageDiv = document.createElement("div");
            messageDiv.classList.add("mt-3", "p-3", "rounded");
            messageDiv.classList.add("bot-message");

            const content = data.content; 

            const hasCodeBlock = content.includes("```");

            if(hasCodeBlock) {
                    const codeContent = content.replace(/```([\s\S]+?)```/g, '</p><pre><code>$1</code></pre><p>');

                messageDiv.innerHTML = `<img src="{{ url_for('static', filename='images/gpt.png')}}" 
                class="bot-icon"><p>${codeContent}</p>`;

            } else {
                messageDiv.innerHTML = `<img src="{{ url_for('static', filename='images/gpt.png')}}" 
                class="bot-icon"><p>${Content}</p>`

            }
            chatBox.appendChild(messageDiv);
            chatBox.scrollTop = chatBox.scrollHeight;
        })


    }


}