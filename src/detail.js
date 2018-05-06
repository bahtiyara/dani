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

// Showing and hiding delete button
