let $ = (el) => document.querySelector(el);

let msg = $('.modal-title');
let titleEl = $('#title');
let fileUploadEl = $("[type='file']");
let uploadBtn = $('#upload');

msg.textContent = 'You can upload papers here';


uploadBtn.setAttribute('disabled','disabled');
titleEl.addEventListener('focus',(e)=>{
   msg.textContent = 'Title is of great importance';
   setTimeout(()=>{
       msg.textContent = "Title must tally with the paper's title";
   }, 3000);
   setTimeout(()=>{
    msg.textContent =  "Don't forget to actually upload 😄😄";
   },5500);
   setTimeout(()=>{
    msg.textContent = "⚠️⚠️ Title must tally with the paper's title";
}, 8500);
})

// C:\fakepath\[PDF] Learning_JavaScript_Data_Structures_and_Algorithms.pdf
// remove c:\fakepath\, remove ,pdf
// 
titleEl.addEventListener('blur',()=>{

    let title = titleEl.value.trim();
    let pdfName = fileUploadEl.value;

    if(title.length > 0 && pdfName.length > 0){
       uploadBtn.removeAttribute('disabled');
    }
})

fileUploadEl.addEventListener('blur',()=>{

    let title = titleEl.value.trim();
    let pdfName = fileUploadEl.value;

    if(title.length > 0 && pdfName.length > 0){
       uploadBtn.removeAttribute('disabled');
    }
})






