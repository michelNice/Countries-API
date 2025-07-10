/*function fibonacci(n){

    const fib = [0,1]

    for(let i = 2; i < n ;i++){

        fib[i] = fib[i -1] + fib[i -2]
    }

    return fib
}


console.log(fibonacci(3))



function fatorial(n){

    let res = 1

    for(let i = 2; i <= n;i++){

        res *= i
    }

    return res
}



console.log(fatorial(7))




function prime(n){

    if(n < 2){
        return 'no prime'
    }

    for(let i = 2; i < n;i++){
        if(n % i === 0){

            return ' no prime'
        }
    }

    return 'prime'
}

console.log(prime(13)) // "prime"
console.log(prime(10)) // "no prime"
*/

function poweroftwo(n){
    return (n > 0) && ((n & (n - 1)) === 0);
}

console.log(poweroftwo(5))