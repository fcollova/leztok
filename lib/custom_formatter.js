/**
 * @module app.js
 * @author Francesco Collovà <francesco.collova@gmailcom>
 * @copyright C&C aka leztok  2014
 * @version 0.1
 */



function myCustomFormatJSON(req, res, body) {
	  if (!body) {
	    if (res.getHeader('Content-Length') === undefined &&
	        res.contentLength === undefined) {
	      res.setHeader('Content-Length', 0);
	    }
	    return null;
	  }

	  if (body instanceof Error) {
	    // snoop for RestError or HttpError, but don't rely on instanceof
	    if ((body.restCode || body.httpCode) && body.body) {
	      body = body.body;
	    } else {
	      body = {
	        message: body.message
	      };
	    }
	  }

	  if (Buffer.isBuffer(body))
	    body = body.toString('base64');

	  var data = JSON.stringify(body, null, 2);

	  if (res.getHeader('Content-Length') === undefined &&
	      res.contentLength === undefined) {
	    res.setHeader('Content-Length', Buffer.byteLength(data));
	  }

	  return data;
	}


module.exports = myCustomFormatJSON;