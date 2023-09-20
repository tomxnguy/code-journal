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

function renderEntry(entry) {
  const $listDom = document.createElement('li');
  $listDom.setAttribute('class', 'row');

  const $imgDiv = document.createElement('div');
  $imgDiv.setAttribute('class', 'column-half');
  $listDom.appendChild($imgDiv);

  const $imgRender = document.createElement('img');
  $imgRender.setAttribute('src', entry.url);
  $imgDiv.appendChild($imgRender);

  const $textDivRender = document.createElement('div');
  $textDivRender.setAttribute('class', 'column-half');
  $listDom.appendChild($textDivRender);

  const $titleRender = document.createElement('h3');
  $titleRender.textContent = entry.title;
  $textDivRender.appendChild($titleRender);

  const $noteRender = document.createElement('p');
  $noteRender.textContent = entry.notes;
  $textDivRender.appendChild($noteRender);

  return $listDom;
}

const $unOrderedList = document.querySelector('ul');
document.addEventListener('DOMContentLoaded', function (event) {
  for (let i = 0; i < data.entries.length; i++) {
    const $newEntry = renderEntry(data.entries[i]);
    $unOrderedList.append($newEntry);
  }
});
