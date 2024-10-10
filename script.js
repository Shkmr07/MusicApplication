let add = document.getElementById('add')
let Create = document.getElementById('Create')
let form = document.getElementById('from')
let cards = document.getElementById('cards')
let title = document.getElementById('title')
let artist = document.getElementById('artist')
let duration = document.getElementById('duration')
let genre = document.getElementById('genre')
let submit = document.getElementById('submit')

let editIndex = null;  // Track the index of the item being edited

function createBtn(){
    add.style.display = 'block'
    Create.style.display = 'none'
    submit.value = 'Add Music'
}

form.addEventListener('submit', (event) => {
    event.preventDefault()
    saveData(editIndex)  // Use editIndex to determine if saving or updating
    editIndex = null; // Reset after saving
})

function saveData(idx){
    if (title.value && artist.value && duration.value && genre.value) {
        let musics = JSON.parse(localStorage.getItem('musics')) || []

        if (idx === null) {
            // Add new music
            let music = {title: title.value, artist: artist.value, duration: duration.value, genre: genre.value}
            musics.push(music)
        } else {
            // Update existing music
            musics[idx].title = title.value
            musics[idx].artist = artist.value
            musics[idx].duration = duration.value
            musics[idx].genre = genre.value
        }

        localStorage.setItem('musics', JSON.stringify(musics))
    } else {
        alert('All Fields Are Mandatory!')
    }

    // Reset form and update UI
    Create.style.display = 'inline'
    add.style.display = 'none'
    form.reset()
    fetchMusics()
}

function fetchMusics(){
    try {
        cards.innerHTML = ''
        let musics = JSON.parse(localStorage.getItem('musics')) || []
        renderMusic(musics)
    } catch (err) {
        console.error('fetch failed', err)
    }
}

function renderMusic(items){
    items.forEach((el, idx) => {
        cards.appendChild(createCard(el, idx))
    })
}

function createCard({ title, artist, duration, genre }, idx){
    let div = document.createElement('div')
    let name = document.createElement('p')
    let artistName = document.createElement('p')
    let time = document.createElement('p')
    let category = document.createElement('p')
    let edit = document.createElement('button')
    let del = document.createElement('button')
    
    name.textContent = `Title : ${title}`
    artistName.textContent = `Artist : ${artist}`
    time.textContent = `Duration : ${duration}`
    category.textContent = `Genre : ${genre}`
    edit.textContent = 'Edit'
    del.textContent = 'Delete'

    edit.addEventListener('click', () => {
        add.style.display = 'block'
        submit.value = 'Update'
        Create.style.display = 'none'
        
        // Populate form fields and set editIndex
        displayUpdatedDataInForm(title, artist, duration, genre)
        editIndex = idx // Track which item is being edited
    })

    del.addEventListener('click',()=>{
        
        let musics = JSON.parse(localStorage.getItem('musics')) || []

        musics.splice(idx,1)

        localStorage.setItem('musics', JSON.stringify(musics))

        div.remove()

        fetchMusics()

    })



    
    div.append(name, artistName, time, category, edit, del)
    return div
}

function displayUpdatedDataInForm(name, art, dur, gen){
    title.value = name
    artist.value = art
    duration.value = dur
    genre.value = gen
}

fetchMusics()
