// show notification div only for 2 seconds
export function showNotification(setter) {
    setter(true);
    setTimeout(() => {
        setter(false);
    }, 2000);
}

// check
export function checkWin(correct, wrong, word) {
    let status = 'win';
    // if any of the letters in the word is correctly guessed, game status is undecided
    word.split('').forEach(letter => {
        if(!correct.includes(letter)) {
            status = '';
        }
    })
    // if the # of letters in wrongLetters array is 6, you lose the game
    if (wrong.length === 6) {
        status = 'lose';
    }
    return status;
}