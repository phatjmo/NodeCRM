/*! SGI Core Workspace logic file
* Written by: Justin Zimmer
* * Copyright 2013 Specialty Graphics Incorporated */

        function switchWin (win,source) {
            showWin = document.getElementById(win);
            if ($(showWin).is(':visible')) {
                $(showWin).slideUp();
                source.innerText = source.innerText.replace("Hide","Show");
            } else {
                $(showWin).show( "slow" );
                source.innerText = source.innerText.replace("Show","Hide");
                
            };
           
        }
        function hideMe(win){
            var hideWin = "#"+win;
            var menu = hasMenu(win);
            console.log("Hiding " + menu);
            if (menu != "none") {
                hideMenu(menu);
            };
            drawMenu("mainMenu");
            $(hideWin).hide( "fold", "slow", function() {
               $("#windowPane").empty(); 
            } );
            
        }

        function hideMenu(menu){
            hideIt = "#"+menu;
            $(hideIt).hide( "slide", "fast" );
            $("#menus").empty();
        }

        function popWin(win) {
            console.log("Popping Window: " + win);
            var formFile = "partials/"+win+".hjs";
            var showWin = "#" + win;
            console.log("Loading Form: " + formFile);
            $("#windowPane").load(formFile, function(responseTxt,statusTxt,xhr){
                console.log("Status: " + statusTxt);
                if(statusTxt=="success")
                    console.log("External content loaded successfully!");
                    $(showWin).show( "slide", "slow");
                    var menu ="";
                    menu = hasMenu(win);
                    console.log("Showing " + menu);
                    if (menu != "none") 
                        drawMenu(menu);
                if(statusTxt=="error")
                    console.log("Error: "+xhr.status+": "+xhr.statusText);
                });

            
        }
        function drawMenu (menu) {
            showMenu = "#"+menu;
            
            //$('#menus').append('<ul id="' + menu + '" style="display:none;"></ul>');
            $('#menus').append('<ul id="' + menu + '"></ul>');
            $.post("menus", {"menu" : '"' + menu + '"'}, function(data){
                console.log(data);
                for (i in data.menus) {
                    var menuItem = '<li><a onclick=\'hitMenu("'+ data.menus[i].command + '");\'>'+data.menus[i].label + '</a></li>';
                    $(showMenu).append(menuItem);
                    console.log(menuItem);
                    //console.log(data.menus[i].name);
                    //console.log(data.menus[i].command);
                    //console.log(data.menus[i].label);
                }
            //$(showMenu).show("slide","fast");
            $(showMenu).menu();
                //console.log(data);
            });
            $()
        }

        function dupeCheck(form) {
            var jsonQuery = {
                "formName" : form
            };

            switch (form) {
                case 'frmCust':
                    jsonQuery.phone = $( "#frmCust #phone" ).val();
                    jsonQuery.company = $( "#frmCust #company" ).val();
                    break;
                case 'frmOrders':
                    jsonQuery.phone = $( "#frmCust #phone" ).val();
                    jsonQuery.company = $( "#frmCust #company" ).val();
                    break;
                case 'frmEmp':
                    jsonQuery.phone = $( "#frmCust #phone" ).val();
                    jsonQuery.company = $( "#frmCust #company" ).val();
                    break;    
                case 'frmProd':
                    jsonQuery.phone = $( "#frmCust #phone" ).val();
                    jsonQuery.company = $( "#frmCust #company" ).val();
                    break;
                 case 'frmUser':
                    jsonQuery.login = $( "#frmUser #login" ).val();
                    //jsonQuery.company = $( "#frmCust #company" ).val();
                    break;
                default:
                    console.log("Invalid Form Submitted!");        
            }

            $.post( 'dupe', jsonQuery, function( data ) {
                console.log("Dupe Check Sent: " + data);
                })
                .done(function( data ) {
                    console.log("Dupe Check Complete: " + data);
                    if (data == 'nodupe') {
                        processForm(form);
                    } else {
                        //alert('There is a duplicate of this record, do you wish to overwrite?');
                        $( "#dialog" ).text("There is a duplicate of this record, do you wish to overwrite?");
                        var dialog = $( "#dialog" ).dialog({ 
                                resizable: false,
                                appendTo: ".workspace",
                                draggable: false,
                                title: "Warning!",
                                modal: true,
                                dialogClass: "alert no-close",
                                buttons: [ 
                                    { text: "Yes", click: function() { 
                                        processForm(form, data)
                                        $( this ).dialog( "close" ); } }, 
                                    { text: "No", click: function() {                               
                                        $( this ).dialog("close");} } 
                                        ] });
                        dialog.dialog("open");
                                
                    //});
                    }
                    })
                .fail(function( data ) {
                    console.log("Dupe Check Failed: " + data);
                });
        }

        function saveData() {
            var activeForm = "";
            $('form').each(function (i) {
                console.log($( this ).prop('id') + ' selected...');
                if ($(this).is(':visible')) {
                    console.log($( this ).prop('id') + " is visible!");
                    activeForm = $( this ).prop('id'); 
                    console.log(activeForm + " is the active form!")
                } else {
                    console.log($( this ).prop('id') + " is NOT visible!");
                }
                
            });
            if (activeForm != "") {
                console.log(activeForm + " is not empty")
                //processForm(activeForm);
                dupeCheck(activeForm);
            } else {
                console.log(activeForm + " is empty")
            }

        }

        function processForm (form, dupeID) {
            
            
           
         switch(form)
          {
            case "frmUser":
                var jsonPost = {
                    "formName" : "frmUser",
                    "menus" : [
                              ]
                    };

                $("input[id|='menu']:checked").each(function(i){
                    jsonPost.menus.push($.parseJSON($(this).val()));
                });
                //Add "LogOff" to the end of the list.
                jsonPost.menus.push({
                        "menu" : "mainMenu",
                        "command" : "logoff", 
                        "label" : "LogOff"
                        });

                $('#frmUser input').each(function(i) {
                    var inputField = $(this).prop('id');
                    if (inputField.substr(0,4) != "menu") {
                        eval( 'jsonPost.' + inputField +' = $(this).val()');
                        console.log(inputField + " = " + $(this).val())
                    }
                });
                
                if (dupeID) {
                    jsonPost.id = dupeID
                    /*$(jsonPost.menus).each(function(i) {
                        $(this).userId = dupeID;
                        console.log($(this));
                    });*/
                    for (menu in jsonPost.menus) {
                        jsonPost.menus[menu].userId = dupeID;
                        console.log("Added userId: " + jsonPost.menus[menu].userId + " to menu option: " + jsonPost.menus[menu].command);
                    }
                };
                console.log(jsonPost);
                 $.post( 'save', jsonPost, function() {
                    console.log("User Save Attempted.");
                });
            break;
            case "frmCust":
                var procForm = "#" + form;
                //var postString = "{\"" + form + "\": [{";
                var txtPost = '{ "formName": "' + form + '"' ;
                $(procForm + ' input').each(function(i) {
                    var inputField = $(this).prop('id');
                    txtPost += ',';
                    txtPost += '"' + inputField + '": "' + $(procForm + ' #' + inputField).val()+'"';
                });
                txtPost += '}';
                var jsonPost = $.parseJSON(txtPost);
                if (dupeID) {
                    jsonPost.id = dupeID
                };

                console.log(jsonPost);
                $.post( 'save', jsonPost, function() {
                    console.log("Save Attempted.");
                });
            break;
         }
            

        }
        function hasMenu (win) {
            var menu = $( "#" + win ).attr("menu");
            console.log ("Menu is " + menu);
            return menu;
        }

        function hitMenu (win) {
            console.log("menu(" + win + ")");
            if (win == "logoff") {
                window.location.replace("/logout");
            } else {
            popWin(win);
            hideMenu("mainMenu");
            }
            
        }
        
        function password(){
            if ($("#password").val() == "") return;
            if ($("#password").val() != $("#repass").val()){
                $( "#dialog" ).text("Passwords don't match!");
                        var dialog = $( "#dialog" ).dialog({ 
                                resizable: false,
                                appendTo: ".workspace",
                                draggable: false,
                                title: "Warning!",
                                modal: true,
                                dialogClass: "alert no-close",
                                 buttons: [ 
                                    { text: "OK", click: function() { 
                                       $("#password").val("");
                                       $("#repass").val("");
                                       $("#password").focus();
                                       $( this ).dialog( "close" ); } } 
                                    ]
                                });
                        dialog.dialog("open");
                        
            } else {
                $.post("hashthis", {"password" : '"' + $("#password").val() + '"'}, function(data){
                    if (data.message == "SUCCESS") {
                        $("#encryptedPass").val(data.hash);
                        $("#salt").val(data.salt);
                    } else {
                        $( "#dialog" ).text("There was a problem with encrypting this password!");
                        var dialog = $( "#dialog" ).dialog({ 
                                resizable: false,
                                appendTo: ".workspace",
                                draggable: false,
                                title: "Warning!",
                                modal: true,
                                dialogClass: "alert no-close",
                                buttons: [ 
                                    { text: "OK", click: function() { 
                                       $("#password").val("");
                                       $("#repass").val("");
                                       $("#password").focus();
                                       $( this ).dialog( "close" ); } } 
                                    ]
                                });
                        dialog.dialog("open");
                        
                    }
                });
            }
        }

