let count = 0 , remaining = 40 , total = 0;
const allSeats = document.querySelectorAll('.seats');

document.getElementById('inputfield').addEventListener('keyup',function(event){
    if(event.target.value == 'NEW15'){
        document.getElementById('delete-btn').removeAttribute('disabled');
        
    }else if(event.target.value == 'Couple 20'){
        document.getElementById('delete-btn').removeAttribute('disabled');
    }
    else{
        document.getElementById('delete-btn').setAttribute('disabled','true');
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

                document.getElementById('total').innerText = total + 550 * count;
            }
        }
        else{
            alert("You can't book more than 4 seats");
        }
    })
)

