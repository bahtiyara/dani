// Auto height textarea
$(document)
    .one('focus.autoExpand', 'textarea.autoExpand', function(){
        var savedValue = this.value;
        this.value = '';
        this.baseScrollHeight = this.scrollHeight;
        this.value = savedValue;
    })
    .on('input.autoExpand', 'textarea.autoExpand', function(){
        var minRows = this.getAttribute('data-min-rows')|0, rows;
        this.rows = minRows;
        rows = Math.ceil((this.scrollHeight - this.baseScrollHeight) / 16);
        this.rows = minRows + rows;
    });

// More menu
function toggleVisibility(elementId) {
  var x = document.getElementById(elementId);
  if (x.style.display === "block") {
      x.style.display = "none";
  } else {
      x.style.display = "block";
  }
}

// Showing and Hiding Button
function toggleButton() {
    var button = document.getElementById('btn');
    var field = document.getElementsByTagName("textarea")[0];
    if (field.value !== "") {
        button.style.display = "block";
    } else {
        button.style.display = "none";
    }
}

// Get request
let id = window.location.href.slice(-24);
let url = `https://cors-anywhere.herokuapp.com/https://dani-api.herokuapp.com/questions/${id}`;

let title = document.getElementsByTagName('input')[0];
let desc = document.getElementsByTagName('textarea')[1];
let answers = document.getElementsByClassName('answers')[0];

fetch(url)
    .then( result => {
        return result.json();
    })
    .then(data => {
        title.value = data.title;
        desc.value = data.desc;

        // rending answers
        for (let i = 0; i < data.answers.length; i++) {
            let element = data.answers[i];
            let item = `<div class="bubble">${element}<div class="delete-answer-wrapper"><div class="delete-answer"></div></div></div>`;
            $(answers).append(item);
        }
    })
    .catch(error => console.log(error));

// Update title and desc
function updateQuestion() {
    let input = document.getElementsByTagName('input')[0];
    let textarea = document.getElementsByTagName('textarea')[1];
    let data = {
        title: input.value,
        desc: textarea.value
    }

    // Make patch request
    if (data.title === "") {
        return alert('问题标题不能为空');
    }
    $.ajax({
        type: 'PATCH',
        url: url,
        data: JSON.stringify(data),
        contentType: "application/json",
        error: function(err) {
            console.log(err);
        }
    });
}