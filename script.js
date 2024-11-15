const searchForm = document.getElementById("search-form");
const outputContainer = document.getElementById("output-container");
const paginationContainer = document.getElementById("pagination-container");

let PAGE_NUMBER = 1;
let searchEntries;
let SEARCH_TERM;



searchForm.addEventListener("submit", function(event){
    event.preventDefault();
    const searchInput = document.getElementById("search-input").value;

    PAGE_NUMBER = 1;
    SEARCH_TERM = searchInput;

    searchForm.reset();
})



searchForm.addEventListener("submit", searchGit);




async function searchGit() {




    try {
        //Fetch first 3 Jobs from github API

        const response = await fetch(`https://api.github.com/search/repositories?q=${SEARCH_TERM}&per_page=3&page=${PAGE_NUMBER}`);
        const output = await response.json();
        searchEntries = output.total_count;

        outputContainer.innerHTML = "";

        output.items.forEach(card => {
            const cardLink = document.createElement('a');
            const cardContainer = document.createElement('div');
            const cardTitle = document.createElement("h3");
            const cardDescription = document.createElement("p");
            const cardUrl = document.createElement("p");
            const cardStarCount = document.createElement("p");
            const cardIssuesCount = document.createElement("p");
            const cardLanguage = document.createElement("p");
            
            cardTitle.textContent = "Name: " + card.full_name;
            cardDescription.textContent = "Description: " + card.description;
            cardUrl.textContent = card.html_url;
            cardStarCount.textContent = "Stargazers: " + card.stargazers_count;
            cardIssuesCount.textContent = "Open Issues: " + card.open_issues;
            cardLanguage.textContent = "Language: " + card.language;
            

            
            
            cardLink.href = card.html_url;
            
            cardLink.appendChild(cardContainer);
            outputContainer.appendChild(cardLink);
            cardContainer.appendChild(cardTitle);
            if (card.description != null) {
                cardContainer.appendChild(cardDescription);
            }
            if (card.language != null) {
                cardContainer.appendChild(cardLanguage);
            }
            cardContainer.appendChild(cardStarCount);
            cardContainer.appendChild(cardIssuesCount);
            cardContainer.appendChild(cardUrl);


            cardContainer.classList.add("card-container");
            
        });

        if (searchEntries < 1) {
            const noResultCard = document.createElement("h2");

            noResultCard.innerText = "No Results Found";

            outputContainer.appendChild(noResultCard);

            noResultCard.classList.add("error-container");
            
        }
        

    } catch (error) {
        console.error("Error: ", error);
        const errorCard = document.createElement("h2");

        errorCard.innerText = `Error: ${error}`;

        outputContainer.appendChild(errorCard);

        errorCard.classList.add("error-container");
    }

    paginationContainer.innerHTML = "";
    if (PAGE_NUMBER > 1) {
        const prevButton = document.createElement('button');
        prevButton.textContent = "Prev";
        
        paginationContainer.appendChild(prevButton);
        prevButton.addEventListener("click", paginationDOWN);
    } 

    if (searchEntries % 3 == 0) {
        if (PAGE_NUMBER < (searchEntries / 3)) {
            const nextButton = document.createElement('button');
            nextButton.textContent = "Next";
            nextButton.id = "next-button";
            
            paginationContainer.appendChild(nextButton);
            nextButton.addEventListener("click", paginationUP);
        }

    } else {
        if (searchEntries == 0) {

        }

        if (PAGE_NUMBER < (Math.floor(searchEntries / 3)) + 2) {
            const nextButton = document.createElement('button');
            nextButton.textContent = "Next";
            nextButton.id = "next-button";
            
            paginationContainer.appendChild(nextButton);
            nextButton.addEventListener("click", paginationUP);
        }
    }
}

async function paginationUP() {
    PAGE_NUMBER += 1;
    await searchGit();
}

async function paginationDOWN() {
    PAGE_NUMBER -= 1;
    await searchGit();
}