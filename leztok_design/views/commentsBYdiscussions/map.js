function(doc) {
	  if (doc.type == "Comment") {
	    emit(doc.IdDiscussion, doc);
	  }
	}