const addButton = document.querySelector('.addIcon');
const fills = document.querySelectorAll('.fill');
const editIcons = document.querySelectorAll('.edit');
const noteCards = document.querySelectorAll('.note-card');
const title = document.querySelector('h2');
const noteCardTitles = document.querySelectorAll('.noteCardTitle');
// const noteCardTitles = document.getElementsByClassName('noteCardTitle');
const searchInput = document.querySelector('.searchInput');


const firstColor = document.querySelector('.first-color');
const secondColor = document.querySelector('.second-color');
const thirdColor = document.querySelector('.third-color');
const fourthColor = document.querySelector('.fourth-color');
const fifthColor = document.querySelector('.fifth-color');

// Append newArticle
function addNewNoteCard(colorClass, backgroundColor) {
  // // Increment the note index based on the number of existing note cards
  let noteIndex = noteCards.length + 1;
  console.log('noteIndex=> ', noteIndex)

  // Call your createNewNoteCard function to create a new article.
  const article = createNewNoteCard(backgroundColor);

  // // Append the newly created article to your articles container.
  const articlesContainer = document.querySelector('.articles-container');
  articlesContainer.appendChild(article);

  // Call the updateBodyHeight function to adjust the body height
  updateBodyHeight();

  // Attach the edit icon click event listener to the newly added note card
  const editIcon = article.querySelector('.edit');
  editIcon.addEventListener('click', toggleEditMode);

  // Store the note card's data in localStorage if noteIndex is 3
  const noteData = {
    noteIndex: noteIndex,
    content: article.querySelector('.text').textContent,
    date: article.querySelector('.date').textContent,
    backgroundColor: backgroundColor,
  };

  localStorage.setItem(`note-${noteIndex}`, JSON.stringify(noteData));
}


// Function to update body height based on content height
function updateBodyHeight() {
  const contentHeight = document.querySelector('.articles-container').offsetHeight;
  const verticalLine = document.querySelector('.vertical-line')
  const body = document.querySelector('#body');
  body.style.minHeight = `${contentHeight + 200}px`; // Adjust the 100 as needed
  verticalLine.style.height = `${contentHeight + 200}px`;
}


function createNewNoteCard(backgroundColor){
  // Create a new article
  const article = document.createElement('article');
  // Add article class
  article.classList.add('note-card', 'newCard');
  // article.className = 'note-card';

  // Increment the note index
  const noteIndex = (noteCards.length) + 1;
  article.setAttribute('data-note-index', noteIndex);
  console.log('data-note-index=> ', noteIndex)

  // Create h3Tag text class
  const h3TextClass = document.createElement('h3');
  h3TextClass.contentEditable = 'false'
  h3TextClass.className = 'noteCardTitle';
  h3TextClass.appendChild(document.createTextNode('Monday'));
  // append pTag to article
  article.appendChild(h3TextClass);

  if (h3TextClass.contentEditable === 'false'){
    h3TextClass.contentEditable = 'true';
    h3TextClass.focus();
  }else{
    h3TextClass.contentEditable = 'false';
    h3TitleText = h3TextClass.textContent;
    console.log('h3TextClass=> ', h3TitleText);
    localStorage.setItem(`h3TitleName-${noteIndex}`, h3TitleText);
  }

  // h3TextClass.addEventListener('click', createNewNoteCard);  

  // Create pTag text class
  const pTextClass = document.createElement('p');
  pTextClass.contentEditable = 'false'
  pTextClass.className = 'text';
  pTextClass.appendChild(document.createTextNode('It\'s a lovely day.'));
  // append pTag to article
  article.appendChild(pTextClass);

  // Create editIcon text class
  const edit = document.createElement('div');
  edit.className = 'edit';

  const iElement = document.createElement('i');
  // edit.appendChild(iElement);
  iElement.classList.add('large', 'material-icons');
  iElement.textContent = 'edit';

  edit.appendChild(iElement);

  // append EditIcon to article
  article.appendChild(edit);

  // Create deleteIcon text class
  const del = document.createElement('div');
  del.className = 'delete';
  const iDeleteElement = document.createElement('i');
  iDeleteElement.classList.add('large', 'material-icons');
  iDeleteElement.textContent = 'delete';

  del.appendChild(iDeleteElement);


  // append DeleteIcon to article
  article.appendChild(del);

  // Remove NoteCard
  function removeNoteCard(e){
    if(noteIndex === 3){
      if(e.target.parentElement.classList.contains('delete')){
        if(confirm('Are You Sure')){
          e.target.parentElement.parentElement.remove();
        }
      }
    }
  }

  del.addEventListener('click', removeNoteCard);

  // // Apply the Deletecolor style
  del.style.color = backgroundColor;

  // Create date element
  const date = document.createElement('div');
  date.className = 'date';
  date.appendChild(document.createTextNode(''));
  // append date to article
  article.appendChild(date);

  // // Apply the background color style
  article.style.backgroundColor = backgroundColor;

  console.log('article=> ', article);

  // localStorage.setItem(('article', article));

  return article; //Return the newly created article
}



