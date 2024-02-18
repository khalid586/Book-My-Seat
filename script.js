let count = 0 , remaining = 40 , total = 0 , Applied = false , coupon = '';
const allSeats = document.querySelectorAll('.seats');

let grandTotal = 0;

document.getElementById('inputfield').addEventListener('keyup',function(event){
    if(event.target.value == 'NEW15'){
        if( Applied == false){
            document.getElementById('coupon-btn').removeAttribute('disabled');
            coupon = 'NEW15';
        }
        else{
            alert("Don't act smart.You have already used a coupon!")
        }
    }
    else if(event.target.value == 'Couple 20' && Applied == false){
        if(Applied == false){
            document.getElementById('coupon-btn').removeAttribute('disabled');
            coupon = 'Couple 20';
        }
        else{
            alert("Don't act smart.You have already used a coupon!")
        }
    }
    else{
        document.getElementById('coupon-btn').setAttribute('disabled','true');
    }
    // console.log(event.target.value);
})

allSeats.forEach(seats =>
    seats.addEventListener('click',() =>{
        const seat = document.getElementById(seats.id);

        if(count < 4){
            if(seat.classList.contains('bg-slate-200')){
                seat.classList.remove('bg-slate-200');
                seat.classList.add('bg-green-500','text-white');
                ++count;
                console.log(count);
                
                const newSeat = document.createElement('p');
                newSeat.innerText = `You have selected ${seat.id}`;
                document.getElementById('selected').appendChild(newSeat);

                let seatsLeft = parseInt(document.getElementById('remaining').innerText);
                seatsLeft --;
                document.getElementById('remaining').innerText = seatsLeft;

                total = 550 * count;
                document.getElementById('total').innerText = 550 * count;
                grandTotal = total;

                document.getElementById('grandTotal').innerText = total;
            }
        }
        else{
            alert("You can't book more than 4 seats");
        }
    })
)

document.getElementById('coupon-btn').addEventListener('click',() =>{
    if(coupon == "NEW15"){
        grandTotal = total -( (total * 15)/100);
    }
    else{
        grandTotal = total - ( (total * 20)/100);
    }

    Applied = true;

    document.getElementById('grandTotal').innerText = grandTotal;
})

