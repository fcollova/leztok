function(doc) {
	  if (doc.Type == "Comment") {
	    emit(doc.IdDiscussion, doc);
	  }
	}