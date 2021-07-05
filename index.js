
var array = [];
let done1 = document.getElementById("done1");
let undo1 = document.getElementById("undo1");
let add = document.getElementById("add");
let tit = document.getElementById('title');
let desc = document.getElementById('description');
add.addEventListener("click", getAndUpdate);
update(); // for loading already list when we open website.

// To Add a new list in local storage
function getAndUpdate() {
    console.log("Updating List...");
    if (tit.value == "" && desc.value == "")
        confirm("Kindly Enter Title and Description!!!")
    else if (tit.value == "")
        confirm("Kindly Enter Title!!!")
    else if (desc.value == "")
        confirm("Kindly Enter Description!!!")
    else if (localStorage.getItem('itemsJson') == null) {
        itemJsonArray = [];
        itemJsonArray.push([tit.value, desc.value, 0]);
        localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray))
        tit.value = '';
        desc.value = '';
    }
    else {
        itemJsonArrayStr = localStorage.getItem('itemsJson')
        itemJsonArray = JSON.parse(itemJsonArrayStr);
        itemJsonArray.push([tit.value, desc.value, 0]);
        localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray))
        tit.value = '';
        desc.value = '';
    }
    
    update();
}

// to update the list in the table
function update() {
    if (localStorage.getItem('itemsJson') == null) {
        itemJsonArray = [];
        localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray))
    }
    else {
        itemJsonArrayStr = localStorage.getItem('itemsJson')
        itemJsonArray = JSON.parse(itemJsonArrayStr);
    }
    // Populate the table
    let tableBody = document.getElementById("tableBody");
    let str = "";
    itemJsonArray.forEach((element, index) => {
        str += `
        
        <tr  class="table-info text-body font-weight-normal ">
        
            <th scope="row">${index + 1}</th>
            <td  >${element[0]}</td>
            <td  >${element[1]}</td>
            <th style="display:none;" >${element[2]}</th>
            <td style="text-align:center;">
                <button style="display:none;" id="undo1" title="Undo" class="btn btn-sm btn-warning" onclick="undo(${index})"><i class="fa fa-undo" style="color:white;"></i></button>
                <button id="done1" title="Done" class="btn btn-sm btn-success" onclick="done(${index})"><i class="fa fa-check"></i></button>
                <button title="edit" class="btn btn-sm btn-primary" onclick="edit(${index})"><i class="fa fa-edit"></i></button>
                <button title="Delete" class="btn btn-sm btn-danger " onclick="deleted(${index})"><i class="fa fa-close"></i></button>
            </td> 
            
        </tr>`;
    });
    tableBody.innerHTML = str;

     let trlist = document.querySelectorAll("tr");
     

            Array.from(trlist).forEach(function(item){
            if(item.getElementsByTagName("th")[1].innerText == 1){

                item.getElementsByTagName("th")[0].style.textDecoration="line-through";
                item.getElementsByTagName("td")[0].style.textDecoration="line-through";
                item.getElementsByTagName("td")[1].style.textDecoration="line-through";
                item.getElementsByTagName("Button")[0].style.display = "inline";
                item.getElementsByTagName("Button")[1].style.display = "none";

            }

            })
        
     
     

}

// To delete the list
function deleted(itemIndex) {
    console.log("Delete", itemIndex);
    itemJsonArrayStr = localStorage.getItem('itemsJson')
    itemJsonArray = JSON.parse(itemJsonArrayStr);
    // Delete itemIndex element from the array
    itemJsonArray.splice(itemIndex, 1);
    localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
    update();
}

// To edit the list
function edit(itemIndex) {
    let saveindex = document.getElementById('saveindex');
    saveindex.value = itemIndex;
    save = document.getElementById("save");
    console.log(add);
    add.style.display = "none";
    save.style.display = "inline";
    //tit = document.getElementById('title');
    //console.log(document.querySelectorAll(".slect2"))
    //desc = document.getElementById('description');
    itemJsonArrayStr = localStorage.getItem('itemsJson');
    itemJsonArray = JSON.parse(itemJsonArrayStr);
    tit.value = itemJsonArray[itemIndex][0];
    desc.value = itemJsonArray[itemIndex][1];

}

