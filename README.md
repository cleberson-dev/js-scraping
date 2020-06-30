# JS Scraping

Web Scraping com Cheerio e Axios, extraindo nomes de times de CS:GO do site [HLTV.org](http://hltv.org)



## Sobre

O propósito foi especificamente para aprendizado de Web Scraping com Node.js. Nesse caso, foi somente utilizado análise (parsing) de HTML/DOM, sem a necessidade de um headless browser como [Puppeteer](https://github.com/puppeteer/puppeteer/) fazendo a mímica de um humano navegando no site clicando em botões, preechendo formulários etc...

Como o site é renderizado no lado do servidor, todo conteúdo já viria no corpo da resposta, foi só necessário adicionar [Axios](https://github.com/axios/axios) como dependência para fazer as requisições e obter as respostas.



## :gear: Instalação e Configuração

### Pré-requisitos

É exigido que tenha [Node.js](https://nodejs.org/) instalado em sua máquina.

### Instalação

1. Copie o repositório para sua máquina:
   - Baixando o ZIP pelo repositório no GitHub (Botão Verde acima ou [aqui](https://github.com/cleberson-dev/js-scraping)):
   - Clonando o repositório ([Git](https://git-scm.com/downloads) necessário):

        ```bash
       git clone https://github.com/cleberson-dev/js-scraping.git
       ```

2. No diretório do projeto, instale as dependências necessárias utilizando um gerenciador de pacotes para Node.js (npm ou yarn):

    ```bash
    npm install
    # ou yarn
    ```

3. Execute o script principal:

    ``````bash
    npm run start
    ``````



## :hammer: Construído com

- Javascript: Linguagem de programação.
- [Node.js](https://nodejs.org/): Runtime que executa código JavaScript no lado do servidor.
- [Cheerio](https://github.com/axios/axios): Implementação de jQuery para o lado do servidor em manipulação/exame de documentos HTML.
- [Axios](https://github.com/axios/axios): Cliente HTTP, baseado em promises para navegadores e Node.js.



## Terminologia

### Data Scraping

Técnica usada para extrair dados de um documento ou aplicação, especificamente dados de saída, que são pretendidos a serem apresentados ao usuário-final, onde talvez não tenha uma documentação ou estrutura formalizada e padronizada. Frequentemente, os dados desejados estão fundidos em meios de dados de multimídia, formatados para apresentação, com rótulos, comentários supérfluos e com informações irrelevantes para processamento.

No contexto da Web, web scraping visa extrair dados de documentos HTML, onde a maioria desses dados indesejados/sujos estão presentes (tags, formulários, metadados, aninhamentos, etc...)





## :writing_hand: Contribuidores

- [@cleberson-dev](https://github.com/cleberson-dev) - Ideia e Projeto Inicial