let flashcards = [];
let currentIndex = 0;

// Load from localStorage
function loadFlashcards() {
    const stored = localStorage.getItem("flashcards");
    if (stored) {
        flashcards = JSON.parse(stored);
    } else {
        // Default data
        flashcards = [
            { question: "What is 2+2?", answer: "4" },
            { question: "Capital of France?", answer: "Paris" }
        ];
    }
    updateCounter();
    displayCard();
}

function saveFlashcards() {
    localStorage.setItem("flashcards", JSON.stringify(flashcards));
}

function displayCard() {
    if (flashcards.length === 0) {
        document.getElementById("question-text").innerText = "No flashcards";
        document.getElementById("answer-text").innerText = "Add one!";
        return;
    }
    document.getElementById("question-text").innerText = flashcards[currentIndex].question;
    document.getElementById("answer-text").innerText = flashcards[currentIndex].answer;
    // Reset flip
    document.querySelector(".flashcard-inner").classList.remove("flipped");
}

function updateCounter() {
    document.getElementById("card-counter").innerText = `Card ${currentIndex+1} of ${flashcards.length}`;
}

function showAnswer() {
    document.querySelector(".flashcard-inner").classList.add("flipped");
}

function nextCard() {
    if (flashcards.length === 0) return;
    currentIndex = (currentIndex + 1) % flashcards.length;
    displayCard();
    updateCounter();
}

function prevCard() {
    if (flashcards.length === 0) return;
    currentIndex = (currentIndex - 1 + flashcards.length) % flashcards.length;
    displayCard();
    updateCounter();
}

function saveCurrentCard() {
    const newQuestion = document.getElementById("edit-question").value.trim();
    const newAnswer = document.getElementById("edit-answer").value.trim();
    if (!newQuestion || !newAnswer) {
        alert("Please enter both question and answer");
        return;
    }
    if (flashcards.length === 0) {
        flashcards.push({ question: newQuestion, answer: newAnswer });
        currentIndex = 0;
    } else {
        flashcards[currentIndex] = { question: newQuestion, answer: newAnswer };
    }
    saveFlashcards();
    displayCard();
    updateCounter();
    document.getElementById("edit-question").value = "";
    document.getElementById("edit-answer").value = "";
}

function deleteCurrentCard() {
    if (flashcards.length === 0) return;
    flashcards.splice(currentIndex, 1);
    if (flashcards.length === 0) {
        currentIndex = 0;
    } else {
        currentIndex = Math.min(currentIndex, flashcards.length - 1);
    }
    saveFlashcards();
    displayCard();
    updateCounter();
}

// Event listeners
document.getElementById("show-answer-btn").addEventListener("click", showAnswer);
document.getElementById("next-btn").addEventListener("click", nextCard);
document.getElementById("prev-btn").addEventListener("click", prevCard);
document.getElementById("save-btn").addEventListener("click", saveCurrentCard);
document.getElementById("delete-btn").addEventListener("click", deleteCurrentCard);

// Initialize
loadFlashcards();