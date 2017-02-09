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

// CA COMMENCE ICI
(function() {

  var streaming = false,
      video        = document.querySelector('#video'),
      cover        = document.querySelector('#cover'),
      canvas       = document.querySelector('#canvas'),
      photo        = document.querySelector('#photo'),
      startbutton  = document.querySelector('#startbutton'),
      width = 320,
      height = 0;

  navigator.getMedia = ( navigator.getUserMedia ||
                         navigator.webkitGetUserMedia ||
                         navigator.mozGetUserMedia ||
                         navigator.msGetUserMedia);

  navigator.getMedia(
    {
      video: true,
      audio: false
    },
    function(stream) {
      if (navigator.mozGetUserMedia) {
        video.mozSrcObject = stream;
      } else {
        var vendorURL = window.URL || window.webkitURL;
        video.src = vendorURL.createObjectURL(stream);
      }
      video.play();
    },
    function(err) {
      console.log("An error occured! " + err);
    }
  );

  video.addEventListener('canplay', function(ev){
    if (!streaming) {
      height = video.videoHeight / (video.videoWidth/width);
      video.setAttribute('width', width);
      video.setAttribute('height', height);
      canvas.setAttribute('width', width);
      canvas.setAttribute('height', height);
      streaming = true;
    }
  }, false);

  function loadImg(src) {
    var ret = new Image();

    ret.onload = onload = function(){ console.log("i'm here");};
    ret.src = src;
    return ret;
  }


function witchFilter()
{
  var cb1 = document.getElementById('cb1')
  var cb2 = document.getElementById('cb2')
  var cb3 = document.getElementById('cb3')

  if (cb1.checked) {
    var src = loadImg("../Filters/fokof.jpg");
    console.log('cb1');
  }
  if (cb2.checked) {
    var src = loadImg("../Filters/frog.png");  
    console.log('cb2');
  }
  if (cb3.checked) {
    var src = loadImg("../Filters/penguin.png");
    console.log('cb3');
  }
  return src;
}

  function takepicture() {
    var img = witchFilter();
    if (img)
    {
      var ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, width, height);
      ctx.globalAlpha = 1;
      ctx.drawImage(img, 0, 50);
      var data = canvas.toDataURL('image/png');
      canvas.setAttribute('src', data);
      var xhr = getHttpRequest()
      var post = new FormData()
      post.append('img', data);
      xhr.open('POST', '../Controlers/layer.php', true);
      xhr.setRequestHeader('X-Requested-With', 'xmlhttprequest');
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            //window.alert(xhr.responseText); // contient le résultat de la page
          }
          else {
            window.alert("wrong link");
          }
        }
      }
      xhr.send(post);
    }
    else {
      alert('You must chose a filter');
    }
  }

  startbutton.addEventListener('click', function(ev){
      takepicture();
    ev.preventDefault();
  }, false);

  function radioCheck(id) {
    for (var i = 1;i <= 3; i++) {
        document.getElementById("cb" + i).checked = false;
    }
    document.getElementById(id).checked = true;
}

// ENLEVER LES FONCTIONS DOUBLE ET CHANGER LES IMAGES

})();