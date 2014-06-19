/******* Views management *************************************/

	var view_stack = [];
   var view_loader = '<div style="width:100px;height:100px;background-color:#ECF0F1;position:absolute;top:45px;right:0;bottom:0;left:0;margin:auto;border-radius:25px"> \
							 	<img src="images/loader.GIF" style="position:absolute;top:0;right:0;bottom:0;left:0;margin:auto;"> \
							 </div>';
	var view_obj = {
   	views: [
    				{
    				   title:"connect-panel-modal",
    					type:"modal",
    					func:false,
    					template: '<div class="container dimbox" id="connect-panel-modal" style="margin-top:70px;"> \
									  	<div style="width:250px; margin-left:auto;margin-right:auto;margin-bottom:30px;padding:0;"> \
											<form class="" role="form"> \
												<input type="text" class="form-control" style="margin-bottom:5px;" name="mail" placeholder="Nome" required autofocus> \
												<input type="text" class="form-control" style="margin-bottom:5px;" nama="mail" placeholder="Cognome" required autofocus> \
        										<input type="email" class="form-control" style="margin-bottom:5px;" name="mail" placeholder="Indirizzo mail" required autofocus> \
        										<input type="password" class="form-control" style="margin-bottom:5px;" name="psw" placeholder="Password" required> \
        										<input type="password" class="form-control" style="margin-bottom:5px;" name="psw2" placeholder="Password" required> \
        										<button type="submit" class="center-block btn btn-info" style="margin-top:5px;">Salva</button> \
      									</form> \
										</div> \
		 							 </div> <!-- /connect-panel-modal -->"',
		 				content_feed:'',
		 				api:''
    				},
    				{
    				   title:"content-feed",
    					type:"modal",
    					func:true,
    					func_code: function(api,template,content_feed,par){
    								  		console.log("Fetch content-comments by discussion");
            							/*form_data = new FormData();
            							form_data.append('pks',PKS);
            							form_data.append('rating',rating_type);
            							form_data.append('item_id',item_id);*/
    										/* Start loader alert box */
            							/* End loader alert box */   
            
            							ajax_url = api; 
            							$.ajax({
            									// the URL for the request
    												url: ajax_url,
   												// the data to send (will be converted to a query string)
    												/*data: form_data, to set - case POST */
    												type: "GET",
    												dataType : "json",
               								contentType: false,
    												processData: false,
               	     
               								success: function( json ) { // this function parameter is the returned dataType
                           									json_list_item = json
                           									content_string = "";
                           									console.log(json_list_item);
                           									console.log("Error:" + json_list_item.head.error);
                           									if (json_list_item.head.error == null) {
                           									  console.log("Rows:" + json_list_item.data.rows.length);
                           									  
                           									  if (content_feed != "") {
                           									  	 content_string = template.replace("@comment_titlediscussion","#" + json_list_item.data.rows[0].value.IdDiscussion);
                           									  	 //content_string = content_string.replace("@comment_nfemale","#" + json_list_item.data.rows[i].value.type);
                           									  	 //content_string = content_string.replace("@comment_nmale","#" + json_list_item.data.rows[i].value.type);
                           									  	 template = content_string + content_feed;
                           									  	 
                           									  }
                           									  
                           									  for (i=0;i<json_list_item.data.rows.length;i++) {
                           									  		template_to_add = template.replace("@comment_username","#"+json_list_item.data.rows[i].value.IdUser);
                           									  		template_to_add = template_to_add.replace("@comment_txt",json_list_item.data.rows[i].value.Comment);
                           									  		//template_to_add = template_to_add.replace("@comment_nlike",json_list_item.data.rows[i].value.NumberLike);
                           									  		content_string += template_to_add;
                           									  }
                           									  
                           									  $('#content').transition({ scale: 0.0 }, function(){
																		  		$('#content').html(content_string);
																				$('#content').transition({ scale: 1.0 });
																		  });
                           									}
                      									},
    					
    												error: function( xhr, status ) {
                      											console.log('ERROR');
                      											console.log(status);
                      	 								},
               
               								complete: function( xhr, status ) {
                           									console.log('Complete');         
                         								}
    				
            							}); // <-- end ajax function
    								  },
    					template: '<!-- (start) hashtag buzz dashboard -->	\
									  <div class="container bg-info navbar-fixed-top dimbox" style="margin-top:50px;"> \
									  	<p style="margin-top:10px"><i class="fa fa-comments" style="margin-right:5px"></i><small>@comment_titlediscussion</small><i class="fa fa-female pull-right" style="margin-right:5px;color:#E74C3C"><small>@comment_nfemale</small></i><i class="fa fa-male pull-right" style="margin-right:5px;color:#3498DB"><small>  @comment_nmale</small></i></p> \
									  </div> \
									  <!-- / (end) hashtag buzz dashboard --> \
									  <div id="content-feed"><\div>',
						func_add_elements:'', // da utilizzare per l'aggiornamento della view in funzione di nuovi dati aggiunti alla fine 					  
    					content_feed:'<div class="panel panel-default" style="margin-top:5px"> \
  										  	<div class="panel-body"> \
												<div class="media"> \
  													<a class="pull-left" href="#"> \
    													<img class="media-object img-circle" src="http://placeimg.com/50/50/any" alt="..."> \
  													</a> \
 												   <div class="media-body"> \
    													<p class="media-heading" style="color:#3498DB">@comment_username</p> \
    													<p><small>@comment_txt</small></p> \
    													<p><img src="http://lorempixel.com/400/200/technics/" class="img-rounded img-responsive" alt="Responsive image"></p> \
														<p class="pull-right" style="color:#3498DB"><small><i class="fa fa-reply" style="margin-left:5px;margin-right:5px"></i><i class="fa fa-heart" style="margin-left:5px">  @comment_nlike</i></small></p> \
  													</div> \
												</div> \
  											</div> \
										</div>',
						api:'http://leztokapp-leztok.rhcloud.com/api/query/comments' //'http://127.0.0.1:8080/api/query/comments'
    				},
    				{
    					title:"content-discussions", // Done
    					type:"view",
    					func:true,
    					func_code: function(api,template,content_feed,par){
    								  		console.log("Fetch content-discussions");
            							/*form_data = new FormData();
            							form_data.append('pks',PKS);
            							form_data.append('rating',rating_type);
            							form_data.append('item_id',item_id);*/
    										/* Start loader alert box */
            							/* End loader alert box */   
            
            							ajax_url = api; 
            							$.ajax({
            									// the URL for the request
    												url: ajax_url,
   												// the data to send (will be converted to a query string)
    												/*data: form_data, to set - case POST */
    												type: "GET",
    												dataType : "json",
               								contentType: false,
    												processData: false,
               	     
               								success: function( json ) { // this function parameter is the returned dataType
                           									json_list_item = json
                           									content_string = "";
                           									console.log(json_list_item);
                           									console.log("Error:" + json_list_item.head.error);
                           									if (json_list_item.head.error == null) {
                           									  console.log("Rows:" + json_list_item.data.rows.length);
                           									  if (content_feed != "") {
                           									  	 content_feed = content_feed.replace("");
                           									  }
                           									  for (i=0;i<json_list_item.data.rows.length;i++) {
                           									  		template_to_add = template.replace("@discussion_title","#"+json_list_item.data.rows[i].value.Title);
                           									  		template_to_add = template_to_add.replace("@discussion_title","#"+json_list_item.data.rows[i].value.Title);
                           									  		template_to_add = template_to_add.replace("@discussion_ncomment",json_list_item.data.rows[i].value.NumberComments);
                           									  		template_to_add = template_to_add.replace("@discussion_nmale",json_list_item.data.rows[i].value.NumberMale);
                           									  		template_to_add = template_to_add.replace("@discussion_nfemale",json_list_item.data.rows[i].value.NumberFemale);
                           									  		content_string += template_to_add;
                           									  }
                           									  
                           									  $('#content').transition({ scale: 0.0 }, function(){
																		  		$('#content').html(content_string);
																				$('#content').transition({ scale: 1.0 });
																		  });
                           									}
                      									},
    					
    												error: function( xhr, status ) {
                      											console.log('ERROR');
                      											console.log(status);
                      	 								},
               
               								complete: function( xhr, status ) {
                           									console.log('Complete');         
                         								}
    				
            							}); // <-- end ajax function
    								  },
    					template:'<div class="panel panel-default" style="margin-top:5px"> \
  										<div class="panel-heading">@discussion_title <button class="btn btn-default btn-sm pull-right" id="@discussion_title" role-btn="move-to-comments"><i class="fa fa-chevron-right"></i></button></div> \
  											<div class="panel-body"> \
    											<i class="fa fa-comments" style="margin-right:5px"></i><small>@discussion_ncomment</small><i class="fa fa-female pull-right" style="margin-right:5px;color:#E74C3C"><small> @discussion_nfemale</small></i><i class="fa fa-male pull-right" style="margin-right:5px;color:#3498DB"><small> @discussion_nmale</small></i> \
  											</div> \
									</div>',
						func_add_elements:'',			
						content_feed:'',
						api:'http://leztokapp-leztok.rhcloud.com/api/query/discussions'	
    				}
    			]
    	};		

