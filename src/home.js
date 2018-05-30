let url = 'https://cors-anywhere.herokuapp.com/https://dani-api.herokuapp.com/';
let url1 = 'https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/2487956';
let url2 = 'https://crossorigin.me/';

let list = document.getElementById('list');

fetch(url)
    .then( result => {
        return result.json();
    })
    .then(data => {
        $('.loading').hide();
        for (let i = 0; i < data.length; i++) {
            let element = data[i];
            let item = `<li><a href="/${element._id}"><h3>${element.title}</h3><p>${element.desc}</p></a></li>`;
            
            $(list).prepend(item);
        }
    })
    .catch(error => console.log(error));

jQuery(document).delegate("a:not(.studylink, .refresh, .highslide, .back)", "click", function(event){
    window.location=this.getAttribute("href");
    return false;
});