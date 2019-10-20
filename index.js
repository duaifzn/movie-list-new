(function () {
  const BASE_URL = 'https://movie-list.alphacamp.io'
  const INDEX_URL = BASE_URL + '/api/v1/movies/'
  const POSTER_URL = BASE_URL + '/posters/'
  const data = []
  let sortData=[]
  const sort =
    {
      "1": "Action",
      "2": "Adventure",
      "3": "Animation",
      "4": "Comedy",
      "5": "Crime",
      "6": "Documentary",
      "7": "Drama",
      "8": "Family",
      "9": "Fantasy",
      "10": "History",
      "11": "Horror",
      "12": "Music",
      "13": "Mystery",
      "14": "Romance",
      "15": "Science Fiction",
      "16": "TV Movie",
      "17": "Thriller",
      "18": "War",
      "19": "Western"
    }
  
    //sort-nav
    const sortNav = document.getElementById('sort-nav')
    let sortNavHtml = ''
    //console.log(sortNav)
    for (let i in sort){
      //console.log(sort[i])
      sortNavHtml += `
        <a class="nav-link border" href="#" data-id="${i}" >${sort[i]}</a>
       `

    }
    sortNav.innerHTML = sortNavHtml
    //add sort event
    sortNav.addEventListener('click',event =>{
      //console.log(event.target.dataset.id)
      //console.log(data[0].genres.includes(event.target.dataset.id))
      sortData = data.filter(item => item.genres.includes(Number(event.target.dataset.id)))
      //console.log(sortData)
      displayDataList(sortData)
    })

//
  const dataPanel = document.getElementById('data-panel')

  axios.get(INDEX_URL).then((response) => {
    data.push(...response.data.results)
    
    displayDataList(data)
    
    console.log(data)
    //console.log(sort[10])
  }).catch((err) => console.log(err))

  // listen to data panel
  dataPanel.addEventListener('click', (event) => {
    if (event.target.matches('.btn-show-movie')) {
      showMovie(event.target.dataset.id)
    }

  })


//display
  function displayDataList (data) {
    let htmlContent = ''
      data.forEach(function (item) {
      htmlContent += `
        <div class="col-sm-4">
          <div class="card mb-2">
            <img class="card-img-top " src="${POSTER_URL}${item.image}" alt="Card image cap">
            <div class="card-body movie-item-body">
              <h5 class="card-title">${item.title}</h5>
            </div>

            <!-- "More" button -->
            <div class="card-footer">
              <button class="btn btn-primary btn-show-movie" data-toggle="modal" data-target="#show-movie-modal" data-id="${item.id}">More</button>
              <button class="btn btn-info btn-add-movie" data-id="${item.id}">+</button>
            </div>
            
              
            
          </div>
        </div>
      `
    })
    dataPanel.innerHTML = htmlContent
  }

  function showMovie (id) {
    // get elements
    const modalTitle = document.getElementById('show-movie-title')
    const modalImage = document.getElementById('show-movie-image')
    const modalDate = document.getElementById('show-movie-date')
    const modalDescription = document.getElementById('show-movie-description')

    // set request url
    const url = INDEX_URL + id
    console.log(url)

    // send request to show api
    axios.get(url).then(response => {
      const data = response.data.results
      console.log(data)

      // insert data into modal ui
      modalTitle.textContent = data.title
      modalImage.innerHTML = `<img src="${POSTER_URL}${data.image}" class="img-fluid" alt="Responsive image">`
      modalDate.textContent = `release at : ${data.release_date}`
      modalDescription.textContent = `${data.description}`
    })
  }

})()
