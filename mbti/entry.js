
let remainingPoints = 20;

function changePoints(attr, delta) {
    const currentPoints = parseInt(document.getElementById(attr.toLowerCase() + 'Points').innerText);
    if (remainingPoints - delta >= 0 && currentPoints + delta >= 0) {
        document.getElementById(attr.toLowerCase() + 'Points').innerText = currentPoints + delta;
        remainingPoints -= delta;
        document.getElementById('remainingPoints').innerText = remainingPoints;
        MBTICenter.updatePoints(attr, currentPoints + delta);
        document.getElementById('startGame').disabled = remainingPoints > 0;
    }
}


