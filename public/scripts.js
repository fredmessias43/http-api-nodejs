const ul = document.querySelector("ul")
const input = document.querySelector("input")
const form = document.querySelector('form')

async function adicionarItem (name,url){
    const consume = await fetch(`http://localhost:3000/?name=${name}&url=${url}`).then((data) => data.json())
    console.log('adicionou')
}
async function deletarItem (name,url,id){
    const test = `http://localhost:3000/?name=${name}&url=${url}&del=${id}`
    const consume2 = await fetch(test).then((data) => data.json())
    /* console.log('deletou')
    console.log(test) */
}

async function load() {
    const res = await fetch("http://localhost:3000/").then((data) => data.json())
    
    res.urls.map(({name, url}) => addElement({name, url}))
}

load()
let count = 0;
function addElement({ name, url }) {
    const li = document.createElement('li')
    const a = document.createElement("a")
    const trash = document.createElement("span")
    
    count++;

    a.href = url
    a.innerHTML = name
    a.target = "_blank"

    trash.className = count
    trash.innerHTML = "x"
    trash.onclick = () => removeElement(trash,name,url)

    li.append(a)
    li.append(trash)
    ul.append(li)
}

function removeElement(element,name,url) {
    if (confirm('Tem certeza que deseja deletar?'))
    {
        let id = element.className
        //console.log(id) 
        deletarItem(name,url,id)
        element.parentNode.remove()
    }
        
}

form.addEventListener("submit", (event) => {
    event.preventDefault();

    let { value } = input

    if (!value) 
        return alert('Preencha o campo')

    const [name, url] = value.split(",")

    if (!url) 
        return alert('formate o texto da maneira correta')

    if (!/^http/.test(url)) 
        return alert("Digite a url da maneira correta")

    adicionarItem(name,url)
    addElement({ name, url })

    input.value = ""
})