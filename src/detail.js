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
        // Hide loading
        $('.loading-wrapper').hide();

        // Delete answer
        let tresh = document.getElementsByClassName('delete-answer');

        for (let i = 0; i < tresh.length; i++) {
            const element = tresh[i];
            element.onclick = function () {
                // show loading
                $('.delete-answer').css('background-image', 'url(../img/loading.gif)');

                data.answers.splice(i, 1);
                // update answers
                $.ajax({
                    type: 'PATCH',
                    url: url,
                    data: JSON.stringify(data),
                    contentType: "application/json",
                    success: function () {
                        $('.answers').children().eq(i).remove();
                        // hide loading
                        $('.delete-answer').css('background-image', '');
                    },
                    error: function(err) {
                        // hide loading
                        $('.delete-answer').css('background-image', '');
                        console.log(err);
                    }
                });
            }
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
    $('#menu li').css('color','rgba(0,0,0,0)');
    $('.deletequestion').show();
    $.ajax({
        type: 'DELETE',
        url: url,
        success: function () {
            window.location.href = "/";
        },
        error: function(err) {
            $('#menu li').css('color','#FF4F3E');
            $('.deletequestion').hide();
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
    // Get current value of publisher
    let val = document.getElementsByTagName('textarea')[0].value;

    // hide words, show loading
    $('#btn').hide();
    $('.sendanswer').show();

    // Get all current answers
    $.ajax({
        type: 'GET',
        url: url,
        success: function (data) {
            let ans = data.answers;
            ans.push(val);
            // update answers
            $.ajax({
                type: 'PATCH',
                url: url,
                data: JSON.stringify(data),
                contentType: "application/json",
                success: function () {
                    let item = `<div class="bubble">${val}<div class="delete-answer-wrapper"><div class="delete-answer"></div></div></div>`;
                    $(answers).append(item);
                    document.getElementsByTagName('textarea')[0].value = "";

                    // hide back the loading
                    $('.sendanswer').hide();
                },
                error: function(err) {
                    console.log(err);
                    // hide back the loading
                    $('.sendanswer').hide();
                }
            });
        },
        error: function(err) {
            console.log(err);
            // hide back the loading
            $('.sendanswer').hide();
        }
    });
}

