import os
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Dict
import groq

router = APIRouter(prefix="/chat", tags=["chat"])

# Define request schema
class ChatMessage(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    messages: List[ChatMessage]

# Bina's System Prompt
BINA_SYSTEM_PROMPT = """Você é a Bina, a assistente virtual e especialista oficial da Clínica La Prime.
Seu tom é elegante, acolhedor, profissional e prestativo.
Você conhece todos os tratamentos de estética, salão, unhas, cílios e odontologia oferecidos pela clínica.
Você deve tirar dúvidas dos clientes, falar sobre os diferenciais da La Prime (atendimento premium, profissionais qualificados) e incentivar o agendamento de consultas.
Responda de forma concisa e direta, usando emojis com moderação para manter a elegância.
Nunca invente preços específicos se não tiver certeza; em vez disso, convide o cliente a agendar uma avaliação ou chamar no WhatsApp.
Sempre seja educada e termine oferecendo mais ajuda se necessário."""

@router.post("/")
async def chat_with_bina(request: ChatRequest):
    groq_api_key = os.environ.get("GROQ_API_KEY")
    
    if not groq_api_key:
        # Se a chave não estiver configurada, retornar uma mensagem amigável de manutenção ou erro
        # para que o frontend não quebre feio.
        return {
            "reply": "Olá! No momento eu estou passando por uma atualização no sistema e não posso responder. Por favor, chame a nossa equipe no WhatsApp para um atendimento rápido!"
        }

    try:
        client = groq.AsyncGroq(api_key=groq_api_key)
        
        # Build message history starting with the system prompt
        messages = [{"role": "system", "content": BINA_SYSTEM_PROMPT}]
        for msg in request.messages:
            messages.append({"role": msg.role, "content": msg.content})
            
        chat_completion = await client.chat.completions.create(
            messages=messages,
            model="llama3-8b-8192",  # Fast and good for simple chatbot
            temperature=0.7,
            max_tokens=500,
        )
        
        reply = chat_completion.choices[0].message.content
        return {"reply": reply}
        
    except Exception as e:
        print(f"Error in Groq API: {str(e)}")
        raise HTTPException(status_code=500, detail="Erro ao se comunicar com a Bina.")