/***************** View management - Show view, modal *****************************/		
	view_obj.show_view = function(view_name,par){
	   console.log("Search for:" + view_name + " on " + view_obj.views.length + " views");
		flag = false;
		for (i=0;i<view_obj.views.length;i++){
		   console.log(i + " :->" + view_obj.views[i].title);
			if (view_name == view_obj.views[i].title){
				view = view_obj.views[i]; // view is set as views obj returned
				flag = true;
				break; 
			}
		}
		
		if (flag){
			// Start view rendering process
			console.log("Start view:" + view.title + " rendering process");
			if (view.func) {
				view.func_code(view.api,view.template,view.content_feed,par);
				if (view.type == "modal") {
					$('#back').show();
					view_stack.unshift($('#content').html()); // set the view stack as the current content div html
			   }
			}
			
		}
		else {
			console.log("ERROR: view don't find!!!");
		}
		
	
	}; // .show_view
	
	
	$("#content").on("click","button",function(){
		role_btn = $(this).attr("role-btn");
		switch (role_btn) {
			case "move-to-comments":
			$('#content').transition({ scale: 0.0 }, function(){
				console.log("ACTION: Changing view: content-feed");
				view_obj.show_view("content-feed",2);
			});	
			break;
			default: return true;
		}
		
	});
		 
