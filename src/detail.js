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
        try {
            for (let i = 0; i < data.answers.length; i++) {
                let element = data.answers[i];
                let item = `<div class="bubble">${element}<div class="delete-answer-wrapper"><div class="delete-answer"></div></div></div>`;
                $(answers).append(item);
            }
        } catch (error) {
            
        }
    })
    .catch(error => console.log(error));

// Update anything
function update(data) {
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

// Update title and desc
function updateQuestion() {
    let data = {
        title: title.value,
        desc: desc.value
    }
    if (data.title === "") {
        return alert('问题标题不能为空');
    }
    update(data);
}

// Delete question
function deleteQuestion() {
    $.ajax({
        type: 'DELETE',
        url: url,
        success: function () {
            window.location.href = "/";
        },
        error: function(err) {
            console.log(err);
        }
    });
}

// function getQuestion() {
//     $.ajax({
//         type: 'GET',
//         url: url,
//         success: function (data) {
//             return data;
//         },
//         error: function(err) {
//             console.log(err);
//         }
//     });
// }

// Add answer
function addAnswer() {
    let val = document.getElementsByTagName('textarea')[0].value;

    $.ajax({
        type: 'GET',
        url: url,
        success: function (data) {
            let ans = data.answers;
            ans.push(val);
            $.ajax({
                type: 'PATCH',
                url: url,
                data: JSON.stringify(data),
                contentType: "application/json",
                success: function () {
                    let item = `<div class="bubble">${val}<div class="delete-answer-wrapper"><div class="delete-answer"></div></div></div>`;
                    $(answers).append(item);
                    document.getElementsByTagName('textarea')[0].value = "";
                },
                error: function(err) {
                    console.log(err);
                }
            });
        },
        error: function(err) {
            console.log(err);
        }
    });
}