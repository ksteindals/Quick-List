var button = document.getElementById("enter");
var input = document.getElementById("userinput");
var ul = document.querySelector("ul");
var removeLi = document.getElementById("removeall");
var checkboxes = document.querySelectorAll("li input[type = checkbox]");
var allLi

onload = input.focus ();

function inputLength() {
	return input.value.length;
}

function markDone() {
		for (var i=0; i< checkboxes.length; i++) {
			if (checkboxes[i].checked === true) {
				checkboxes[i].parentNode.classList.add("done");
			} else {
				checkboxes[i].parentNode.classList.remove("done");
			}
		}
}


function addClear(){ //Adds "show" class to Clear All button
	if (allLi === 1) {
	 	removeLi.parentNode.classList.add("show");
	 	removeLi.parentNode.classList.remove("hide")
	} else if (allLi === 0){
		removeLi.parentNode.classList.remove("show")
		removeLi.parentNode.classList.add("hide");
	}
}


function createListElement() {
	var li = document.createElement("li");
		li.className = "animated slideInDown"
	var checkbox = document.createElement("input");
		checkbox.type = "checkbox";
	var removeButton = document.createElement("button");
		removeButton.className = "delete";
		removeButton.innerHTML += "x";
	var span = document.createElement("span");
		span.setAttribute("contenteditable", "true");

	li.appendChild(checkbox);	
	span.appendChild(document.createTextNode(input.value));
	li.appendChild(span);
	li.appendChild(removeButton);
	ul.appendChild(li);

	input.value = ""; //sets input field empty


	checkboxes = document.querySelectorAll("li input[type = checkbox]"); 	//Updates checkboxes variable and adds event listener with markDone function
	for (var i=0; i< checkboxes.length; i++) {
		checkboxes[i].addEventListener("click", markDone);
	}

	allLi = document.querySelectorAll("li").length;
	addClear();

	removeButton.onclick = function() { //Removes List item if X clicked
		this.parentNode.parentNode.removeChild(li);
		allLi = document.querySelectorAll("li").length;
		addClear();
	} 
}



function addListAfterClick() {
	if (inputLength() > 0) {
		createListElement();
	}
}

function addListAfterKeypress(event) {
	if (inputLength() > 0 && event.keyCode === 13) {
		createListElement();
	}
}


function removeAll(){   // Removes All li items
	while (ul.firstChild) {
	    ul.removeChild(ul.firstChild);
	}
	allLi = document.querySelectorAll("li").length;
	addClear();
}


button.addEventListener("click", addListAfterClick);

input.addEventListener("keypress", addListAfterKeypress);

removeLi.addEventListener("click", removeAll);


// Adds new list item in front (should add to createListElement())

// if (ul.childElementCount == 0) {  //using if/else statement to add items to top of list
//        ul.appendChild(li);       // will add if count of ul children is 0 otherwise add before first item
//    } else {
//        ul.insertBefore(li, ul.firstChild);
//    }
