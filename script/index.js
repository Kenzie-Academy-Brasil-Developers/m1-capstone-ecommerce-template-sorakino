let carrinho = []
let data = []

preencherItens()


function preencherItens(filtro){

  const div = document.getElementById("lista-card");

    div.innerHTML = []
    data = []

  for(let i = 0; i < db.length; i++){
    if(db[i].tag.includes(filtro) || filtro == null){
      data.push(db[i])
      let li = document.createElement('li')
      li.className = 'post'
      let div = document.createElement('a')
      li.appendChild(div)
    
      let img = document.createElement('img')
      img.src = db[i].img
      div.appendChild(img) 
      let h3 = document.createElement('h3')
      h3.innerText = db[i].tag.join(",")
      div.appendChild(h3) 
      let h2 = document.createElement('h2')
      h2.className = 'nome-produtos'
      h2.innerText = db[i].nameItem
      div.appendChild(h2) 
      let h4 = document.createElement('h4')
      h4.innerText = db[i].description
      div.appendChild(h4) 
      let span = document.createElement('span')
      span.innerText = 'R$' + db[i].value
      div.appendChild(span) 
      let button = document.createElement('button')
      button.innerText = db[i].addCart
      button.className = 'adicionar'
      button.setAttribute('id', db[i].id)
      button.addEventListener('click', function(e){
        let idElemento = e.target.id
        let id = parseInt(idElemento)
        let produto = procuraProduto(id, data)
        let produtoElemento = criarCardFavorito(produto)
  
        let listaCarrinho = document.querySelector('#addCarrinho')
  
        listaCarrinho.appendChild(produtoElemento)
      })
      div.appendChild(button) 
      document.getElementById('lista-card').appendChild(li)
    }
  }
}

function procuraProduto(id, lista){
  
  for(i = 0; i < lista.length; i++){
    let produto = lista[i]
    if(produto.id == id){
      return produto
    }
  }
  return "Produto não encontrado!"
}


function criarCardFavorito(produto){

  let divCarrinho = document.createElement('div')
  divCarrinho.className = 'divCarrinho'
  let liC = document.createElement('li')
  liC.id = produto.id
  let imgC = document.createElement('img')
  let h2C = document.createElement('h2')
  let precoC = document.createElement('span')
  let buttonC = document.createElement('button')
  

  carrinho.push(produto)
  let p = document.querySelector('.carrinho_vazio')
  p.style.display = 'none'
  

  let divC = document.createElement('div')
  divC.className = 'row'
  precoC.className = 'distancia'
  imgC.src = produto.img
  h2C.innerText = produto.nameItem
  buttonC.innerHTML = 'Remover'
  buttonC.className = 'botaoRemover'
  precoC.innerText = 'R$' + produto.value
  buttonC.addEventListener('click', function(e){
      liC.remove()
      carrinho.splice(carrinho.indexOf(produto), 1)
      let pQuantidade = document.getElementById('quantidade')
      pQuantidade.innerText = carrinho.length
      let spanPreco = document.getElementById('preco')
      if(carrinho.length == 0){
        spanPreco.innerText = "0"
      }else{
        spanPreco.innerText = carrinho.map(el => el.value).reduce((a,b) => a+b)
      }
      if(carrinho.length == 0){
        p.style.display = 'flex'
      }
  })
  buttonC.id = produto.id
  buttonC.classList.add('adicionar')
  document.getElementById('#quantidade')
  let pQuantidade = document.getElementById('quantidade')
  pQuantidade.innerText = carrinho.length
  let spanPreco = document.getElementById('preco')
  spanPreco.innerText = carrinho.map(el => el.value).reduce((a,b) => a+b)

  liC.appendChild(imgC)
  divC.appendChild(h2C)
  divC.appendChild(precoC)
  liC.appendChild(divC)
  liC.appendChild(buttonC)
  divCarrinho.appendChild(liC)
  
  return divCarrinho

}


function pesquisar() {
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  ul = document.getElementById("lista-card");
  li = ul.getElementsByTagName("li");
  for (i = 0; i < li.length; i++) {
      a = li[i].getElementsByTagName("a")[0];
      txtValue = a.textContent || a.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
          li[i].style.display = "";
      } else {
          li[i].style.display = "none";
      }
  }
}