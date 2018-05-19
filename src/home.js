let url = 'https://cors-anywhere.herokuapp.com/https://dani-api.herokuapp.com/';
let url1 = 'https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/2487956';
let url2 = 'https://crossorigin.me/';

let list = document.getElementById('list');

fetch(url)
    .then( result => {
        return result.json();
    })
    .then(data => {
        for (let i = 0; i < data.length; i++) {
            const element = data[i];
            
            $(`<li><a href="/question/${element._id}"><h3>${element.title}</h3><p>${element.desc}</p></a></li>`)
            .appendTo(list);
        }
    })
    .catch(error => console.log(error));