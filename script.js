let count = 0 , remaining = 40 , total = 0 , Applied = false , coupon = '';
const allSeats = document.querySelectorAll('.seats');


let confirmed = false, grandTotal = 0;

document.getElementById('confirmation').addEventListener('click', () => {
    confirmed = true;
    document.getElementById('coupon-btn').setAttribute('disabled','true');
    document.getElementById('confirmation').setAttribute('disabled','true');
})

allSeats.forEach(seats =>
    seats.addEventListener('click',() =>{
        const seat = document.getElementById(seats.id);

        if(confirmed){
            alert("You can't change your selection once you have confirmed your reservation");
        }
        else if(Applied){
            alert("You've applied the coupon already! Can't change seat choice!")
        }

        else if(seat.classList.contains('bg-white')){
            if(count < 4) {
                seat.classList.remove('bg-white');
                seat.classList.add('bg-[#1DD100]','text-white');
                ++count;
                console.log(count);
                document.getElementById('seatTaken').innerText = count;

                document.getElementById('coupon-btn').removeAttribute('disabled');
                document.getElementById('confirmation').removeAttribute('disabled');
                
                const newSeat = document.createElement('div');
                newSeat.classList.add('flex','justify-between');
                newSeat.setAttribute('id',`${seats.id}-info`) ;
                newSeat.innerHTML = `<p>${seat.id}</p> <p>Economy</p> <p>550</p>`;
                document.getElementById('selected').appendChild(newSeat);

                let seatsLeft = parseInt(document.getElementById('remaining').innerText);
                seatsLeft --;
                document.getElementById('remaining').innerText = seatsLeft;

                total += 550;
                document.getElementById('total').innerText = total;
                grandTotal += 550;

                document.getElementById('grandTotal').innerText = grandTotal;
            }
            else{
                if(seat.classList.contains('bg-white')){
                    alert("You can't book more than 4 seats");
                }
            }
        }else{
            seat.classList.add('bg-white');
            seat.classList.remove('bg-[#1DD100]','text-white');
            --count;
            document.getElementById('seatTaken').innerText = count;

            if(count == 0){
                document.getElementById('coupon-btn').setAttribute('disabled','true');
                document.getElementById('confirmation').setAttribute('disabled','true');
            }

            let seatsLeft = parseInt(document.getElementById('remaining').innerText);
            seatsLeft++;
            document.getElementById('remaining').innerText = seatsLeft;

            total -= 550;
            document.getElementById('total').innerText = total;
            grandTotal -= 550;

            document.getElementById('grandTotal').innerText = grandTotal;
        
            document.getElementById(`${seat.id}-info`).remove();
        }
    })
)

document.getElementById('inputfield').addEventListener('keyup',(event) =>{
    coupon = event.target.value;
    console.log(coupon);
})

document.getElementById('coupon-btn').addEventListener('click',() =>{
        if(coupon == "NEW15" || coupon == "Couple 20"){        
            if(coupon == "NEW15"){
                discount = Math.round((grandTotal * 15)/100);
            }
            else{
                discount = Math.round((grandTotal * 20)/100);
            }

            Discount = document.createElement('p');
            Discount.innerText = `You have got a discount of ${discount} Taka`;
            Discount.classList.add('text-[#1DD100]','font-semibold','text-xl');
            document.getElementById('coupon').appendChild(Discount);
            
            document.getElementById('Coupon-container').classList.add('hidden');
            Applied = true;
            
            grandTotal = grandTotal - discount;
            document.getElementById('grandTotal').innerText = grandTotal;
        }else{
            document.getElementById('inputfield').value = '';
            alert('Enter a valid coupon!')
        }

})

