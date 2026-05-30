// Data
let cards = [];
let index = 0;

// Load saved data
let data = localStorage.getItem("flashcards");
if (data) {
    cards = JSON.parse(data);
} else {
    cards = [
        {q: "Capital of France?", a: "Paris"},
        {q: "2 + 2 = ?", a: "4"},
        {q: "What color is the sky?", a: "Blue"}
    ];
}

// Display current card
function show() {
    if (cards.length === 0) {
        document.getElementById("question").innerHTML = "✨ No flashcards yet!";
        document.getElementById("answer").innerHTML = "Add one below ✨";
        document.getElementById("counter").innerHTML = "0 cards";
        return;
    }
    document.getElementById("question").innerHTML = cards[index].q;
    document.getElementById("answer").innerHTML = cards[index].a;
    document.getElementById("answer").style.display = "none";
    document.getElementById("counter").innerHTML = "📇 Card " + (index + 1) + " of " + cards.length;
}

// Save to localStorage
function save() {
    localStorage.setItem("flashcards", JSON.stringify(cards));
}

// Next button
document.getElementById("next").onclick = function() {
    if (cards.length === 0) return;
    index = index + 1;
    if (index >= cards.length) index = 0;
    show();
};

// Previous button
document.getElementById("prev").onclick = function() {
    if (cards.length === 0) return;
    index = index - 1;
    if (index < 0) index = cards.length - 1;
    show();
};

// Show answer
document.getElementById("showAnswer").onclick = function() {
    if (cards.length > 0) {
        document.getElementById("answer").style.display = "block";
    }
};

// ADD NEW CARD
document.getElementById("addNew").onclick = function() {
    let q = document.getElementById("newQ").value;
    let a = document.getElementById("newA").value;
    
    if (q === "" || a === "") {
        alert("Please type both question and answer");
        return;
    }
    
    cards.push({q: q, a: a});
    index = cards.length - 1;
    save();
    show();
    
    document.getElementById("newQ").value = "";
    document.getElementById("newA").value = "";
    
    alert("✅ New card added!");
};

// UPDATE current card
document.getElementById("updateCurrent").onclick = function() {
    let q = document.getElementById("newQ").value;
    let a = document.getElementById("newA").value;
    
    if (q === "" || a === "") {
        alert("Please type both question and answer");
        return;
    }
    
    cards[index] = {q: q, a: a};
    save();
    show();
    
    document.getElementById("newQ").value = "";
    document.getElementById("newA").value = "";
    
    alert("✅ Current card updated!");
};

// Delete current card
document.getElementById("delete").onclick = function() {
    if (cards.length === 0) {
        alert("No cards to delete");
        return;
    }
    
    if (confirm("Delete this card?")) {
        cards.splice(index, 1);
        
        if (cards.length === 0) {
            index = 0;
        } else {
            if (index >= cards.length) {
                index = cards.length - 1;
            }
        }
        
        save();
        show();
        alert("🗑️ Card deleted");
    }
};

// Start the app
show();