let fillsVisible = false;

// To show fills
function showFill(){
  if (!fillsVisible){
    fills.forEach((fill, index) => {
      setTimeout(() =>{
        fill.classList.add('visible');
      }, index * 200); // Adjust the delay between fills
    });  
  } else {
    fills.forEach(fill => {
      fill.classList.remove('visible');
    });
  }

  fillsVisible = !fillsVisible;
}

// Function to update the date for a specific note-card
function updateDateForNoteCard(noteCard, noteIndex) {
  const currentDate = new Date();
  const dateElement = noteCard.querySelector('.date');
  dateElement.textContent = currentDate.toLocaleDateString(); // Update the date text

  // const noteIndex = noteCard.getAttribute('data-note-index');
  dateFormat = dateElement.textContent;

  // Update the text content and store in localStorage
  localStorage.setItem(`recentDate-${noteIndex}`, dateFormat); //To store the edited text
}



// Edit Note Title
function editNoteTitle(){
  const title = document.querySelector('h2');
  console.log('Title=> ', title);

  if (title.contentEditable === 'false'){
    title.contentEditable = 'true';
    title.focus();
  }else{
    title.contentEditable = 'false';
    titleText = title.textContent;
    console.log('titleText=> ', titleText);
    localStorage.setItem('NoteTitleName', titleText);
  }
}

// Edit NoteCard Title
// Function to enable editing of "noteCardTitle"
function editNoteCardTitle(event) {
  const clickedTitle = event.target;
  if (clickedTitle.contentEditable === 'false') {
    clickedTitle.contentEditable = 'true';
    clickedTitle.focus();
  } else {
    clickedTitle.contentEditable = 'false';
    const updatedTitle = clickedTitle.textContent;
    const noteIndex = clickedTitle.closest('.note-card').getAttribute('data-note-index');
    // Store the updated title in localStorage
    localStorage.setItem(`noteCardTitle-${noteIndex}`, updatedTitle);
  }
}

//Enable text note editing
//Handling edit icon click

function toggleEditMode(event){
  const clickedEditIcon = event.target;
  const note = clickedEditIcon.closest('.note-card'); // Find the closest parent note card
  const originalText = note.querySelector('.text');

  // const noteIndex = note.getAttribute('data-note-index');
  console.log("originalText=> ", originalText)

  let noteIndex = note.getAttribute('data-note-index'); // Get the data attribute note-index
  console.log("noteIndex=> ", noteIndex);


  // Calling the Date update function
  updateDateForNoteCard(note, noteIndex); // Update the date for this specific note-card

  if (originalText.contentEditable === 'false'){
    originalText.contentEditable = 'true';
    originalText.focus();
    clickedEditIcon.textContent = 'done_all';
  } else {
    originalText.contentEditable = 'false';
    clickedEditIcon.textContent = 'edit';

    if(originalText.innerText !== '' ){
      const updatedText = originalText.innerText;
      console.log('updatedText=> ', updatedText);

      // Update the text content and store in localStorage
      const editedText = updatedText; //To get the edited text
      console.log('editedText=> ', editedText);
      localStorage.setItem(`userEdit-${noteIndex}`, editedText); //To store the edited text
    }
  }
};



// Remove NoteCard
function removeNoteCard(e){
  if(e.target.parentElement.classList.contains('delete')){
    if(confirm('Are You Sure')){
      e.target.parentElement.parentElement.remove();
    }
  }
}

// Filter Tasks
function filterNotes() {
  const searchText = searchInput.value.toLowerCase();

  document.querySelectorAll('.note-card').forEach(function(noteCard) {
    const noteCardTitle = noteCard.querySelector('.noteCardTitle').textContent.toLowerCase();
    if (noteCardTitle.includes(searchText)) {
      noteCard.style.display = 'block';
    } else {
      noteCard.style.display = 'none';
    }
  });
}


