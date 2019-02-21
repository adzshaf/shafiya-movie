(function() {
    var url = "https://api.themoviedb.org/3/movie/";
    var key = "?api_key=6be75f67395913eaf1a30277bde07319";
    var imgURL = "https://image.tmdb.org/t/p/";
    var imgSize = "w185";



function appendItems(){
    url = "https://api.themoviedb.org/3/discover/movie";
    var subURL = "?sort_by=popularity.desc";

    $.ajax({
        url: url+key,
        datatype: 'jsonp'
    }).done(function(data){
    history.pushState({page:'main'},null,$(location).attr('href'));
    console.log("YEY BERHASIL wkwk");
    $contentList = $('#content');
    data.results.forEach(function(movie) {
        var $itemContainer = $('<div class="col-sm-4"></div>');
        $item = $('<div class="thumbnail"></div>');
        $item.append($('<img>').attr('src', imgURL+imgSize+movie.poster_path).attr('class', 'poster').attr('itemId', movie.id));
        $item.appendTo($itemContainer);
    $('.poster').off('click').on('click',function(){
      var itemId = $(this).attr('itemId');
      history.pushState({page:'detail'},null,'/movie/'+itemId);
      console.log("pushed State in getItemDetail : detail");
      getItemDetail(itemId);
    });
    $contentList.append($itemContainer);
    });

  }).fail(function(jqxhr, textStatus, error){
      console.log("makeItems ajax error: " + textStatus + ", " +error);
});
    }

function getItemDetail(itemId){
    url ="https://api.themoviedb.org/3/movie/";
        $.ajax({
            url:url+itemId+key,
            dataType: 'jsonp'
        }).done(function(data){
          //history.pushState({page:'detail'},null,'/movie/'+itemId);
          //console.log("pushed State in getItemDetail : detail");
        var add = $(location).attr('href');
        console.log("history pushState href: " + add);
        imgSize = 'w780';
        $content = $('#content');
    
        $content.html('');
        $itemRow1 = $('<div class="row">');
        $itemTop = $('div class="col-sm-12');
        $itemBackdrop = $('<img>').attr('src', imgURL+imgSize+data.backdrop_path).attr('class', 'backdrop');
        $itemTop.append($itemBackdrop);
        $itemLeft = $('<div class="col-sm-4 col-md-3">');
        $itemImg = $('<img>').attr('src', imgURL+imgSize+data.poster_path).attr('class', 'img-responsive').attr('itemId', data.id);
        $itemLeft.append($itemImg);
    
        $itemRight= $('<div class="col-sm-8 col-md-9">');
        $itemRightRow1 = $('<div class="row">');
        $itemRightRow1.append($('<h2>'+ data.title + '</h2>'));
        $itemRightRow2 = $('<div class="row">');
        $itemRightRow2.append($('<div class="col-sm-2 col-md-2"><i class="fa fa-star" aria-hidden="true">   ' + data.vote_average + '/10 </i>'));
        $itemRightRow2.append($('<div class="col-sm-2 col-md-2"><i class="fa fa-heart" aria-hidden="true">   ' + data.vote_count + ' votes </i>'));
        $itemRightRow2.append($('<div class="col-sm-2 col-md-2">').text(data.release_date.substr(0,4)));
        $itemRightRow3 = $('<div class="row">');
        $itemRightRow3.append($('<h4> Overview </h4>'));
        $itemRightRow3.append($('<p></p>').text(data.overview));
        $itemRightRow4 = $('<div class="row">');
        $itemRightRow4.append($('<h4> Starring </h4>'));
        $itemRightRow4.append($('<div class="casts">'));
          getCasts(itemId);
          $itemRight.append($itemRightRow1,$itemRightRow2,$itemRightRow3,$itemRightRow4);
    
          $itemRow1.append($itemLeft,$itemRight);
    
          $itemRow2 = $('<div class="row">');
          $itemRow2.append($('<h4>Trailer</h4>'));
          $itemRow2.append($('<div class="trailer">'));
          getTrailer(itemId);
          $content.append($itemRow1,$itemRow2);
    
        }).fail(function(jqxhr, textStatus, error){
              console.log("getItemDetail ajax error: " + textStatus + ", " +error);
          });
    }


    function init() {
        appendItems();
   }
 
 $(init);

}());