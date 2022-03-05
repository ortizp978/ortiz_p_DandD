(() => {
	// collect the buttons at the bottom of the page
	let theThumbnails = document.querySelectorAll("#buttonHolder img"),
		gameBoard = document.querySelector(".puzzle-board"),
		puzzlePieces = document.querySelectorAll(".puzzle-pieces *"),
		dropZones = document.querySelectorAll(".drop-zone");

		// const is a variable whose value can't change - it's immutable. Use this to assign bits of data that will be constant (const) for the entire lifecycle of your app.

		// puzzlePaths refer to half the image src that we need to build -. need to append an index to them
	const puzzlePaths = ["topLeft", "topRight", "bottomLeft", "bottomRight"]

	function detectImg(id){

		var childElements = document.getElementsByClassName(id)[0];
		if (childElements != null){

		if (childElements.firstChild != null) {
			return false;}
		}
	}

	function changeImgSet() {
		// The "this" keyword refers to the elemen that triggers this function (the nav button we click with the custom data attribute of bgref)
		// debugger;
		gameBoard.style.backgroundImage = `url(images/background${this.dataset.bgref}.jpg)`;

		// loop through all of the small draggable images and chabge their src attribute with JS
		puzzlePaths.forEach((img, index) => {
			puzzlePieces[index].src = `images/${img + this.dataset.bgref}.jpg`
		});
	}

	function dragStarted(event) {
		console.log('started draggin a piece');
		// use the setData method of the drag event to store a reference to the current element
		event.dataTransfer.setData('currentItem', event.target.id);
	}

	function allowDragOver(event) {
		// turn off the default browser behaviour -> we want to allow a dragover
		event.preventDefault();
		console.log('dragged over me');
	}

	function allowDrop(event) {
		// turn off the default browser behaviour -> follow our instructions instead of what the browser would normally do on drop
		event.preventDefault();
		console.log('dropped on me');

		if (detectImg(event.currentTarget.className)== false){return;};

		// retrieve the dragged element using the dataTransfer object
		//this was set in the drag event using the setData method
		let droppedEl = event.dataTransfer.getData('currentItem');
		console.log(droppedEl);

		// move the dragged element into the current drop zone
		// appendChild is a built-in JS function that adds an element to another as a child
		this.appendChild(document.querySelector(`#${droppedEl}`));
	}

	// add event handling here -> loop through theThumbnails array and add event handling to each image
	theThumbnails.forEach(item => item.addEventListener("click", changeImgSet));

	//listen for the dragstarted event on the puzzle puzzlePieces
	puzzlePieces.forEach(piece => piece.addEventListener ("dragstart", dragStarted));

	//add event handling for the drop zones (dragover and drop)
	dropZones.forEach(zone => {
		zone.addEventListener("dragover", allowDragOver);
		zone.addEventListener("drop", allowDrop);
	});
})();
