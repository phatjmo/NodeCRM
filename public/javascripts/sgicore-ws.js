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
            
            $('#menus').append('<ul id="' + menu + '" style="display:none;"></ul>');
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
            $(showMenu).show("slide","fast");
                //console.log(data);
            });
            $()
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
                processForm(activeForm);
            } else {
                console.log(activeForm + " is empty")
            }

        }

        function processForm (form) {
            
            var procForm = "#" + form;
            //var postString = "{\"" + form + "\": [{";
            var postString = '{ "formName": "' + form + '"' ;
           
            $(procForm + ' input').each(function(i) {
                var inputField = $(this).prop('id');
                postString += ',';
                postString += '"' + inputField + '": "' + $(procForm + ' #' + inputField).val()+'"';
            });
            postString += '}';
            //console.log(postString);
            $.post( 'save', $.parseJSON(postString), function( data ) {
                console.log(data);
            });

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
        $('document').ready(function(){
            drawMenu('mainMenu');

        })


