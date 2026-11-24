const toggle=document.querySelector('.menu');const nav=document.querySelector('.nav');if(toggle&&nav){toggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open))});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');toggle.setAttribute('aria-expanded','false')}))}document.querySelectorAll('[data-year]').forEach(n=>n.textContent=new Date().getFullYear());

const inquiryForm=document.querySelector('.inquiry-form');
if(inquiryForm){
  const status=document.createElement('p');
  status.className='form-note';
  status.setAttribute('role','status');
  status.setAttribute('aria-live','polite');
  status.hidden=true;
  inquiryForm.insertAdjacentElement('afterend',status);
  inquiryForm.addEventListener('submit',async event=>{
    event.preventDefault();
    const submitButton=inquiryForm.querySelector('button[type="submit"]');
    const originalButtonText=submitButton?submitButton.innerHTML:'';
    if(submitButton){submitButton.disabled=true;submitButton.textContent='Sending…'}
    status.hidden=true;
    try{
      const response=await fetch(inquiryForm.action,{
        method:'POST',
        body:new FormData(inquiryForm),
        headers:{'Accept':'application/json'}
      });
      if(response.ok){
        inquiryForm.reset();
        status.textContent="Thank you for your enquiry! We've received your message and will be in touch shortly.";
        status.hidden=false;
      }else{
        let message='Sorry, your enquiry could not be submitted. Please try again or email us at foodieexplorerz@gmail.com.';
        try{
          const data=await response.json();
          if(data.errors&&data.errors.length) message=data.errors.map(error=>error.message).join(' ');
        }catch(_){}
        status.textContent=message;
        status.hidden=false;
      }
    }catch(_){
      status.textContent='There was a connection issue. Please try again or email us at foodieexplorerz@gmail.com.';
      status.hidden=false;
    }finally{
      if(submitButton){submitButton.disabled=false;submitButton.innerHTML=originalButtonText}
    }
  });
}
