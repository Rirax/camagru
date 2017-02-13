(function() {

  var streaming = false,
      video        = document.querySelector('#video'),
      cover        = document.querySelector('#cover'),
      canvas       = document.querySelector('#canvas'),
      photo        = document.querySelector('#photo'),
      startbutton  = document.querySelector('#startbutton'),
      width = 620,
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

function loadImg(src, ctx) {
    var ret = new Image();

    ret.onload = function(){
      ctx.globalAlpha = 1;
      ctx.drawImage(ret, 0, 50);
    };
    ret.src = src;
    return ret;
  }


function whichFilter(ctx)
{
  var cb1 = document.getElementById('cb1')
  var cb2 = document.getElementById('cb2')
  var cb3 = document.getElementById('cb3')

  if (cb1.checked) {
    var src = loadImg("../Filters/fokof.png", ctx);
    document.getElementById('cb1').checked = false;
  }
  if (cb2.checked) {
    var src = loadImg("../Filters/frog.png", ctx);  
    document.getElementById('cb2').checked = false;
  }
  if (cb3.checked) {
    var src = loadImg("../Filters/penguin.png", ctx);
    document.getElementById('cb3').checked = false;
  }
  document.getElementById("startbutton").style.visibility="hidden";
  return src;
}

  function takepicture() {
    var ctx = canvas.getContext('2d');
    var img = whichFilter(ctx);
    if (img)
    {
      canvas.style.display = "initial";
      ctx.globalAlpha = 2;
      ctx.drawImage(video, 0, 0);
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
      alert('You must choose a filter');
    }
  }

  startbutton.addEventListener('click', function(ev){
      takepicture();
    ev.preventDefault();
  }, false);

//   var form = document.querySelector('.form');
// form.addEventListener('submit', function(e) {
  
//   e.preventDefault();
//   var data = new new FormData(form);
//   var xhr = getHttpRequest();
  
//   xhr.onreadystatechange = function () {
//     if (xhr.readyState === 4) {
//       // if (xhr.status === 200) { }
//     }
//   }
  
//   xhr.open('POST', form.getAttribute('action'), true);
//   xhr.setRequestHeader('X-Requested-With', 'xmlhttprequest');
//   xhr.send(data);

// });



})();

function selectOnlyThis(id) {
    for (var i = 1;i <= 3; i++) {
        document.getElementById("cb" + i).checked = false;
    }
    document.getElementById(id).checked = true;
    document.getElementById("startbutton").style.visibility="initial";

}

function deletePic(id) {
  var pic = document.getElementById(id).id;
  var xhr = getHttpRequest();
  var post = new FormData();
  post.append('img', pic);
  xhr.open('POST', '../Controlers/delete_pic.php', true);
  xhr.setRequestHeader('X-Requested-With', 'xmlhttprequest');
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        // window.alert(xhr.responseText); // contient le résultat de la page
      }
      else {
        window.alert("This picture does not exist");
      }
    }
  }
  xhr.send(post);
  var tmp = document.getElementById(id);
  tmp.src = "../Filters/frog.png";
}