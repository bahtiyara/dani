let url = 'https://cors-anywhere.herokuapp.com/https://dani-api.herokuapp.com/questions';

function post() {
    let input = document.getElementsByTagName('input')[0];
    let textarea = document.getElementsByTagName('textarea')[0];
    let data = {
        title: input.value,
        desc: textarea.value
    }

    // Make post request
    $.ajax({
        type: 'POST',
        url: url,
        data: JSON.stringify(data),
        contentType: "application/json",
        success: function () {
            window.location.href = "/";
        },
        error: function(err) {
            console.log(err);
        }
    });
}