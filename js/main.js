const $urlInput = document.querySelector('#photo-url');
const $photo = document.querySelector('img');
$urlInput.addEventListener('input', newPhoto);

function newPhoto(event) {
  $photo.setAttribute('src', event.target.value);
}

const $formValue = document.querySelector('#entry-form');

function handleSubmit(event) {
  event.preventDefault();
  const title = $formValue.elements.title.value;
  const url = $formValue.elements.url.value;
  const notes = $formValue.elements.notes.value;
  const noteData = {
    entryId: data.nextEntryId,
    title,
    url,
    notes,
  };
  data.nextEntryId++;
  data.entries.unshift(noteData);
  $photo.setAttribute('src', '/images/placeholder-image-square.jpg');
  $formValue.reset();
}

$formValue.addEventListener('submit', handleSubmit);
