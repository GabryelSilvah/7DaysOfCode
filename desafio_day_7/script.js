
//import { apiKey } from './key.js' 

let a = "https://api.themoviedb.org/3/movie/top_rated?"
let b = "https://api.themoviedb.org/3/movie/popular?"
let url = b
const apiKey = "93e04690c953bc0df27725aed867a753"
//Api de filmes que deu certo
console.log(apiKey)
fetch(`${url}api_key=${apiKey}&language=pt-BR`)
    .then((resp) => resp.json())
    .then(dados => {
        dados.results.forEach((valor) => {

            //endereço http das imagens
            const http = "https://image.tmdb.org/t/p/w500/"

            //pegando id da div no html
            const lista = document.getElementById('lista')

            //div que contem individualmente cada titulo e img do filme
            const box_filmes = document.createElement('div')
            box_filmes.classList.add('container_filmes')
            box_filmes.setAttribute("name", valor.title)

            //criando tag img
            const img = document.createElement('img')
            img.classList.add('img_filmes')
            img.src = (http + valor.backdrop_path)

            //div container para agrupar elementos para estilização
            const box_left = document.createElement('div')
            box_left.classList.add('container_left')

            //criando tag p de titulo
            const titulo = document.createElement('h3')
            titulo.innerHTML = valor.title
            titulo.classList.add('titulo')

            //container de favoritos e de nota do filme
            const box_fav_nota = document.createElement('div')
            box_fav_nota.classList.add('container_fav_and_nota')

            //container potuação
            const box_pontuacao = document.createElement('div')
            box_pontuacao.classList.add('container_pontuacao')

            //paragrafo com nota do filme
            const paragrafo_pont = document.createElement('p')
            paragrafo_pont.classList.add('pontuacao')
            paragrafo_pont.innerHTML = valor.vote_average.toFixed(1)

            //img com imagem da estrela de notas
            const img_portuacao = document.createElement('img')
            img_portuacao.classList.add('icone')
            img_portuacao.src = "icones/estrela.png"

            //container de favorito
            const box_fav = document.createElement('div')
            box_fav.classList.add('container_favorito')
            box_fav.setAttribute("name", valor.title)

            //paragrafo do favoritos
            const p3 = document.createElement('p')
            p3.innerHTML = "Favoritar"

            //img do favoritos (coração)
            const img_fav = document.createElement('img')
            img_fav.classList.add('icone')
            img_fav.classList.add('imgFav')
            img_fav.setAttribute("name", valor.title)
            img_fav.src = "icones/coracao.png"

            //Paragrafo de descrição
            const descricao = document.createElement('p')
            descricao.innerHTML = valor.overview
            descricao.classList.add('descricao')

            //adicionando elementos criados dentro das div
            box_left.appendChild(titulo)
            box_pontuacao.appendChild(img_portuacao)
            box_fav.appendChild(img_fav)
            box_fav.appendChild(p3)
            box_filmes.appendChild(img)
            box_filmes.appendChild(box_left)
            box_left.appendChild(box_fav_nota)
            box_fav_nota.appendChild(box_pontuacao)
            box_pontuacao.appendChild(paragrafo_pont)
            box_fav_nota.appendChild(box_fav)
            box_filmes.appendChild(descricao)


            lista.insertAdjacentElement("beforeend", box_filmes)

        })

        //função para ocutar filmes que não está na lista de procurados
        //local de variáveis
        let listaPes = document.querySelectorAll('.container_filmes')
        let container_filmes = document.querySelectorAll('.container_filmes')
        let tituloPes = document.querySelectorAll('.titulo')
        let input_pesquisa = document.querySelector('.input_pesquisa')
        let containerFavoritos = document.querySelectorAll('.container_favorito')
        let arrayFav = []//recebe dados para enviar para localStorage
        console.log(containerFavoritos)
        function ocutar(name) {

            listaPes.forEach((lista) => {
                let text = lista.innerHTML.toLowerCase()

                //ocutar ou revelar
                if (text.includes(name)) {
                    lista.style.display = "flex"
                } else {
                    lista.style.display = "none"
                }
            })
        }

        //pesquisar pelo filme
        input_pesquisa.addEventListener("input", (a) => {

            //transforma texto digitado em letras minusculas
            let pesquisa = a.target.value.toLowerCase()

            tituloPes.forEach((titulo) => {

                //transforma texto contido da div em letras minusculas
                let text = titulo.innerHTML.toLowerCase()

                //verificar se o filme está incluso na lista
                if (text.includes(pesquisa)) {
                    ocutar(pesquisa)
                }
            })
        })

        //limitar tamanho do texto da descrição do filme

        const maxCaracter = 500//maximo de caracteres permitidos
        let descricao = document.querySelectorAll('.descricao')

        descricao.forEach((valorDescricao) => {

            //verificando se a quantidade de caracteres na descrição é mairo de maxCaracter
            let rows = valorDescricao.innerHTML.length > maxCaracter

            if (rows == true) {
                let conteudo = valorDescricao.innerHTML
                //Permitir que o texto seja exibido até atingir o limite max de caracter
                valorDescricao.innerHTML = conteudo.substring(0, maxCaracter) + "..."
            }
        })


        //Adicionar no localstorege





        function addStorage(valor) {
            let arrayFav2 = []
            let posicao
            //resgata pro storage
            if (localStorage.meuTest) {
                arrayFav2 = JSON.parse(localStorage.getItem('meuTest'))

                //validação de duplicata
                if (arrayFav2.includes(valor)) {
                    posicao = arrayFav2.indexOf(valor)
                    arrayFav2.splice(posicao, 1)
                } else {
                    //add novo item
                    arrayFav2.push(valor)
                }
            }

            //envia pro storage
            localStorage.meuTest = JSON.stringify(arrayFav2)
            console.log("Função funcionou com sucesso")
        }

        addStorage("Batman 3")














        function addLocalStorege() {
            containerFavoritos.forEach((checkFav) => {


                checkFav.addEventListener("click", () => {

                    /*se a chave meuFilme já exisitr no localstorage ele vai 
                    resgatar os para depois adicionar os novos.*/
                    if (localStorage.meuFilme) {
                        arrayFav = JSON.parse(localStorage.getItem('meuFilme'))
                    }

                    /*se ao clicar já já exitir no localstorage um favorito com mesmo nome
                    então ele será removido*/
                    if (arrayFav.includes(checkFav.getAttribute('name'))) {

                        //pocição que o item clicado está no array
                        const posicao = arrayFav.indexOf(checkFav.getAttribute('name'))
                        arrayFav.splice(posicao, 1)
                        //enviando dados para localstorage
                        localStorage.meuFilme = JSON.stringify(arrayFav)
                        //adicinar coração vazio
                        document.querySelector('.imgFav').setAttribute("src", "icones/coracao.png")

                    } else {

                        //se não existir será adicionado          
                        arrayFav.push(checkFav.getAttribute('name'))
                        localStorage.meuFilme = JSON.stringify(arrayFav)
                        //adicinar coração preenchido
                        document.querySelector('.imgFav').setAttribute("src", "icones/coracao2.png")

                    }
                })
            })
        }

        addLocalStorege()

        //marcador de favorito já ativado
        let storage = []
        storage = JSON.parse(localStorage.getItem('meuFilme'))
        let img = document.querySelectorAll('.imgFav')
        img.forEach((valorIMG) => {
            if (storage.includes(valorIMG.name)) {
                valorIMG.src = "icones/coracao2.png"
            }
        })

        //função para processa a validação dos favoritos
        function filtrarFavoritos() {
            let listaPes = document.querySelectorAll('.container_filmes')
            //pegando dados do localstorange
            arrayFav = JSON.parse(localStorage.getItem('meuFilme'))
            let tagContainer = []
            let arrayNomesFilmes = []

            listaPes.forEach((valor) => {
                arrayNomesFilmes.push(valor.getAttribute('name'))
                return tagContainer.push(valor)
            })

            container_filmes.forEach((cant_filmes) => {


                let position = []
                let trueAndFalse
                arrayFav.forEach((tett) => {

                    position.push(arrayNomesFilmes.indexOf(tett))
                    trueAndFalse = cant_filmes.getAttribute('name').includes(tett)
                })


                if (trueAndFalse == true) {
                    position.forEach((valor) => {
                        tagContainer[valor].style.display = "flex"

                    })
                }

                tagContainer.forEach((style) => {
                    let trueStyle = []

                    trueStyle.push(style.getAttribute('style'))

                    trueStyle.forEach((valor) => {
                        if (valor == null || valor == "") {
                            style.style.display = "none"

                        }
                    })

                })


                if (trueAndFalse == true) {
                    position.forEach((valorPosition) => {
                        let liy = tagContainer
                        liy.slice(valorPosition, 1)
                    })

                }
            })

        }


        //evento de click favorito
        function removerStyle() {//quando o checkbox está desmarcado todos os items aparecem
            listaPes.forEach((valor) => {
                valor.style.display = ""
            })

        }

        /*se o chekbox estiver ativado os varitos aparecem, senão é
        ocultado*/
        let check = document.querySelector('.check')
        check.addEventListener("click", (e) => {

            if (check.checked) {
                filtrarFavoritos()
            } else {
                removerStyle()
            }

        })

    })



