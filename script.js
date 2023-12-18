const API_KEY = "1fd2a820becc4d57974e6990a48dc192";
const url = "https://newsapi.org/v2/everything?q=";
window.addEventListener("load", () => fetchNews("India"));




function reload(){
    window.location.reload();
}
async function fetchNews(query) {
const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
const data = await res.json();
bindData(data.articles);
}


function bindData(articles) {
const cardsContainer = document.getElementById('cards-container');
const newsCardTemplate = document.getElementById('template-news-card');


cardsContainer.innerHTML = "";


articles.forEach(article => {
    if (!article.urlToImage) return;
    const cardClone = newsCardTemplate.content.cloneNode(true);
    fillDataInCard(cardClone, article);
    cardsContainer.appendChild(cardClone);
});
}


function fillDataInCard(cardClone, article) {
const newsImg = cardClone.querySelector('#news-img');
const newsTitle = cardClone.querySelector('#news-Title');
const newsSource = cardClone.querySelector('#news-Source');
const newsDesc = cardClone.querySelector('#news-Desc');


newsImg.src = article.urlToImage;
newsTitle.innerHTML = article.title;
newsDesc.innerHTML = article.description;


const date = new Date(article.publishedAt).toLocaleString("en-US", {
    timeZone: "Asia/Jakarta" // Corrected timezone name
});
newsSource.innerHTML = `${article.source.name}・${date}`;


cardClone.firstElementChild.addEventListener('click', () =>{
    window.open(article.url,"_blank");
});
}


let currSelectedNav=null;
function onNavItemClick(id){
    fetchNews(id);
    const navItem=document.getElementById(id);
    currSelectedNav?.classList.remove('active');
    currSelectedNav=navItem;
    currSelectedNav.classList.add('active');
}
const searchButton =document.getElementById('search-button');
const searchText=document.getElementById('search-text');


searchButton.addEventListener('click',() =>{
    const query= searchText.value;
    if(!query) return;
    fetchNews(query);
    currSelectedNav?.classList.remove('active');
    currSelectedNav=null;
} );

