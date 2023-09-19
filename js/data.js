/* exported data */

let data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1,
};

window.addEventListener('beforeunload', serializeData);
function serializeData(event) {
  const newData = JSON.stringify(data);
  localStorage.setItem('javascript-local-storage', newData);
}

const checkStorage = localStorage.getItem('javascript-local-storage');
if (checkStorage !== null) {
  data = JSON.parse(checkStorage);
}
