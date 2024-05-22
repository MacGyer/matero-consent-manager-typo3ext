document.addEventListener('DOMContentLoaded', () => {
    const tacTriggers = document.querySelectorAll('a[href="#tac-info-modal-show"]');
    if (tacTriggers && tacTriggers.length) {
        for (const trigger of tacTriggers) {
            trigger.addEventListener('click', (evt) => {
                evt.preventDefault();
                if (tarteaucitron && tarteaucitron.userInterface) {
                    tarteaucitron.userInterface.openPanel();
                }
            })
        }
    }
});
