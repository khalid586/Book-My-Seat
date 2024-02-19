let count = 0 , remaining = 40 , total = 0 , Applied = false , coupon = '';
const allSeats = document.querySelectorAll('.seats');

let grandTotal = 0;

    // console.log(event.target.value);

allSeats.forEach(seats =>
    seats.addEventListener('click',() =>{
        const seat = document.getElementById(seats.id);

        if(count < 4){
            if(Applied){
                alert("You've already applied coupon. Can't select anymore seats!")
            }
            else if(seat.classList.contains('bg-slate-200')){
                seat.classList.remove('bg-slate-200');
                seat.classList.add('bg-green-500','text-white');
                ++count;
                console.log(count);
                document.getElementById('seatTaken').innerText = count;

                if(count){
                    document.getElementById('coupon-btn').removeAttribute('disabled');
                    document.getElementById('confirmation').removeAttribute('disabled');
                }
                
                const newSeat = document.createElement('div');
                newSeat.classList.add('flex','justify-between');
                newSeat.innerHTML = `<p>${seat.id}</p> <p>Economy</p> <p>550</p>`;
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

document.getElementById('inputfield').addEventListener('keyup',(event) =>{
    coupon = event.target.value;
    console.log(coupon);

    if(Applied){
        alert("Don't act smart! You've already applied coupon code!")
    }
})

document.getElementById('coupon-btn').addEventListener('click',() =>{
        if(coupon == "NEW15" || coupon == "Couple 20"){        
            if(coupon == "NEW15"){
                discount = Math.round(( (grandTotal * 15)/100));
                grandTotal = grandTotal - discount;

                Discount = document.createElement('p');
                Discount.innerText = `You have got a discount of ${discount}`
                document.getElementById('coupon').appendChild(Discount);
            }
            else{
                discount = ( (grandTotal * 20)/100);
                grandTotal = grandTotal - discount;
                
                Discount = document.createElement('p');
                Discount.innerText = `You have got a discount of ${discount} Taka`
                document.getElementById('coupon').appendChild(Discount);
            }
            
            Applied = true;
            document.getElementById('Coupon-container').classList.add('hidden');
            Applied = true;
        
            document.getElementById('grandTotal').innerText = grandTotal;
        }else{
            document.getElementById('inputfield').value = '';
            alert('Enter a valid coupon!')
        }

})

