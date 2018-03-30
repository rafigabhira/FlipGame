console.log("Great to see you," + " " + name);

var scorelist = [];
var can_pick = false;

$(document).ready(function(){

    console.log($("#jam").html());
    function memory(){
     
        function TileItem () {
            this.tile_type;
            this.addToScene = function(id, img) {
                var tileItem = '<li id="'+id+' data-type="'+this.tile_type+'"><div class="tile"><div class="tile-front"></div><div class="tile-back">'+img+'</div</div</li>';
                $('.tiles').append(tileItem);
            };
        }
    
        var tiles = [];
        var tile = new TileItem();
        var num_tiles = 16;
        var openings = 0;
        var picked_tiles = [];
        var pictures = [
                                    '<img src="src/img/1.png"></img>',
                                    '<img src="src/img/2.png"></img>',
                                    '<img src="src/img/3.png"></img>',
                                    '<img src="src/img/4.png"></img>',
                                    '<img src="src/img/5.png"></img>',
                                    '<img src="src/img/6.png"></img>',
                                    '<img src="src/img/7.png"></img>',
                                    '<img src="src/img/9.png"></img>',
                                    '<img src="src/img/1.png.png"></img>',
                                    '<img src="src/img/2.png.png"></img>',
                                    '<img src="src/img/3.png.png"></img>',
                                    '<img src="src/img/4.png.png"></img>',
                                    '<img src="src/img/5.png.png"></img>',
                                    '<img src="src/img/6.png.png"></img>',
                                    '<img src="src/img/7.png.png"></img>',
                                    '<img src="src/img/9.png.png"></img>',
                                    ];

        //retrieves img dari gambar di array
        function givePic(i) {
            return pictures[i];
        }

        //looping untuk membuat file tiles                                    
        for(var i=0; i<num_tiles; i++) {
            tiles.push(Math.floor(i/2));
        }

        //loop that randomizes the tiles within array
        var randomize, temp;
        for(var k=num_tiles-1; k>0; k--) {
            randomize = Math.floor(Math.random()*k);
            temp = tiles[k];
            tiles[k] = tiles[randomize];
            tiles[randomize] = temp;
        }

        //loop to place tiles with a random id
        for(var p=0; p<num_tiles; p++) {
            tile = new TileItem();
            var id = Math.floor(Math.random()*300);
            var img = givePic(p);
            tile.tile_type = tiles[p];
            tile.addToScene(id, img);
        }

        // fungsi jika card di click
        function clicked() {

            if(can_pick) {
                var picked = $(this);
                picked.find('.tile').addClass('flipped');

                //add tiles selected to picked_tiles array
                if(picked_tiles.indexOf(picked) === -1) {
                    picked_tiles.push(picked);
                }

                //checks if 2 tiles have been clicked
                if(picked_tiles.length === 2) {
                    console.log('2 have been picked');
                    //don't allow more tiles to be picked yet
                    can_pick = false;
                    

                    //checks 
                    if((picked_tiles[0].find('img').attr('src'))+'.png' == picked_tiles[1].find('img').attr('src') || 
                        (picked_tiles[0].find('img').attr('src')) == picked_tiles[1].find('img').attr('src')+'.png') {
                        console.log(picked_tiles[0]);
                        setTimeout(function(){
                            
                            picked_tiles[0].addClass('disabled');
                            picked_tiles[1].addClass('disabled');
                            picked_tiles = [];
                            can_pick = true;
                            //keeps track of pairs 'opened', if all pairs open, resetGame() is called
                            openings++;
                            if(openings === (num_tiles/2)) {
                                stoptimer();
                                console.log($("#jam").html());
                                console.log(localStorage.username);
                                localStorage.setItem($("#jam").html(), localStorage.username);
                                scorelist.push($("#jam").html());
                                scorelist.sort();
                                localStorage.setItem("scores", JSON.stringify(scorelist));
                                loadScores();
                                resetGame();
                                can_pick = false;

                            }
                        }, 1000);
                    
                    //if 2 karu tidak match
                    } else {
                        setTimeout(function() {
                            //reset array 
                            picked_tiles[0].children().removeClass('flipped');
                            picked_tiles[1].children().removeClass('flipped');
                            picked_tiles = [];
                            can_pick = true;
                        }, 1000);
                    }
                }
            }
        }
        
        //shuffle list yang ada 
        $('ul li').shuffle();

        //add event listeners kalo di click
        var elements = $('li');
        for(var q=0; q<elements.length; q++){
            $('li').unbind().click('click', clicked);
        }

        function resetGame(){
            alert("Congratulations " + localStorage.username + " ! Your time is " + minutes + ":" + seconds);
            $('.tiles').children().remove();
            memory();
            resettimer();
            document.getElementById('jam').innerHTML = "00 m : 00 s";
            document.getElementsByClassName('start')[0].innerHTML = "Start";
        }
    }
    loadScores();
    function loadScores(){
            scorelist = JSON.parse(localStorage.getItem("scores"));
            $("#scores").empty();
            if(scorelist != null){
                var i = 1;
                $(scorelist).each(function(){
                    $("#scores").append("<strong>" + i  + "</strong>. " + this + ", <strong>" + localStorage.getItem(this) + "</strong><br>");
                    i++;
                })
            } else {
                scorelist = [];
            }
    }

    memory();
});

//shuffle plugin sumber dari stackoverflow         
(function($){
    $.fn.shuffle = function() {
        var allElems = this.get(),
            getRandom = function(max) {
                return Math.floor(Math.random() * max);
            },
            shuffled = $.map(allElems, function(){
                var random = getRandom(allElems.length),
                    randEl = $(allElems[random]).clone(true)[0];
                allElems.splice(random, 1);
                return randEl;
            });
        this.each(function(i){
            $(this).replaceWith($(shuffled[i]));
        });
    return $(shuffled);
    };
})(jQuery);
   

    var millisec = 0;
    var seconds = 0;
    var minutes = 0;
    var timer;

    function display(){

      if (millisec>=9){
         millisec=0
         seconds+=1

         if(seconds>=60){
            millisec = 0;
            seconds = 0;
            minutes +=1;
         }
      }
      else
        millisec+=1
        if(seconds < 10 && minutes < 10){
            document.getElementById('jam').innerHTML = "0" + minutes +" m : 0"+ seconds +" s";
        } else if (seconds < 10){
            document.getElementById('jam').innerHTML =  minutes +" m : 0"+ seconds +" s" ;
        } else if(minutes < 10){
            document.getElementById('jam').innerHTML = "0" + minutes +" m : "+ seconds + " s";
        } else {
            document.getElementById('jam').innerHTML = minutes +" m : 0"+ seconds + " s";
        }
        
        timer = setTimeout("display()",100);
      }

    function starttimer() {
        
      if (timer > 0) {
        return;
      }
      display();    
    }
    function stoptimer() {
      clearTimeout(timer);
      timer = 0;

    }

    function startstoptimer() {
      if (timer > 0) {
         clearTimeout(timer);
         timer = 0;
         can_pick = false;
         document.getElementsByClassName('start')[0].innerHTML = "Start";
      } else {
         can_pick = true;
         display();
         document.getElementsByClassName('start')[0].innerHTML = "Pause";
      }
    }

    function resettimer() {
        stoptimer();
        millisec = 0;
        seconds = 0;
        minutes = 0;
    }

   
 