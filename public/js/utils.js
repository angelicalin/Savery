$('.submitButton').click(function(event) {
	event.preventDefault();
	// $.post( "/addItem", function( data ) {
	//   console.log("success!");
	// });
	var jqxhr = $.post( "/addItem", function() {
	  alert( "success" );
	})
	  .done(function() {
	    alert( "second success" );
	  })
	  .fail(function() {
	    alert( "error" );
	  })
	  .always(function() {
	    alert( "finished" );
	});
})