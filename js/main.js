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
  $unOrderedList.prepend(renderEntry(noteData));
  viewSwap('entries');
  toggleNoEntries();
}

$formValue.addEventListener('submit', handleSubmit);

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

  const $pencilRender = document.createElement('i');
  $pencilRender.className = 'fa-solid fa-pencil';
  $titleRender.appendChild($pencilRender);

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
const $editEntry = document.querySelector('.code-journal-header');

const $ulQuery = document.querySelector('ul');
$ulQuery.addEventListener('click', handleEdit);

function handleEdit(event) {
  if (event.target.tagName === 'I') {
    viewSwap('entry-form');
    const $closestId = Number(
      event.target.closest('li').getAttribute('data-entry-id')
    );
    for (let i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryId === $closestId) {
        data.editing = data.entries[i];
        $editTitle.setAttribute('value', data.editing.title);
        $editUrl.setAttribute('value', data.editing.url);
        $editNotes.textContent = data.editing.notes;
        $editPlaceholder.setAttribute('src', data.editing.url);
        $editEntry.textContent = 'Edit Entry';
      }
    }
  }
}
