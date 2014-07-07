function(doc) {
	  if (doc.Type == "Comment") {
	    emit(doc._id, doc);
	  }
	}