globalvar = false
document.getElementById('lastico').addEventListener('mouseover', function() {
    this.setAttribute("type", "text");
    this.setAttribute("value", "50%");
})

document.getElementById('lastico').addEventListener('mouseout', function() {
    if (!globalvar) {
        this.setAttribute("type", "button");
        this.setAttribute("value", "Custom");
    }
})

document.getElementById('lastico').addEventListener("input", function() {
    // console.log(this.value);
    document.getElementById('fprice').innerText = "$0.00"
    document.getElementById('perperson').innerText = "$0.00";
    buttonstates = [false, false, false, false, false, false];
    index = btns.indexOf(this)
    buttonstates[index] = true;
    globalvar = true;
    this.style.background = "hsl(172, 67%, 45%)";
    for (var i = 0; i < buttons.length - 1; i++) {
        buttons[i].style.background = "hsl(183, 100%, 15%)"
    }
    calctip()
});

var buttonstates = [false, false, false, false, false, false];

buttons = document.getElementsByClassName('bbtnp');
btns = []
for (var i = 0; i < buttons.length; i++) {
    btns.push(buttons[i])
    buttons[i].addEventListener('click', function() {

        // this.style.background = "hsl(172, 67%, 45%)";
        buttonstates = [false, false, false, false, false, false];
        index = btns.indexOf(this);
        if (index == 5) {
            return
        }
        for (var i = 0; i < buttons.length; i++) {
            buttons[i].style.background = "hsl(183, 100%, 15%)"
        }
        buttonstates[index] = true;
        if (index != 5) {
            globalvar = false;
            this.style.background = "hsl(172, 67%, 45%)";
            thisi = document.getElementById('lastico')
            thisi.setAttribute("type", "button");
            thisi.setAttribute("value", "Custom");
            thisi.style.background = "hsl(183, 100%, 15%)";
        }
        calctip()
    })
}

// final verification here

document.getElementById('billtotal').addEventListener('input', function() {
    calctip();
})


document.getElementById('noperson').addEventListener('input', function() {
    calctip();
})

function calctip() {
    calculate = false
    index = null
    values = [5, 10, 15, 25, 50, 50]
    for (i = 0; i < buttonstates.length; i++)
        if (buttonstates[i] == true) {
            calculate = true;
            index = i
            break;
        }
    if (index === null) {
        document.getElementById('logshower').textContent = "Select tip %";
        document.getElementById('logshower').style.display = "block";
        return
    }
    console.log('calal')
    if (index == 5) {
        percentage_tip = document.getElementById('lastico').value;
        if (percentage_tip.indexOf('%') == -1) {
            document.getElementById('logshower').textContent = "Use % tip";
            document.getElementById('logshower').style.display = "block";
            return
        }
        percentage_tip = parseFloat(percentage_tip.slice(0, -1))
        percentage_tip.toFixed(2)
    } else {
        percentage_tip = values[index]
    }
    billtotal = document.getElementById('billtotal').value;
    number_of_person = document.getElementById('noperson').value;
    if (number_of_person.indexOf('.') != -1) {
        console.log("yes")
        document.getElementById('fprice').innerText = "$0.00"
        document.getElementById('perperson').innerText = "$0.00";
        document.getElementById('logshower').style.display = "block";
        document.getElementById('logshower').textContent = "Invalid no.";
        return
    }
    if (number_of_person == '' || billtotal == '') {
        document.getElementById('logshower').style.display = "block";
        document.getElementById('logshower').textContent = "Can't Be Zero";
        document.getElementById('fprice').innerText = "$0.00"
        document.getElementById('perperson').innerText = "$0.00";
        return
    }
    if (parseInt(number_of_person) > 0 && parseFloat(billtotal) > 0) {
        tip_price = findtip(billtotal, percentage_tip);
        updatetiponhtml(billtotal, tip_price, number_of_person);
        document.getElementById('logshower').style.display = "none";
    }
}

function findtip(billtotal, percentage_tip) {
    tvalue = (billtotal * percentage_tip) / 100
    return tvalue.toFixed(2)
}

function updatetiponhtml(real, tip, person) {
    price = (parseFloat(real) + parseFloat(tip)).toFixed(2)
    document.getElementById('fprice').innerText = "$" + (tip / person).toFixed(2);
    document.getElementById('perperson').innerText = "$" + (price / person).toFixed(2)
}

document.getElementById('noperson').addEventListener('input', function() {
    if (this.value != '' && parseInt(this.value) != 0) {
        this.style.border = "3px solid hsl(172, 67%, 45%)";
    } else {
        this.style.border = "3px solid crimson";
        document.getElementById('logshower').style.display = "block";
    }
})

// reset btn

document.getElementById('reset').addEventListener('click', function() {
    document.getElementById('fprice').innerText = "$0.00"
    document.getElementById('perperson').innerText = "$0.00";
    document.getElementById('billtotal').value = 0;
    document.getElementById('logshower').style.display = "block";
    document.getElementById('noperson').style.border = "3px solid crimson";
    document.getElementById('noperson').value = 0;

})
