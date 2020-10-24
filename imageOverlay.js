console.log('injected code');

img = document.createElement('img');
chrome.storage.local.get(['koekuva'],function(result){img.src=result.koekuva});
chrome.storage.local.set({'koekuva':''},function(){console.log('filen alussa')});
img.id='overlay';
img.style.position = 'absolute';
img.style.top = 0;
img.style.opacity= 0.3;
document.body.appendChild(img);
                

/*let div = document.createElement('div');
div.style.position = 'fixed';
div.style.top = 0;
div.style.color= 'red';
div.textContent = 'Injected!';
document.body.appendChild(div);*/
