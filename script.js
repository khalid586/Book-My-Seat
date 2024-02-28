let count = 0 , remaining = 40 , total = 0 , Applied = false , coupon = '';
const allSeats = document.querySelectorAll('.seats');


let confirmed = false, grandTotal = 0 , valid_phone = false;
let name = '' , phone = '1' ;



function check(){
    if(name.length > 3  && !confirmed){
        document.getElementById('minName').classList.toggle('text-red-500',false);
        document.getElementById('minName').classList.toggle('text-green-500',true);
        document.getElementById('name_done').classList.add('text-green-500');
        document.getElementById('name_done').classList.remove('text-red-500');
    }else{
        document.getElementById('minName').classList.toggle('text-red-500',true);
        document.getElementById('minName').classList.toggle('text-green-500',false);
        document.getElementById('name_done').classList.remove('text-green-500');
        document.getElementById('name_done').classList.add('text-red-500');
    }

    if(count > 3 && (coupon == "NEW15" || coupon == "Couple 20")){
        document.getElementById('coupon-btn').removeAttribute('disabled');
    }
    else{
        document.getElementById('coupon-btn').setAttribute('disabled','true');
    } 

    if((phone.length == 11 || valid_phone) && !confirmed){
        if(valid_phone){
            document.getElementById('Valid_phone').classList.toggle('text-red-500',false);
            document.getElementById('Valid_phone').classList.toggle('text-green-500',true);
        }else{
            document.getElementById('Valid_phone').classList.toggle('text-red-500',true);
            document.getElementById('Valid_phone').classList.toggle('text-green-500',false);
        }
        if(phone.length == 11){
            document.getElementById('digit11').classList.toggle('text-red-500',false);
            document.getElementById('digit11').classList.toggle('text-green-500',true);
        }else{
            document.getElementById('digit11').classList.toggle('text-red-500',true);
            document.getElementById('digit11').classList.toggle('text-green-500',false);
        }
        
        if(phone.length == 11 && valid_phone){            
            document.getElementById('phone_done').classList.toggle('text-green-500',true);
            document.getElementById('phone_done').classList.toggle('text-red-500',false);
        }
        else{
            document.getElementById('phone_done').classList.toggle('text-green-500',false);
            document.getElementById('phone_done').classList.toggle('text-red-500',true);
        }
    }else{
        document.getElementById('Valid_phone').classList.toggle('text-red-500',true);
        document.getElementById('phone_done').classList.remove('text-green-500');
        document.getElementById('Valid_phone').classList.toggle('text-green-500',false);
        document.getElementById('digit11').classList.toggle('text-red-500',true);
        document.getElementById('phone_done').classList.add('text-red-500');
        document.getElementById('digit11').classList.toggle('text-green-500',false);
    }
    if(count && !confirmed){
        document.getElementById('seat_done').classList.add('text-green-500');
        document.getElementById('seat_done').classList.remove('text-red-500');
        if(count > 3){
            document.getElementById('seat_done1').classList.add('text-green-500');
            document.getElementById('seat_done1').classList.remove('text-gray-300');
        }
        else{
            document.getElementById('seat_done1').classList.remove('text-green-500');
            document.getElementById('seat_done1').classList.add('text-gray-300');
        }
    }else{
        document.getElementById('seat_done').classList.remove('text-green-500');
        document.getElementById('seat_done').classList.add('text-red-500');
    }

    if(name.length > 3 && phone.length == 11 && valid_phone && count && !confirmed){
        document.getElementById('confirmation').removeAttribute('disabled');
    }else{
        document.getElementById('confirmation').setAttribute('disabled','true');
    }
}

document.getElementById('passenger_name').addEventListener('input',(event)=>{
    name = event.target.value;
    if(name.length < 1){
        document.getElementById('char_left').innerText = '';
    }
    else if(name.length < 26){
        document.getElementById('char_left').innerText = ` ${ 25 - name.length} characters left`;
    }    
    
    check();
    if(name.length > 25){
        return;
    }
    document.getElementById('name_text').innerText = name;
})
document.getElementById('passenger_phone').addEventListener('input',(event)=>{
    phone = event.target.value;

    const digit =  document.getElementById('valid_number');
    
    if(phone.length){
        digit.innerText = `${phone.length} digit`;
        if(phone[0] == '0'){
            valid_phone = true;
        }
        if(phone[0] != '0'){
            digit.innerText += ' (Phone number must start with 0)';
            valid_phone = false;
        }
        else if(phone.length > 1){
            if(phone[1] != '1'){
                digit.innerText += ' (Phone number must start with 01)';
                valid_phone = false;
            }
            else{
                valid_phone = true;
            }
        }
    }else{
        valid_phone = false;
        digit.innerText = '';
    }
    
    if(phone.length == 11 && valid_phone){
        document.getElementById('passenger_phone').classList.remove('text-red-500');
        document.getElementById('passenger_phone').classList.add('text-green-500');
    }
    else{
        document.getElementById('passenger_phone').classList.add('text-red-500');
        document.getElementById('passenger_phone').classList.remove('text-green-500');
    }
    check();
})


document.getElementById('confirmation').addEventListener('click', () => {
    confirmed = true;
    document.getElementById('coupon-btn').setAttribute('disabled','true');
    document.getElementById('confirmation').setAttribute('disabled','true');

    document.getElementById('phone_done').classList.remove('text-green-500');
    document.getElementById('phone_done').classList.add('text-red-500');

    document.getElementById('seat_done').classList.remove('text-green-500');
    document.getElementById('seat_done').classList.add('text-red-500');

    document.getElementById('name_done').classList.remove('text-green-500');
    document.getElementById('name_done').classList.add('text-red-500');

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
               
                check();

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

            document.getElementById('coupon-btn').setAttribute('disabled','true');
            
            check();
            
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
    
    document.getElementById('inputfield').addEventListener('input',(event) =>{
    coupon = event.target.value;
    check();

    if(coupon == 'NEW15'){
        document.getElementById('new15').classList.add('text-green-500');
        document.getElementById('new15').classList.remove('text-gray-300');
    }
    else if(coupon == 'Couple 20'){
        document.getElementById('couple20').classList.add('text-green-500');
    }
    else{
        document.getElementById('new15').classList.add('text-gray-300');
        document.getElementById('new15').classList.remove('text-green-500');
        document.getElementById('couple20').classList.add('text-gray-300');
        document.getElementById('couple20').classList.remove('text-green-500');
    }
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
            document.getElementById('coupon').classList.remove('hidden');
            
            document.getElementById('Coupon-container').classList.add('hidden');
            Applied = true;
            
            grandTotal = grandTotal - discount;
            document.getElementById('grandTotal').innerText = grandTotal;
        }else{
            document.getElementById('inputfield').value = '';
            alert('Enter a valid coupon!')
        }

})

