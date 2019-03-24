import StateManager from '../manager';

(()=>{
    new StateManager(true, true);

    const replaceButton = document.body.querySelector('.js-replace');
    const pushButton    = document.body.querySelector('.js-push');
    const input         = document.body.querySelector('input');

    replaceButton.addEventListener('click', (e)=>{
        let fixedInput = input.value.replace(/\s/gi, '-');
        StateManager.doReplace(window.location.origin + '/' + fixedInput);
    });

    pushButton.addEventListener('click', (e)=>{
        let fixedInput = input.value.replace(/\s/gi, '-');
        StateManager.doPush(window.location.origin + '/' + fixedInput);
    });
})();