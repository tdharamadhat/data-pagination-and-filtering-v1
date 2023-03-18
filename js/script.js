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
 // create a variable to calculate the number of pages needed
  let numOfPages  = Math.ceil(list.length/9);

  // select the element with a class of `link-list` and assign it to a variable
  let linkList = document.querySelector('.link-list');

  // set the innerHTML property of the variable you just created to an empty string
  linkList.innerHTML = '';
  let buttonLi = '';
  // loop over the number of pages needed
    // create the elements needed to display the pagination button
    // insert the above elements
    for (let i = 1; i <=numOfPages; i++){
        buttonLi += ` <li>
                        <button type="button">${i}</button>
                    </li>
                    `;
    }
  linkList.insertAdjacentHTML('beforeend',buttonLi)
  
  // give the first pagination button a class of "active"
  document.querySelector('button').className = 'active';

  // create an event listener on the `link-list` element

    // if the click target is a button:
      // remove the "active" class from the previous button
      // add the active class to the clicked button
      // call the showPage function passing the `list` parameter and page to display as arguments;
  linkList.addEventListener('click', (e) =>{
    const page = e.target;
    if (page.tagName === 'BUTTON'){
        document.querySelector('.active').className = '';
        page.className = 'active';
        showPage(list,page.textContent);
    }    
  }); 
    
}

// Call functions
addPagination(data);
showPage(data,1);