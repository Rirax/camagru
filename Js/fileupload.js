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
    location.reload();
  }
}

document.getElementById('file').addEventListener('change', function(ev){
  var file = this.files;
  console.log(file);
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

function whichFilter(ctx)
{
  var cb1 = document.getElementById('cb1')
  var cb2 = document.getElementById('cb2')
  var cb3 = document.getElementById('cb3')

  if (cb1.checked) {
    var src = '../Filters/fokof.png';
    document.getElementById('cb1').checked = false;
  }
  if (cb2.checked) {
    var src = "../Filters/frog.png";  
    document.getElementById('cb2').checked = false;
  }
  if (cb3.checked) {
    var src = "../Filters/penguin.png";
    document.getElementById('cb3').checked = false;
  }
  document.getElementById("startbutton").style.visibility="hidden";
  document.getElementById("fileToUpload").style.visibility="hidden";
  return src;
}