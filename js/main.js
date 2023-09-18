const $urlInput = document.querySelector('#photo-url');
const $photo = document.querySelector('img');
$urlInput.addEventListener('input', newPhoto);

function newPhoto(event) {
  $photo.setAttribute('src', event.target.value);
}