/***************** Connect page management *****************************/
	$("#content").on("click","#register",function(){
		$('#content').transition({ scale: 0.0 }, function(){
			console.log("principal");
			view_stack.unshift($('#content').html());
			
			$('#content').html(view_obj.views[0].template);
			$('#content').transition({ scale: 1.0 });
			if (view_obj.views[0].type == "modal") {
				$('#back').show();
			}
		});			
	});
		
	$('#back').click(function(){
		console.log("modal");
		$('#content').transition({ scale: 0.0 }, function(){
			$('#content').html(view_stack[0]);
			$('#content').transition({ scale: 1.0 });
			$('#back').hide();
		});			
	});

/***************** Function(s) zone ***************************/

	var view_loader_fun = function(){
		$('#content').transition({ scale: 0.0 }, function(){
			$('#content').html(view_loader);
			$('#content').transition({ scale: 1.0 });
		});	
	};
	
	
	
/***************** Main menù animation ***********************/

	menu_is_out = 0;
					
	$("#circlemenu").click(function(){
		if (menu_is_out == 0) {
			$(this).toggleClass("palette palette-peter-river");
			$(this).addClass("palette palette-asbestos");
			menu_is_out = 1;
		}
		else {
			$(this).toggleClass("palette palette-asbestos");
			$(this).addClass("palette palette-peter-river");
			menu_is_out = 0;
		}
					
		$("#submenu").toggleClass("watchin"); // menu is out
			//$(this).toggleClass("circleclick");
	});	
				
/**************************************************************/