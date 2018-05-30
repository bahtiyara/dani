let url = 'https://cors-anywhere.herokuapp.com/https://dani-api.herokuapp.com/questions';

function post() {
    let input = document.getElementsByTagName('input')[0];
    let textarea = document.getElementsByTagName('textarea')[0];
    let data = {
        title: input.value,
        desc: textarea.value
    }
    // after click the button, hide the words, show the spinner
    document.getElementsByTagName('a')[0].style.color = 'rgba(0,0,0,0)';
    $('.createquestion').show();

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
            document.getElementsByTagName('a')[0].style.color = '#fff';
            $('.createquestion').hide();
        }
    });
}