'use client'

import { useActionState, useRef, useEffect } from 'react'
import { useFormStatus } from 'react-dom'
import { Bot, Loader2, Send, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { handleAssistantQuery, type AssistantState, type Message } from "@/app/assistant/actions"
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card'

const initialState: AssistantState = {
    messages: [],
    error: null,
};

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" size="icon" disabled={pending} aria-label="Enviar pregunta">
            {pending ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
        </Button>
    )
}

export function AssistantClient() {
    const [state, formAction] = useActionState(handleAssistantQuery, initialState)
    const formRef = useRef<HTMLFormElement>(null);
    const chatContainerRef = useRef<HTMLDivElement>(null);
    const { pending } = useFormStatus();

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [state.messages]);


    return (
        <Card className="h-[70vh] flex flex-col">
            <CardHeader>
                <h2 className="text-xl font-semibold">Chat</h2>
            </CardHeader>
            <CardContent ref={chatContainerRef} className="flex-grow overflow-y-auto pr-4 space-y-6">
                {state.messages.map((message, index) => (
                    <div key={index} className={`flex items-start gap-4 ${message.role === 'user' ? 'justify-end' : ''}`}>
                        {message.role === 'assistant' && <div className="p-2 bg-primary rounded-full text-primary-foreground"><Bot className="h-6 w-6" /></div>}
                        <div className={`rounded-lg px-4 py-3 max-w-[80%] ${message.role === 'user' ? 'bg-secondary text-secondary-foreground' : 'bg-muted text-muted-foreground'}`}>
                           <p className="whitespace-pre-wrap">{message.content}</p>
                        </div>
                        {message.role === 'user' && <div className="p-2 bg-secondary rounded-full text-secondary-foreground"><User className="h-6 w-6" /></div>}
                    </div>
                ))}
                {pending && (
                    <div className="flex items-start gap-4">
                        <div className="p-2 bg-primary rounded-full text-primary-foreground">
                            <Bot className="h-6 w-6" />
                        </div>
                        <div className="rounded-lg px-4 py-3 max-w-[80%] bg-muted text-muted-foreground flex items-center">
                            <Loader2 className="h-5 w-5 animate-spin" />
                        </div>
                    </div>
                )}
            </CardContent>
            <CardFooter className="pt-6 border-t">
                <form 
                    ref={formRef}
                    action={(formData) => {
                        formAction(formData);
                        formRef.current?.reset();
                    }} 
                    className="flex w-full items-center space-x-2"
                >
                    <Input id="question" name="question" placeholder="Escribe tu pregunta aquí..." autoComplete="off" disabled={pending}/>
                    <SubmitButton />
                </form>
            </CardFooter>
        </Card>
    )
}
