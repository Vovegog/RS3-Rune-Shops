function setUTC() {
    const date = new Date();
    var expiry = new Date(date);
    expiry.setUTCDate(date.getUTCDate() + 1);
    expiry.setUTCHours(2, 0, 0, 0);
    expiry = expiry.toUTCString();
    return expiry;
}

function checkTime(i) {
    if (i < 10) {
        i = "0" + i
    };
    return i;
}

function Clock() {
    var today = new Date();
    var h = today.getUTCHours();
    var m = today.getUTCMinutes();
    var s = today.getUTCSeconds();
    h = checkTime(h);
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('Clock').innerHTML = h + ":" + m + ":" + s;
    var t = setTimeout(function () {
        Clock()
    }, 500);

    // If the time ticks past midnight, clear storage and reload the page without cache
    if (h == 0o0 && m == 0o0 && s == 0o1) {
        localStorage.clear();
        location.reload(true);
    }
}

Clock();

// Get all the checkboxes
var checkboxes = document.getElementsByClassName("checkbox");

// Need to add a unique ID to each row in the table
var rows = document.getElementsByTagName("tr");
for (var i = 0; i < rows.length; i++) {
    rows[i].id = "row" + i;
}


function styleOnLoad() {
    for (var i = 0; i < checkboxes.length; i++) {
        if (localStorage.getItem(checkboxes[i].value) == "true") {
            checkboxes[i].checked = true;
            var row = document.getElementById(checkboxes[i].parentNode.parentNode.id);
            row.style.textDecoration = "line-through";
            row.style.backgroundColor = "green";
        }
    }
}
styleOnLoad();

for (var i = 0; i < checkboxes.length; i++) {
    checkboxes[i].addEventListener("click", function () {
        if (this.checked) {
            var row = document.getElementById(this.parentNode.parentNode.id);
            localStorage.setItem(this.value, `true`);
            row.style.textDecoration = "line-through";
            row.style.backgroundColor = "green";
        } else {
            var row = document.getElementById(this.parentNode.parentNode.id);
            localStorage.removeItem(this.value);
            row.style.textDecoration = "none";
            row.style.backgroundColor = "#2b2b2b";
        }
    }
)}