# Nome do projeto

<!---Esses são exemplos. Veja https://shields.io para outras pessoas ou para personalizar este conjunto de escudos. Você pode querer incluir dependências, status do projeto e informações de licença aqui--->

![GitHub repo size](https://img.shields.io/github/repo-size/Enzzzzz/YulRPG?style=for-the-badge)
![GitHub language count](https://img.shields.io/github/languages/count/Enzzzzz/YulRPG?style=for-the-badge)
![GitHub forks](https://img.shields.io/github/forks/Enzzzzz/YulRPG?style=for-the-badge)


<img src="image.png" alt="img">

> Um bot para Discord focado em RPG para passar o tempo enquanto espera por alguma coisa sem precisar ter programas extras rodando em seu computador.

### Ajustes e melhorias

O projeto ainda está em desenvolvimento e as próximas atualizações serão voltadas nas seguintes tarefas:

- [x] Seleção de Classes
- [ ] Comando para iniciar o jogo
- [ ] Distribuição de pontos de habilidade ao passar de nível
- [ ] Lista de habilidades desbloqueadas com nível
 ...

## 🚀 Instalando YulRPG

Para instalar a <YulRPG>, siga estas etapas:

Windows:
```
git init
git clone https://github.com/Enzzzzz/YulRPG.git
```
* Utilize `cd Bot-Slash-v14` para entrar na pasta caso tenha dado clone
* Baixe as dependências com `npm install`
* Crie um arquivo chamado `.env` e configure-o
* Se você utiliza MongoDB, configure em `./Events/ready.js`

.env
```
TOKEN=token do bot.
CLIENT_ID=id do bot.
GUILD_ID=id do servidor ou deixe vazio.
OWNER=id do dono.
```