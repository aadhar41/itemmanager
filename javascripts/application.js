$(document).ready(function() {
	
	getItems();

	// Submit event
	$('#itemForm').on('submit', function(e) {
		e.preventDefault();

		let text = $('#text').val();
		let body = $('#body').val();

		addItem(text, body);
	});


	// Delete Event 
	$('body').on('click', '.deleteLink', function(event) {
		event.preventDefault();
		/* Act on the event */
		
		var id = $(this).data('id');
		
		deleteItem(id);
	});

	// Delete item through api
	function deleteItem(id) {
		$.ajax({
			method: 'DELETE',
			url: 'http://itemapi.test/api/items/'+id,
			data: {_method: 'DELETE'},
		})
		.done(function(item) {
			alert('Item removed.');
			location.reload();
		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log("complete");
		});
	}


	// Insert Items Using APIS
	function addItem(text, body) {

		$.ajax({
			method: 'POST',
			url: 'http://itemapi.test/api/items',
			//dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
			data: {text: text, body: body},
		})
		.done(function(item) {
			console.log("success");
			alert('Item # ' + item.id + ' added.');
			location.reload();
		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log("complete");
		});
		
	}

	// Get items from apis
	function getItems() {
		$.ajax({
			url: 'http://itemapi.test/api/items',
			// type: 'default GET (Other values: POST)',
			// dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
			// data: {param1: 'value1'},
		})
		.done(function(items) {
			// console.log("success");
			// console.log(items);
			let output = '';
			$.each(items, function(key, item) {
				 /* iterate through array or object */
				 output += `
					<li class="list-group-item d-flex  ">
						<strong> ${item.text} : </strong> ${item.body} <a href="#" class="deleteLink" data-id='${item.id}' > &nbsp;| Delete</a>
					</li>
				 `
			});

			$('#items').append(output);
		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log("complete");
		});
		
	}
});