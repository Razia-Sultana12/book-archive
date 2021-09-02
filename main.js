const searchBooks = () => {
    const searchField = document.getElementById('search-field');
    searchText = searchField.value;
    // clear field
    searchField.value = '';
  const errorDiv = document.getElementById('error');
    if (searchText === '') {
      errorDiv.innerText = "Search field can't be empty";
      return;
  }
    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayBook(data))
  
  }
    //  display books
  const displayBook = (books) => {
         const searchResult = document.getElementById('search-result');
         searchResult.textContent = '';
  // found data result
  const foundData = document.getElementById('found-data');
  foundData.textContent = '';
  const div = document.createElement('div')
  div.innerHTML = `
  <h4> Found Data: ${books.numFound} </h4>`
  foundData.appendChild(div);
  
  const errorDiv = document.getElementById('error');
  errorDiv.innerText = '';
          // error handling
         if (books.length === 0) {
            errorDiv.innerText ='No Matching Found'
  }
  
          // display details about books
           books.docs.forEach(book => {
             console.log(book);
            const div = document.createElement('div');
             div.classList.add('col');
             div.innerHTML = `
             <div class="card h-100">
        <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class=" card-img-top rounded mx-auto img-fluid w-50" alt="...">
        <div class="card-body px-3">
          <h5 class="card-title">${book.title}</h5>
          <p class="card-text">Author:${book.author_name[0]}<br>Publisher:${book.publisher[0]}</p>
        </div>
        <div class="card-footer">
          <small class="text-muted">First publish year:${book.first_publish_year}</small>
        </div>
      </div>`;
            searchResult.appendChild(div);
     })
  }