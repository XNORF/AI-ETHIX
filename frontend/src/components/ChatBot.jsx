import { useState } from "react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from "@chatscope/chat-ui-kit-react";

const ChatBot = () => {
    const [messages, setMessages] = useState([
        {
            message: "Hello, I'm AI-Ethix chatbot! Ask me anything related to ethical AI!",
            sentTime: "just now",
            direction: "incoming",
            sender: "AI-ETHIX",
        },
    ]);
    const [isTyping, setIsTyping] = useState(false);
    const [query, setQuery] = useState("");

    const handleSend = async (message) => {
        setQuery(message);
        const newMessage = {
            message,
            direction: "outgoing",
            sender: "user",
        };

        const newMessages = [...messages, newMessage];

        setMessages(newMessages);

        // Initial system message to determine ChatGPT functionality
        setIsTyping(true);
        await processMessageToChatGPT(newMessages);
    };

    async function processMessageToChatGPT(chatMessages) {
        // Format messages for chatGPT API
        let apiMessages = chatMessages.map((messageObject) => {
            let role = "";
            if (messageObject.sender === "AI-ETHIX") {
                role = "assistant";
            } else {
                role = "user";
            }
            return { role: role, content: messageObject.message };
        });
        const url = import.meta.env.VITE_URL;
        const response = await fetch(url + "chat/query", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ query, apiMessages }),
        });
        const json = await response.json();
        if (response.ok) {
            setMessages([
                ...chatMessages,
                {
                    message: json,
                    direction: "incoming",
                    sender: "ChatGPT",
                },
            ]);
            setIsTyping(false);
        } else {
            setIsTyping(false);
        }
    }
    //RETURN THE HTML
    return (
        <div className="ChatBot">
            <div style={{ position: "absolute", height: "70vh", width: "100vh", top: "50%", left: "50%", transform: "translate(-50%, -50%)", boxShadow: 24, p: 4 }}>
                <MainContainer>
                    <ChatContainer>
                        <MessageList scrollBehavior="smooth" typingIndicator={isTyping ? <TypingIndicator content="ChatGPT is typing" /> : null}>
                            {messages.map((message, i) => {
                                //console.log(message);
                                return <Message key={i} model={message} />;
                            })}
                        </MessageList>
                        <MessageInput placeholder="Type message here" onSend={handleSend} />
                    </ChatContainer>
                </MainContainer>
            </div>
        </div>
    );
};
export default ChatBot;
