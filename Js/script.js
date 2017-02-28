var getHttpRequest = function () {
  var httpRequest = false;

  if (window.XMLHttpRequest) {
    httpRequest = new XMLHttpRequest();
    if (httpRequest.overrideMimeType) {
      httpRequest.overrideMimeType('text/xml');
    }
  }
  else if (window.ActiveXObject) {
    try {
      httpRequest = new ActiveXObject("Msxml2.XMLHTTP");
    }
    catch (e) {
      try {
        httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
      }
      catch (e) {}
    }
  }

  if (!httpRequest) {
    alert('Abort, unable to create XMLHTTP object');
    return false;
  }

  return httpRequest;
}

function likeImg(id){
  var heart = document.getElementById(id);
  var val = heart.classList.contains('fa-heart-o');

  if (val) //like
  {
    var xhr = getHttpRequest();
    var post = new FormData();
    post.append('like', 'true');
    post.append('image_id', id);
    xhr.open('POST', 'http://localhost:8080/camagru/Controlers/jaime.php', true);
    xhr.setRequestHeader('X-Requested-With', 'xmlhttprequest');
    xhr.onreadystatechange = function () {
     if (xhr.readyState === 4) 
     {
       if (xhr.status === 200) 
       {
        console.log(xhr.responseText);
      } 
      else 
      {
        window.alert("wrong link");
      }
    }
  }
  xhr.send(post);
  heart.classList.remove('fa-heart-o');
  heart.classList.add('fa-heart');
  heart.style.color='red';
}
  else { //dislike
   var xhr = getHttpRequest();
   var posty = new FormData();
   posty.append('like', 'false');
   posty.append('image_id', id);
   xhr.open('POST', 'http://localhost:8080/camagru/Controlers/jaime.php', true);
   xhr.setRequestHeader('X-Requested-With', 'xmlhttprequest');
   xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) 
    {
      if (xhr.status === 200) 
      {
        console.log(xhr.responseText);
             // contient le résultat de la page
           } 
           else 
           {
            window.alert("wrong link");
          }
        }
      }
      xhr.send(posty);
      heart.classList.add('fa-heart-o');
      heart.style.color='#9b9b9b';
    }
}

function comment(id){
    var key = window.event.keyCode;
    //13 = enter
    if (key == 13)
    {
      var image_id = 'c' + id;
      var comment = document.getElementById(image_id) ;
      var xhr = getHttpRequest();
      var com = new FormData();
      com.append('comment', comment.value);
      com.append('image_id', id);
      xhr.open('POST', 'http://localhost:8080/camagru/Controlers/commentaire.php', true);
      xhr.setRequestHeader('X-Requested-With', 'xmlhttprequest');
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) 
        {
          if (xhr.status === 200) 
          {
            var user = xhr.responseText;
            console.log(user);
            var title = document.createElement('h4');
            var txt = document.createElement('p');
            var tmp = comment.value;
            title.innerHTML = user;
            txt.innerHTML = tmp;
            console.log(txt.innerHTML);
            console.log(title.innerHTML);
            comment.value = "";
          } 
          else 
          {
            console.log("wrong link");
          }
        }
      }
      xhr.send(com);
     location.reload();
    }
  }