from flask import Flask, render_template, request
from openai import OpenAI

app = Flask(__name__)

client = OpenAI (
    api_key = ''
)

@app.route("/")

def index(): 
    return render_template("index.html")

@app.route("/api", methods=["POST"])

def api():
    message = request.json.get("message")
    completion = client.chat.completions.create(
    model = "gpt-3.5-turbo",

    messages=[
        {"role": "system", "content":"Você é um assistente de programação."},
        {"role": "user", "content": message},
    ]
    )
    if completion.choices[0].message!=None:
            return completion.choices[0].message
    
    else : 
            return 'Falha para geração da resposta!'
    
if __name__=='__main__':
      app.run()