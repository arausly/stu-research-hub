// status
// category

// this should never be done,  😠😠😠 // i should have used react


document.querySelector('.create-acct').addEventListener('click',function(e){
   
   // username
   let username = document.createElement('input');
   let fullname = document.createElement('input');
   let userGroup = document.createElement('div');
   let fullnameGroup = document.createElement('div');   
   let userlabel = document.createElement('label');
   let fullnameLabel = document.createElement('label');
   let labelAttr = [{name:'class',val:'col-form-label'},{name:'for',val:'username'}];
   labelAttr.forEach(({name, val})=>{
        userlabel.setAttribute(name,val);
        fullnameLabel.setAttribute(name, val);
   })
   userlabel.innerHTML = 'Username:'
   fullnameLabel.innerHTML = 'Fullname:'   
   userGroup.setAttribute('class','form-group');
   let attr = [{name:'class',val:'form-control'},{name:'type',val:'text'},{name:'name',val:'username'}]
   attr.forEach(({name, val})=>{
       username.setAttribute(name,val);
       fullname.setAttribute(name,val)
   });
   username.setAttribute('id','username');
   fullname.setAttribute('id','fullname');
   username.setAttribute('placeholder','username')     
   fullname.setAttribute('placeholder','fullname')        
   fullname.setAttribute('name','fullname');
   fullnameGroup.appendChild(fullnameLabel);
   fullnameGroup.appendChild(fullname);
   userGroup.appendChild(userlabel);
   userGroup.appendChild(username);

   //picture-optional
 {  

    var div1 = document.createElement('div');
    div1.setAttribute('class','form-group pic01');
    let div2 = document.createElement('div');
    div2.setAttribute('class','custom-file');
    let labelFileInput = document.createElement('label');
    labelFileInput.setAttribute('for','inputGroupFile02');
    labelFileInput.setAttribute('class','custom-file-label');
    labelFileInput.innerHTML = "Profile pic (optional)";
    let fileInput = document.createElement('input');
    let attr = [{name:'name',val:'photo'},{name:'type',val:'file'},{name:'class',val:'custom-file-input form-control'},{name:'id',val:'inputGroupFile02'}]
    attr.forEach(({ name, val })=>{
        fileInput.setAttribute(name,val);
    });

    div1.appendChild(div2);
    div2.appendChild(labelFileInput);
    div2.appendChild(fileInput);

    
}

 //status

 const genSelectBox = (options,label,n) =>{
    var selBox = document.createElement('div');
    selBox.setAttribute('class',`form-group div_${n}`);
    let select = document.createElement('select');
    select.setAttribute('name',label.toLowerCase());
    select.setAttribute('class','custom-select form-control');
    select.setAttribute('id',`inputGroupSelect_${n}`);
    let labelFileInput = document.createElement('label');
    labelFileInput.setAttribute('for','inputGroupSelect');
    labelFileInput.innerHTML = label;
    let statuses = options.map((option)=>{
       let status = document.createElement('option')
       status.setAttribute('value',option);
       status.innerHTML = option;
       return status;
    });
  
    selBox.appendChild(labelFileInput);
    selBox.appendChild(select);
    statuses.forEach((status)=>{
       select.appendChild(status);
    });
    return selBox;
 }

 var category = genSelectBox(['Choose...','Electrical Eng','Computer Eng','Info & Com Eng'],'Departments',2);
 


 let btn = document.createElement('button');
 btn.setAttribute('class','btn btn-primary');
 btn.setAttribute('type','submit');
 btn.textContent = 'Create new account';

   //parent element
   let parentEL = document.getElementsByClassName('modal-body')[0];
   parentEL.insertBefore(userGroup,parentEL.childNodes[0]);
   parentEL.insertBefore(fullnameGroup,parentEL.childNodes[1]);   
   parentEL.appendChild(div1);
   parentEL.appendChild(category);
   document.getElementsByTagName('form')[0].setAttribute('action','/sign-in');   
   let footer = document.querySelector('.modal-footer')
   footer.removeChild(document.querySelector('.create-acct'))
   let loginBtn = document.querySelector('.login-btn');
   footer.insertBefore(btn,loginBtn);
   loginBtn.setAttribute('type','button');
});
document.querySelector('.login-btn').addEventListener('click',function(e){
        if(document.querySelector('.login-btn').getAttribute('type') !== 'submit'){
            document.querySelector('[for="password"]').innerHTML ='Password';
            var parentEL = document.getElementsByClassName('modal-body')[0];
          parentEL.removeChild(parentEL.childNodes[0]);
          parentEL.removeChild(parentEL.childNodes[3]);
          parentEL.removeChild(document.querySelector('.pic01'));
          
          
            var btns = document.createElement('button');
            btns.setAttribute('class','btn btn-primary');
            btns.setAttribute('type','submit');
            btns.textContent = 'Login';
        
        document.getElementsByTagName('form')[0].setAttribute('action','/login');   
        let footer = document.querySelector('.modal-footer');
        footer.removeChild(document.querySelector('.login-btn'));
        footer.insertBefore(btns,footer.childNodes[0]);
        footer.childNodes[1].setAttribute('type','button');
        footer.childNodes[1].setAttribute('class','create-acct btn btn-primary');        
        }
});