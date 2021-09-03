document.getElementById('error-message').style.display ='none';
//load spinner
const toggleSpinner = displayStyle => {
    document.getElementById('spinner').style.display = displayStyle;
}
// load book data 
const searchBook = () => {
    
    const searchBox = document.getElementById('search-field');
    
    const searchText = searchBox.value ;
    // 
   
    //clear search box
    searchBox.value = '';
   
    document.getElementById('error-message').style.display ='none';
    // if search box text is empty
    if(searchText ===''){
        
        document.getElementById('error-message').style.display ='block';
    }
    // load searchBox data 
    else{
        toggleSpinner('block'); 
     const url = `https://openlibrary.org/search.json?q=${searchText}`
     fetch(url)
    .then(res => res.json())
    .then(data => displaySearchResult(data.docs , data)) 
       
    }    
       
}
searchBook();

const displaySearchResult = (books , totalResult) => {
    
    //variable for search result and clean after input
        const searchResult = document.getElementById('search-result');
        
        searchResult.innerHTML = '';
    //show not found message variable    
        const notFoundMsg = document.getElementById('not-found');
    //number of search result and clean it variable    
        const resultDiv = document.getElementById('result');   
        resultDiv.innerHTML = '';
    //if search item is not present  .  
        if(books.length === 0){
            
            notFoundMsg.innerHTML = `<h2 class="text-center text-success">No Result Found </h2>`;
            
        }
    //if search item is present.    
        else{
            
            notFoundMsg.innerHTML = ``
            books.forEach(book => {
                const div = document.createElement('div');
                 div.classList.add('col');
                 div.innerHTML =`
                 <div class="card h-100">
                      
                       <img id="cover-image" src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" width="200px" hieght="150px" class="mx-auto">
                       
                 <div class="card-body">
                 <h5 class="card-title">Book Name:${book.title}</h5>
                   <h5 class="card-title">Author Name:${book.author_name}</h5>
                   
                   <p class="card-text">First Publish Year:${book.first_publish_year}</p>
                 </div>
                 </div>`;
                 searchResult.appendChild(div) 
            
                 
         });
         //total result number adding
             const h1 = document.createElement('h1');
             h1.innerText = `Number of result:${totalResult.numFound}`
             resultDiv.appendChild(h1)
             
      
        }
        toggleSpinner('none')
        
        
}

