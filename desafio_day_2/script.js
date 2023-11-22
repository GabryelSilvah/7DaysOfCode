

function addFilmes(){
//pegando id da div no html
const lista = document.getElementById('lista')

//div que contem individualmente cada titulo e img do filme
const box_filmes = document.createElement('div')
box_filmes.classList.add('container_filmes')


//criando tag img
const img = document.createElement('img')
img.classList.add('img_filmes')
img.src = ("imagem/batman.jpg")

//div container para agrupar elementos para estilização
const box_left = document.createElement('div')
box_left.classList.add('container_left')

//criando tag p de titulo
const titulo = document.createElement('h3')
titulo.innerHTML = "Batman"
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
paragrafo_pont.innerHTML = 8.3

//img com imagem da estrela de notas
const img_portuacao = document.createElement('img')
img_portuacao.classList.add('icone')
img_portuacao.src = "icones/estrela.png"

//container de favorito
const box_fav = document.createElement('div')
box_fav.classList.add('container_favorito')


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
descricao.innerHTML = "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vel velit aspernatur, porro perferendis illum voluptatem libero odit laudantium magni reprehenderit molestiae ea delectus et cum expedita quo eaque. Sed, laboriosam!"
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

}