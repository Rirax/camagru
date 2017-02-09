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

var form = document.querySelector('.form');
form.addEventListener('submit', function(e) {
  
  e.preventDefault();
  var data = new new FormData(form);
  var xhr = getHttpRequest();
  
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      // if (xhr.status === 200) { }
    }
  }
  
  xhr.open('POST', form.getAttribute('action'), true);
  xhr.setRequestHeader('X-Requested-With', 'xmlhttprequest');
  xhr.send(data);

});

function selectOnlyThis(id) {
    for (var i = 1;i <= 3; i++)
    {
        document.getElementById("cbox" + i).checked = false;
    }
    document.getElementById(id).checked = true;

}

function loadimage() {
  var img = new Image();
  img.onload 
}

function takePicture() {
  var img = witchOne();
  if (img)
  {
    var ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0);
    ctx.globalAlpha = 1;
    ctx.drawImage(img, 0,50);
    var data = canvas.toDataURL('image/png');
    canvas.setAttribute('src', data);
    var xhr = getHttpRequest()
    var post = new FormData()
    post.append('img', data);
    xhr.open('POST', 'http://localhost:8080/camagru/layer.php', true);
    xhr.setRequestHeader('X-Requested-With', 'xmlhttprequest');
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
        //window.alert(xhr.responseText); // contient le résultat de la page
      } else {
        window.alert("wrong link");
      }
    }
  }
  xhr.send(post);

}

/*(function(){
  var   filter_choice = document.querySelector('#choice'),
      filter_prev = document.querySelector('#filter_prev')

    console.log('1');
    filter_choice.addEventListener('change', function() {
      console.log('2');
      var idx=filter_choice.selectedIndex;
      var val=filter_choice.options[idx].value;
   
      filter_prev.classList.remove('filter1');
      filter_prev.classList.remove('filter2');
      filter_prev.classList.remove('filter3');

      filter_prev.classList.add(val);

    });
})();*/