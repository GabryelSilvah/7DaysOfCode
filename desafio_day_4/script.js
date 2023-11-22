
//Api de filmes que deu certo
const apiKey = "93e04690c953bc0df27725aed867a753"
fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=pt-BR`)
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
        function ocutar(name) {
            let listaPes = document.querySelectorAll('.container_filmes')
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
        let container_filmes = document.querySelectorAll('.container_filmes')
        let tituloPes = document.querySelectorAll('.titulo')
        let input_pesquisa = document.querySelector('.input_pesquisa')

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

    })



