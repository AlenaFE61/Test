  //Open Modal


const btnOpenAboutModal = document.querySelector('.js-open-modal');
const btnCloseAboutModal = document.querySelector('.js-close-about-modal');
const aboutModal = document.querySelector('.js-about-modal');
const body = document.querySelector('body');
const btnCancelAboutModal = document.querySelector('.js-cancel-about-modal');

btnOpenAboutModal.addEventListener('click', openAboutModal);
btnCloseAboutModal.addEventListener('click', closeAboutModal);
btnCancelAboutModal.addEventListener('click', closeAboutModal);

function openAboutModal() {
  aboutModal.classList.add('team-modal-link');
  body.classList.add('modal-open');

  document.addEventListener('keydown', onCloseEsc);
  document.addEventListener('click', function onCloseClick(e) {
    if (e.target === aboutModal) {
      closeAboutModal();
    }
  });
}

function onCloseEsc(e) {
  if (e.code === 'Escape') {
    closeAboutModal();
  }
}

function closeAboutModal() {
  aboutModal.classList.remove('team-modal-link');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onCloseEsc);
}


// Calendar

let Cal = function(divId) {
  this.divId = divId;
  this.DaysOfWeek = [
    'Su',
    'Mo',
    'Tu',
    'We',
    'Th',
    'Fr',
    'Sa'
  ];

  this.Months =['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  let d = new Date();
  this.currMonth = d.getMonth();
  this.currYear = d.getFullYear();
  this.currDay = d.getDate();
};


Cal.prototype.nextMonth = function() {
  if ( this.currMonth == 11 ) {
    this.currMonth = 0;
    this.currYear = this.currYear + 1;
  }
  else {
    this.currMonth = this.currMonth + 1;
  }
  this.showcurr();
};

Cal.prototype.previousMonth = function() {
  if ( this.currMonth == 0 ) {
    this.currMonth = 11;
    this.currYear = this.currYear - 1;
  }
  else {
    this.currMonth = this.currMonth - 1;
  }
  this.showcurr();
};

Cal.prototype.showcurr = function() {
  this.showMonth(this.currYear, this.currMonth);
};

Cal.prototype.showMonth = function(y, m) {
  let d = new Date()
  , firstDayOfMonth = new Date(y, m, 7).getDay()
  , lastDateOfMonth =  new Date(y, m+1, 0).getDate()
  , lastDayOfLastMonth = m == 0 ? new Date(y-1, 11, 0).getDate() : new Date(y, m, 0).getDate();
  let html = '<table>';
  html += '<thead><tr>';
  html += '<td colspan="7">' + this.Months[m] + ' ' + y + '</td>';
  html += '</tr></thead>';
  html += '<tr class="days">';
  for(let i=0; i < this.DaysOfWeek.length;i++) {
    html += '<td>' + this.DaysOfWeek[i] + '</td>';
  }
  html += '</tr>';


  let i=1;
  do {
    let dow = new Date(y, m, i).getDay();
    if ( dow == 1 ) {
      html += '<tr>';
    }
    else if ( i == 1 ) {
      html += '<tr>';
      let k = lastDayOfLastMonth - firstDayOfMonth+1;
      for(let j=0; j < firstDayOfMonth; j++) {
        html += '<td class="not-current">' + k + '</td>';
        k++;
      }
    }

    let chk = new Date();
    let chkY = chk.getFullYear();
    let chkM = chk.getMonth();
    if (chkY == this.currYear && chkM == this.currMonth && i == this.currDay) {
      html += '<td class="tuday">' + i + '</td>';
    } else {
      html += '<td class="normal">' + i + '</td>';
    }


    if ( dow == 0 ) {
      html += '</tr>';
    }
    else if ( i == lastDateOfMonth ) {
      let k=1;
      for(dow; dow < 7; dow++) {
        html += '<td class="not-current">' + k + '</td>';
        k++;
      }
    }
    i++;
  }while(i <= lastDateOfMonth);



  html += '</table>';
  document.getElementById(this.divId).innerHTML = html;
};
window.onload = function() {
  let c = new Cal("divCal");			
  c.showcurr();
  getId('btnNext').onclick = function() {
    c.nextMonth();
  };
  getId('btnPrev').onclick = function() {
    c.previousMonth();
  };
}
function getId(id) {
  return document.getElementById(id);
} 



// open/close calendar

document.querySelector(".data-btn").addEventListener('click', result);
function result(){
let toggleAbl=document.querySelector('#divCal');
toggleAbl.classList.toggle('active');
}

// list


function addblock(el) {
  let p = document.createElement("span");
  p.innerHTML =  '<span class="close"> x </span>' + el.querySelectorAll("option")[el.selectedIndex].textContent;
  el.parentNode.appendChild(p);
}

document.addEventListener('click',e => {
  if (e.target.className == 'close') {
      e.target.parentElement.remove();
  }
});