function done(itemIndex) {

    let trlist = document.querySelectorAll("tr")

    Array.from(trlist).forEach(function (item) {
        if (item.getElementsByTagName("th")[0].innerText == itemIndex + 1) {


            //console.log(item.getElementsByTagName("th")[0].innerText);
            item.getElementsByTagName("th")[0].style.textDecoration = "line-through";
            item.getElementsByTagName("td")[0].style.textDecoration = "line-through";
            item.getElementsByTagName("td")[1].style.textDecoration = "line-through";
            itemJsonArrayStr = localStorage.getItem('itemsJson');
            itemJsonArray = JSON.parse(itemJsonArrayStr);
            // console.log(itemJsonArray[itemIndex][2]) 
            itemJsonArray[itemIndex][2] = 1;
            localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
            // console.log(itemJsonArray[itemIndex][2])
            item.getElementsByTagName("Button")[0].style.display = "inline";
            item.getElementsByTagName("Button")[1].style.display = "none";
            // array[itemIndex + 1] = 1;
            // console.log(array);

        }
    })
    //update();
}

function undo(itemIndex) {

    let trlist = document.querySelectorAll("tr")

    Array.from(trlist).forEach(function (item) {
        if (item.getElementsByTagName("th")[0].innerText == itemIndex + 1) {


            //console.log(item.getElementsByTagName("th")[0].innerText);
            item.getElementsByTagName("th")[0].style.textDecoration = "none";
            item.getElementsByTagName("td")[0].style.textDecoration = "none";
            item.getElementsByTagName("td")[1].style.textDecoration = "none";
            itemJsonArrayStr = localStorage.getItem('itemsJson');
            itemJsonArray = JSON.parse(itemJsonArrayStr);
            // console.log(itemJsonArray[itemIndex][2]) 
            itemJsonArray[itemIndex][2] = 0;
            localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
            // console.log(itemJsonArray[itemIndex][2])
            item.getElementsByTagName("Button")[0].style.display = "none";
            item.getElementsByTagName("Button")[1].style.display = "inline";
            // array[itemIndex + 1] = 1;
            // console.log(array);

        }
    })
    //update();
}

// TO save the list after editing
let savebutton = document.getElementById("save");
savebutton.addEventListener("click", function () {
    //tit = document.getElementById('title');
    //console.log(document.querySelectorAll(".slect2"))
    //desc = document.getElementById('description');
    if (tit.value == "" && desc.value == "")
        confirm("Kindly Enter Title and Description!!!")
    else if (tit.value == "")
        confirm("Kindly Enter Title!!!")
    else if (desc.value == "")
        confirm("Kindly Enter Description!!!")
    else {
        itemJsonArrayStr = localStorage.getItem('itemsJson');
        itemJsonArray = JSON.parse(itemJsonArrayStr);
        saveindex = document.getElementById('saveindex').value;
        itemJsonArray[saveindex][0] = tit.value;
        itemJsonArray[saveindex][1] = desc.value;
        localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
        add.style.display = "inline";
        save.style.display = "none";
        tit.value = '';
        desc.value = '';
    }
    update();
})

// To delete the all the list
function clearStorage() {
    if (localStorage.getItem('itemsJson') == "[]")
        confirm("List is already Empty!!!");
    else if (confirm("Do you areally want to clear?")) {
        console.log('Clearing the storage')
        localStorage.clear();
        add.style.display = "inline";
        save.style.display = "none";
        update()
    }
}


// To perform search in the list
let search = document.getElementById("search");
search.addEventListener("input", function () {
    //if(search.keyCode == 13) return false;
    let trlist = document.querySelectorAll("tr");
    Array.from(trlist).forEach(function (item) {
        if (item.getElementsByTagName("th")[0].innerText == 'SNo')
            return;

        let titletext = item.getElementsByTagName("td")[0].innerText;
        let re = new RegExp(search.value, 'gi');
        let desctext = item.getElementsByTagName("td")[1].innerText;
        let re1 = new RegExp(search.value, 'gi');
        if (titletext.match(re) || desctext.match(re1)) {
            item.style.display = "table-row" // to maintain table format
            console.log('yo')
        } else {
            item.style.display = "none"
        }
    })
})
