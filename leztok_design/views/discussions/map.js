function(doc) {
	  if (doc.Type == "Discussion") {
	    emit(doc._id, doc);
	  }
	}