/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/
let list = data ;
let page ;


/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/



/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/
function showPage(list,page){
  const startIndex = (page * 9) - 9 ;
  const endIndex = (page * 9);  
  const studentList = document.querySelector('.student-list');
  studentList.innerHTML = '';
  let li = '' 

  for ( let i =startIndex; i < list.length; i++ ){
    if ( i >= startIndex && i < endIndex)
    {
    const studentItem = list[i];
    li += `<li class="student-item cf">
                <div class="student-details">
                  <img class="avatar" src="${studentItem.picture.large}" alt="Profile Picture">
                  <h3>${studentItem.name.first} ${studentItem.name.first}</h3>
                  <span class="email">${studentItem.email}</span>
                </div>
                <div class="joined-details">
                  <span class="date">${studentItem.registered.date}</span>
                </div>
            </li>
            `;
    } else {
      break ;
    }
  }
  studentList.insertAdjacentHTML('beforeend',li);
}


/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/
function addPagination(list) {
  let numOfPages  = Math.ceil(list.length/9);
  let linkList = document.querySelector('.link-list');

  linkList.innerHTML = '';
  let buttonLi = '';
    for (let i = 1; i <=numOfPages; i++){
        buttonLi += ` <li>
                        <button type="button">${i}</button>
                    </li>
                    `;
    }
  linkList.insertAdjacentHTML('beforeend',buttonLi)
  
  document.querySelector('.link-list button').className = 'active';
  linkList.addEventListener('click', (e) =>{
    const page = e.target;
    if (page.tagName === 'BUTTON'){
        document.querySelector('.active').className = '';
        page.className = 'active';
        showPage(list,page.textContent);
    }    
  }); 
    
}

showPage(data,1);
addPagination(data);


// add Search Component
const header = document.querySelector('header');
const searchBox = `<label for="search" class="student-search">
                <span>Search by name</span>
                <input id="search" placeholder="Search by name...">
                <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
                </label>
              `;
header.insertAdjacentHTML('beforeend',searchBox);

// add search function
const search = document.querySelector('#search');
search.addEventListener('keyup', (e) => {
  let searchResult = [];
  const value = e.target.value.toLowerCase();
  for (let i = 0; i<data.length;i++) {
      if (data[i].name.first.toLowerCase().match(value)||data[i].name.last.toLowerCase().match(value)){
        searchResult.push(data[i]);
      }
  };
  //console.log(searchResult);

  if (searchResult.length === 0){
      //Show message when search not found.
      const linkList = document.querySelector('.link-list');
      const studentList = document.querySelector('.student-list');
      studentList.innerHTML = 'No results found.';
      linkList.innerHTML = '';
  } else {
  showPage(searchResult,1);
  addPagination(searchResult);
  }
});