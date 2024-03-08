document.addEventListener('readystatechange', (event) => {
    if(event.target.readyState === 'complete'){
        new Game();
    }
})

class Game{
    constructor(){
        this.options = ['rock', 'papper', 'scissor'];
        this.btnStart = document.querySelector('#btn-start');
        this.btnStop = document.querySelector('#btn-stop');

        this.yourEmotion = document.querySelector('.your-emotion');
        this.cpuEmotion = document.querySelector('.cpu-emotion');

        this.yourChoiceElement = document.querySelector('.your-choice');
        this.cpuChoiceElement = document.querySelector('.cpu-choice');

        this.yourPoints = document.querySelector('.your-points');
        this.cpuPoints = document.querySelector('.cpu-points');

        this.yourCurrentPoints = parseInt(this.yourPoints.textContent);
        this.cpuCurrentPoints = parseInt(this.cpuPoints.textContent);

        this.delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

        this.display = document.querySelector('.display');

        this.rock = document.querySelector('.rock');
        this.papper = document.querySelector('.papper');
        this.scissor = document.querySelector('.scissor');
        
        this.yourChoice = null;
        
        if(!this.btnStart.disabled){
            this.btnStart.addEventListener('click', () => {
                this.startGame();
            });
        }

        this.btnStop.addEventListener('click', () =>{
            location.reload();
        })
    }

    // CLEAN IMAGE
    async cleanImages(){
        this.yourChoiceElement.src = 'img/you.png';
        this.cpuChoiceElement.src = 'img/cpu.png';
    }

    // SET IMAGE
    async setImageChoices(yourChoice, cpuChoice){
        this.yourChoiceElement.style.transform = 'scale(0)';
        this.cpuChoiceElement.style.transform = 'scale(0)';
        await this.delay(1000);
        this.yourChoiceElement.src = `/img/${this.options[yourChoice]}.png`;
        this.cpuChoiceElement.src = `/img/${this.options[cpuChoice]}.png`;

        this.yourChoiceElement.style.transform = 'scale(1)';
        this.cpuChoiceElement.style.transform = 'scale(1)';
    }

    async setImageStatusTurns(status){
        const imgRandonYou  = Math.floor(Math.random() * 5) + 1;
        const imgRandonCpu  = Math.floor(Math.random() * 5) + 1;
        switch(status){
            case 1:
                this.yourEmotion.src = `img/emojis/victory/${imgRandonYou}.png`;
                this.cpuEmotion.src = `img/emojis/lose/${imgRandonCpu}.png`;
            break;
            case 2:
                this.yourEmotion.src = `img/emojis/lose/${imgRandonYou}.png`;
                this.cpuEmotion.src = `img/emojis/victory/${imgRandonCpu}.png`;
            break;
            case 3:
                this.yourEmotion.src = `img/emojis/tie/${imgRandonYou}.png`;
                this.cpuEmotion.src = `img/emojis/tie/${imgRandonCpu}.png`;
        }
        this.yourEmotion.style.transform = 'scale(1)';
        this.cpuEmotion.style.transform = 'scale(1)';
        await this.delay(1000);
        this.yourEmotion.style.transform = 'scale(0)';
        this.cpuEmotion.style.transform = 'scale(0)';
    }

    // VERIFY TURN WINNER
    async verifyTurnStatus(yourChoice, cpuChoice){
        const victoryCondition = [[0, 2], [2, 1], [1, 0]];
        const temp = [yourChoice, cpuChoice];
        if(yourChoice == null){
            this.cpuCurrentPoints += 1;
            this.cpuPoints.textContent = this.cpuCurrentPoints;
            if(this.cpuCurrentPoints >= 3){
                this.display.textContent = 'CPU WINS THE GAME!';
                this.setImageStatusTurns(2);
                return;
            }else{
                this.display.textContent = 'FAULT, CPU WINS THE TURN!';
                this.setImageStatusTurns(2);
                return;
            }
        }else{
            this.display.textContent = 'VS';
            this.setImageChoices(yourChoice, cpuChoice);
            await this.delay(2000);
            if(yourChoice != cpuChoice){
                for(let i=0; i<= 2; i++ ){
                    if(JSON.stringify(victoryCondition[i]) === JSON.stringify(temp)){
                        this.yourCurrentPoints += 1;
                        this.yourPoints.textContent = this.yourCurrentPoints;
                        if(this.yourCurrentPoints >= 3){
                            this.display.textContent = 'YOU WIN THE GAME!';
                            this.setImageStatusTurns(1);
                            return;
                        }else{
                            this.display.textContent = 'YOU WIN THE TURN!';
                            this.setImageStatusTurns(1);
                            return;
                        }
                    }
                }
                this.cpuCurrentPoints += 1;
                this.cpuPoints.textContent = this.cpuCurrentPoints;
                if(this.cpuCurrentPoints >= 3){
                    this.display.textContent = 'CPU WINS THE GAME!';
                    this.setImageStatusTurns(2);
                    return;
                }else{
                    this.display.textContent = 'CPU WINS THE TURN!';
                    this.setImageStatusTurns(2);
                    return;
                }
            }else{
                this.display.textContent = 'A TIE';
                this.setImageStatusTurns(3);
                return;
            }
        }
    }

    // END THE GAME
    endTheGame(){
        this.btnStart.disabled = false;
        this.yourPoints.textContent = 0;
        this.cpuPoints.textContent = 0;
        this.yourCurrentPoints = 0;
        this.cpuCurrentPoints = 0;
        this.display.textContent = 'START THE GAME!';
    }

    // STARTS THE GAME
    async startGame(){
        while(this.yourCurrentPoints < 3 && this.cpuCurrentPoints < 3){
            this.rock.style.cursor = 'not-allowed';
            this.papper.style.cursor = 'not-allowed';
            this.scissor.style.cursor = 'not-allowed';

            this.btnStart.disabled = true;
            this.yourChoice = null;

            this.display.textContent = 'READY';
            await this.delay(2000);

            this.display.textContent = 'JO';
            await this.delay(2000);

            this.display.textContent = 'KEN';
            await this.delay(2000);

            this.display.textContent = 'PO!!!';
            
            this.rock.addEventListener('click', () => {
                this.yourChoice = 0;
            });
        
            this.papper.addEventListener('click', ()=> {
                this.yourChoice = 1; 
            });
        
            this.scissor.addEventListener('click', ()=> {
                this.yourChoice = 2; 
            });

            this.rock.style.cursor = 'pointer';
            this.papper.style.cursor = 'pointer';
            this.scissor.style.cursor = 'pointer';
        
            await this.delay(1000);
        
            const cpuChoice = Math.floor(Math.random() * 3);
            
            this.verifyTurnStatus(this.yourChoice, cpuChoice);
            
            await this.delay(5000);

            this.cleanImages();

        }

        this.endTheGame();
    }
}
