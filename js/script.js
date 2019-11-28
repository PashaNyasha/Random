function getPokemons(pokemons) {
    let body = document.querySelector('body');
    let randomizer = document.querySelector('.randomizer'),
        randomizerBack = document.querySelector('.randomizer-back');

    //Анимация блока при наведении
    randomizer.onmousemove = rotateBlock;

    function rotateBlock(event) {
        let searchX = this.getBoundingClientRect().x,
            searchY = this.getBoundingClientRect().y,
            x = event.clientX - searchX,
            y = event.clientY - searchY,
            calcX = ((this.offsetWidth / 2 - x) / 10) * -1,
            calcY = ((this.offsetHeight / 2 - y) / 10);

        this.style = 'transform: rotateY(' + calcX + 'deg) rotateX(' + calcY + 'deg);' +
            'box-shadow: ' + calcX * -1 + 'px ' + calcY + 'px 10px rgba(0,0,0,0.5);';

        randomizerBack.style = 'transform: rotateY(' + calcX + 'deg) rotateX(' + calcY + 'deg);';
    }
    /*
        randomizer.onmouseout = deleteEffectsOnBlock;

        function deleteEffectsOnBlock() {
            this.style = 'transform: rotateY(' + 0 + 'deg) rotateX(' + 0 + 'deg);';

            randomizerBack.style = 'transform: rotateY(' + 0 + 'deg) rotateX(' + 0 + 'deg);';
        }
    */
    //Рандомайзер

    let fiendFromPokeArr = document.querySelector('.count');

    fiendFromPokeArr.textContent = '0 из ' + pokemons.length;

    let randImage = document.querySelector('.randomizer-image'),
        pokemonName = document.querySelector('.name');

    randomizer.onclick = randomizeThis;
    let rand;

    function randomizeThis() {
        this.classList.toggle('random-rotate');
        randomizerBack.classList.toggle('random-rotate');

        randImage.classList.remove('show-image');
        randImage.classList.add('hide-image');
        pokemonName.classList.remove('show-image');
        pokemonName.classList.add('hide-image');

        setTimeout(() => {
            this.classList.toggle('random-rotate');
            randomizerBack.classList.toggle('random-rotate');
            randImage.classList.remove('hide-image');
            randImage.classList.add('show-image');
            randImage.src = 'img/' + pokemons[rand].imgSrc;
            pokemonName.classList.remove('hide-image');
            pokemonName.classList.add('show-image');
        }, 2000);

        setTimeout(() => {
            pokemonName.textContent = pokemons[rand].name;
        }, 2100);

        rand = Math.round(Math.random() * (pokemons.length - 1 + 0.5));

        showPokemonInAsideBlock(rand);
    }

    function createPages(pokelengths) {
        let aside = document.querySelector('.finded-pokemons'),
            blocksCountOnPage = 45,
            pagesCount = Math.floor(pokelengths / blocksCountOnPage);

        for (let i = 0; i <= pagesCount; i++) {
            let blocksBox = document.createElement('div');
            blocksBox.classList.add('blocks');
            blocksBox.setAttribute('data', i);
            aside.appendChild(blocksBox);
        }

        let newBlocksBoxes = document.querySelectorAll('.blocks'),
            blocksCount = 0;

        for (let j = 0; j <= pokelengths; j++) {
            let block = document.createElement('div');
            block.classList.add('pokemon-undefined');
            block.setAttribute('data', j);
            let img = document.createElement('img');
            img.classList.add('block-image');
            img.src = 'img/' + pokemons[j].imgSrc;
            img.title = pokemons[j].name;
            block.appendChild(img);
            newBlocksBoxes[blocksCount].appendChild(block);
        }

        let bCount = 45;

        for (let i = 1; i < newBlocksBoxes.length; i++) {
            getBlocksInNewPage(i);
        }

        function getBlocksInNewPage(count) {
            let block = document.querySelectorAll('.pokemon-undefined');
            if (newBlocksBoxes[blocksCount].children.length - 1 >= blocksCountOnPage) {
                for (let j = bCount; j <= pokelengths; j++) {
                    newBlocksBoxes[count].appendChild(block[j]);
                }
            }
            bCount += blocksCountOnPage;
            blocksCount++;
        }
        console.log(aside);
        animateAsideBlock(newBlocksBoxes, aside);
    }

    createPages(pokemons.length - 1);
    ///////////////////////////////////////////////////
    let countOfFiendPokemons = 0;

    function showPokemonInAsideBlock(randomNum) {
        let block = document.querySelectorAll('.pokemon-undefined'),
            blockImage = document.querySelectorAll('.block-image'),
            errorBox = document.querySelector('.error-block'),
            errorBlock = document.createElement('div'),
            errorMessage = document.createElement('p');

        errorBlock.classList.add('error');

        for (let i = 0; i < pokemons.length; i++) {
            if (i === randomNum) {
                setTimeout(() => {
                    block[i].classList.add('pokemon-fiend');
                    blockImage[i].classList.add('block-image-color');
                }, 2000);
                countOfFiendPokemons++;
            }
        }

        if (block[randomNum].classList.contains('pokemon-fiend')) {
            setTimeout(() => {
                errorMessage.textContent = 'Такой уже есть!';
                errorBlock.appendChild(errorMessage);
                errorBox.appendChild(errorBlock);
            }, 2100);

            setTimeout(() => {
                errorBlock.remove();
            }, 4000);
            countOfFiendPokemons--;
        }

        if (countOfFiendPokemons == pokemons.length) {
            let youWin = document.querySelector('.you-win'),
                youWinSpanBox = youWin.querySelector('.text');
            let youWinText = 'ТЫ СОБРАЛ ВСЕХ!';
            let mass = youWinText.split('');

            setTimeout(() => {
                for (let i = 0; i < mass.length; i++) {
                    let text = document.createElement('span');
                    text.textContent = mass[i];
                    youWinSpanBox.appendChild(text);

                    setTimeout(() => {
                        text.classList.add('big');
                    }, 50 * i);
                    youWin.classList.add('active-bg');
                }
            }, 2000);
            replayGame(block, blockImage, youWin, countOfFiendPokemons);
        }

        setTimeout(() => {
            fiendFromPokeArr.textContent = countOfFiendPokemons + ' из ' + pokemons.length;
        }, 2000);
    }
    ///////////////////////////////////////////////////
    function replayGame(block, blockImage, winBlock) {
        let replay = document.querySelector('.replay');
        replay.onclick = newGame;

        function newGame() {
            for (let i = 0; i < block.length; i++) {
                block[i].classList.remove('pokemon-fiend');
                blockImage[i].classList.remove('block-image-color');
            }

            let text = document.querySelectorAll('.big');

            for (let i = 0; i < text.length; i++) {
                text[i].remove();
            }

            winBlock.classList.remove('active-bg');
            countOfFiendPokemons = 0;
            fiendFromPokeArr.textContent = countOfFiendPokemons + ' из ' + pokemons.length;

        }
    }
    ///////////////////////////////////////////////////
    function animateAsideBlock(blocks, aside) {

        function createTabsAndButtons() {
            let tabsBlock = document.querySelector('.tabs ul');
            for (let i = 0; i < blocks.length; i++) {
                let newTab = document.createElement('li');
                tabsBlock.appendChild(newTab);
            }

            let tabs = tabsBlock.querySelectorAll('li');

            tabs[0].classList.add('active-tab');

            function hidePage(a) {
                for (let i = a; i < blocks.length; i++) {
                    blocks[i].classList.remove('show-block');
                    blocks[i].classList.add('hide-block');
                    tabs[i].classList.remove('active-tab');
                }
            }

            hidePage(1);

            function showPage(b) {
                if (blocks[b].classList.contains('hide-block')) {
                    blocks[b].classList.remove('hide-block');
                    blocks[b].classList.add('show-block');
                    tabs[b].classList.add('active-tab');
                }
            }

            let prev = document.querySelector('.prev'),
                next = document.querySelector('.next'),
                page = 0;

            blocks[0].classList.add('show-block');
            next.onclick = goNext;

            function goNext() {
                page++;
                if (page == blocks.length) {
                    page = 0;
                }
                hidePage(0);
                showPage(page);
                tabs[page].classList.add('active-tab');
            }

            prev.onclick = goBack;

            function goBack() {
                page--;
                if (page < 0) {
                    page = blocks.length - 1;
                }
                hidePage(0);
                showPage(page);
                tabs[page].classList.add('active-tab');
            }

            tabsBlock.addEventListener('click', function(event) {
                let target = event.target;
                if (target && tabsBlock.querySelector('li')) {
                    for (let i = 0; i < tabs.length; i++) {
                        tabs[i].classList.remove('active-tab');
                        if (target == tabs[i]) {
                            hidePage(0);
                            showPage(i);
                            page = i;
                        }
                    }
                }
            });

        }
        createTabsAndButtons();

        function hideOrShowAsideBlock() {
            let asideButton = aside.querySelector('.block-open-button');
            asideButton.onclick = showHideAside;

            function showHideAside() {
                if (aside.classList.contains('show-aside')) {
                    aside.classList.toggle('show-aside');
                } else {
                    aside.classList.toggle('show-aside');
                }
            }
        }
        hideOrShowAsideBlock();

        let block = document.querySelectorAll('.pokemon-undefined');

        for (let i = 0; i < block.length; i++) {
            block[i].onmousemove = removeShadow;
        }

        function removeShadow() {
            this.style = 'box-shadow: none;';
        }
    }
}

getPokemons(pokemons);