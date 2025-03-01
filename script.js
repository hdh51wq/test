document.addEventListener('DOMContentLoaded', () => {
    const loadingMusic = document.getElementById('loadingMusic');
    const birthdayMusic = document.getElementById('birthdayMusic');
    let userName = '';
    let clickCount = 0;
    let progress = 0;

    const elements = {
        loadingBar: document.getElementById('loadingBar'),
        counter: document.getElementById('counter'),
        mainText: document.getElementById('mainText'),
        actionButton: document.getElementById('actionButton'),
        btdMessage: document.getElementById('btdMessage'),
        inputSection: document.getElementById('inputSection'),
        nameInput: document.getElementById('nameInput'),
        nameSubmit: document.getElementById('nameSubmit'),
        specialLogo: document.getElementById('specialLogo'),
        finalLogo: document.getElementById('finalLogo'),
        error404: document.getElementById('error404')
    };

    // Loading animation
    const loadInterval = setInterval(() => {
        progress++;
        elements.loadingBar.style.width = progress + '%';
        elements.counter.textContent = progress + '%';

        if (progress >= 100) {
            clearInterval(loadInterval);
            elements.mainText.textContent = "saha chourbaaa ! ";
            elements.inputSection.style.display = 'flex';
            elements.loadingBar.style.display = 'none';
            elements.counter.style.display = 'none';
        }
    }, 50);

    function animateText(element, text, speed = 50) {
        element.innerHTML = '';
        const characters = text.split('');
        
        characters.forEach((char, index) => {
            const span = document.createElement('span');
            span.className = 'char-animation';
            span.textContent = char;
            span.style.animationDelay = `${index * speed}ms`;
            element.appendChild(span);
        });
    }

    document.addEventListener('click', () => {
        loadingMusic.play().catch(() => {});
    }, { once: true });

    elements.nameSubmit.addEventListener('click', () => {
        userName = elements.nameInput.value.trim();
        if (userName) {
            elements.inputSection.style.display = 'none';
            elements.mainText.style.display = 'none';
            elements.actionButton.style.display = 'block';
            setTimeout(() => elements.actionButton.click(), 100);
        }
    });

    elements.actionButton.addEventListener('click', () => {
        clickCount++;
        
        if(clickCount === 1) {
            loadingMusic.pause();
            birthdayMusic.play();
        }

        switch(clickCount) {
            case 1:
                elements.btdMessage.style.display = 'block';
                animateText(elements.btdMessage, `${userName}... I heard you have a big day today!`);
                break;
                
            case 2:
                animateText(elements.btdMessage, "It's your birthday right?!");
                break;

            case 3:
                animateText(elements.btdMessage, "Happy Birthday to someone who makes the world brighter just by being in it! 🎉");
                break;

            case 4:
                elements.btdMessage.innerHTML = `<span class="moving-button" id="trickButton">I have a gift for you! Click me!</span>`;
                const trickButton = document.getElementById('trickButton');
                elements.actionButton.style.display = 'none';
                
                let trickClicks = 0;
                trickButton.addEventListener('click', (e) => {
                    e.stopPropagation();
                    trickClicks++;
                    
                    if(trickClicks < 3) {
                        const multiplier = trickClicks * 2 + 1;
                        const randomX = (Math.random() * 80 - 40) * multiplier;
                        const randomY = (Math.random() * 80 - 40) * multiplier;
                        trickButton.style.transform = `translate(${randomX}%, ${randomY}%)`;
                    } else if(trickClicks === 3) {
                        trickButton.textContent = "Hahaha I'm real now! Click me!";
                        trickButton.style.transform = "translate(0, 0)";
                        
                        trickButton.onclick = () => {
                            elements.btdMessage.innerHTML = "This is for you :)!";
                            elements.specialLogo.classList.remove('hidden');
                            elements.finalLogo.classList.remove('hidden');
                            setTimeout(() => {
                                elements.specialLogo.style.opacity = '1';
                                elements.finalLogo.style.opacity = '1';
                            }, 100);
                            
                            setTimeout(() => {
                                document.body.style.backgroundColor = 'black';
                                elements.error404.style.display = 'block';
                                elements.specialLogo.style.opacity = '0';
                                elements.finalLogo.style.opacity = '0';
                                birthdayMusic.pause();
                            }, 4000);
                        };
                    }
                });
                break;
        }
    });
});