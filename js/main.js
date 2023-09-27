const $urlInput = document.querySelector('#photo-url');
const $photo = document.querySelector('img');
$urlInput.addEventListener('input', newPhoto);

function newPhoto(event) {
  $photo.setAttribute('src', event.target.value);
}

const $formValue = document.querySelector('#entry-form');
const $getLi = document.querySelector('li');
$formValue.addEventListener('submit', handleSubmit);

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
  if (data.editing === null) {
    noteData.entryId = data.nextEntryId++;
    data.entries.unshift(noteData);
    $photo.setAttribute('src', '/images/placeholder-image-square.jpg');
    $formValue.reset();
    $unOrderedList.prepend(renderEntry(noteData));
    toggleNoEntries();
  } else {
    for (let i = 0; i < data.entries.length; i++) {
      if (data.editing.entryId === data.entries[i].entryId) {
        data.entries[i].title = $formValue.elements.title.value;
        data.entries[i].url = $formValue.elements.url.value;
        viewSwap('entries');
        data.entries[i].notes = $formValue.elements.notes.value;
        $getLi[i].replaceWith(renderEntry(data.entries[i]));
      }
    }
  }
}

function renderEntry(entry) {
  const $listDom = document.createElement('li');
  $listDom.setAttribute('class', 'row');
  $listDom.setAttribute('data-entry-id', data.nextEntryId);

  const $imgDiv = document.createElement('div');
  $imgDiv.setAttribute('class', 'column-half');
  $listDom.appendChild($imgDiv);

  const $imgRender = document.createElement('img');
  $imgRender.setAttribute('src', entry.url);
  $imgRender.setAttribute('alt', entry.url);
  $imgDiv.appendChild($imgRender);

  const $textDivRender = document.createElement('div');
  $textDivRender.setAttribute('class', 'column-half');
  $listDom.appendChild($textDivRender);

  const $titleRender = document.createElement('h3');
  $titleRender.textContent = entry.title;
  $textDivRender.appendChild($titleRender);

  const $pencilDiv = document.createElement('div');
  $pencilDiv.setAttribute('class', 'pencil-div');
  $titleRender.appendChild($pencilDiv);

  const $pencilRender = document.createElement('i');
  $pencilRender.className = 'fa-solid fa-pencil';
  $pencilDiv.appendChild($pencilRender);

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
  viewSwap(data.view);
  toggleNoEntries();
});

const $noEntries = document.querySelector('.no-entries');
function toggleNoEntries() {
  if (data.entries.length > 0) {
    $noEntries.className = 'hidden';
  } else {
    $noEntries.className = 'no-entries';
  }
}

const $views = document.querySelectorAll('[data-view]');
function viewSwap(view) {
  data.view = view;
  for (let i = 0; i < $views.length; i++) {
    if ($views[i].getAttribute('data-view') === view) {
      $views[i].classList.remove('hidden');
    } else {
      $views[i].classList.add('hidden');
    }
  }
}

const $entriesAnchor = document.querySelector('.entries-anchor');
$entriesAnchor.addEventListener('click', switchToEntries);

function switchToEntries(event) {
  viewSwap('entries');
}

const $entryFormAnchor = document.querySelector('.entry-form-anchor');
$entryFormAnchor.addEventListener('click', switchToEntryForm);

function switchToEntryForm(event) {
  viewSwap('entry-form');
}

const $editTitle = document.querySelector('#title');
const $editUrl = document.querySelector('#photo-url');
const $editPlaceholder = document.querySelector('.placeholder-image');
const $editNotes = document.querySelector('#notes');
const $editEntry = document.querySelector('.entry-form-header');

const $ulQuery = document.querySelector('ul');
$ulQuery.addEventListener('click', handleEdit);

function handleEdit(event) {
  if (event.target.tagName === 'I') {
    for (let i = 0; i < data.entries.length; i++) {
      if (
        data.entries[i].entryId ===
        Number(event.target.closest('li').getAttribute('data-entry-id')) - 1
      ) {
        data.editing = data.entries[i];
        $editTitle.value = data.editing.title;
        $editUrl.value = data.editing.url;
        $editNotes.value = data.editing.notes;
        $editPlaceholder.setAttribute('src', data.editing.url);
        $editEntry.textContent = 'Edit Entry';
        viewSwap('entry-form');
      }
    }
  }
}
