(function (w) {
    'use strict';
    let document = w.document;
    let dir = [];
    let dialog;
    w.addEventListener('load', function () {
        dialog = document.createElement('div');
        dialog.className = 'max-imag-load-dialog';
        dialog.setAttribute('hidden', 'hidden');
        let img = document.createElement('img');
        img.className = 'max-imag-load-img';
        dialog.appendChild(img);
        let loadingCont = document.createElement('div');
        loadingCont.className = 'max-imag-loading-cont';
        let loading = document.createElement('div');
        loading.className = 'max-imag-loading';
        loadingCont.appendChild(loading);
        dialog.appendChild(loadingCont);
        document.querySelector('body').appendChild(dialog);
        dir.forEach(item => {
            imagLoadHandler(item);
        });
        dir = [];
        dialog = document.querySelector('.max-imag-load-dialog');
    });
    w.addEventListener('click', function (e) {
        let targetClassName = e.target.className;
        if (targetClassName.indexOf('max-imag-load-dialog') > -1 
        || targetClassName.indexOf('max-imag-loading-cont') > -1 
        || targetClassName.indexOf('max-imag-load-img') > -1) {
			document.querySelector('.max-state').className = 'max-imag-load-img';
            dialog.setAttribute('hidden', 'hidden');
        }
    });
    w.diaImg = function (option) {
        dir.push(option);
    }
    function imagLoadHandler({el, maxSrc}) {        
        let qEl = document.querySelector(el);        
        document.addEventListener('click', function (e) {
            if (e.target == qEl) {                
                let image = document.querySelector('.max-imag-load-img');
                image.onload = null;
                image.src = qEl.src;
                dialog.removeAttribute('hidden');
                let loadingImgCont = document.querySelector('.max-imag-loading-cont');
				loadingImgCont.style.display = "flex";
				image.className = 'max-imag-load-img max-state';
                console.log(loadingImgCont.style.display);
                setTimeout(function () {//模拟加载耗时2s
                    image.onload = hideLoadingHandler;
                    image.src = maxSrc;			
                }, 2000);
            }
        });
    }
    
    function hideLoadingHandler() {
        document.querySelector('.max-imag-loading-cont').style.display = "none";
    }
})(window)