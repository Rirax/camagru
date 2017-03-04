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

function filterUpload(file, name, data) {
  var img = whichFilter();
  
  var flt = new Image();
  flt.src = img;
  flt.onload = function(){
    var xhr = getHttpRequest();
    var post = new FormData();
    post.append('data', file, name);
    post.append('img', data);
    post.append('flt', img);
    xhr.open('POST', '../Controlers/layer.php', true);
    xhr.setRequestHeader('X-Requested-With', 'xmlhttprequest');
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        var response = JSON.parse(xhr.responseText);
        canvas.style.display="none";
        if (xhr.status === 200) {
          var prev = document.getElementById('preview');
          var cell = document.createElement("img");
          cell.setAttribute("id", response['id']);
          cell.setAttribute("class", 'prevs');
          cell.src = response['link'];
          cell.style.width = '300px';
          prev.insertBefore(cell, prev.firstChild);
          cell.setAttribute('onclick', 'deletePic('+response['id']+')');
        }
        else {
          location.reload();
        }
      }
    }
    xhr.send(post);
  }
}

document.getElementById('submit').addEventListener('click', function(ev){
  var file = this.files;
  var reader = new FileReader();
  
  reader.addEventListener('load', function() {
    if (!file[1]) {
      if (file[0].size > 2097152) {
        console.log("The file you're trying to upload is to big");
        window.alert("The file you're trying to upload is to big");
      }
      else {
        filterUpload(file[0], file[0].name, reader.result);
      }
    }
    else {
      window.alert('You can only upload one file at a time');
      console.log('You can only upload one file at a time');
    }
  });
  reader.readAsDataURL(file[0]);
  ev.preventDefault();
}, false);