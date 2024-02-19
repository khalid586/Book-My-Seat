let count = 0 , remaining = 40 , total = 0 , Applied = false , coupon = '';
const allSeats = document.querySelectorAll('.seats');

let grandTotal = 0;

allSeats.forEach(seats =>
    seats.addEventListener('click',() =>{
        const seat = document.getElementById(seats.id);

        if(count < 4){
            if(seat.classList.contains('bg-white')){
                seat.classList.remove('bg-white');
                seat.classList.add('bg-green-500','text-white');
                ++count;
                console.log(count);
                document.getElementById('seatTaken').innerText = count;

                document.getElementById('coupon-btn').removeAttribute('disabled');
                document.getElementById('confirmation').removeAttribute('disabled');
                
                const newSeat = document.createElement('div');
                newSeat.classList.add('flex','justify-between');
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
        }
        else{
            if(seat.classList.contains('bg-white')){
                alert("You can't book more than 4 seats");
            }
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
            Discount.classList.add('text-green-500','font-semibold','text-xl');
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