window.onload = function (){
  // Getting the storedTitle
  const title = document.querySelector('h2')
  const storedTitle = localStorage.getItem('NoteTitleName')
  console.log("StoredTitle=> ", storedTitle);
  if (storedTitle !== null){
    title.innerText = storedTitle;
  }


  // Retrieve the data for a note card with noteIndex 3
  const noteIndex = 3;
  const noteDataStr = localStorage.getItem(`note-${noteIndex}`);
  const noteTitleStr = localStorage.getItem(`h3TitleName-${noteIndex}`)

  if (noteDataStr) {
    const noteData = JSON.parse(noteDataStr);
    console.log('Note Data for noteIndex 3 => ', noteData);
  }

  // Get the edited h3 title
  if(noteTitleStr){
    console.log('NoteTitleStr1=> ', noteTitleStr)
    if (noteTitleStr !== null) {
      h3TextClass.textContent = noteTitleStr;
      console.log('NoteTitleStr2=> ', noteTitleStr)
    }
  }

  const noteCardTitles = document.querySelectorAll('.noteCardTitle');
  noteCardTitles.forEach((noteCardTitle) => {
    const noteIndex = noteCardTitle.closest('.note-card').getAttribute('data-note-index');
    const storedTitle = localStorage.getItem(`noteCardTitle-${noteIndex}`);
    if (storedTitle !== null) {
      noteCardTitle.textContent = storedTitle;
    }
  });


  // Get the newly created note card's data from localStorage
  const noteData = localStorage.getItem(`note-${noteIndex}`);

  // If the note card data exists, then create a new note card and add it to the DOM
  if (noteData) {
    const noteDataObject = JSON.parse(noteData);
    const article = createNewNoteCard(noteDataObject.backgroundColor);

    // Set the content and date of the newly created note card
    article.querySelector('.text').textContent = noteDataObject.content;
    article.querySelector('.date').textContent = noteDataObject.date;

    // Append the newly created note card to the DOM
    const articlesContainer = document.querySelector('.articles-container');
    articlesContainer.appendChild(article);
  }
  

  // ==========================================================

  // Getting the notecard texts
  let noteCards = document.querySelectorAll('.note-card');
  noteCards.forEach((noteCard, index) => {
    let noteIndex = noteCard.getAttribute('data-note-index');

    const originalText = noteCard.querySelector('.text');

    const storedEdit = localStorage.getItem(`userEdit-${noteIndex}`);

    if (storedEdit !== null) {
      originalText.textContent = storedEdit;
    };

    // Update the date for this note-card from localStorage
    const dateElement = noteCard.querySelector('.date');
    const storedDate = localStorage.getItem(`recentDate-${noteIndex}`);

    if (storedDate !== null) {
      dateElement.textContent = storedDate;
    }

    const content = localStorage.getItem(`note-content-${noteIndex}`);
    const date = localStorage.getItem(`note-date-${noteIndex}`);

    if (content !== null && date !== null) {
      const textElement = noteCard.querySelector('.text');
      const dateElement = noteCard.querySelector('.date');

      textElement.textContent = content;
      dateElement.textContent = date;
    }
  });
};

addButton.addEventListener('click', showFill);

editIcons.forEach((editIcon) => {
  editIcon.addEventListener('click', toggleEditMode);
});

title.addEventListener('click', editNoteTitle);
console.log('titleListener', title.addEventListener('click', editNoteTitle))

// Add click event listeners to each fill element
firstColor.addEventListener('click', () => addNewNoteCard('first-color', '#ffc972'));
secondColor.addEventListener('click', () => addNewNoteCard('second-color', '#ff9b73'));
thirdColor.addEventListener('click', () => addNewNoteCard('third-color', '#b692fe'));
fourthColor.addEventListener('click', () => addNewNoteCard('fourth-color', '#e4ee90'));
fifthColor.addEventListener('click', () => addNewNoteCard('fifth-color', '#01d4ff'));

// Remove NoteCard Event
noteCards.forEach((notecard) => {
  notecard.addEventListener('click', removeNoteCard);
})

// editNoteCardTitle Event
// const noteCards = document.querySelectorAll('.note-card');
noteCardTitles.forEach((noteCardTitle) => {
  noteCardTitle.addEventListener('click', editNoteCardTitle);
});

// Filter Notes event
searchInput.addEventListener('input', filterNotes);