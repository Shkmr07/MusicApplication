let add = document.getElementById('add')
let Create = document.getElementById('Create')
let form = document.getElementById('from')
let cards = document.getElementById('cards')

function createBtn(){
    add.style.display = 'block'
    Create.style.display = 'none'
}

document.getElementById('from').addEventListener('submit',(event)=>{
    event.preventDefault()

    let title = document.getElementById('title').value
    let artist = document.getElementById('artist').value
    let duration = document.getElementById('duration').value
    let genre = document.getElementById('genre').value

    if(title && artist && duration && genre){

        let musics = JSON.parse(localStorage.getItem('musics')) || []

        let music = {title,artist,duration,genre}

        musics.push(music)
    
        localStorage.setItem('musics',JSON.stringify(musics))
    }

    else alert('All Fields Are Mandatory!')


    Create.style.display = 'inline'
    add.style.display = 'none'

})


function fetchMusics(){

    try{
        let musics = JSON.parse(localStorage.getItem('musics')) || []
        renderMusic(musics)

    }
    catch(err){ console.error('fetch failed',err)}
    
}


function renderMusic(items){

    items.forEach(el=>{
        cards.appendChild(createCard(el))
    })
}


function createCard({title,artist,duration,genre}){

    let div = document.createElement('div')
    let name = document.createElement('p')
    let artistName = document.createElement('p')
    let time = document.createElement('p')
    let category = document.createElement('p')
    let edit = document.createElement('button')

    name.textContent = title
    artistName.textContent = artistName
    time.textContent = time
    


}



fetchMusics()
