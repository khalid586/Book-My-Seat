let count = 0 , remaining = 40;
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
    console.log(event.target.value);
})

allSeats.forEach(seats =>
    seats.addEventListener('click',() =>{
        const seat = document.getElementById(seats.id);
        console.log(seat.id);

        if(seat.classList.contains('bg-slate-200')){
            seat.classList.remove('bg-slate-200');
            seat.classList.add('bg-green-500','text-white');
            ++count;
            
            const newSeat = document.createElement('p');
            newSeat.innerText = `You have selected ${seat.id}`;
            document.getElementById('selected').appendChild(newSeat);
        }
    })
)

