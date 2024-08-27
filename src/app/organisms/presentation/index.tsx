"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { socket } from "../../../socket";

export const Presentation = () => {

    const [messages, setMessages] = useState([]);

    const [isConnected, setIsConnected] = useState(false);
    const [transport, setTransport] = useState("N/A");
    
    useEffect(() => {
        if (socket.connected) {
          onConnect();
        }
    
        function onConnect() {
          setIsConnected(true);
          setTransport(socket.io.engine.transport.name);
    
          socket.io.engine.on("upgrade", (transport) => {
            setTransport(transport.name);
          });
        }
    
        function onDisconnect() {
          setIsConnected(false);
          setTransport("N/A");
        }
    
        socket.on("connect", onConnect);
        socket.on("disconnect", onDisconnect);
    
        return () => {
          socket.off("connect", onConnect);
          socket.off("disconnect", onDisconnect);
        };
      }, []);

    const sendMessage = () => {
        // TODO: send message
    }

    return (
        <section className="w-full h-screen
        flex items-center justify-center
        bg-white">

            <div>
            <p>Status: { isConnected ? "connected" : "disconnected" }</p>
            <p>Transport: { transport }</p>
            </div>
            
            <div className="relative h-[95vh] w-[650px] px-4 py-6
            flex flex-col items-center justify-end gap-6
            rounded-2xl
            shadow-2xl
            border-2 border-black
            bg-green-500"
            >
                {/* <div className="absolute w-full h-full
                bg-[url('/icons/console.png')]
                bg-opacity-20
                bg-center bg-[length:64px_64px]
                "></div> */}
                
                <div className="h-full
                flex flex-col justify-end">
                    { messages }
                </div>

                <div className="w-4/5 px-4 py-2
                flex
                rounded-3xl
                border-[1px] border-black
                shadow-md
                bg-white">
                    <input
                    className="flex grow
                    focus:outline-none"
                    type="text" />
                    <Image
                    onClick={ () => sendMessage }
                    width={ 32 }
                    height={ 32 }
                    alt="Send icon"
                    src={"/icons/send.png"}
                    />
                </div>
            </div>

        </section>
    );
}
