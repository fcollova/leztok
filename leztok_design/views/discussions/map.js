function(doc) {
	  if (doc.type == "Discussion") {
	    emit(doc._id, doc);
	  }
	}